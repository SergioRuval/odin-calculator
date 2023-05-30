const calcButtons = document.querySelectorAll(".calcButton");

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

let numA = numB = operator = undefined;

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
        case '*':
            return multiply(a, b);
        case '/':
            return divide(a, b);
    }
}