/// <reference path="../phaser.d.ts" />
/// <reference path="../OGMOParser.ts" />
var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
var PlayState = (function (_super) {
    __extends(PlayState, _super);
    function PlayState() {
        _super.apply(this, arguments);
    }
    //Generate map data
    PlayState.prototype.preload = function () {
        this.load.tilemap("level_map", "../templatelevels/output.csv", null, Phaser.Tilemap.CSV);
    };
    PlayState.prototype.create = function () {
        this.game.physics.startSystem(Phaser.Physics.ARCADE);
        this.background = this.add.tilemap("level_map", 32, 32, 20, 20);
        this.background.addTilesetImage("tiles");
        this.bgLayer = this.background.createLayer(0);
        this.bgLayer.resizeWorld();
        this.environmentLayer = this.add.group();
        this.rockGroup = this.add.group(this.environmentLayer);
        for (var i = 0; i < 20; i++) {
            var rock1;
            rock1 = this.add.sprite(0, 0 + 32 * i, "rock", 0, this.rockGroup);
            var rock2;
            rock2 = this.add.sprite(608, 0 + 32 * i, "rock", 0, this.rockGroup);
        }
        this.enemyLayer = this.add.group();
        this.playerLayer = this.add.group();
        this.player = new Player(320, 576, this.game, this.playerLayer);
    };
    PlayState.prototype.update = function () {
        if (this.player != null) {
            this.player.update();
        }
    };
    return PlayState;
}(Phaser.State));
//# sourceMappingURL=PlayState.js.map