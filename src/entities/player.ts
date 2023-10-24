import Phaser from "phaser";
import { MAX_SPEED } from "../utils/constants";

export class Player extends Phaser.GameObjects.Arc {

  private nameLabel: Phaser.GameObjects.Text
  private playerName: string;
  constructor(scene: Phaser.Scene, x: number, y: number, name: string, radius: number, color?: number) {
    super(scene, x, y, radius);
    this.playerName = name;
    this.setFillStyle(color || 0xff0000, 1);
    this.scene.add.existing(this);
    this.setDepth(20);
    this.createNameLabel();
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
    this.updateNameLabel();
  }

  private createNameLabel() {
    this.nameLabel = this.scene.add.text(
      this.x,
      this.y,
      this.playerName,
      {
        color: "black"
      }
    )
      .setOrigin(0.5)
      .setDepth(30);
  }

  private updateNameLabel() {
    this.nameLabel.setPosition(this.x, this.y);
  }

  public updateRadius(value: number) {
    this.setRadius(value);
  }

}