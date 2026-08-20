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
let active = 'a';
let o = '';
let oActive = 'yes';
let newCalc = 'yes';
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

      if (aNum === '0' && e.target.value === '0') return;

      if (aNum === '0' && e.target.value !== '.') {
        aNum = e.target.value;
      } else if (aNum === '' && e.target.value === '.') {
        aNum = '0.';
      } else {
        aNum += e.target.value;
      }

      display.textContent = aNum;
      
    } else if (active === 'b') {
        if (e.target.value === '.' && bNum.includes('.')) return;

        if (bNum === '0' && e.target.value === '0') return;

        if (bNum === '' && e.target.value === '.') {
          bNum = '0';
          display.textContent += bNum;
        }

        bNum += e.target.value;
        display.textContent += e.target.value;
        oActive = 'no';
    }
  });
});

operators.forEach(operator => {
  operator.addEventListener('click', (e) => {
    if (aNum === 'Error') return;

    newCalc = 'no';

    if (active === 'a' && oActive === 'yes' && aNum === '') {
      aNum = '0';
      active = 'b';
      o = e.target.value;
      display.textContent += e.target.textContent;
    } else if (active === 'a' && oActive === 'yes') {
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
    lastBNum = bNum;
    LastO = o;
    bNum = '';
    active = 'a';
    o = '';
    oActive = 'yes';
    newCalc = 'yes';
  }

  else if (lastBNum !== '' && LastO !== '' && aNum !== '' && aNum !== 'Error') {
    let result = Math.round(operate(+aNum, +lastBNum, LastO) * 100000000000) / 100000000000;
    if (!isFinite(result)) result = 'Error';
    display.textContent = result;
    aNum = String(result);
    newCalc = 'yes';
  }
});

clear.addEventListener('click', () => {
  display.textContent = '0';
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

  if (active === 'a') {
    aNum = aNum.startsWith('-') ? aNum.slice(1) : '-' + aNum;
    display.textContent = aNum;
  } else if (active === 'b' && bNum !== '') {
    bNum = bNum.startsWith('-') ? bNum.slice(1) : '-' + bNum;
    display.textContent = aNum + o + bNum;
  }
});

document.querySelectorAll('button').forEach(button => {
  button.addEventListener('focus', () => {
    button.blur();
  })
});