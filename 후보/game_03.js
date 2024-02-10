const gameContainer = document.getElementById('gameContainer');
        const gameBoard = document.getElementById('gameBoard');
        const scoreDisplay = document.getElementById('score');
        let flippedCard = false;
        let lockBoard = false;
        let firstCard, secondCard;
        let score = 0;
        
        const images = ['img/gameOver.png', '🐱', '🦊', '🐭', '🐻', '🐼', '🐨', '🐯'];
        
        const cardArray = [...images, ...images];
        
        // Shuffle the cards
        cardArray.sort(() => 0.5 - Math.random());
        
        function createBoard() {
            for (let i = 0; i < cardArray.length; i++) {
                const card = document.createElement('div');
                card.classList.add('card');
                card.dataset.cardIndex = i;
                card.textContent = '';
                card.style.backgroundImage = `url(${images[i]})`;
                card.addEventListener('click', flipCard);
                gameBoard.appendChild(card);
            }
        }
        
        function flipCard() {
            if (lockBoard) return;
            if (this === firstCard) return;
        
            this.style.backgroundImage = cardArray[this.dataset.cardIndex];
        
            if (!flippedCard) {
                flippedCard = true;
                firstCard = this;
                return;
            }
        
            secondCard = this;
            checkForMatch();
        }
        
        function checkForMatch() {
            let isMatch = firstCard.textContent === secondCard.textContent;
            isMatch ? disableCards() : unflipCards();
        }
        
        function disableCards() {
    firstCard.removeEventListener('click', flipCard);
    secondCard.removeEventListener('click', flipCard);
    score += 10;
    score.fillText(`Score : ${score} (학점 ${grade})`, 15, 25);
    resetBoard();
}
        
        function unflipCards() {
            lockBoard = true;
            setTimeout(() => {
                firstCard.textContent = '';
                secondCard.textContent = '';
                resetBoard();
            }, 1000);
        }
        
        function resetBoard() {
            [flippedCard, lockBoard] = [false, false];
            [firstCard, secondCard] = [null, null];
        }

        
        
        createBoard();
revealCards();

// Hide the cards after 2 seconds
setTimeout(hideCards, 2000);

function revealCards() {
    cardArray.forEach((value, index) => {
        const card = gameBoard.children[index];
        card.textContent = value;
    });
}

function hideCards() {
    cardArray.forEach((value, index) => {
        const card = gameBoard.children[index];
        card.textContent = '';
        card.addEventListener('click', flipCard);
    });
}
        