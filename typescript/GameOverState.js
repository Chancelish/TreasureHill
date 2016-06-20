var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
var GameOverState = (function (_super) {
    __extends(GameOverState, _super);
    function GameOverState() {
        _super.apply(this, arguments);
    }
    GameOverState.prototype.preload = function () {
    };
    GameOverState.prototype.create = function () {
        PlayState.music.stop();
        if (!GameOverState.won) {
            this.text = this.add.text(0, 0, "Game Over\nClick anywhere to continue.", { font: "bold 32px Arial", fill: "#ffffff", boundsAlignH: "center", boundsAlignV: "middle", wordWrap: true, wordWrapWidth: 600 });
        }
        else {
            this.text = this.add.text(0, 0, "You Got The Treasure!\nClick anywhere to continue.", { font: "bold 32px Arial", fill: "#ffffff", boundsAlignH: "center", boundsAlignV: "middle", wordWrap: true, wordWrapWidth: 600 });
        }
        this.text.setTextBounds(60, 100, 600, 280);
    };
    GameOverState.prototype.update = function () {
        if (this.game.input.activePointer.leftButton.isDown) {
            this.game.world.removeAll();
            this.game.state.start("Menu", true);
        }
    };
    return GameOverState;
}(Phaser.State));
//# sourceMappingURL=GameOverState.js.map