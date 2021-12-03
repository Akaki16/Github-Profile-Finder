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

    static getToggleIcon() {
        let toggleIcon;
        let defaultIcon = `<i class="fas fa-moon fa-2x dark"></i>`;
        if (!localStorage.getItem('toggleicon')) {
            toggleIcon = defaultIcon;
        } else {
            toggleIcon = localStorage.getItem('toggleicon');
        }
        return toggleIcon;
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

    static addToggleIcon(icon) {
        let toggleIcon = StateValue.getToggleIcon();
        toggleIcon = icon;
        localStorage.setItem('toggleicon', icon);
    }

}

export { StateValue };