const numbers = document.querySelectorAll('.number');
const operators = document.querySelectorAll('.operator');
const display = document.querySelector('#display');
const equal = document.querySelector('#equal');
const clear = document.querySelector('#clear');
const del = document.querySelector('#del');
const pn = document.querySelector('#pn');

const add = (a, b) => a + b;
const subtract = (a, b) => a - b;
const multiply = (a, b) => a * b;
const divide = (a, b) => a / b;

let aNum = '';
let bNum = '';
let isANumActive = true;
let o = '';
let isOActive = true;
let isNewCalc = true;
let lastBNum = '';
let LastO = '';

function operate(a, b, operator) {
  if (operator === '+') return add(a, b, operator);
  else if (operator === '-') return subtract(a, b, operator);
  else if (operator === '*') return multiply(a, b, operator);
  else if (operator === '/') return divide(a, b, operator);
}

numbers.forEach(number => {
  number.addEventListener('click', (e) => {
    if (isNewCalc && aNum !== '') {
      display.textContent = '';
      aNum = '';
      bNum = '';
      isANumActive = true;
      isNewCalc = false;
    }

    if (isANumActive) {
      isNewCalc = false;

      if (e.target.value === '.' && aNum.includes('.')) return;

      if (aNum === '0' && e.target.value === '0') return;

      if (aNum === '0' && e.target.value !== '.') {
        aNum = e.target.value;
      } else if (aNum === '' && e.target.value === '.') {
        aNum = '0.';
      } else {
        aNum += e.target.value;
      }

      display.textContent = aNum;
      
    } else if (!isANumActive) {
        if (e.target.value === '.' && bNum.includes('.')) return;

        if (bNum === '0' && e.target.value === '0') return;

        if (bNum === '' && e.target.value === '.') {
          bNum = '0';
          display.textContent += bNum;
        }

        bNum += e.target.value;
        display.textContent += e.target.value;
        isOActive = false;
    }
  });
});

operators.forEach(operator => {
  operator.addEventListener('click', (e) => {
    if (aNum === 'Error') return;

    isNewCalc = false;

    if (isANumActive && isOActive && aNum === '') {
      aNum = '0';
      isANumActive = false;
      o = e.target.value;
      display.textContent += e.target.textContent;
    } else if (isANumActive && isOActive) {
        isANumActive = false;
        o = e.target.value;
        display.textContent += e.target.textContent;
    } else if (!isANumActive && o !== '' && isOActive) {
        display.textContent = display.textContent.slice(0, -1) + e.target.textContent;
        o = e.target.value;
    } else if (!isANumActive && bNum !== '') {
        let result = Math.round(operate(+aNum, +bNum, o) * 10000000000) / 10000000000;
        if (!isFinite(result)) result = 'Error';
        o = e.target.value;
        display.textContent = result + e.target.textContent;
        aNum = String(result);
        bNum = '';
        isOActive = true;
    }
  });
});

equal.addEventListener('click', () => {

  if (bNum !== '') {
    let result = Math.round(operate(+aNum, +bNum, o) * 10000000000) / 10000000000;
    if (!isFinite(result)) result = 'Error';
    display.textContent = result;
    aNum = String(result);
    lastBNum = bNum;
    LastO = o;
    bNum = '';
    isANumActive = true;
    o = '';
    isOActive = true;
    isNewCalc = true;
  }

  else if (lastBNum !== '' && LastO !== '' && aNum !== '' && aNum !== 'Error') {
    let result = Math.round(operate(+aNum, +lastBNum, LastO) * 10000000000) / 10000000000;
    if (!isFinite(result)) result = 'Error';
    display.textContent = result;
    aNum = String(result);
    isNewCalc = true;
  }
});

clear.addEventListener('click', () => {
  display.textContent = '0';
  aNum = '';
  bNum = '';
  isANumActive = true;
  o = '';
  isOActive = true;
  isNewCalc = true;
});

del.addEventListener('click', () => {

  if (bNum !== '') {
    bNum = bNum.slice(0, -1);
    display.textContent = display.textContent.slice(0, -1);
  } else if (o !== '') {
    o = '';
    isANumActive = true;
    isOActive = true;
    display.textContent = display.textContent.slice(0, -1);
  } else if (isANumActive) {
    aNum = aNum.slice(0, -1);
    display.textContent = display.textContent.slice(0, -1);
    if (display.textContent === '') display.textContent = '0';
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

pn.addEventListener('click', () => {
  if (aNum === '' || aNum === '0' || aNum === 'Error') return;

  if (isANumActive) {
    aNum = aNum.startsWith('-') ? aNum.slice(1) : '-' + aNum;
    display.textContent = aNum;
  } else if (!isANumActive && bNum !== '') {
    bNum = bNum.startsWith('-') ? bNum.slice(1) : '-' + bNum;
    display.textContent = aNum + o + bNum;
  }
});

document.querySelectorAll('button').forEach(button => {
  button.addEventListener('focus', () => {
    button.blur();
  })
});