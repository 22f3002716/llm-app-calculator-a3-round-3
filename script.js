document.addEventListener('DOMContentLoaded', () => {
    const display = document.getElementById('result');
    const calculatorKeys = document.querySelector('.calculator-keys');

    let displayValue = '0';
    let firstOperand = null;
    let operator = null;
    let waitingForSecondOperand = false;

    function updateDisplay() {
        display.textContent = displayValue;
    }

    function clear() {
        displayValue = '0';
        firstOperand = null;
        operator = null;
        waitingForSecondOperand = false;
        updateDisplay();
    }

    function inputDigit(digit) {
        if (waitingForSecondOperand === true) {
            displayValue = digit;
            waitingForSecondOperand = false;
        } else {
            // Prevent multiple leading zeros unless it's "0."
            if (displayValue === '0' && digit !== '.') {
                displayValue = digit;
            } else {
                displayValue += digit;
            }
        }
        updateDisplay();
    }

    function inputDecimal() {
        if (waitingForSecondOperand === true) {
            displayValue = '0.';
            waitingForSecondOperand = false;
            updateDisplay();
            return;
        }

        if (!displayValue.includes('.')) {
            displayValue += '.';
        }
        updateDisplay();
    }

    const performCalculation = {
        '/': (first, second) => first / second,
        '*': (first, second) => first * second,
        '+': (first, second) => first + second,
        '-': (first, second) => first - second,
    };

    function handleOperator(nextOperator) {
        const inputValue = parseFloat(displayValue);

        if (operator && waitingForSecondOperand) {
            // Allows changing operator before entering second operand
            operator = nextOperator;
            return;
        }

        if (firstOperand === null && !isNaN(inputValue)) {
            firstOperand = inputValue;
        } else if (operator) {
            const result = performCalculation[operator](firstOperand, inputValue);
            displayValue = String(parseFloat(result.toFixed(7))); // Limit precision for display
            firstOperand = result;

            if (isNaN(firstOperand)) {
                // Handle division by zero or other invalid operations that result in NaN
                displayValue = 'Error';
                firstOperand = null;
                operator = null;
                waitingForSecondOperand = true;
                updateDisplay();
                return;
            }
        }

        waitingForSecondOperand = true;
        operator = nextOperator;
        updateDisplay(); // Update display if calculation occurred or for consistency
    }

    function handleEquals() {
        if (firstOperand === null || operator === null || waitingForSecondOperand) {
            // Nothing to calculate or waiting for second operand
            return;
        }

        const inputValue = parseFloat(displayValue);
        const result = performCalculation[operator](firstOperand, inputValue);

        displayValue = String(parseFloat(result.toFixed(7))); // Limit precision
        firstOperand = null;
        operator = null;
        waitingForSecondOperand = true; // Next input starts fresh
        updateDisplay();
    }

    function handleSquareRoot() {
        const inputValue = parseFloat(displayValue);
        if (isNaN(inputValue)) {
            displayValue = 'Error';
        } else if (inputValue < 0) {
            displayValue = 'Error'; // Cannot take square root of negative numbers in real numbers
        } else {
            const result = Math.sqrt(inputValue);
            displayValue = String(parseFloat(result.toFixed(7))); // Limit precision
        }
        firstOperand = null; // Reset operands for unary operation
        operator = null;
        waitingForSecondOperand = true;
        updateDisplay();
    }

    calculatorKeys.addEventListener('click', (event) => {
        const { target } = event;
        const { action } = target.dataset;

        if (!target.matches('button')) {
            return;
        }

        if (action === 'number') {
            inputDigit(target.textContent);
        } else if (action === 'decimal') {
            inputDecimal();
        } else if (['add', 'subtract', 'multiply', 'divide'].includes(action)) {
            handleOperator(target.textContent);
        } else if (action === 'calculate') {
            handleEquals();
        } else if (action === 'clear') {
            clear();
        } else if (action === 'sqrt') {
            handleSquareRoot();
        }
    });

    // Initialize display
    updateDisplay();
});
