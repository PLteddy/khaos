class GameScene extends Phaser.Scene {
    constructor() {
      super('GameScene');
      this.cards = [
        { name: 'Reine', value: 5 },
        { name: 'Chevalier', value: 4 },
        { name: 'Marchand', value: 3 },
        { name: 'Sorcier', value: 2 },
        { name: 'Paysan', value: 1 }
      ];
    }
  
    preload() {
      // Charger les assets nécessaires
      this.load.image('cardBack', 'https://labs.phaser.io/assets/cards/back.png');
    }
  
    create() {
      // Réinitialiser les scores et les decks
      this.playerScore = 0;
      this.enemyScore = 0;
      this.playerDeck = [...this.cards];
      this.enemyDeck = [...this.cards];
  
      // Titre du jeu
      this.add.text(400, 50, 'Jeu de Cartes Stratégique', {
        fontSize: '32px',
        fill: '#fff'
      }).setOrigin(0.5);
  
      // Scores
      this.scoreText = this.add.text(400, 100, 'Score: Joueur 0 - Ennemi 0', {
        fontSize: '24px',
        fill: '#fff'
      }).setOrigin(0.5);
  
      // Zone des cartes du joueur
      this.playerCards = this.playerDeck.map((card, index) => {
        const cardButton = this.add.text(150 + index * 100, 450, card.name, {
          fontSize: '16px',
          fill: '#fff',
          backgroundColor: '#2980b9',
          padding: { x: 10, y: 5 }
        }).setInteractive();
  
        cardButton.on('pointerdown', () => this.playCard(card));
        return cardButton;
      });
  
      // Message de statut
      this.statusText = this.add.text(400, 250, 'Choisissez une carte !', {
        fontSize: '24px',
        fill: '#fff'
      }).setOrigin(0.5);
    }
  
    playCard(playerCard) {
      // Sélection aléatoire d'une carte ennemie
      const enemyCardIndex = Math.floor(Math.random() * this.enemyDeck.length);
      const enemyCard = this.enemyDeck[enemyCardIndex];
  
      // Afficher les cartes jouées
      this.statusText.setText(
        `Vous: ${playerCard.name} (${playerCard.value}) vs Ennemi: ${enemyCard.name} (${enemyCard.value})`
      );
  
      // Déterminer le gagnant
      if (playerCard.value > enemyCard.value) {
        this.playerScore++;
        this.statusText.setText(this.statusText.text + '\nVous gagnez la manche !');
      } else if (enemyCard.value > playerCard.value) {
        this.enemyScore++;
        this.statusText.setText(this.statusText.text + '\nL\'ennemi gagne la manche !');
      } else {
        this.statusText.setText(this.statusText.text + '\nÉgalité !');
      }
  
      // Mettre à jour le score
      this.scoreText.setText(`Score: Joueur ${this.playerScore} - Ennemi ${this.enemyScore}`);
  
      // Retirer les cartes jouées des decks
      this.playerDeck = this.playerDeck.filter(c => c !== playerCard);
      this.enemyDeck = this.enemyDeck.filter(c => c !== enemyCard);
  
      // Mettre à jour l'affichage des cartes
      this.updateCardDisplay();
  
      // Vérifier la victoire ou l'égalité
      if (this.playerScore >= 3 || this.enemyScore >= 3 || this.playerDeck.length === 0) {
        this.endGame();
      }
    }
  
    endGame() {
      let message;
      if (this.playerScore >= 3) {
        message = 'Vous avez gagné !';
      } else if (this.enemyScore >= 3) {
        message = 'L\'ennemi a gagné !';
      } else {
        message = `Match nul !\nScore final : Joueur ${this.playerScore} - Ennemi ${this.enemyScore}`;
      }
      
      // Nettoyer l'écran
      this.playerCards.forEach(card => card.destroy());
      
      // Afficher le message de fin
      this.statusText.setText(message);
      
      // Bouton de redémarrage
      const restartButton = this.add.text(400, 350, 'Rejouer', {
        fontSize: '24px',
        fill: '#fff',
        backgroundColor: '#27ae60',
        padding: { x: 20, y: 10 }
      })
      .setInteractive()
      .setOrigin(0.5);
  
      restartButton.on('pointerdown', () => {
        this.scene.restart();
      });
    }
  
    updateCardDisplay() {
      // Mettre à jour l'affichage des cartes du joueur
      this.playerCards.forEach(card => card.destroy());
      this.playerCards = this.playerDeck.map((card, index) => {
        const cardButton = this.add.text(150 + index * 100, 450, card.name, {
          fontSize: '16px',
          fill: '#fff',
          backgroundColor: '#2980b9',
          padding: { x: 10, y: 5 }
        }).setInteractive();
  
        cardButton.on('pointerdown', () => this.playCard(card));
        return cardButton;
      });
    }
  }
  
  export default GameScene;