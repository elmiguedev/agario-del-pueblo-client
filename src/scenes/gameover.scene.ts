import Phaser from "phaser";

export class GameOverScene extends Phaser.Scene {

  private restartKey?: Phaser.Input.Keyboard.Key;

  constructor() {
    super("GameOverScene");
  }

  create() {
    this.createGameOverTitle();
    this.createRestartKey();
  }

  createGameOverTitle() {
    this.add.text(
      this.cameras.main.centerX,
      this.cameras.main.centerY,
      `
      Game Over

      - Press enter to restart - 
      `,
      {
        color: "black",
        align: "center"
      }
    ).setOrigin(0.5)
  }

  createRestartKey() {
    this.restartKey = this.input.keyboard?.addKey("ENTER");
    this.restartKey?.on("down", () => {
      this.scene.start("StartScene");
    })
  }
}