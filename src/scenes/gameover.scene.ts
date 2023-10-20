import Phaser from "phaser";

export class GameOverScene extends Phaser.Scene {
  constructor() {
    super("GameOverScene");
  }

  create() {
    this.add.text(
      200, 200, "GAME OVER", {
      color: "black",
    }
    )
  }
}