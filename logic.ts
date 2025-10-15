class Calculator {
    evaluate(expression: string): number | string {
        try {
            // Basic sanitization: remove any characters that are not digits, operators, or parentheses
            const sanitizedExpression = expression.replace(/[^-().\d/*+]/g, '');
            
            // Using eval for simplicity, but generally not recommended for production
            // due to security risks with untrusted input. For this specific task and context,
            // with basic sanitization, it serves the purpose.
            const result = eval(sanitizedExpression);

            if (isNaN(result) || !isFinite(result)) {
                return "Error";
            }
            return result;
        } catch (e) {
            return "Error";
        }
    }
}

// Expose the calculate function globally on the window object
declare global {
    interface Window {
        calculate: (expression: string) => number | string;
    }
}

const calculator = new Calculator();
window.calculate = (expression: string) => calculator.evaluate(expression);
