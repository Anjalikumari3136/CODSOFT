document.addEventListener('DOMContentLoaded', function() {
    const display = document.getElementById('display');
    const buttons = document.querySelectorAll('.btn');
    const clearButton = document.getElementById('clear');
    const equalsButton = document.getElementById('equals');
    
    let currentInput = '';
    let operator = '';
    let firstValue = '';
    let secondValue = '';
    let resultDisplayed = false;

    buttons.forEach(button => {
        button.addEventListener('click', function() {
            const value = this.getAttribute('data-value');
            
            if (resultDisplayed && !['+', '-', '*', '/'].includes(value)) {
                currentInput = '';
                resultDisplayed = false;
            }
            
            if (['+', '-', '*', '/'].includes(value)) {
                if (firstValue === '') {
                    firstValue = currentInput;
                } else if (currentInput !== '') {
                    secondValue = currentInput;
                    firstValue = operate(firstValue, secondValue, operator);
                    display.innerText = firstValue;
                }
                operator = value;
                currentInput = '';
            } else {
                currentInput += value;
            }
            display.innerText = currentInput || firstValue || '0';
        });
    });

    clearButton.addEventListener('click', function() {
        currentInput = '';
        operator = '';
        firstValue = '';
        secondValue = '';
        display.innerText = '0';
    });

    equalsButton.addEventListener('click', function() {
        if (operator && firstValue && currentInput) {
            secondValue = currentInput;
            let result = operate(firstValue, secondValue, operator);
            display.innerText = result;
            currentInput = result;
            operator = '';
            firstValue = '';
            secondValue = '';
            resultDisplayed = true;
        }
    });

    function operate(first, second, op) {
        let result = '';
        switch (op) {
            case '+':
                result = parseFloat(first) + parseFloat(second);
                break;
            case '-':
                result = parseFloat(first) - parseFloat(second);
                break;
            case '*':
                result = parseFloat(first) * parseFloat(second);
                break;
            case '/':
                result = parseFloat(first) / parseFloat(second);
                break;
        }
        return result;
    }
});
