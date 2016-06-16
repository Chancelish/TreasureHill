/// <reference path="../phaser.d.ts" />
/// <reference path="../OGMOParser.ts" />

class PlayState extends Phaser.State {

    selectedMap: string;
    background: Phaser.Tilemap;
    bgLayer: Phaser.TilemapLayer;

    environmentLayer: Phaser.Group;
    enemyLayer: Phaser.Group;
    playerLayer: Phaser.Group;

    rockGroup: Phaser.Group;
    shrubGroup: Phaser.Group;

    player: Player;

    //Generate map data
    preload() {

        this.load.tilemap("level_map", "../templatelevels/output.csv", null, Phaser.Tilemap.CSV);
    }

    create() {

        this.game.physics.startSystem(Phaser.Physics.ARCADE);

        this.background = this.add.tilemap("level_map", 32, 32, 20, 20);
        this.background.addTilesetImage("tiles");

        this.bgLayer = this.background.createLayer(0);
        this.bgLayer.resizeWorld();

        this.environmentLayer = this.add.group();

        this.rockGroup = this.add.group(this.environmentLayer);

        for (var i = 0; i < 20; i++) {
            var rock1: Phaser.Sprite;
            rock1 = this.add.sprite(0, 0 + 32 * i, "rock", 0, this.rockGroup);
            var rock2: Phaser.Sprite;
            rock2 = this.add.sprite(608, 0 + 32 * i, "rock", 0, this.rockGroup);
            
        }

        

        this.enemyLayer = this.add.group();

        this.playerLayer = this.add.group();

        this.player = new Player(320, 576, this.game, this.playerLayer);
    }

    update() {

        

        if (this.player != null) {
            this.player.update();
        }
    }

}