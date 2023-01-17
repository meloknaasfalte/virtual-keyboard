
const symbols = [['`', '1', '2', '3', '4', '5', '6', '7', '8', '9', '0', '-', '=', 'Backspace'], ['Tab',
                'q', 'w', 'e', 'r', 't', 'y', 'u', 'i', 'o', 'p', '[', ']'], ['CapsLock', 
                'a', 's', 'd', 'f', 'g', 'h', 'j', 'k', 'l', ':', '"', '|','Enter'], ['Shift', 'z', 
                'x', 'c', 'v', 'b', 'n', 'm', ',', '.', '/', '↑', 'ru'], ['Ctrl', 'optn', 'cmnd', 'Space', 'cmnd',  '←', '↓', '→', 'optn' ]];

const symbolsRu = ['й', 'ц', 'у', 'к', 'е', 'н', 'г', 'ш', 'щ', 'з', 'х', 'ъ', 'ф', 'ы', 'в', 'а', 'п', 'р', 'о', 'л', 'д', 'ж', 'э', 'ё', 'я', 'ч', 'с', 'м', 'и', 'т', 'ь', 'б', 'ю'];
const symbolsEng = ['q', 'w', 'e', 'r', 't', 'y', 'u', 'i', 'o', 'p', '[', ']', 'a', 's', 'd', 'f', 'g', 'h', 'j', 'k', 'l', ':', '"', '|', 'z', 'x', 'c', 'v', 'b', 'n', 'm', ',', '.'];

const functionalKeys = ['Backspace', 'Tab', 'CapsLock', 'Enter', 'CapsLock', 'Shift', 'Ctrl', 'optn', 'cmnd', 'Space', '↑', '←', '↓', '→' ];

const pseudoClassSymb = ['§', '!', '@', '#', '$', '%', 'ˆ', '&', '*', '(', ')', '_', '+'];


let state = {
    shift: false,
    language: 0
};


let body = document.querySelector('.body');

body.insertAdjacentHTML (
    'beforeend',
    '<div class="container"><h1 class="title">RSS Virtual Keyboard</h1><textarea class="textarea" rows="10" cols="5"></textarea><div class="wrapper"><div class="row"></div><div class="row"></div><div class="row"></div><div class="row"></div><div class="row"></div></div></textarea>'
);

let addClass = (className, content, newElement, indexOfRow, indexOfButton) => {

    if (functionalKeys.indexOf(content) !== -1) {
        if(content === '↑')
            newElement.classList.add('key-up');
        else if(content === '←')
            newElement.classList.add('key-left');
        else if(content === '→')
            newElement.classList.add('key-right');
        else if(content === '↓')
            newElement.classList.add('key-down');
        else
            newElement.classList.add(content.toLowerCase());
    }
    else if (content === 'ru') {
        newElement.classList.add('ru');
    }
    else if (indexOfRow === 0){
        newElement.classList.add('number');
        newElement.classList.add(`${'number' + String(indexOfButton)}`);
    }
        
    else {
        if (indexOfRow !== 0)
            newElement.classList.add('letter');
    }
    newElement.classList.add(className);
}


let createElement = (type, className, parentEL, content, indexOfRow, indexOfButton) => {
   
    const newElement = document.createElement(type);
    addClass(className, content, newElement, indexOfRow, indexOfButton);
    
    parentEL.appendChild(newElement);
    if(content)
        newElement.innerHTML = content;    
    
};

const rows = document.querySelectorAll('.row');

for(let i = 0; i < rows.length; i++){

    for(let j = 0; j < symbols[i].length; j++){
        createElement('div', 'button', rows[i], symbols[i][j], i, j);
    }
}

const number = document.querySelectorAll('.number');

for(let i = 0; i < pseudoClassSymb.length; i++) {
    const newElement = document.createElement('div');
    newElement.classList.add('number_shift');
    number[i].appendChild(newElement);
    newElement.innerHTML = pseudoClassSymb[i];
}

const textarea = document.querySelector('.textarea');



const key = document.querySelectorAll('.button');

