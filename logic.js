var Calculator = /** @class */ (function () {
    function Calculator() {
    }
    Calculator.prototype.evaluate = function (expression) {
        try {
            // Basic sanitization: remove any characters that are not digits, operators, or parentheses
            var sanitizedExpression = expression.replace(/[^-().\d/*+]/g, '');
            // Using eval for simplicity, but generally not recommended for production
            // due to security risks with untrusted input. For this specific task and context,
            // with basic sanitization, it serves the purpose.
            var result = eval(sanitizedExpression);
            if (isNaN(result) || !isFinite(result)) {
                return "Error";
            }
            return result;
        }
        catch (e) {
            return "Error";
        }
    };
    return Calculator;
}());
// Expose the calculate function globally on the window object
var calculator = new Calculator();
window.calculate = function (expression) { return calculator.evaluate(expression); };
