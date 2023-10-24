import { Scene } from "phaser";

export class TextField extends Phaser.GameObjects.DOMElement {
  private inputText: HTMLInputElement;
  public onKeyEnter: Function;

  constructor(scene: Scene, x: number, y: number) {
    super(scene, x, y);
    this.scene.add.existing(this);
    this.createInputText();
  }

  public getValue() {
    return this.inputText.value;
  }

  private createInputText() {
    this.inputText = document.createElement("input");
    this.inputText.onkeydown = (e: any) => {
      if (e.key === "Enter") {
        this.onKeyEnter && this.onKeyEnter();
      }
    }
    this.setElement(this.inputText, {
      width: "200px",
      color: "black",
      fontSize: "20px",
      padding: "8px",
      textAlign: "center"
    });
  }
}