// Работа с версткой и стилями
const canvas = document.querySelector('#canvas');
const ctx = canvas.getContext('2d');
canvas.style.borderRadius = '15px';

const numberField = document.querySelector('.numberField');
numberField.style.backgroundColor = 'green';
numberField.style.boxShadow = '10px 10px 10px #000000';
numberField.style.borderRadius = '30px';
numberField.style.padding = '30px';
numberField.style.display = 'flex';
numberField.style.position = 'relative';
numberField.style.justifyContent = 'center';
numberField.style.alignItems = 'center';

const alertDiv = document.createElement('div');
alertDiv.style.position = 'absolute';
alertDiv.style.textAlign = 'center';
alertDiv.style.backgroundColor = 'silver';
alertDiv.style.margin = '0 5px 0 5px';
alertDiv.style.fontFamily = 'Comic Sans MS';
alertDiv.style.display = 'none';
const h1Win = document.createElement('h1');
h1Win.innerHTML = 'Поздравляем! Вам удалось собрать пятнашки за <span id="counter"></span><span id = "steps"></span>';
alertDiv.append(h1Win);
numberField.append(alertDiv);

const counter = document.querySelector('#counter');
const steps = document.querySelector('#steps');

const gameField = document.querySelector('.gameField');
gameField.style.backgroundColor = '#7dd156';
gameField.style.Width = '50%';
gameField.style.display = 'flex';


const stepInfo = document.createElement('div');
stepInfo.style.textAlign = 'center';
stepInfo.style.padding = '10px';
const h1 = document.createElement('h1');
const span = document.createElement('span');
span.style.display = 'block';
h1.textContent = 'Число ходов';
span.textContent = '0';
span.style.fontSize = '2em';
stepInfo.append(h1, span);
gameField.append(stepInfo);

const button = document.createElement('button');
button.textContent ='Запутать';
button.style.backgroundColor = 'silver';
button.style.fontSize = '2em';
button.style.padding = '10px';
button.style.marginTop = '240px';
button.style.alignSelf = 'flex-end';
button.style.boxShadow = '10px 10px 10px #000000';
button.style.display ='inline-block';
stepInfo.append(button);

//создаем массив и заполняем его, чтобы нулевой элемент был со значением 1, а последний 0
const arr = new Array(16);
function completionArray(){
    for(let i = 0; i < 15; i++){
        arr[i] = i + 1;
    }
    arr[15] = 0;
}
completionArray();

// переменная счетчик для спана
let stepCounter = 0;
// рандомное перемешивание массива
function shuffleTheSquare(){
    let clickPos;
    for(let i = 0; i < 5000; i++){
        clickPos = Math.floor(Math.random() * 16);
        stap(clickPos);
    }
    stepCounter = span.textContent = 0;
    drowAllSquare();
}

function stap(clickPos){
    if(arr[clickPos - 4] == 0){
        replaceSquare(clickPos - 4, clickPos);
    }
    if(clickPos != 0 && clickPos != 4 && clickPos != 8 && clickPos != 12 && arr[clickPos - 1] == 0){
        replaceSquare(clickPos - 1, clickPos);
    }
    if(arr[clickPos + 4] == 0){
        replaceSquare(clickPos + 4, clickPos);
    }
    if(clickPos != 3 && clickPos != 7 && clickPos != 11 && clickPos != 15 && arr[clickPos + 1] == 0){
        replaceSquare(clickPos + 1, clickPos);
    }
}

// функция замены положения полей с последующей перерисовкой
function replaceSquare(element1, element2){
    span.textContent = ++stepCounter;
    arr[element1] = arr[element2];
    arr[element2] = 0;
    drowAllSquare();  
}

