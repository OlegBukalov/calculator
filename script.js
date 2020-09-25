let numbers = document.querySelectorAll('.number'),
    operations = document.querySelectorAll('.operator'),
    decimalBtn = document.getElementById('decimal'),
    clearBtns = document.querySelectorAll('.clear-btn'),
    resultBtn = document.getElementById('result'),
    display = document.getElementById('display'),
    sqrBtn = document.getElementById('sqr'),
    sqrtBtn = document.getElementById('sqrt'),
    delBtn = document.getElementById('del'),
    minusBtn = document.getElementById('minus'),
    currentNumber = 0,
    newNumber = false,
    currentOperation = '',
    sqrSqrtNumber = false;

const numberPress = (number) => {
    if (sqrSqrtNumber) {
        display.value = '0';
        sqrSqrtNumber = false;
    }
    if (newNumber) {
        display.value = number;
        newNumber = false;
    } else {
        if (display.value === '0') {
            display.value = number;
        } else {
            display.value += number;
        }
    }
};

const operation = (oper) => {
    
    let displayNumber = parseFloat(display.value);
    sqrSqrtNumber = false;

    if (newNumber && currentOperation !== '=') {
        display.value = currentNumber;
        currentOperation = oper;
    } else {
        console.log(currentOperation+'else 1');
        if (currentOperation === '+') {
            currentNumber += displayNumber;
        } else if (currentOperation === '-') {
            currentNumber -= displayNumber;
        } else if (currentOperation === '*') {
            currentNumber *= displayNumber;
        } else if (currentOperation === '/') {
            currentNumber /= displayNumber;
        } else {
            currentNumber = displayNumber;
        }
        currentNumber = Math.round(currentNumber*10000)/10000; // решение проблемы с дробями  

        display.value = currentNumber;
        currentOperation = oper;
        newNumber = true;
    }

};

const decimal = () => {
    if (newNumber) {
        display.value = '0.';
        newNumber = false;
    } else {
        if (display.value.indexOf('.') === -1) {
            display.value += '.';
        }     
    }
};

const clear = (id) => {
    if (id === 'ce') {
        display.value = '0';
        newNumber = true;
    } else {
        display.value = '0';
        newNumber = true;
        currentNumber = 0;
        currentOperation = ';'
    }
};

const sqrFunction = () => {
    if (currentNumber === 0) {
        currentNumber = Math.pow(parseFloat(display.value), 2);
        display.value = currentNumber; 
    } else {
        display.value = Math.pow(parseFloat(display.value), 2);
        newNumber = false;
    }
    sqrSqrtNumber = true;
}

const sqrtFunction = () => {
    if (display.value.substring(0,1) === '-') {
        clear('c');
        window.alert('Нельзя извлечь квадратный корень из отрицательного числа');
        return
    }
    
    if (currentNumber === 0) {
        currentNumber = Math.sqrt(parseFloat(display.value));
        display.value = currentNumber; 
    } else {
        display.value = Math.sqrt(parseFloat(display.value));
        newNumber = false;
    }
    sqrSqrtNumber = true;
}

const delFunction = () => {
    if (display.value === '0') {
        return
    }
    
    let lengthValue = display.value.length;
    if (lengthValue === 1) {
        display.value = '0';
    } else {
        display.value = display.value.substring(0, lengthValue-1);
    }
}

const minusFunction = () => {
    if (display.value === '0') {
        return
    }
    if (display.value.substring(0,1) === '-') {
        display.value = display.value.substring(1);
    } else {
        display.value = '-'+display.value;
    }
}

for (let i = 0; i < numbers.length; i++) {
    let number = numbers[i];
    number.addEventListener('click', (e)=>{numberPress(e.target.textContent)});
}

for (let i = 0; i < operations.length; i++) {
    let operationBtn = operations[i];
    operationBtn.addEventListener('click', (e)=>{operation(e.target.textContent)});
}

for (let i = 0; i < clearBtns.length; i++) {
    let clearBtn = clearBtns[i];
    clearBtn.addEventListener('click', (e)=>{clear(e.target.id)});
}

decimalBtn.addEventListener('click', decimal);

sqrBtn.addEventListener('click', sqrFunction);

sqrtBtn.addEventListener('click', sqrtFunction);

delBtn.addEventListener('click', delFunction);

minusBtn.addEventListener('click', minusFunction);