[![npm](https://img.shields.io/npm/v/nativescript-color-picker.svg)](https://www.npmjs.com/package/nativescript-color-picker)
[![npm](https://img.shields.io/npm/dt/nativescript-color-picker.svg?label=npm%20downloads)](https://www.npmjs.com/package/nativescript-color-picker)

# NativeScript Color Picker
NativeScript plugin to show a color picker dialog.
 
*Android Only*

## Sample Usage

Sample      |
------------|
![Sample](./screens/cpicker.gif) |

#### Native Library: 
Android |
---------- |
[MrBIMC/VintageChroma](https://github.com/MrBIMC/VintageChroma) |


## Installation
From your command prompt/terminal go to your app's root folder and execute:

`tns plugin add nativescript-color-picker`

## Usage

### XML
```XML
<Page 
  xmlns="http://schemas.nativescript.org/tns.xsd" loaded="pageLoaded">
  <ActionBar title="Color Picker" />
  <StackLayout>
    <Button text="Show ARGB Picker" tap="{{ showARGBPicker }}" />
    <Button text="Show RGB Picker" tap="{{ showRGBPicker }}" />
    <Button text="Show HSV Picker" tap="{{ showHSVPicker }}" />
    <StackLayout orientation="horizontal">
      <Label text="Selected Color: " class="message" textWrap="true" />
      <Label text="{{ selectedColor }}" class="message" textWrap="true"/>
    </StackLayout>
  </StackLayout>
</Page>
```

### TS
```TS
import { ColorPicker } from 'nativescript-color-picker';

let picker = new ColorPicker();

 public showARGBPicker() {
    picker.show('#3489db', 'ARGB').then((result) => {
      console.log('color int: ' + result);
    }).catch((err) => {
      console.log(err)
    })
}

```

## API

 Opens the color picker dialog.
- **show(initialColor?: string, colorMode?: string): Promise<number>**
    - ColorMode { 'ARGB', 'RGB', 'HSV' }