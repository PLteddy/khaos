import Phaser from 'phaser';
import { Card, createDeck, shuffleDeck } from './Card';
import { ChaosRule, getRandomChaosRule } from './ChaosRules';

export class GameScene extends Phaser.Scene {
  // Propriétés du jeu
  private playerDeck: Card[] = [];
  private aiDeck: Card[] = [];
  private playerScore: number = 0;
  private aiScore: number = 0;
  private currentChaosRule?: ChaosRule;
  
  // Éléments d'interface
  private scoreText?: Phaser.GameObjects.Text;
  private chaosText?: Phaser.GameObjects.Text;
  private statusText?: Phaser.GameObjects.Text;
  private cardButtons: Phaser.GameObjects.Container[] = [];
  private playerCardDisplay?: Phaser.GameObjects.Container;
  private aiCardDisplay?: Phaser.GameObjects.Container;
  
  // Score requis pour gagner
  private readonly TARGET_SCORE = 10;

  constructor() {
    super({ key: 'GameScene' });
  }

  create() {
    this.setupGame();
    this.createUI();
    this.cameras.main.setZoom(1); // Force un zoom normal
    this.cameras.main.setBounds(0, 0, this.scale.width, this.scale.height); // Empêche la caméra de se déplacer

  }

  private setupGame() {
    // Création et mélange du deck initial
    const deck = shuffleDeck(createDeck());
    // Distribution des cartes
    this.playerDeck = deck.slice(0, Math.floor(deck.length / 2));
    this.aiDeck = deck.slice(Math.floor(deck.length / 2));
    // Initialisation des scores
    this.playerScore = 0;
    this.aiScore = 0;
    // Première règle chaos
    this.currentChaosRule = getRandomChaosRule();
  }

  private createUI() {
    // Création du fond avec dégradé
    this.createBackground();
    // Création des éléments d'interface
    this.createScoreDisplay();
    this.createChaosRuleDisplay();
    this.createStatusDisplay();
    // Création des cartes jouables
    this.createCardButtons();
  }

  private createBackground() {
    const gradient = this.add.graphics();
    gradient.fillGradientStyle(0x1a1b4b, 0x1a1b4b, 0x312e81, 0x312e81, 1);
    gradient.fillRect(0, 0, this.cameras.main.width, this.cameras.main.height);
  }

  private createScoreDisplay() {
    // Affichage du score avec style amélioré
    this.scoreText = this.add.text(16, 16, this.getScoreText(), {
      fontSize: '32px',
      color: '#fff',
      fontStyle: 'bold',
      stroke: '#000',
      strokeThickness: 4,
      padding: { x: 16, y: 8 },
      backgroundColor: '#1f2937'
    }).setScrollFactor(0);
  }

  private createChaosRuleDisplay() {
    // Affichage de la règle chaos avec animation
    this.chaosText = this.add.text(
      this.cameras.main.centerX,
      50,
      this.getCurrentChaosText(),
      {
        fontSize: '24px',
        color: '#fde047',
        fontStyle: 'bold',
        stroke: '#000',
        strokeThickness: 4,
        align: 'center',
        wordWrap: { width: 600 },
        padding: { x: 20, y: 10 },
        backgroundColor: '#1f2937'
      }
    ).setOrigin(0.5);

    // Animation de pulsation pour attirer l'attention
    this.tweens.add({
      targets: this.chaosText,
      duration: 1000,
      yoyo: true,
      repeat: -1,
      ease: 'Sine.easeInOut'
    });
  }

  private createStatusDisplay() {
    // Affichage du statut de la partie
    this.statusText = this.add.text(
      this.cameras.main.centerX,
      this.cameras.main.centerY - 50,
      '',
      {
        fontSize: '28px',
        color: '#fff',
        fontStyle: 'bold',
        stroke: '#000',
        strokeThickness: 4,
        padding: { x: 16, y: 8 }
      }
    ).setOrigin(0.5);
  }

  private createCardButtons() {
    // Nettoyage des anciennes cartes
    this.cardButtons.forEach(button => button.destroy());
    this.cardButtons = [];

    // Calcul de la disposition des cartes
    const spacing = Math.min(80, (this.cameras.main.width - 200) / this.playerDeck.length);
    const startX = this.cameras.main.centerX - ((this.playerDeck.length - 1) * spacing / 2);
    const y = this.cameras.main.height - 100;

    // Création des cartes jouables
    this.playerDeck.forEach((card, index) => {
      const container = this.createCardButton(card, startX + (index * spacing), y);
      this.cardButtons.push(container);
    });
  }

