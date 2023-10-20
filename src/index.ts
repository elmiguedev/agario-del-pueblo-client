import Phaser from "phaser";
import { MainScene } from "./scenes/main.scene";
import { GameOverScene } from "./scenes/gameover.scene";

new Phaser.Game({
  type: Phaser.AUTO,
  backgroundColor: "#fff",
  scale: {
    autoCenter: Phaser.Scale.CENTER_BOTH,
    mode: Phaser.Scale.FIT,
    width: window.innerWidth,
    height: window.innerHeight
  },
  physics: {
    default: "arcade",
    arcade: {
      gravity: {
        y: 0
      },
      debug: true
    }
  },
  scene: [
    MainScene,
    GameOverScene
  ],
})