for(let i = 0; i < key.length; i++) {
    key[i].addEventListener('click', (e) => {
        key[i].classList.add('button_click');
        keyControllers(key[i].childNodes[0].data);
        console.dir(key[i].childNodes[0])
        key[i].classList.remove('button_click');

    });
}

const checkButton = (eventKey, innerKey) => {
    if(innerKey === eventKey || 
        innerKey === 'ctrl' && eventKey === 'control' || 
        innerKey === 'optn' && eventKey === 'alt' || 
        innerKey === 'cmnd' && eventKey === 'meta' ||
        innerKey === 'space' && eventKey === ' ' ||
        innerKey === '↑' && eventKey === 'arrowup' ||
        innerKey === '←' && eventKey === 'arrowleft' ||
        innerKey === '↓' && eventKey === 'arrowdown' ||
        innerKey === '→' && eventKey === 'arrowright'){
        return true;
    }
    return false;
}
let shift = (value) => {
    const letter = document.querySelectorAll('.letter');
    for(let i = 0; i < letter.length; i++) {
        if (value) {
            letter[i].innerText = letter[i].innerText.toUpperCase();
        }
        else
            letter[i].innerText = letter[i].innerText.toLowerCase();
    }
}

let shiftNumber = (value) => {
    const number = document.querySelectorAll('.number');
    const numberShift = document.querySelectorAll('.number_shift');
    for(let i = 0; i < numberShift.length; i++) {
        let tmp = numberShift[i].innerText;
        numberShift[i].innerText = number[i].childNodes[0].data;
        number[i].childNodes[0].data = tmp;
        // console.log(numberShift[i], number);

    }
}




const keyControllers = (key) => {
    switch(key) {
        case 'Control': 
            break;
        case 'Alt':
            break;
        case 'Meta':
            break;
        case 'Backspace':
            textarea.value = textarea.value.slice(0, textarea.value.length - 1);
            break;
        case 'CapsLock':
            state.shift = !state.shift;
            shift(state.shift);
            break;
        case 'Shift':
            state.shift = true;
            shift(state.shift);
            shiftNumber(1)
            break;
        case 'Enter':
            textarea.value += '\n';
            break;
        case 'Space':
            textarea.value += ' ';
            break;
        case 'Tab':
            textarea.value += '    ';
            break;
        default: textarea.value += key;
    }
}




document.addEventListener('keydown', (e) => {

    for(let i = 0; i < key.length; i++) {
        let arr = key[i].innerText.split('\n');

        if (checkButton(e.key.toLowerCase(), key[i].innerText.toLowerCase())) {
            key[i].classList.add('button_click');
            keyControllers(e.key);
        }
        else if (arr.indexOf(e.key) !== -1 && arr.length === 2) {
            key[i].classList.add('button_click');
            textarea.value += e.key;
        }
    }
});

document.addEventListener('keyup', (e) => {
    for(let i = 0; i < key.length; i++) {
        let arr = key[i].innerText.split('\n');

        if (checkButton(e.key.toLowerCase(), key[i].innerText.toLowerCase())) {
            key[i].classList.remove('button_click');
            if(e.key === 'Shift') {
                state.shift = false;
                shift(state.shift);
            }
            
        }
        else if (arr.indexOf(e.key) !== -1 && arr.length === 2) {
            
            key[i].classList.remove('button_click');
        }
    }
});

const letter = document.querySelectorAll('.letter');
const ru = document.querySelector('.ru');

let changeLanguage = (e) => {
    
    if (!state.language) {
        for(let i = 0; i < symbolsRu.length; i++) {
            letter[i].innerText = symbolsRu[i];
        }
        ru.classList.toggle('button_click');
        ru.innerText = 'en';
        state.language = 1;
    }
        
    else {
        for(let i = 0; i < symbolsEng.length; i++) {
            letter[i].innerText = symbolsEng[i];
        }
        ru.classList.toggle('button_click');
        ru.innerText = 'ru';
        state.language = 0;
    }
}

ru.addEventListener('click', changeLanguage);



   









