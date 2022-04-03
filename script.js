
// creating the Calculator class
class Calculator {
    // giving the class the locations (elements) to store its operations
    constructor(previousOperandTextElement, currentOperandTextElement) {
      this.previousOperandTextElement = previousOperandTextElement
      this.currentOperandTextElement = currentOperandTextElement
      /* calling the clear function when a Calculator instance is created
      to ensure that all inputs are set to default*/
      this.clear()
    }
  
    // function to clear calcultor screen as well as operation
    clear() {
      this.currentOperand = ''
      this.previousOperand = ''
      this.operation = undefined
    }
  
    // function to delete last number from current operand using string slicing
    delete() {
        this.currentOperand = this.currentOperand.toString().slice(0, -1)
    }
  
    appendNumber(number) {
        // checking to ensure you cant append two periods 
        if (number === '.' && this.currentOperand.includes('.')) return
        /* appending the number the user clicked on to the current operand
        they are changed to strings to ensure the numbers are appended and not added */
        this.currentOperand = this.currentOperand.toString() + number.toString()
    }
  
    chooseOperation(operation) {
        // if the current operand is empty, choosing an operation will not do anything
        if (this.currentOperand === '') return
        // if both the current and previous operand are both empty, call the compute function
        if (this.previousOperand !== '') {
            this.compute()
        }
        // setting the operation 
        this.operation = operation
        // we are done with writing up the current operand, so move it to the previous
        this.previousOperand = this.currentOperand
        // clear current operand in order to write next number
        this.currentOperand = ''

    }
  
    compute() {
        // creating a variable that will store the result of the compute function
        let computation
        // creating a number version of the previous operand
        const prev = parseFloat(this.previousOperand)
        // creating a number version of the current operand
        const current = parseFloat(this.currentOperand)
        // return if there are no prev or current operands
        if (isNaN(prev) || isNaN(current)) return
        // switch operation to compute depending on the operation
        switch (this.operation) {
            case '+':
                computation = prev + current
                break
            case '-':
                computation = prev - current
                break
            case '*':
                computation = prev * current
                break
            case '÷':
                computation = prev / current
                break
            default:
                return
        }

        // setting the current operand to our computed result
        this.currentOperand = computation
        // setting the operation to undefined
        this.operation = undefined
        // clearing previous operaand
        this.previousOperand = ''

    }

    // function to add commas to the number passed to it
    getDisplayNumber(number) {
        // string number to split string into decimal and integer
        const stringNumber = number.toString()
        // getting integer portion of number
        const integerDigits = parseFloat(stringNumber.split('.')[0])
        // getting decimal portion of number
        const decimalDigits = stringNumber.split('.')[1]
        // creating a variable that will store the integer display of the number
        let integerDisplay
        if (isNaN(integerDigits)) {
            // integer display empty when there is no integer inputted by user
            integerDisplay = ''
        } else {
            // integer value inputted, english commas added to integer number with no decimal places
            integerDisplay = integerDigits.toLocaleString('en', {maximumFractionDigits: 0})
        }
        if (decimalDigits != null) {
            // add decimals to the integer if decimal digits exist
            return `${integerDisplay}.${decimalDigits}`
        } else {
            // if decimal digits dont exist, just return integer number
            return integerDisplay
        }
    }
  
  
    updateDisplay() {
      this.currentOperandTextElement.innerText = this.getDisplayNumber(this.currentOperand)
      // adding the operation to the previous opperand
      if (this.operation != null) {
            // concatenating the operation to the previous operation if there is an operation
            this.previousOperandTextElement.innerText = `${this.getDisplayNumber(this.previousOperand)} ${this.operation}`
        } else {
            // if no operation exists, clear previous operand
            this.previousOperandTextElement.innerText = ''
        }
    }
  }


// extracting all the calculator button elements using the data attributes assigned in HTML
const numberButtons = document.querySelectorAll('[data-number]')
const operationButtons = document.querySelectorAll('[data-operation]')
const equalsButton = document.querySelector('[data-equals]')
const deleteButton = document.querySelector('[data-delete]')
const allClearButton = document.querySelector('[data-all-clear]')
// extracing the calculator screen text elements using data attributes assigned in HTML
const previousOperandTextElement = document.querySelector('[data-previous-operand]')
const currentOperandTextElement = document.querySelector('[data-current-operand]')

// creating a new instance of the 'Calculator' class
const calculator = new Calculator(previousOperandTextElement, currentOperandTextElement)

// looping over all number buttons and adding an event listener (click) to each one
numberButtons.forEach(button => {
  button.addEventListener('click', () => {
    // calling the appendNumber function and passing the text in the button element
    calculator.appendNumber(button.innerText)
    // calling the updateDisplay function to update the display
    calculator.updateDisplay()
  })
})

// looping over all operation buttons and adding an event listener (click) to each one
operationButtons.forEach(button => {
    button.addEventListener('click', () => {
      // calling the chooseOperation function and passing in the operation
      calculator.chooseOperation(button.innerText)
      // calling the updateDisplay function to update the display
      calculator.updateDisplay()
    })
  })

// adding a click event listener to the equals button
equalsButton.addEventListener('click', button => {
    // calling compute function
    calculator.compute()
    // calling the updateDiplay function
    calculator.updateDisplay()
})

// adding a click event listener to the all clear button
allClearButton.addEventListener('click', button => {
    // calling the clear function
    calculator.clear()
    // calling the updateDisplay function
    calculator.updateDisplay()
})

// adding a click event listener to the delete button
deleteButton.addEventListener('click', button => {
    // calling the delete function
    calculator.delete()
    // calling the updateDisplat function
    calculator.updateDisplay()
})


