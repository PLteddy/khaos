import './style.css';
import Phaser from 'phaser';
import GameScene from './scenes/GameScene';

const config = {
  type: Phaser.AUTO,
  parent: 'game',
  width: 800,
  height: 600,
  scene: GameScene,
  backgroundColor: '#34495e'
};

new Phaser.Game(config);