const action = {
  add: function add(a, b) {
    return a + b
  },
    subtract: function subtract(a, b) {
    return a - b
  },
    multiply: function multiply(a, b) {
    return a * b;
  },
    divide: function divide(a, b) {
    return a / b;
  }
} 
console.log(action.add);

module.export = {action} ;






