const numbers = document.querySelectorAll('.number');
const operators = document.querySelectorAll('.operator');
const display = document.querySelector('#display');
const equal = document.querySelector('#equal');
const clear = document.querySelector('#clear');
const del = document.querySelector('#del');

const add = (a, b) => a + b;
const subtract = (a, b) => a - b;
const multiply = (a, b) => a * b;
const divide = (a, b) => b === 0 ? 'Error' : a / b;

let aNum = '';
let bNum = '';
let active = 'a';
let o = '';
let oActive = 'yes';
let newCalc = 'yes';

function operate(a, b, operator) {
  if (operator === '+') return add(a, b, operator);
  else if (operator === '-') return subtract(a, b, operator);
  else if (operator === '*') return multiply(a, b, operator);
  else if (operator === '/') return divide(a, b, operator);
}

numbers.forEach(number => {
  number.addEventListener('click', (e) => {
    if (newCalc === 'yes' && aNum !== '') {
      display.textContent = '';
      aNum = '';
      bNum = '';
      active = 'a';
      newCalc = 'no';
    }

    if (active === 'a') {
      newCalc = 'no';
      aNum += e.target.value;
      display.textContent += e.target.value;
      // if (aNum.includes('.')) return;
    } else if (active === 'b') {
        bNum += e.target.value;
        display.textContent += e.target.value;
        oActive = 'no';
    }

    
  });
});

operators.forEach(operator => {
  operator.addEventListener('click', (e) => {
    if (aNum === '' || aNum === 'Error') return;

    newCalc = 'no';

    if (active === 'a' && oActive === 'yes') {
      active = 'b';
      o = e.target.value;
      display.textContent += e.target.value;
    } else if (active === 'b' && o !== '' && oActive === 'yes') {
      display.textContent = display.textContent.slice(0, -1) + e.target.value;
      o = e.target.value;
    } else if (active === 'b' && bNum !== '') {
      let result = operate(+aNum, +bNum, o);
      o = e.target.value;
      display.textContent = result + o;
      aNum = result;
      bNum = '';
      oActive = 'yes';
    }
  });
});

equal.addEventListener('click', () => {
  if (bNum !== '') {
    let result = operate(+aNum, +bNum, o);
    display.textContent = result;
    aNum = result;
    bNum = '';
    active = 'a';
    o = '';
    oActive = 'yes';
    newCalc = 'yes';
  }
});

clear.addEventListener('click', () => {
  display.textContent = '';
  aNum = '';
  bNum = '';
  active = 'a';
  o = '';
  oActive = 'yes';
  newCalc = 'yes';
});


/* del.addEventListener('click', () => {
  if (active === 'a') {
    aNum = aNum.slice(0, -1);
    display.textContent = display.textContent.slice(0, -1);
  }
}) */























































/* const display = document.querySelector('#display');
const equal = document.querySelector('#equal');
const del = document.querySelector('#del');
const numbers = document.querySelectorAll('.number');
const operators = document.querySelectorAll('.operator');

const add = (a, b) => a + b;
const subtract = (a, b) => a - b;
const multiply = (a, b) => a * b;
const divide = (a, b) => a / b;

function operate(a, b, operator) {
  if (operator === '+') {
    display.textContent = add(a, b);
    num1 = add(a, b);
    num2 = '';
  } else if (operator === '-') {
    display.textContent = subtract(a, b);
    num1 = subtract(a, b);
    num2 = '';
  } else if (operator === '*') {
    display.textContent = multiply(a, b);
    num1 = multiply(a, b);
    num2 = '';
  } else if (operator === '/') {
    display.textContent = divide(a, b);
    num1 = divide(a, b);
    num2 = '';  
  }
}

let num1 = '';
let num2 = '';
let o = '';
let c = 'a';
let p = 'n'

numbers.forEach(number => {
  number.addEventListener('click', (e) => {
    if (p === 'y') {
      display.textContent = '';
      num1 = '';
      p = 'n';
    }

    if (c === 'a') {
      num1 += e.target.value;
    } else {
      num2 += e.target.value;
    }

    display.textContent += e.target.textContent;
  });
});

operators.forEach(operator => {
  operator.addEventListener('click', (e) => {
    

    if (c === 'a') {
      display.textContent += e.target.textContent;
      o = e.target.value;
      c = 'b';
    } else {
      operate(+num1, +num2, o);
      display.textContent += e.target.textContent;
      o = e.target.value;
    }
  })
})

equal.addEventListener('click', () => {
  operate(+num1, +num2, o);
  c = 'a';
  display.textContent = num1;
  p = 'y';
});

del.addEventListener('click', () => {
  if (c === 'a') {
    display.textContent = display.textContent.slice(0, -1);
    num1 = num1.slice(0, -1);
  } else {
    display.textContent = display.textContent.slice(0, -1);;
    num2 = num2.slice(0, -1);
  }
}) */