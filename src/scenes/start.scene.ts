import { TextField } from "../entities/TextField";

export class StartScene extends Phaser.Scene {

  private textField: TextField;

  constructor() {
    super("StartScene");
  }

  create() {
    this.createTitles();
    this.createInput();
    this.createStartButton();
  }

  createTitles() {
    const position = {
      x: this.cameras.main.centerX,
      y: this.cameras.main.centerY - 50
    };
    this.add.text(
      position.x,
      position.y,
      " - El Agario de Pueblo - ",
      {
        color: "black"
      }
    )
      .setOrigin(0.5)
      .setInteractive({ cursor: "pointer" })
      .on("pointerdown", () => {
        alert(this.textField.getValue())
      })
  }

  createInput() {
    const position = {
      x: this.cameras.main.centerX,
      y: this.cameras.main.centerY
    };

    this.textField = new TextField(
      this,
      position.x,
      position.y
    );

    this.textField.onKeyEnter = () => {
      this.start();
    }
  }

  createStartButton() {
    const position = {
      x: this.cameras.main.centerX,
      y: this.cameras.main.centerY + 50
    };
    const button = this.add.text(
      position.x,
      position.y,
      "ENTER",
      {
        color: "black",
      }
    )
      .setOrigin(0.5)
      .setInteractive({ cursor: "pointer" })
      .on("pointerdown", () => {
        this.start();
      })
  }

  start() {
    this.scene.start("MainScene", {
      playerName: this.textField.getValue()
    })
  }
}