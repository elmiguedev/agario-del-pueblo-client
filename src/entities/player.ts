import Phaser from "phaser";
import { MAX_SPEED } from "../utils/constants";

export class Player extends Phaser.GameObjects.Arc {

  private positionLabel: Phaser.GameObjects.Text

  constructor(scene: Phaser.Scene, x: number, y: number, radius: number, color?: number) {
    super(scene, x, y, radius);
    this.setFillStyle(color || 0xff0000, 1);
    this.scene.add.existing(this);
    this.setDepth(20);
    this.createPositionLabel();
  }

  public move(position: Phaser.Types.Math.Vector2Like) {
    const distance = Phaser.Math.Distance.BetweenPoints(
      position,
      this
    )
    this.scene.physics.moveToObject(
      this,
      position,
      distance > MAX_SPEED ? MAX_SPEED : distance
    );
  }

  public update() {
    this.updatePositionLabel();
  }

  private createPositionLabel() {
    this.positionLabel = this.scene.add.text(
      this.x,
      this.y,
      "",
      {
        color: "black"
      }
    )
      .setOrigin(0.5)
      .setDepth(30);
  }

  private updatePositionLabel() {
    this.positionLabel.setText(
      `x: ${Math.trunc(this.x)}, y: ${Math.trunc(this.y)}`
    );
    this.positionLabel.setPosition(this.x, this.y);
  }

  public updateRadius(value: number) {
    this.setRadius(value);
  }

}