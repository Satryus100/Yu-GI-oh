const state = {
  score: {
    playScore: 0,
    computerScore: 0,
    scoreBox: document.getElementById("score_points"),
  },
  
  cardSprits:{
  avatar: document.getElementById("card-image"),
  name: document.getElementById("card-name"),
  type: document.getElementById("card-type"),
  },
  
  fieldCards:{
    player: document.getElementById("player-field-card"),
    computer: document.getElementById("computer-field-card"),
  },
  playerSides:{
    player1: "player-cards",
    player1BOX: document.querySelector("#player-cards"),
    computer: "computer-cards",
    computerBOX: document.querySelector("#computer-cards"),
  },
  
  actions:{
    buttom: document.getElementById("next-duel"),
  }
};

const playerSides = {
  player1: "player-cards",
  computer: "computer-cards",
}
    
const pathImages = "./src/assets/icons";

const cardData = [{
  id: 0,
  name: "Blue eyes White Dragon",
  type: "Paper",
  img: "/YU-Gi-OH JOKENPO/src/assets/icons/dragon.png",
  
  WinOf: [1],
  LosseOf: [2],
},
{ 
  id: 1,
  name: "Dark Magician",
  type: "Rock", 
  img: "/YU-Gi-OH JOKENPO/src/assets/icons/magician.png",
 
  WinOf: [2],
  LosseOf: [0],
},

{
  id: 2,
  name: "Exodia",
  type: "Scissors",
  img: "/YU-Gi-OH JOKENPO/src/assets/icons/exodia.png",
  
  WinOf: [0],
  LosseOf: [1],
},
];

async function getRandomCardId(){
  const randomIndex = Math.floor(Math.random() * cardData.length);
  return cardData[randomIndex].id;
  
}

async function createCardImage(IdCard, fieldSide){
  const cardImage = document.createElement("img");
  cardImage.setAttribute("height", "100px");
  cardImage.setAttribute("src","./src/assets/icons/card-back.png");
  cardImage.setAttribute("data-id", IdCard);
  cardImage.classList.add("card");
  
  if(fieldSide === playerSides.player1){
   
    cardImage.addEventListener("mouseover", () => {
      drawSelectCard(IdCard);
    });
     cardImage.addEventListener("click", () => {
       setCardsField(cardImage.getAttribute("data-id"));
     });
  }
  
  return cardImage;
}

async function setCardsField(cardId){
  await removeAllCardImages();
  let computerCardId = await getRandomCardId();
  
   await drawCardsInfield(cardId, computerCardId);
  //state.fieldCards.player.src =  cardData[cardId].img;
  //state.fieldCards.computer.src = cardData[computerCardId].img;
  
  let duelResults = await checkDuelResult(cardId, computerCardId);
  
  await ShowhiddenCardFieldImages(true);
  await hiddenCardsDetails();
  await upDateScore();
  await drawButton(duelResults);
}

async function drawCardsInfield(cardId, computerCardId){
  state.fieldCards.player.src = cardData[cardId].img;
  state.fieldCards.computer.src = cardData[computerCardId].img;
}

async function ShowhiddenCardFieldImages(value){
  
  if(value === true){
    state.fieldCards.player.style.display = "block";
    state.fieldCards.computer.style.display = "block";  
  }
  if (value === false) {
    state.fieldCards.player.style.display = "none";
    state.fieldCards.computer.style.display = "none";
  }
}

async function hiddenCardsDetails(){
  state.cardSprits.avatar.src = "";
  state.cardSprits.name.innerText = "";
  state.cardSprits.type.innerText = "";
}

async function drawButton(text){
  state.actions.buttom.innerText = text.toUpperCase();
  state.actions.buttom.style.display = "block";
}

async function upDateScore(){
  
  state.score.scoreBox.innerText = `Win: ${state.score.playScore} | Lose: ${state.score.computerScore}`;
}


async function checkDuelResult(playerCardId, ComputerCardId){
  let duelResults = "Draw";
  let playerCard = cardData[playerCardId];
  
 
  if(playerCard.WinOf.includes(ComputerCardId)){
    duelResults = "win";
    state.score.playScore++;
  }
  
  if(playerCard.LosseOf.includes(ComputerCardId)) {
    duelResults = "lose";
    
    state.score.computerScore++;
  }
  await playAudio(duelResults);
  return duelResults;
}

async function removeAllCardImages(){
  let {computerBOX, player1BOX} = state.playerSides;
  
  let imgElements = computerBOX.querySelectorAll("img");
  imgElements.forEach((img) => img.remove());
  
  
  imgElements = player1BOX.querySelectorAll("img");
  imgElements.forEach((img) => img.remove());
}

async function drawSelectCard(index) {
  state.cardSprits.avatar.src = cardData[index].img;
  state.cardSprits.name.innerText = cardData[index].name;
  state.cardSprits.type.innerText = "Atribute: " + cardData[index].type;
  
}

async function drawCards(cardNumbers,fieldSide){
  for (let i = 0; i < cardNumbers; i++){
    const randomIdCard = await getRandomCardId();
    const cardImage = await createCardImage(randomIdCard, fieldSide);
    document.getElementById(fieldSide).appendChild(cardImage);
  }
}

async function resetDuel(){
  state.cardSprits.avatar.src ="";
  state.actions.buttom.style.display = "none";
  
  state.fieldCards.player.style.display = "none";
  state.fieldCards.computer.style.display = "none";
  init();
}

async function playAudio(status){
  const audio = new Audio(`./src/assets/audios/${status}.wav`);
  try{
    audio.play();    
  }
  catch{
    
  }
}

function init(){
  
  hiddenCardsDetails();
  drawCards(5, playerSides.player1);
  drawCards(5, playerSides.computer);
const bgm = document.getElementById("bgm");
bgm.play();  
}
init();