
class Player {

    game: Phaser.Game;
    group: Phaser.Group;
    sprite: Phaser.Sprite;

    keyDownThisFrame: Array<boolean>;
    keyDownLastFrame: Array<boolean>;

    keyW: Phaser.Key;
    keyA: Phaser.Key;
    keyS: Phaser.Key;
    keyD: Phaser.Key;

    constructor(x: number, y: number, game: Phaser.Game, group: Phaser.Group) {
        
        this.game = game;
        this.group = group;

        this.sprite = game.add.sprite(x, y, "hero_head", 0, group);

        this.game.physics.enable(this.sprite, Phaser.Physics.ARCADE);

        this.sprite.body.allowGravity = false;
        sprite.anchor.setTo(0.5, 0.5);
        this.sprite.body.setSize(15, 15, 2, 2);

        this.game.camera.follow(this.sprite, null);

        this.keyDownThisFrame = new Array(10);
        this.keyDownLastFrame = new Array(10);

        this.keyW = this.game.input.keyboard.addKey(Phaser.Keyboard.W);
        this.keyA = this.game.input.keyboard.addKey(Phaser.Keyboard.A);
        this.keyS = this.game.input.keyboard.addKey(Phaser.Keyboard.S);
        this.keyD = this.game.input.keyboard.addKey(Phaser.Keyboard.D);
    }

    update() {
        this.preUpdate();

        this.sprite.body.velocity.x = 0;
        this.sprite.body.velocity.y = 0;

        if (this.keyDownThisFrame[0]) {
            this.sprite.body.velocity.y = -200;
        }
        else if (this.keyDownThisFrame[2]) {
            this.sprite.body.velocity.y = 200;
        }
        if (this.keyDownThisFrame[1]) {
            this.sprite.body.velocity.x = -200;
        }
        else if (this.keyDownThisFrame[3]) {
            this.sprite.body.velocity.x = 200;
        }

        this.sprite.rotation = this.game.physics.arcade.angleToPointer(this.sprite);
        this.postUpdate();
    }

    preUpdate() {
        this.keyDownThisFrame[0] = this.keyW.isDown;
        this.keyDownThisFrame[1] = this.keyA.isDown;
        this.keyDownThisFrame[2] = this.keyS.isDown;
        this.keyDownThisFrame[3] = this.keyD.isDown;
    }

    postUpdate() {
        this.keyDownLastFrame[0] = this.keyW.isDown;
        this.keyDownLastFrame[1] = this.keyA.isDown;
        this.keyDownLastFrame[2] = this.keyS.isDown;
        this.keyDownLastFrame[3] = this.keyD.isDown;
    }
}