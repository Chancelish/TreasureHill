/// <reference path="typescript/MenuState.ts" />
/// <reference path="phaser.d.ts" />
var GiTDSummerGame = (function () {
    function GiTDSummerGame() {
        this.game = new Phaser.Game(720, 480, Phaser.AUTO, 'content', { preload: this.preload, create: this.create }, false, false);
    }
    GiTDSummerGame.prototype.preload = function () {
        //tiles and blocks
        this.game.load.image("tiles", "gfx/32x32topdown.png");
        this.game.load.spritesheet("chest", "gfx/chest.png", 32, 32);
        this.game.load.image("shrub", "gfx/shrub.png");
        //entity sprites
        this.game.load.image("arrow", "gfx/arrow.png");
        this.game.load.spritesheet("bow", "gfx/bow.png", 24, 31);
        this.game.load.image("bullet", "gfx/bullet.png");
        this.game.load.image("ghost_feet", "gfx/ghost_feet.png");
        this.game.load.image("ghost_head", "gfx/ghost_head_and_shoulders.png");
        this.game.load.image("ghost_melee", "gfx/ghost_melee_arm.png");
        this.game.load.image("ghost_range", "gfx/ghost_range_arm.png");
        this.game.load.image("hatchet", "gfx/hatchet.png");
        this.game.load.image("hero_feet", "gfx/hero_feet.png");
        this.game.load.image("hero_head", "gfx/hero_head_and_shoulders.png");
        this.game.load.image("hero_melee", "gfx/hero_melee_arm.png");
        this.game.load.image("hero_range", "gfx/hero_range_arm.png");
        this.game.load.image("knife", "gfx/knife.png");
        this.game.load.spritesheet("revolver", "gfx/revolver.png", 19, 5);
        this.game.load.image("tomahawk", "gfx/tomahawk.png");
        this.game.load.spritesheet("winchester", "gfx/winchester.png", 50, 5);
        //gui sprites
        this.game.load.image("blessed_tomahawk", "gfx/blessed_tomahawk.png");
        this.game.load.image("bow_starry", "gfx/bow_and_starry_arrow.png");
        this.game.load.image("devils_revolver", "gfx/devils_revolver.png");
        this.game.load.image("ghastly_knife", "gfx/ghastly_knife.png");
        this.game.load.image("moon_hatchet", "gfx/moon_touched_hatchet.png");
        this.game.load.image("phantom_winchester", "gfx/phantom_winchester.png");
        this.game.load.audio("old_west", "snd/oldwest.mp3");
    };
    GiTDSummerGame.prototype.create = function () {
        this.game.scale.scaleMode = Phaser.ScaleManager.NO_SCALE;
        this.game.state.add("Menu", MenuState);
        this.game.state.start("Menu");
    };
    return GiTDSummerGame;
}());
window.onload = function () {
    var game = new GiTDSummerGame();
};
//# sourceMappingURL=app.js.map