  private createCardButton(card: Card, x: number, y: number): Phaser.GameObjects.Container {
    const container = this.add.container(x, y);
    
    // Création du fond de la carte avec dégradé
    const bg = this.add.graphics();
    bg.lineStyle(2, 0xffffff);
    bg.fillStyle(card.color, 1);
    bg.fillRoundedRect(-40, -60, 80, 120, 10);
    bg.strokeRoundedRect(-40, -60, 80, 120, 10);
    
    // Ajout d'éléments décoratifs
    const circle = this.add.circle(0, 0, 20, 0xffffff, 0.2);
    
    // Texte de la carte
    const nameText = this.add.text(0, -30, card.name, {
      fontSize: '14px',
      color: '#fff',
      fontStyle: 'bold',
      stroke: '#000',
      strokeThickness: 2
    }).setOrigin(0.5);
    
    const valueText = this.add.text(0, 10, `${card.value}`, {
      fontSize: '28px',
      color: '#fff',
      fontStyle: 'bold',
      stroke: '#000',
      strokeThickness: 3
    }).setOrigin(0.5);

    // Assemblage de la carte
    container.add([bg, circle, nameText, valueText]);
    container.setSize(80, 120);
    container.setInteractive(new Phaser.Geom.Rectangle(-40, -60, 80, 120), Phaser.Geom.Rectangle.Contains);
    
    // Effets de survol
    this.setupCardHoverEffects(container, y);
    
    // Action au clic
    container.on('pointerdown', () => this.onCardClick(card));
    
    return container;
  }

  private setupCardHoverEffects(container: Phaser.GameObjects.Container, baseY: number) {
    container.on('pointerover', () => {
      // Animation de survol
      this.tweens.add({
        targets: container,
        scaleX: 1.1,
        scaleY: 1.1,
        y: baseY - 20,
        duration: 200,
        ease: 'Power2'
      });
    });
    
    container.on('pointerout', () => {
      // Retour à l'état normal
      this.tweens.add({
        targets: container,
        scaleX: 1,
        scaleY: 1,
        y: baseY,
        duration: 200,
        ease: 'Power2'
      });
    });
  }

  private onCardClick(playerCard: Card) {
    if (this.playerDeck.length === 0 || this.aiDeck.length === 0) return;

    // Sélection de la carte de l'IA
    const aiCard = this.aiDeck[Math.floor(Math.random() * this.aiDeck.length)];
    
    // Application de la règle chaos
    const { playerCard: modifiedPlayerCard, aiCard: modifiedAiCard, pointMultiplier } = 
      this.currentChaosRule!.apply(playerCard, aiCard);

    // Affichage des cartes jouées
    this.showPlayedCards(playerCard, aiCard);

    // Détermination du gagnant
    this.determineWinner(modifiedPlayerCard, modifiedAiCard, pointMultiplier);

    // Mise à jour du jeu
    this.updateGameState(playerCard, aiCard);
  }

  private determineWinner(playerCard: Card, aiCard: Card, pointMultiplier: number) {
    if (playerCard.value > aiCard.value) {
      this.playerScore += pointMultiplier;
      this.setStatusText('Vous gagnez la manche !');
      this.showWinAnimation('player');
    } else if (playerCard.value < aiCard.value) {
      this.aiScore += pointMultiplier;
      this.setStatusText("L'IA gagne la manche !");
      this.showWinAnimation('ai');
    } else {
      this.setStatusText('Égalité !');
    }
  }

  private showWinAnimation(winner: 'player' | 'ai') {
    const display = winner === 'player' ? this.playerCardDisplay : this.aiCardDisplay;
    if (!display) return;

    this.tweens.add({
      targets: display,
      scaleX: 1.2,
      scaleY: 1.2,
      duration: 200,
      yoyo: true,
      ease: 'Power2'
    });
  }

  private updateGameState(playerCard: Card, aiCard: Card) {
    // Retrait des cartes jouées
    this.playerDeck = this.playerDeck.filter(c => c.id !== playerCard.id);
    this.aiDeck = this.aiDeck.filter(c => c.id !== aiCard.id);

    // Mise à jour de l'interface
    this.updateUI();

    // Vérification de fin de partie
    if (this.playerScore >= this.TARGET_SCORE || this.aiScore >= this.TARGET_SCORE || 
        (this.playerDeck.length === 0 && this.aiDeck.length === 0)) {
      this.endGame();
    } else {
      // Nouvelle règle chaos
      this.currentChaosRule = getRandomChaosRule();
      this.chaosText?.setText(this.getCurrentChaosText());
    }
  }

  private showPlayedCards(playerCard: Card, aiCard: Card) {
    // Nettoyage des anciennes cartes
    if (this.playerCardDisplay) this.playerCardDisplay.destroy();
    if (this.aiCardDisplay) this.aiCardDisplay.destroy();

    // Affichage des nouvelles cartes
    this.playerCardDisplay = this.createCardDisplay(
      this.cameras.main.centerX - 100,
      this.cameras.main.centerY,
      playerCard,
      'JOUEUR'
    );

    this.aiCardDisplay = this.createCardDisplay(
      this.cameras.main.centerX + 100,
      this.cameras.main.centerY,
      aiCard,
      'IA'
    );

    // Animation d'entrée des cartes
    [this.playerCardDisplay, this.aiCardDisplay].forEach(display => {
      if (!display) return;
      display.setScale(0);
      this.tweens.add({
        targets: display,
        scaleX: 1,
        scaleY: 1,
        duration: 300,
        ease: 'Back.out'
      });
    });
  }

