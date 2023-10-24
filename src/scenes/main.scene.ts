import Phaser from "phaser";
import { Player } from "../entities/player";
import io, { Socket } from "socket.io-client"
import { Dot } from "../entities/Dot";
import { MainHud } from "../huds/main.hud";

// @ts-ignore
const SERVER_URL = import.meta.env.VITE_SERVER_URL || "http://localhost:4000";

export class MainScene extends Phaser.Scene {
  private socket: Socket;
  private player: Player;
  private enemies: Map<string, Player>;
  private dots: Map<string, Dot>;
  private playerName: string;
  private hud: MainHud;

  constructor() {
    super("MainScene");
  }

  // game loop methods
  // ---------------------
  init(data: any) {
    this.playerName = data.playerName;
  }

  create() {
    this.createMap();
    this.createCursor();
    this.createSocket();
    this.createHud();
  }

  update() {
    this.updatePlayers();
  }

  // creation methods
  // ---------------------

  createMap() {
    this.add.grid(
      0,
      0,
      3000,
      3000,
      32,
      32,
      0xffffff,
      0xffffff,
      1,
      0xcccccc
    );
  }

  createPlayer(x: number, y: number, name: string, radius: number, color?: number) {
    this.player = new Player(
      this,
      x,
      y,
      name,
      radius,
      color
    );
    this.createCamera();
  }

  createCamera() {
    this.cameras.main.startFollow(this.player);
    this.cameras.main.setZoom(1);
  }

  createCursor() {
    this.input.on("pointermove", (event: any) => {
      if (this.player) {

        const position = {
          x: event.worldX,
          y: event.worldY
        }

        const distance = Phaser.Math.Distance.BetweenPoints(
          this.player,
          position,
        )

        const angle = Phaser.Math.Angle.BetweenPoints(
          this.player,
          position,
        );


        this.socket.emit("player:move", {
          angle,
          distance
        });
      }

    })
  }

  createDot(id: string, x: number, y: number, color: number) {
    const dot = new Dot(this, x, y, color);
    this.dots.set(id, dot);
  }

  createHud() {
    this.scene.launch("MainHud")
    this.hud = this.scene.get("MainHud") as MainHud;
  }

  // behavior methods
  // ---------------------

  getRandomColor() {
    return Math.floor(Math.random() * 0xffffff);
  }

  gameOver() {
    this.socket.disconnect();
    this.scene.start("GameOverScene");
  }

  // server methods
  // ----------------

  createSocket() {
    this.enemies = new Map();
    this.dots = new Map();
    this.socket = io(SERVER_URL, {
      query: {
        playerName: this.playerName
      }
    });

    // 1. si yo me conecto
    this.socket.on("connect", () => {
      console.log("ME CONECTE AL SERVER! :D")
    });

    // 2. si yo me desconecto
    this.socket.on("disconnect", () => {
      console.log("SE DESCONECTO :(");
    });

    // 3. si un player se conecta
    this.socket.on("player:connect", (data) => {
      if (data.id !== this.socket.id) {
        this.enemies.set(data.id, new Player(
          this,
          data.x,
          data.y,
          data.name,
          data.radius,
          data.color
        ));
      }
      else {
        this.createPlayer(
          data.x,
          data.y,
          data.name,
          data.radius,
          data.color);
      }
    });

    // 4. si un player se desonecta
    this.socket.on("player:disconnect", (data) => {
      if (data.id !== this.socket.id) {
        const enemy = this.enemies.get(data.id);
        if (enemy) {
          enemy.destroy();
          this.enemies.delete(data.id);
        }
      }
    });

    // 5. si me mandan la ubicacion de todos los players
    this.socket.on("world:join", (data) => {
      // crea todos los players
      Object.keys(data.players).forEach((id) => {
        if (id !== this.socket.id) {
          const enemyData = data.players[id];
          const enemy = new Player(
            this,
            enemyData.x,
            enemyData.y,
            enemyData.radius,
            enemyData.color
          );
          this.enemies.set(id, enemy);
        }
      });

      // crea todos los dots
      data.dots.forEach((dot: any) => {
        this.createDot(dot.id, dot.x, dot.y, dot.color);
      })
    })

    // 6. si el "mundo" del server se actualiza
    this.socket.on("world:update", (data) => {
      // Actualiza players
      Object.keys(data.players).forEach(id => {
        const playerData = data.players[id];
        if (id === this.socket.id) {
          this.player.setPosition(playerData.x, playerData.y);
          this.player.updateRadius(playerData.radius);
        } else {
          const player = this.enemies.get(playerData.id);
          if (player) {
            player.setPosition(playerData.x, playerData.y);
            player.updateRadius(playerData.radius);
          }
        }
      })

      // Actualiza el hud
      this.hud.updatePlayerInfo(data.players);
    })

    // Si viene un player come un punto
    this.socket.on("player:eat:dot", (data) => {
      const dot = this.dots.get(data.dot.id);
      if (dot) {
        dot.destroy();
        this.dots.delete(data.dot.id)
      }
    })

    // si comemos un enemy
    this.socket.on("player:eat:enemy", (data) => {
      if (data.enemy.id === this.socket.id) this.gameOver();

      const enemy = this.enemies.get(data.enemy.id);

      if (enemy) {
        enemy.destroy();
        this.enemies.delete(data.enemy.id);
      }
    })

    // escucha la creacion de un nuevo dot
    this.socket.on("dot:created", (data) => {
      this.createDot(data.id, data.x, data.y, data.color);
    })
  }

  updatePlayers() {
    if (this.player)
      this.player.update();

    if (this.enemies)
      Object.values(this.enemies).forEach(enemy => {
        enemy && enemy.update(); // Comment
      })
  }


}