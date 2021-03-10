const displayDate = document.querySelector("#date").children[0];
const displayTime = document.querySelector("#hour").children[0];
const display = document.querySelector("#display").children[0];
const buttons = document.querySelector("#buttons");

const Calculator = {
  
  numbers: [],
  operator: [],
  sizeArrays: [],

  addKeyPress(number) {
    numberActive = this.numbers[0];

    if (Calculator.operator.length === 0 && this.sizeArrays.length <= 10) {
      if (this.numbers.length === 0 && number !== ".") {
        this.numbers.push(number);
        DOM.addToDisplay(number);

        return;
      }
  
      if (this.numbers.length >= 1 && this.sizeArrays.length <= 10) {
        newNumber = numberActive + number;
        this.numbers.pop();
        this.numbers.push(newNumber);

        DOM.addToDisplay(newNumber);

        return;
      }
    }

    if (Calculator.operator.length === 1) {
      if (this.numbers.length === 1) {
        this.numbers.push(number);
        newContent = `${this.numbers[0]} ${this.operator} ${this.numbers[1]}`;
        
        DOM.addToDisplay(newContent);
        return;
      }

      if (this.numbers.length === 2) {
        newNumber = this.numbers[1] + number;

        this.numbers.pop(this.numbers[1]);
        this.numbers.push(newNumber);
        newContent = `${this.numbers[0]} ${this.operator} ${this.numbers[1]}`;
        
        DOM.addToDisplay(newContent);
      }
    }
  },

  addOperator(operator) {

    if (this.numbers.length >= 1 && this.numbers[0] != ".") {
      if (this.operator.length === 0 && this.sizeArrays.length <= 10 && this.numbers.length > 0) {
        this.operator.push(operator);
        this.sizeArrays.push(operator);
        display.innerHTML = this.numbers[0] + this.operator[0];
      }
    }

  },

  calc() {
    const numberOne = Number(this.numbers[0]);
    const numberTwo = Number(this.numbers[1]);
    const operator = this.operator[0];

    const handlers = {
      ' + ': (num1, num2) => num1 + num2,
      ' - ': (num1, num2) => num1 - num2,
      ' * ': (num1, num2) => num1 * num2,
      ' ÷ ': (num1, num2) => num1 / num2,
      ' % ': (num1, num2) => (num2 * num1) / 100,
    }

    const calculate = handlers[operator]

    if (calculate && this.numbers[1]) {
      const result = calculate(numberOne, numberTwo)
      console.log(this.numbers[1])
      DOM.clearAll();
      this.numbers.push(String(Math.floor(result)));
      display.innerHTML = Math.floor(result);
    }
  }
}

const DOM = {
  
  addListenerButtons() {
    for(button of buttons.children) {   
      button.addEventListener('click', DOM.pickUpKey);
      button.style.cursor = "pointer"
    }
  },

  pickUpKey(event) {
    const key = event.target.classList[0].split("btn-");
    key.splice(key[0], 1);
    const valueKey = key[0];

    DOM.validateKey(valueKey);
  },

  addToDisplay(number){
    if (Calculator.sizeArrays.length <= 10) {
      display.innerHTML = number;
    }
    
    Calculator.sizeArrays.push(number);
  },

  validateKey(keyPress) {

    switch (keyPress) {
      case 'ac':
        DOM.clearAll();
      break;
      case 'ce':
        DOM.clearEntry();
      break;

      case '1':
      case '2':
      case '3':
      case '4':
      case '5':
      case '6':
      case '7':
      case '8':
      case '9':
      case '0':
        Calculator.addKeyPress(keyPress);
      break;

      case 'adicao':
        Calculator.addOperator(' + ');
      break;
      case 'subtracao':
        Calculator.addOperator(' - ');
      break;
      case 'multiplicacao':
        Calculator.addOperator(' * ');
      break;
      case 'divisao':
        Calculator.addOperator(' ÷ ');
      break;
      case 'porcento':
        Calculator.addOperator(' % ');
      break;
      case 'ponto':
        Calculator.addKeyPress('.')
      break;
      case 'igual':
        Calculator.calc();
      break;
      
      default: "default";
    }
  },

  clearAll() {
    display.innerHTML = "";
    Calculator.numbers.length = 0;
    Calculator.sizeArrays.length = 0;
    Calculator.operator.pop();

    App.reload();
  },

  clearEntry() {
    if (this.operator.length >= 1) {
      Calculator.numbers.length = 1;
      display.innerHTML = "";
      display.innerHTML += Calculator.numbers;
      display.innerHTML += Calculator.operator;
    }

    console.log(Calculator.numbers);
  }
}

const App = {

  init() {
    DOM.addListenerButtons();
    App.setDateHours();

    setInterval(() => {
      App.setDateHours();
    }, 1000);
  },

  reload() {
    App.init();
  },

  setDateHours() {
    const date = new Date;
    const dateCurrent = date.toLocaleDateString('pt-br', { year: 'numeric', month: 'long', day: 'numeric' });
    const timeCurrent = date.toLocaleTimeString('pt-br');
    displayDate.innerHTML = dateCurrent;
    displayTime.innerHTML = timeCurrent;
  },

}

App.init();