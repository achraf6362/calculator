const display = document.querySelector('#display');
const equal = document.querySelector('#equal');
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

