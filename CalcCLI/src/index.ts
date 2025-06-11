#!/usr/bin/env node

const [op, ...nums] = process.argv.slice(2);
if (!op || nums.length < 2) {
  console.error("Usage: calc <add|sub|mul|div> <num1> <num2> [numN...]");
  process.exit(1);
}

const numbers = nums.map(Number);
if (numbers.some(isNaN)) {
  console.error("Tutti gli argomenti dopo l’operatore devono essere numeri.");
  process.exit(1);
}

let result: number;
switch (op) {
  case "add":
    result = numbers.reduce((a, b) => a + b);
    break;
  case "sub":
    result = numbers.reduce((a, b) => a - b);
    break;
  case "mul":
    result = numbers.reduce((a, b) => a * b);
    break;
  case "div":
    result = numbers.reduce((a, b) => a / b);
    break;
  default:
    console.error(`Operatore "${op}" non supportato.`);
    process.exit(1);
}

console.log(`Risultato: ${result}`);
