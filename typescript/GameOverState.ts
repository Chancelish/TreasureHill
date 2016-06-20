

class GameOverState extends Phaser.State {

    static won: boolean;
    text: Phaser.Text;

    preload() {

    }

    create() {
        PlayState.music.stop();
        if (!GameOverState.won) {
            this.text = this.add.text(0, 0, "Game Over\nClick anywhere to continue.", { font: "bold 32px Arial", fill: "#ffffff", boundsAlignH: "center", boundsAlignV: "middle", wordWrap: true, wordWrapWidth: 600 });
        }
        else {
            this.text = this.add.text(0, 0, "You Got The Treasure!\nClick anywhere to continue.", { font: "bold 32px Arial", fill: "#ffffff", boundsAlignH: "center", boundsAlignV: "middle", wordWrap: true, wordWrapWidth: 600 });
        }
        this.text.setTextBounds(60, 100, 600, 280);
    }

    update() {
        if (this.game.input.activePointer.leftButton.isDown) {
            this.game.world.removeAll();
            this.game.state.start("Menu", true);
        }
    }
}