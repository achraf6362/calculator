const numbers = document.querySelectorAll('.number');
const operators = document.querySelectorAll('.operator');
const input = document.querySelector('#input');
const result = document.querySelector('#result');
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
    if (isANumActive && aNum.length >= 12) return;
    if (!isANumActive && bNum.length >= 12) return;


    if (isNewCalc && aNum !== '') {
      result.textContent = '';
      aNum = '';
      bNum = '';
      isANumActive = true;
      isNewCalc = false;
      lastBNum = '';
      LastO = '';
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

      result.textContent = aNum;
      
    } else if (!isANumActive) {
        if (e.target.value === '.' && bNum.includes('.')) return;

        if (bNum === '0' && e.target.value === '0') return;

        if (bNum === '' && e.target.value === '.') {
          bNum = '0';
          result.textContent += bNum;
        }

        bNum += e.target.value;
        result.textContent = bNum;
        isOActive = false;
    }
  });
});

operators.forEach(operator => {
  operator.addEventListener('click', (e) => {
    isNewCalc = false;
    lastBNum = '';
    LastO = '';
    
    if (aNum === 'Error') return;

    if (isANumActive && isOActive && aNum === '') {
      aNum = '0';
      isANumActive = false;
      o = e.target.value;
      input.textContent += aNum + ' ' + ' ' + e.target.textContent;
    }
    
    else if (isANumActive && isOActive) {
      isANumActive = false;
      o = e.target.value;
      input.textContent += aNum + ' ' + ' ' + e.target.textContent;
    }
    
    else if (!isANumActive && o !== '' && isOActive) {
      input.textContent = aNum + e.target.textContent;
      o = e.target.value;
    }
    
    else if (!isANumActive && bNum !== '') {
      let r = Math.round(operate(+aNum, +bNum, o) * 10000000000) / 10000000000;
      if (!isFinite(r)) r = 'Error';
      o = e.target.value;
      aNum = String(r);
      bNum = '';
      input.textContent = aNum + e.target.textContent;
      isOActive = true;
    }
  });
});

equal.addEventListener('click', () => {

  if (bNum !== '') {
    let r = Math.round(operate(+aNum, +bNum, o) * 10000000000) / 10000000000;
    if (!isFinite(r)) r = 'Error';
    result.textContent = r;
    input.textContent += ' ' + bNum + ' ' + '=';
    aNum = String(r);
    lastBNum = bNum;
    LastO = o;
    bNum = '';
    isANumActive = true;
    o = '';
    isOActive = true;
    isNewCalc = true;
  }

  else if (lastBNum !== '' && LastO !== '' && aNum !== '' && aNum !== 'Error') {
    let r = Math.round(operate(+aNum, +lastBNum, LastO) * 10000000000) / 10000000000;
    if (!isFinite(r)) r = 'Error';
    result.textContent = r;
    aNum = String(r);
    isNewCalc = true;
  }
});

clear.addEventListener('click', () => {
  result.textContent = '0';
  aNum = '';
  bNum = '';
  isANumActive = true;
  o = '';
  isOActive = true;
  isNewCalc = true;
  lastBNum = '';
  LastO = '';
});

del.addEventListener('click', () => {
  if (isNewCalc || aNum === 'Error') return;

  if (bNum !== '') {
    bNum = bNum.slice(0, -1);
    result.textContent = result.textContent.slice(0, -1);
  }
  
  else if (o !== '') {
    o = '';
    isANumActive = true;
    isOActive = true;
    result.textContent = result.textContent.slice(0, -1);
  }
  
  else if (isANumActive) {
    aNum = aNum.slice(0, -1);
    result.textContent = result.textContent.slice(0, -1);
    if (result.textContent === '') result.textContent = '0';
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
    result.textContent = aNum;
  }
  
  else if (!isANumActive && bNum !== '') {
    bNum = bNum.startsWith('-') ? bNum.slice(1) : '-' + bNum;
    result.textContent = aNum + o + bNum;
  }
});

document.querySelectorAll('button').forEach(button => {
  button.addEventListener('focus', () => {
    button.blur();
  })
});