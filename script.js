const numbers = document.querySelectorAll('.number');
const operators = document.querySelectorAll('.operator');
const display = document.querySelector('#display');
const equal = document.querySelector('#equal');
const clear = document.querySelector('#clear');
const del = document.querySelector('#del');

const add = (a, b) => a + b;
const subtract = (a, b) => a - b;
const multiply = (a, b) => a * b;
const divide = (a, b) => a / b;

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
      if (e.target.value === '.' && aNum.includes('.')) return;
      aNum += e.target.value;
      display.textContent += e.target.value;
    } else if (active === 'b') {
        if (e.target.value === '.' && bNum.includes('.')) return;
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
      display.textContent += e.target.textContent;
    } else if (active === 'b' && o !== '' && oActive === 'yes') {
      display.textContent = display.textContent.slice(0, -1) + e.target.textContent;
      o = e.target.value;
    } else if (active === 'b' && bNum !== '') {
      let result = Math.round(operate(+aNum, +bNum, o) * 100000000000) / 100000000000;
      if (!isFinite(result)) result = 'Error';
      o = e.target.value;
      display.textContent = result + e.target.textContent;
      aNum = String(result);
      bNum = '';
      oActive = 'yes';
    }
  });
});

equal.addEventListener('click', () => {
  if (bNum !== '') {
    let result = Math.round(operate(+aNum, +bNum, o) * 100000000000) / 100000000000;
    if (!isFinite(result)) result = 'Error';
    display.textContent = result;
    aNum = String(result);
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

del.addEventListener('click', () => {
  if (bNum !== '') {
    bNum = bNum.slice(0, -1);
    display.textContent = display.textContent.slice(0, -1);
  } else if (o !== '') {
    o = '';
    active = 'a';
    oActive = 'yes';
    display.textContent = display.textContent.slice(0, -1);
  } else if (active === 'a') {
    aNum = aNum.slice(0, -1);
    display.textContent = display.textContent.slice(0, -1);
  }
});

window.addEventListener('keydown', (e) => {
  if (e.key === 'Enter' || e.key === '=') {
    equal.click();
  } else if (e.key === 'Backspace') {
    del.click();
  } else if (e.key === 'Escape' || e.key === 'c' || e.key === 'C') {
    clear.click();
  } else {
    const btn = document.querySelector(`button[value="${e.key}"]`);
    if (btn) btn.click();
  }
});

document.querySelectorAll('button').forEach(button => {
  button.addEventListener('focus', () => {
    button.blur();
  })
});