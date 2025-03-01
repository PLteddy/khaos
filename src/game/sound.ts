import backgroundMusic from '../assets/music.mp3';
import clickSound from '../assets/click-sound.mp3';

export class SoundSystem {
    static sounds: { [key: string]: HTMLAudioElement } = {
      backgroundMusic: new Audio(backgroundMusic),
      buttonClick: new Audio(clickSound),
    };
  
    static play(soundName: string, loop: boolean = false) {
      const sound = this.sounds[soundName];
      if (sound) {
        if (!sound.paused && soundName === 'backgroundMusic') {
          // ✅ Si la musique de fond joue déjà, ne pas la redémarrer
          return;
        }
        sound.loop = loop;
        sound.volume = 1;
        sound.muted = false;
        sound.currentTime = 0;
        sound.play().catch((error) => {
          console.error('Erreur lors de la lecture du son :', error);
        });
      }
    }
  
    static stop(soundName: string) {
      const sound = this.sounds[soundName];
      if (sound) {
        sound.pause();
        sound.currentTime = 0;
      }
    }
  }
  