  private createCardDisplay(x: number, y: number, card: Card, label: string): Phaser.GameObjects.Container {
    const container = this.add.container(x, y);
    
    // Fond de la carte
    const bg = this.add.graphics();
    bg.lineStyle(2, 0xffffff);
    bg.fillStyle(card.color, 1);
    bg.fillRoundedRect(-50, -70, 100, 140, 10);
    bg.strokeRoundedRect(-50, -70, 100, 140, 10);
    
    // Éléments décoratifs
    const circle = this.add.circle(0, 0, 25, 0xffffff, 0.2);
    
    // Label du joueur
    const labelText = this.add.text(0, -90, label, {
      fontSize: '16px',
      color: '#fff',
      fontStyle: 'bold',
      stroke: '#000',
      strokeThickness: 2,
      backgroundColor: '#1f2937',
      padding: { x: 8, y: 4 }
    }).setOrigin(0.5);
    
    // Texte de la carte
    const nameText = this.add.text(0, -35, card.name, {
      fontSize: '16px',
      color: '#fff',
      fontStyle: 'bold',
      stroke: '#000',
      strokeThickness: 2
    }).setOrigin(0.5);
    
    const valueText = this.add.text(0, 15, `${card.value}`, {
      fontSize: '32px',
      color: '#fff',
      fontStyle: 'bold',
      stroke: '#000',
      strokeThickness: 3
    }).setOrigin(0.5);

    container.add([bg, circle, labelText, nameText, valueText]);
    return container;
  }

  private updateUI() {
    this.scoreText?.setText(this.getScoreText());
    this.createCardButtons();
  }

  private getScoreText(): string {
    return `Joueur: ${this.playerScore} | IA: ${this.aiScore}`;
  }

  private getCurrentChaosText(): string {
    return `Règle Chaos: ${this.currentChaosRule?.description || ''}`;
  }

  private setStatusText(text: string) {
    if (!this.statusText) return;
    
    // Animation du texte de statut
    this.statusText.setText(text);
    this.statusText.setScale(0);
    this.tweens.add({
      targets: this.statusText,
      scaleX: 1,
      scaleY: 1,
      duration: 300,
      ease: 'Back.out'
    });
  }

  private endGame() {
    // Détermination du message de fin
    let message = '';
    if (this.playerScore > this.aiScore) {
      message = 'Vous avez gagné la partie !';
    } else if (this.aiScore > this.playerScore) {
      message = "L'IA a gagné la partie !";
    } else {
      message = 'Égalité !';
    }

    // Création du conteneur de fin de partie
    const endGameContainer = this.add.container(this.cameras.main.centerX, this.cameras.main.centerY);
    
    // Fond semi-transparent
    const bg = this.add.rectangle(0, 0, 400, 200, 0x000000, 0.8);
    bg.setStrokeStyle(2, 0xffffff);
    
    // Message de fin
    const messageText = this.add.text(0, -40, message, {
      fontSize: '32px',
      color: '#fff',
      fontStyle: 'bold',
      align: 'center',
      stroke: '#000',
      strokeThickness: 4
    }).setOrigin(0.5);

    // Bouton de redémarrage
    const restartButton = this.createRestartButton();
    
    // Animation d'entrée
    endGameContainer.add([bg, messageText, restartButton]);
    endGameContainer.setScale(0);
    this.tweens.add({
      targets: endGameContainer,
      scaleX: 1,
      scaleY: 1,
      duration: 400,
      ease: 'Back.out'
    });
  }

  private createRestartButton(): Phaser.GameObjects.Container {
    const container = this.add.container(0, 40);
    
    // Fond du bouton
    const buttonBg = this.add.rectangle(0, 0, 160, 50, 0x3730a3);
    buttonBg.setStrokeStyle(2, 0xffffff);
    
    // Texte du bouton
    const buttonText = this.add.text(0, 0, 'Rejouer', {
      fontSize: '24px',
      color: '#fff',
      fontStyle: 'bold'
    }).setOrigin(0.5);
    
    container.add([buttonBg, buttonText]);
    container.setSize(160, 50);
    container.setInteractive();
    
    // Effets de survol
    container.on('pointerover', () => {
      buttonBg.setFillStyle(0x4f46e5);
      this.tweens.add({
        targets: container,
        scaleX: 1.05,
        scaleY: 1.05,
        duration: 100
      });
    });
    
    container.on('pointerout', () => {
      buttonBg.setFillStyle(0x3730a3);
      this.tweens.add({
        targets: container,
        scaleX: 1,
        scaleY: 1,
        duration: 100
      });
    });
    
    // Action de redémarrage
    container.on('pointerdown', () => {
      this.scene.restart();
    });

    return container;
  }
}