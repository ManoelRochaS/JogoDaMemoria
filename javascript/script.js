
const DisplayGame = document.getElementById("DisplayGame");
const Disable = document.getElementById("Disable");
const Background = document.getElementById("Background");
const ctrl = document.getElementsByClassName("ctrl");
const section = document.querySelectorAll("section");
const control = document.getElementsByClassName("control");
const Box = document.getElementsByClassName("Box");
let optionsLevel = document.querySelectorAll("h3");

let currentLevel = 0;
let currentTheme = "";
let cardControl = -1
let cardControlValue = -1
let controlRound = 1000
let vectorRound = []


let background = [
    `<img class="bgMainOne ctrl" src="./css/photoGallery/general/bgMainOne.png" alt="">
    <img class="bgMainTwo ctrl" src="./css/photoGallery/general/bgMainTwo.png" alt="">`,
    `<img class="bgAnimalsOne ctrl" src="./css/photoGallery/general/bgAnimalsOne.png" alt="">
    <img class="bgAnimalsTwo ctrl" src="./css/photoGallery/general/bgAnimalsTwo.png" alt="">`,
    `<img class="bgSportsOne ctrl" src="./css/photoGallery/general/bgSportsOne.png" alt="">
    <img class="bgSportsTwo ctrl" src="./css/photoGallery/general/bgSportsTwo.png" alt="">`,
    `<img class="bgToysOne ctrl" src="./css/photoGallery/general/bgToysOne.png" alt="">
    <img class="bgToysTwo ctrl" src="./css/photoGallery/general/bgToysTwo.png" alt="">`
]



//Não se mexe
function setLevel(index){
    if(index != currentLevel){
        optionsLevel[currentLevel].classList.remove("currentLevel");
        optionsLevel[index].classList.add("currentLevel");
        currentLevel = index;
    }
}

//ok
function startGame(theme){
    currentTheme = theme
    setBox();
    setBG()
    section[0].style.opacity = "0";
    setTimeout(()=>{
        section[0].style.display = "none";
        section[1].style.display = "flex";
        setTimeout(()=>{
            section[1].style.opacity = "1";
        },250)
    },250)
}

//ok
function setBox(){
    DisplayGame.className = '';
    switch(currentLevel){
        case 0:
            controlRound = -6
            DisplayGame.innerHTML = setCards(12);
            DisplayGame.classList.add('displayFacil');
            break;
        case 1:
            controlRound = -9
            DisplayGame.innerHTML = setCards(18);
            DisplayGame.classList.add('displayMedio');
            break;
        case 2:
            controlRound = -12
            DisplayGame.innerHTML = setCards(24);
            DisplayGame.classList.add('displayDificil');
            break;
    }
}

//ok
function setBG(){
    ctrl[0].style.width = "0";
    ctrl[1].style.width = "0";
    setTimeout(() => {
        Background.innerHTML = background[auxBG()]
    }, 500);
}

//Não se mexe
function auxBG(){
    switch(currentTheme){
        case "Animais":
            return 1
        case "Esportes":
            return 2
        case "Brinquedos":
            return 3
    }  
}

//Não se mexe
function setCards(n){
    cardTheme = getIcon()
    listOrder = order(n/2)
    let html = ``;
    for(var i = 0; i < n; i++){
        html+=`<div class="control" onclick = "engine(${listOrder[i]},${i})">${cardTheme}</div>`;
    }
    return html;
}

//Não se mexe
function getIcon(){
    switch(currentTheme){
        case "Animais":
            return `<img src="./css/photoGallery/general/iconAnimals.png" alt="">`
        case "Esportes":
            return `<img src="./css/photoGallery/general/iconSports.png" alt="">`
        case "Brinquedos":
            return `<img src="./css/photoGallery/general/iconToys.png" alt="">`
    }
}

//Não se mexe
function order(n){
    let vector = [1,2,3,4,5,6,7,8,9,10,11,12]
    while (vector.length > n){
        index = (Math.floor(Math.random()*vector.length))
        vector.splice(index,1)
    }
    vector = [].concat(vector,vector)
    vector.sort(randOrd)
    return vector
}

