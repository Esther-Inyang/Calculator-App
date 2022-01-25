//========Selecting Elements=========//
const previousCalc = document.querySelector('[data-previous-calc]');
const currentCalc = document.querySelector('[data-current-calc]');
const numberBtn = document.querySelectorAll('[data-number]');
const operationBtn = document.querySelectorAll('[data-operation]');
const clearBtn = document.querySelector('[data-clear]');
const deleteBtn = document.querySelector('[data-delete]');
const equalsBtn = document.querySelector('[data-equals]');

//Constructor that will take all the inputs and functions of our calculator

class Calculator{
    constructor(previousCalculation,currentCalculation){
        this.previousCalculation = previousCalculation;
        this.currentCalculation = currentCalculation;
        //as soon as the calculator is called clear all data
        this.clear();
    }

    clear(){
        this.prevCalc = '';
        this.currCalc = '';
        this.operation = undefined;
    }

    delete(){
        //convert to string, then get the last value and cut it off
        this.currCalc = this.currCalc.toString().slice(0, -1) //0 to -1 means take all the numbers from position 0 to 'SECOND TO LAST' number
    }

    appendNumber(number){
        //to prevent the dot . symbol from displaying more than once
        if(number === '.' && this.currCalc.includes('.')){
            return;
        }

        //to display each number that is clicked
        this.currCalc = this.currCalc.toString() + number.toString(); //number = button.innerText

    }

    chooseOperation(operation){
        //to prevent the OPERATIONS from clearing the previous value
        if(this.currCalc === ''){
            return;
        }

        //If Previous calc is NOT empty, still perform the computation
        if(this.prevCalc !== ''){
            //Will update the previous to current value typed and append the operator
            this.compute();
        }

        this.operation = operation;
        this.prevCalc = this.currCalc;
        this.currCalc = '';
    }

    compute(){
        //result of the compute function
        let computation;
        
        const prev = parseFloat(this.prevCalc) //converting the strings to number
        const current = parseFloat(this.currCalc)

        //if no prev or current values but user clicks EQUALS, don't run.
        if(isNaN(prev) || isNaN(current)){
            return;
        }

        //check and calculate according to operator clicked
        switch(this.operation){
            case '+':
                computation = prev + current;
                break;
            case '-':
                computation = prev - current;
                break;
            case '*':
                computation = prev * current;
                break;
            case '÷':
                computation = prev / current;
                break;
            default:
                return;
        }

        //computing and clearing values
        this.currCalc = computation;
        this.operation = undefined;
        this.prevCalc = ''
    }

    //any changes made will display on both the previous and current
    getDisplayNumber(number){
        //to not affect the dot . and 0 
        const stringNumber = number.toString()
        //Now split the number into INTEGER and DECIMAL PLACE
        //Integer = numbers before the decimal point (.)
        const integerDigits = parseFloat(stringNumber.split('.')[0])
       
        //numbers after the decimal point (.)
        const decimalDigits = stringNumber.split('.')[1];

        //
        let integerDisplay;

        //if there is nothing on the display or it is just dot .
        if(isNaN(integerDigits)){
            integerDisplay = ''
        }else{
            //if there is actually a value on the screen apart from dot .
            integerDisplay = integerDigits.toLocaleString('en', {
                maximumFractionDigits: 0
            }) //meaning-there can never be any decimal places after this value
        }
        
        //if decimal digit is not equal to null that means the user did click dot . and has some values after it
        if(decimalDigits != null){
            return `${integerDisplay}.${decimalDigits}`;
        }else{
            return integerDisplay
        }

        //to add comma, to longer numbers typed
        return floatNumber.toLocaleString('en')
    }

    updateResult(){
        //show all CURRENT values clicked and the calulation values
        this.currentCalculation.innerText = this.getDisplayNumber(this.currCalc)//this.currCalc; //i.e button.innerText

        //updating PREVIOUS calc if it is not empty
        if(this.operation != null){
            this.previousCalculation.innerText = `${this.getDisplayNumber(this.prevCalc)} ${this.operation}` //this.prevCalc; add operation to the end of it
        }else{
            this.previousCalculation.innerText = '';
        }
    }
}

//==========steps============//

//create a new calculator
const calculator = new Calculator(previousCalc,currentCalc)

//what happens when a NUMBER button is clicked
numberBtn.forEach((button) => {
    button.addEventListener('click', ()=>{
        calculator.appendNumber(button.innerText)
        calculator.updateResult()
    })
})

//what happens when an OPERATION button is clicked
operationBtn.forEach((button) => {
    button.addEventListener('click', ()=>{
        calculator.chooseOperation(button.innerText)
        calculator.updateResult()
    })
})

equalsBtn.addEventListener('click', () => {
    calculator.compute();
    calculator.updateResult();
})

clearBtn.addEventListener('click', () => {
    calculator.clear();
    calculator.updateResult();
})

deleteBtn.addEventListener('click', () => {
    calculator.delete();
    calculator.updateResult();
})





