var frame = require("ui/frame");

import * as app from 'application';

import {Color} from 'color';

declare var interop: any,
            MSColorSelectionViewController: any,
            MSColorSelectionViewControllerDelegate: any,
            UINavigationController: any,
            UIBarButtonItem: any,
            UIBarButtonItemStyleDone:any;

class ColorPickerImpl extends NSObject {

    private _owner: WeakRef<ColorPicker>;

    public static initWithOwner(owner: WeakRef<ColorPicker>): ColorPickerImpl {
        let handler = <ColorPickerImpl>ColorPickerImpl.new();
        handler._owner = owner;
        return handler;
    }

    public dismissViewController(sender: any): void {
        let owner = this._owner.get();
        if (owner) {
            owner._dismissViewController(sender);
        }
    }

    public static ObjCExposedMethods = {
        "dismissViewController": { returns: interop.types.void, params: [] }
    };
}

export class ColorPicker {

    private impl: ColorPickerImpl;

    public show(initialColor: string = '#FF4081', colorMode: any = 'RGB') {
        return new Promise((resolve, reject) => {
            try {
                let colorSelectionController = new MSColorSelectionViewController();
                colorSelectionController.color = new Color(initialColor).ios;

                let navCtrl = UINavigationController.alloc().initWithRootViewController(colorSelectionController);

                let delegate = NSObject.extend({
                    colorViewControllerDidChangeColor(colorViewCntroller, color) {
                        resolve(color);
                    },
                }, {
                    protocols: [MSColorSelectionViewControllerDelegate]
                }).alloc().init();
                colorSelectionController.delegate = delegate;

                this.impl = ColorPickerImpl.initWithOwner(new WeakRef(this));

                let doneBtn = UIBarButtonItem.alloc().initWithTitleStyleTargetAction('Done', UIBarButtonItemStyleDone, this.impl, 'dismissViewController');
                colorSelectionController.navigationItem.rightBarButtonItem = doneBtn;

                frame.topmost().currentPage.ios.presentViewControllerAnimatedCompletion(navCtrl, true, null);
            } catch(err) {
                reject(err);
            }
        });
    }

    _dismissViewController(sender) {
        frame.topmost().currentPage.ios.dismissViewControllerAnimatedCompletion(true, null);
    }

}
