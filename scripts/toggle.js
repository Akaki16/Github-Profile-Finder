'use strict';

import { StateValue } from './state.js';

const darkModeIcon = document.querySelector('.dark');

const profileCards = document.body.children[4].children;

const setAppBgColor = (color) => {
    document.body.style.backgroundColor = '#' + color;
    document.querySelector('header').style.backgroundColor = '#' + color;
    document.querySelector('.modal-content').style.backgroundColor = '#' + color;
    for (let i = 0; i < profileCards.length; i++) {
        const cards = profileCards[i];
        cards.style.backgroundColor = '#' + color;
    }
}

const setAppTextColor = (color) => {
    document.body.style.color = '#' + color;
    document.querySelector('.header-title').style.color = '#' + color;
    document.getElementById('gth-icon').style.color = '#' + color;
    document.querySelector('.info').style.color = '#' + color;
    document.querySelector('.info-modal-title').style.color = '#' + color;
}

const displayAppBgColor = () => {
    const bgColor = StateValue.getBgColor();
    document.body.style.backgroundColor = '#' + bgColor;
    document.querySelector('header').style.backgroundColor = '#' + bgColor;
    document.querySelector('.modal-content').style.backgroundColor = '#' + bgColor;
    for (let i = 0; i < profileCards.length; i++) {
        const cards = profileCards[i];
        cards.style.backgroundColor = '#' + bgColor;
    }
}

const displayTextColor = () => {
    const textColor = StateValue.getTextColor();
    document.body.style.color = '#' + textColor;
    document.querySelector('.header-title').style.color = '#' + textColor;
    document.getElementById('gth-icon').style.color = '#' + textColor;
    document.querySelector('.info').style.color = '#' + textColor;
    document.querySelector('.info-modal-title').style.color = '#' + textColor;
}

// toggle between themes
document.querySelector('header').addEventListener('click', e => {
    const element = e.target.classList;

    if (element.contains('light')) {
        setAppBgColor('fff');

        StateValue.addBgColor('fff');

        setAppTextColor('333');

        StateValue.addTextColor('333');

        document.querySelector('.icon-area').innerHTML = `<i class="fas fa-moon fa-2x dark"></i>`;
    } else if (element.contains('dark')) {
        setAppBgColor('333');

        StateValue.addBgColor('333');

        setAppTextColor('fff');

        StateValue.addTextColor('fff');

        document.querySelector('.icon-area').innerHTML = `<i class="fas fa-sun fa-2x light"></i>`;
    }

});

document.addEventListener('DOMContentLoaded', () => {
    displayAppBgColor();
    displayTextColor();
});