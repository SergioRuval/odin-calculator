const calcButtons = document.querySelectorAll(".calcButton");
const numberButtons = document.querySelectorAll(".calcNumber");
const opButtons = document.querySelectorAll(".calcOp");
const calcDisplay = document.querySelector("#operationDisplay>h3");
const clearAllButton = document.querySelector("#clearAll");

calcButtons.forEach(button => {
    button.addEventListener('mouseenter', e => {
        e.target.classList.add("buttonHover");
    });
    button.addEventListener('mouseleave', e => {
        e.target.classList.remove("buttonHover");
    });
    button.addEventListener('mousedown', e => {
        e.target.classList.add("buttonPressed");
    });
    button.addEventListener('mouseup', e => {
        e.target.classList.remove("buttonPressed");
    });
});

numberButtons.forEach(button => {
   button.addEventListener('click', e => {
        assignValues(e.target.textContent);
   });
});

opButtons.forEach(button => {
    button.addEventListener('click', e => {
        assignOperator(e.target.textContent);
    });
});

clearAllButton.addEventListener('click', clearInputs);

let numA = numB = op = undefined;

function add(a, b){
    return a + b;
}

function substract(a, b){
    return a - b;
}

function multiply(a, b){
    return a * b;
}

function divide(a, b){
    if(b === 0){
        return "ERROR - DIVIDE BY ZERO"
    }
    return a / b;
}

function operate(op, a, b){
    switch(op){
        case '+':
            return add(a, b);
        case '-':
            return substract(a, b);
        case 'x':
            return multiply(a, b);
        case '/':
            return divide(a, b);
    }
}

function assignValues(value){
    // If the second number has already been given, then we appen it's value
    if(numB !== undefined){
        numB += value;
        updateScreen();
        return;
    }
    
    // If the operator has already been given, and the second number hasn't, then we store it
    if(op !== undefined && numB === undefined){
        numB = value;
        updateScreen();
        return;
    }
    
    //If the first number has already been given, and the operator hasn't, then we append it's value
    if(numA !== undefined && op === undefined){
        numA += value;
        updateScreen();
        return;
    }
    
    // If the first number hasn't been given, then we can store it
    numA = value;
    updateScreen();
}

function assignOperator(operator){
    // The only thing we must check is if the button is the Equals
    if(operator === '='){
        // If all inputs were given, then we can operate
        if(isReadyToOperate()){
            getResult();
        }
        // In this case we should call the operate function
        return;
    }
    // If the first number has't already been given, then we can't store the operator
    if(numA === undefined){
        return;
    }

    // If the second number has already been given, we can't store the operator
    if(numB !== undefined){
        // But we can use the result to calculate the nex one
        getResult();
        op = operator;
        return;
    }

    // In any other case, we can store the operator
    // This includes the case where the operator must be replaced
    op = operator;
    updateScreen();
}

function updateScreen(){
    let displayText = "";

    // If the first number is not undefined, then we add it to the result
    if(numA !== undefined){
        displayText += numA + " ";
    }

    // If the operator is not undefined, then we add it to the result
    if(op !== undefined){
        displayText += op + " ";
    }

    // If the last number is not undefined, then we add it to the result
    if(numB !== undefined){
        displayText += numB;
    }

    calcDisplay.textContent = displayText;
}

function getResult(){
    let result = operate(op, Number.parseInt(numA), Number.parseInt(numB));
    numA = result;
    numB = undefined;
    showResult(result);
}

function showResult(result){
    calcDisplay.textContent = result;
}

function isReadyToOperate(){
    return (numA !== undefined && op !== undefined && numB !== undefined);
}

function clearInputs(e){
    numA = undefined;
    op = undefined;
    numB = undefined;
    updateScreen();
}