//não se mexe
function randOrd(){
    return Math.round(Math.random())-0.5
}

//função que vai determinar toda a lógica do jogo para construir a melhor performance, vamos lá
function engine(number, index){
    if(inCard(index)){
        if(cardControl < 0){
            showCard(number, index)
            cardControlValue = number
            cardControl = index
        }
        else if(cardControl != index){
            showCard(number, index)
            Disable.style.display = "flex"
            setTimeout(()=>{
                if(cardControlValue == number){
                    winCard(cardControl, index)
                    controlRound += 1
                    vectorRound.push(cardControl)
                    vectorRound.push(index)
                }
                else{
                    hideCard(cardControl, index)
                }
                if(controlRound == 0){
                    isWin()
                }
                else{
                    Disable.style.display = "none"
                }
                cardControl = -1
                cardControlValue = -1
            },1100)    
        }
    }
}

//ok
function isWin(){
    cardControl = -1
    cardControlValue = -1
    controlRound = 1000
    vectorRound = []
    DisplayGame.style.opacity = "0"
    setTimeout(()=>{
        Background.style.opacity = "0"
        setTimeout(() => {
            Background.innerHTML = background[0]
            Background.style.opacity = "1"
            Box[0].style.opacity = "1"
        }, 250);
    },250)
}

//Não se mexe
function showCard(number,i){
    control[i].style.transform = "rotateY(90deg)"
    setTimeout(()=>{
        control[i].style.backgroundImage = setBackGround()
        control[i].style.borderColor = setBorderColor()
        control[i].innerHTML = setImg(number)
        control[i].style.transform = "rotateY(180deg)"
    },500)
}

//Não se mexe
function winCard(i,j){
    control[i].style.opacity = "0.7"
    control[j].style.opacity = "0.7"
}

//Não se mexe
function hideCard(i,j){
    control[i].style.transform = "rotateY(90deg)"
    control[j].style.transform = "rotateY(90deg)"
    setTimeout(()=>{
        control[i].style.background = "#000000"
        control[j].style.background = "#000000"
        control[i].style.borderColor = "#ffd700"
        control[j].style.borderColor = "#ffd700"
        control[i].innerHTML = getIcon()
        control[j].innerHTML = getIcon()
        control[i].style.transform = "rotateY(0deg)"
        control[j].style.transform = "rotateY(0deg)"
    },500)
}

//Não se mexe
function setBackGround(){
    switch(currentTheme){
        case "Animais":
            return `radial-gradient(circle, #E5F8FF, #55baf9, #5BD0F1)`
        case "Esportes":
            return `radial-gradient(circle, #AEDDA3, #62AE50, #4AA136)`
        case "Brinquedos":
            return `radial-gradient(circle, #FFF484, #FFEC3D, #FFE919)`
    }
}

//Não se mexe
function setBorderColor(){
    switch(currentTheme){
        case "Animais":
            return `#5BD0F1`
        case "Esportes":
            return `#4AA136`
        case "Brinquedos":
            return `#FFE919`
    }
}

//Não se mexe
function setImg(number){
    switch(currentTheme){
        case "Animais":
            return `<img src="./css/photoGallery/animals/${number}.png" alt="">`
        case "Esportes":
            return `<img src="./css/photoGallery/sports/${number}.png" alt="">`
        case "Brinquedos":
            return `<img src="./css/photoGallery/toys/${number}.png" alt="">`
    }
}

function inCard(number){
    for(var i = 0; i < vectorRound.length; i++){
        if(vectorRound[i] == number){
            return false
        }
    }
    return true
}

//Criar função de restart() e newGame()
function restart(){
    Disable.style.display = "none"
    Box[0].style.opacity = "0"
    setBox()
    setBG()
    DisplayGame.style.opacity = "1"
}

function newGame(){
    Disable.style.display = "none"
    Box[0].style.opacity = "0"
    setLevel(0)
    section[1].style.display = "none";
    section[0].style.display = "flex";
    section[0].style.opacity = "1";
    section[1].style.opacity = "0";
}