const fs = require('fs');
const rows = fs.readFileSync('input.txt').toString().split('\n');

// Task 1
const operators = ["+", "*"];
// Task 2
// const operators = ["+", "*", "||"];

function task() {
    let sum =  0;

    rows.forEach(row => {
        const [expectedResult, expression] = row.split(":").map((part) => part.trim());
        const expected = parseInt(expectedResult, 10);
        const numbers = expression.split(" ").map(Number);

        const allCombinations = generateOperatorCombinations(numbers.length - 1);

        for (const combination of allCombinations) {
            const expr = buildExpression(numbers, combination);
            const result = evaluateExpression(expr);
            if (result === expected) {
                sum += result;
                return true;
            }
        }
        return false;
    });

    console.log(`Result of Challenge: ${sum}`);
}

function generateOperatorCombinations(slots) {
    if (slots === 0) return [[]];
    const combinations = [];
    const smallerCombinations = generateOperatorCombinations(slots - 1);
    for (const smaller of smallerCombinations) {
        for (const operator of operators) {
            combinations.push([...smaller, operator]);
        }
    }
    return combinations;
}

function buildExpression(numbers, operators) {
    let expression = "";
    for (let i = 0; i < numbers.length; i++) {
        expression += numbers[i];
        if (i < operators.length) {
            expression += ` ${operators[i]} `;
        }
    }
    return expression;
}

function evaluateExpression(expression) {
    const tokens = expression.split(" ");
    let result = parseInt(tokens[0], 10);

    for (let i = 1; i < tokens.length; i += 2) {
        const operator = tokens[i];
        const nextNumber = parseInt(tokens[i + 1], 10);
        if (operator === "+") {
            result += nextNumber;
        } else if (operator === "*") {
            result *= nextNumber;
        } else if (operator === "||") {
            result = parseInt(result.toString() + nextNumber.toString());
        }
    }
    return result;
}

task();