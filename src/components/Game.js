
let currentCard = null;


export function moveCard(cardType, moveCard) {

	moveCard(currentCard);
}

export function canDropCard(cardType) {
  return cardType === currentCard.type;
}

export function setDragCard(card){
	currentCard = card;
}