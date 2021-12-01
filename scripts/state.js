'use strict';

class StateValue {
    static getBgColor() {
        let bgColor;
        if (!localStorage.getItem('bgcolor')) {
            bgColor = null;
        } else {
            bgColor = localStorage.getItem('bgcolor');
        }
        return bgColor;
    }

    static getTextColor() {
        let textColor;
        if (!localStorage.getItem('textcolor')) {
            textColor = null;
        } else {
            textColor = localStorage.getItem('textcolor');
        }
        return textColor;
    }

    static addBgColor(color) {
        let bgColor = StateValue.getBgColor();
        bgColor = color;
        localStorage.setItem('bgcolor', bgColor);
    }

    static addTextColor(color) {
        let textColor = StateValue.getTextColor();
        textColor = color;
        localStorage.setItem('textcolor', textColor);
    }

}

export { StateValue };