import Phaser from "phaser";
import { MainScene } from "./scenes/main.scene";
import { GameOverScene } from "./scenes/gameover.scene";
import { StartScene } from "./scenes/start.scene";
import { MainHud } from "./huds/main.hud";

new Phaser.Game({
  type: Phaser.AUTO,
  backgroundColor: "#fff",
  parent: document.getElementById("app") as HTMLElement,
  scale: {
    autoCenter: Phaser.Scale.CENTER_BOTH,
    mode: Phaser.Scale.FIT,
    width: window.innerWidth,
    height: window.innerHeight
  },
  dom: {
    createContainer: true,
  },
  scene: [
    StartScene,
    MainScene,
    GameOverScene,
    MainHud
  ],
})