// для перемешивания вручную
function noShuffleTheSquare(){
    completionArray();
    drowAllSquare();
}
// отрисовка одного поля
function drowSquare(x, y, value){
    ctx.fillStyle = 'black';
    ctx.fillRect(x, y, 100, 100);

    if(value == 0){
        ctx.fillStyle = 'white';
    } else{
        ctx.fillStyle = 'teal';
    }
    ctx.fillRect(x + 5, y + 5, 90, 90);

    ctx.font = '60px Comic Sans MS';
    ctx.fillStyle = 'white';
    if(value < 10){
        ctx.fillText(value, x + 35, y + 70);
    }else{
        ctx.fillText(value, x + 18, y + 70);
    }
}
// отрисовка поля в зависимости от его позиции
function drowSquareWithPosition(position, value){
    switch(position){
        case 0:
            drowSquare(0, 0, value);
            break;
        case 1:
            drowSquare(100, 0, value);
            break;
        case 2:
            drowSquare(200, 0, value);
            break;
        case 3:
            drowSquare(300, 0, value);
            break;
        case 4:
            drowSquare(0, 100, value);
            break;
        case 5:
            drowSquare(100, 100, value);
            break;
        case 6:
            drowSquare(200, 100, value);
            break;
        case 7:
            drowSquare(300, 100, value);
            break;
        case 8:
            drowSquare(0, 200, value);
            break;
        case 9:
            drowSquare(100, 200, value);
            break;
        case 10:
            drowSquare(200, 200, value);
            break;
        case 11:
            drowSquare(300, 200, value);
            break;
        case 12:
            drowSquare(0, 300, value);
            break;
        case 13:
            drowSquare(100, 300, value);
            break;
        case 14:
            drowSquare(200, 300, value);
            break;
        case 15:
            drowSquare(300, 300, value);
            break;
    }
}
// отрисовка всех полей по их позициям
function drowAllSquare(){
    for(let i = 0; i < 16; i++){
        drowSquareWithPosition(i, arr[i]);
    }
}
// возврат позиций либо по горизонтали либо по вертикали, по которым был совершен клик мыши
function positionXY(coordinate){
    if(coordinate >= 13 + 30 && coordinate <= 103 + 30){
        return 1;
    }
    if(coordinate >= 113 + 30 && coordinate <= 203 + 30){
        return 2;
    }
    if(coordinate >= 213 + 30 && coordinate <= 303 + 30){
        return 3;
    }
    if(coordinate >= 313 + 30 && coordinate <= 403 + 30){
        return 4;
    }
}
// возврат абсолютной позиции в поле от 0 до 15
function clickPosition(xPos, yPos){
    if(xPos == 1 && yPos == 1){
        return 0;
    }
    if(xPos == 2 && yPos == 1){
        return 1;
    }
    if(xPos == 3 && yPos == 1){
        return 2;
    }
    if(xPos == 4 && yPos == 1){
        return 3;
    }
    if(xPos == 1 && yPos == 2){
        return 4;
    }
    if(xPos == 2 && yPos == 2){
        return 5;
    }
    if(xPos == 3 && yPos == 2){
        return 6;
    }
    if(xPos == 4 && yPos == 2){
        return 7;
    }
    if(xPos == 1 && yPos == 3){
        return 8;
    }
    if(xPos == 2 && yPos == 3){
        return 9;
    }
    if(xPos == 3 && yPos == 3){
        return 10;
    }
    if(xPos == 4 && yPos == 3){
        return 11;
    }
    if(xPos == 1 && yPos == 4){
        return 12;
    }
    if(xPos == 2 && yPos == 4){
        return 13;
    }
    if(xPos == 3 && yPos == 4){
        return 14;
    }
    if(xPos == 4 && yPos == 4){
        return 15;
    }
}

shuffleTheSquare();

//проверка на конец игры
function endOfGame(){
    const verificationArray = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 0];
    for(let i = 0; i < 15; i++){
        if(arr[i] != verificationArray[i]){
            return false;
        }
    }
    return true;
}

// Вывод на дисплей слова ходов с правильным окончанием (1 - ход, 2 - хода и т.д.)
function onDisplay(value, element){
    const lastDidgit = value % 10;
    const elevenFoorten = value % 100;
    if(lastDidgit == 1 && elevenFoorten != 11){
        element.textContent = ' ход!';
    }
    else if(lastDidgit == 2 && elevenFoorten != 12 || lastDidgit == 3 && elevenFoorten != 13 ||
        lastDidgit == 4 && elevenFoorten != 14){
            element.textContent = ' хода!';
    }
    else{
        element.textContent = ' ходов!';
    }
}

function canvasClick(event){
    const xPos = positionXY(event.clientX);
    const yPos = positionXY(event.clientY);
    const clickPos = clickPosition(xPos, yPos);
    stap(clickPos);
    if(endOfGame()){
        counter.textContent = stepCounter;
        onDisplay(stepCounter, steps);
        alertDiv.style.display = 'block';
        canvas.removeEventListener('click', canvasClick)
    }
}
// обработчик клика по canvas
canvas.addEventListener('click', canvasClick)

// обработчик клика по кнопке
button.addEventListener('click', () => {
    shuffleTheSquare();
    canvas.addEventListener('click', canvasClick)
    stepCounter = 0;
    span.textContent = stepCounter;
    alertDiv.style.display = 'none';
})
