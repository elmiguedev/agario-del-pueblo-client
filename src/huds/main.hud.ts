import { Scene } from "phaser";

export class MainHud extends Scene {

  private scoreText: Phaser.GameObjects.Text;

  constructor() {
    super("MainHud");
  }

  create() {
    this.scoreText = this.add.text(
      20,
      20,
      "",
      {
        color: "black"
      }
    );
  }

  updatePlayerInfo(players: any) {
    const array = Object.values(players).sort((a: any, b: any) => {
      return b.radius - a.radius
    });

    let infoText = "";
    array.forEach((player: any) => {
      infoText += `${player.name} - ${player.radius} \n`;
    })

    this.scoreText.setText(infoText);
  }
}