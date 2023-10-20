import { Scene } from "phaser";
import { DOT_RADIUS } from "../utils/constants";


export class Dot extends Phaser.GameObjects.Arc {
  constructor(scene: Scene, x: number, y: number, color: number) {
    super(scene, x, y, DOT_RADIUS);
    this.setDepth(10);
    this.setFillStyle(color, 1);
    this.scene.add.existing(this);
  }
}