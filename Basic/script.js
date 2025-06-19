const display = document.getElementById('display');
const buttons = document.querySelectorAll('.btn');

let currentInput = '';

buttons.forEach(button => {
  button.addEventListener('click', () => {
    const value = button.textContent;

    if (value === '=') {
      try {
        currentInput = eval(currentInput).toString();
      } catch (e) {
        currentInput = 'Error';
      }
    } else if (value === 'C') {
      currentInput = '';
    } else {
      currentInput += value;
    }

    display.value = currentInput;
  });
});
