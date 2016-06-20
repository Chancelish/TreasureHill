
class Player {

    game: Phaser.Game;
    group: Phaser.Group;
    sprite: Phaser.Sprite;

    weapon: Phaser.Sprite;
    weaponAnim: any;
    static health: number;
    weaponsGroup: Phaser.Group;

    keyDownThisFrame: Array<boolean>;
    keyDownLastFrame: Array<boolean>;

    clickThisFrame: boolean;
    clickLastFrame: boolean;

    cooldown: Array<number>;
    lag: number;
    invFrames: number;

    keyW: Phaser.Key;
    keyA: Phaser.Key;
    keyS: Phaser.Key;
    keyD: Phaser.Key;
    keyQ: Phaser.Key;
    keyE: Phaser.Key;

    static weaponAmmo: Array<number>; //0 hatchet, 1 bow, 2 knife, 3 pistol, 4 tomahawk, 5 rifle
    static selectedWeapon: number = 1;

    constructor(x: number, y: number, game: Phaser.Game, group: Phaser.Group) {
        
        this.game = game;
        this.group = group;

        this.sprite = game.add.sprite(x, y, "hero_head", 0, group);

        this.game.physics.enable(this.sprite, Phaser.Physics.ARCADE);

        this.sprite.body.allowGravity = false;
        this.sprite.anchor.setTo(0.5, 0.5);
        this.sprite.scale.setTo(1.2, 1.2);
        this.sprite.body.setSize(20, 20, -4, 2);

        this.game.camera.follow(this.sprite, null);

        this.keyDownThisFrame = new Array(10);
        this.keyDownLastFrame = new Array(10);

        this.keyW = this.game.input.keyboard.addKey(Phaser.Keyboard.W);
        this.keyA = this.game.input.keyboard.addKey(Phaser.Keyboard.A);
        this.keyS = this.game.input.keyboard.addKey(Phaser.Keyboard.S);
        this.keyD = this.game.input.keyboard.addKey(Phaser.Keyboard.D);
        this.keyQ = this.game.input.keyboard.addKey(Phaser.Keyboard.Q);
        this.keyE = this.game.input.keyboard.addKey(Phaser.Keyboard.E);

        this.lag = 0;
        this.cooldown = [250, 640, 150, 350, 240, 1000];
        this.invFrames = 0;
        if (Player.health <= 0) {
            Player.health = 5;
        }

        this.weaponsGroup = this.game.add.physicsGroup(Phaser.Physics.ARCADE, this.group);
    }

    update() {
        this.preUpdate();

        this.sprite.body.velocity.x = 0;
        this.sprite.body.velocity.y = 0;

        if (this.keyDownThisFrame[0]) {
            this.sprite.body.velocity.y = -190;
        }
        else if (this.keyDownThisFrame[2]) {
            this.sprite.body.velocity.y = 190;
        }
        if (this.keyDownThisFrame[1]) {
            this.sprite.body.velocity.x = -190;
        }
        else if (this.keyDownThisFrame[3]) {
            this.sprite.body.velocity.x = 190;
        }

        if (this.keyDownThisFrame[4] && !this.keyDownLastFrame[4]) {
            do {
                Player.selectedWeapon -= 1;
                if (Player.selectedWeapon < 0) {
                    Player.selectedWeapon = 5;
                }
            } while (Player.weaponAmmo[Player.selectedWeapon] <= 0)
        }

        else if (this.keyDownThisFrame[5] && !this.keyDownLastFrame[5]) {
            do {
                Player.selectedWeapon += 1;
                if (Player.selectedWeapon >= 6) {
                    Player.selectedWeapon = 0;
                }
            } while (Player.weaponAmmo[Player.selectedWeapon] <= 0)
        }

        this.attack();

        this.sprite.rotation = this.game.physics.arcade.angleToPointer(this.sprite);
        this.postUpdate();
    }

    preUpdate() {
        this.keyDownThisFrame[0] = this.keyW.isDown;
        this.keyDownThisFrame[1] = this.keyA.isDown;
        this.keyDownThisFrame[2] = this.keyS.isDown;
        this.keyDownThisFrame[3] = this.keyD.isDown;
        this.keyDownThisFrame[4] = this.keyQ.isDown;
        this.keyDownThisFrame[5] = this.keyE.isDown;
        this.clickThisFrame = this.game.input.activePointer.leftButton.isDown;
    }

    postUpdate() {
        this.keyDownLastFrame[0] = this.keyW.isDown;
        this.keyDownLastFrame[1] = this.keyA.isDown;
        this.keyDownLastFrame[2] = this.keyS.isDown;
        this.keyDownLastFrame[3] = this.keyD.isDown;
        this.keyDownLastFrame[4] = this.keyQ.isDown;
        this.keyDownLastFrame[5] = this.keyE.isDown;
        this.clickThisFrame = this.game.input.activePointer.leftButton.isDown;

        if (this.invFrames > 0) {
            this.invFrames -= this.game.time.elapsed;
            this.sprite.tint = 0xFF1111;
        }
        else {
            this.sprite.tint = 0xFFFFFF;
        }
    }

    attack() {
        if (this.weapon != null) {
            this.weapon.body.x += this.sprite.x - this.sprite.previousPosition.x;
            this.weapon.body.y += this.sprite.y - this.sprite.previousPosition.y;
            if (Player.selectedWeapon == 0 || Player.selectedWeapon == 2 || Player.selectedWeapon == 4) {
                this.weapon.rotation += this.game.time.elapsed / this.cooldown[Player.selectedWeapon] * Math.PI / 2;
            }
        }
        if (this.lag > 0) {
            this.lag -= this.game.time.elapsed;
        }
        if (this.lag <= 0) {
            if (this.weapon != null) {
                this.weapon.destroy();
                this.weapon = null;
            }
            if (this.clickThisFrame) {
                this.lag = this.cooldown[Player.selectedWeapon];
                var cosine = Math.cos(this.sprite.rotation);
                var sine = Math.sin(this.sprite.rotation);
                if (Player.selectedWeapon == 0) {
                    this.weapon = this.game.add.sprite(this.sprite.x + 32 * cosine + 24 * sine, this.sprite.y + 32 * sine - 24 * cosine, "hatchet", 0, this.weaponsGroup);
                    this.weapon.anchor.setTo(0.5, 0.5);
                    this.weapon.body.velocity.setTo(-256 * sine, 256 * cosine);
                    this.weapon.body.setSize(30, 30);
                    this.weapon.rotation = this.sprite.rotation - Math.PI / 4;

                }
                else if (Player.selectedWeapon == 1) {
                    this.weapon = this.game.add.sprite(this.sprite.x + 24 * cosine, this.sprite.y + 24 * sine, "bow", 0, this.weaponsGroup);
                    this.weapon.anchor.setTo(0.5, 0.5);
                    this.weapon.rotation = this.sprite.rotation;
                    this.weaponAnim = this.weapon.animations.add("shoot", [0, 1, 1], 8, false);
                    this.weapon.animations.play("shoot");
                    var bullet: Phaser.Sprite = this.game.add.sprite(this.sprite.x + 24 * cosine, this.sprite.y + 24 * sine, "arrow", 0, this.weaponsGroup);
                    bullet.maxHealth = 2;
                    bullet.health = 2;
                    bullet.anchor.setTo(0.5, 0.5);
                    bullet.rotation = this.sprite.rotation;
                    bullet.body.setSize(6, 6);
                    bullet.body.velocity.setTo(400 * cosine, 400 * sine);
                }
                else if (Player.selectedWeapon == 2) {
                    this.weapon = this.game.add.sprite(this.sprite.x + 32 * cosine + 24 * sine, this.sprite.y + 32 * sine - 24 * cosine, "knife", 0, this.weaponsGroup);
                    this.weapon.anchor.setTo(0.5, 0.5);
                    this.weapon.body.velocity.setTo(-420 * sine, 420 * cosine);
                    this.weapon.body.setSize(30, 30);
                    this.weapon.rotation = this.sprite.rotation - Math.PI / 4;
                }
                else if (Player.selectedWeapon == 3) {
                    this.weapon = this.game.add.sprite(this.sprite.x + 28 * cosine, this.sprite.y + 28 * sine, "revolver", 0, this.weaponsGroup);
                    this.weapon.anchor.setTo(0.5, 0.5);
                    this.weapon.rotation = this.sprite.rotation;
                    this.weapon.animations.add("shoot", [0, 1, 0], 8, false);
                    this.weapon.animations.play("shoot");
                    var bullet: Phaser.Sprite = this.game.add.sprite(this.sprite.x + 24 * cosine, this.sprite.y + 24 * sine, "bullet", 0, this.weaponsGroup);
                    bullet.maxHealth = 2;
                    bullet.health = 2;
                    bullet.anchor.setTo(0.5, 0.5);
                    bullet.rotation = this.sprite.rotation - Math.PI / 16 + Math.random() * Math.PI / 8;
                    bullet.body.setSize(6, 6);
                    var angle = bullet.rotation;
                    bullet.body.velocity.setTo(420 * Math.cos(angle), 420 * Math.sin(angle));
                }
                else if (Player.selectedWeapon == 4) {
                    this.weapon = this.game.add.sprite(this.sprite.x - 8 + 40 * cosine + 24 * sine, this.sprite.y + 32 * sine - 24 * cosine, "tomahawk", 0, this.weaponsGroup);
                    this.weapon.anchor.setTo(0.5, 0.5);
                    this.weapon.body.velocity.setTo(-266 * sine, 266 * cosine);
                    this.weapon.body.setSize(45, 45);
                    this.weapon.rotation = this.sprite.rotation - Math.PI / 4;
                }
                else if (Player.selectedWeapon == 5) {
                    this.weapon = this.game.add.sprite(this.sprite.x + 20 * cosine + 6 * sine, this.sprite.y + 20 * sine - 6 * cosine, "winchester", 0, this.weaponsGroup);
                    this.weapon.anchor.setTo(0.5, 0.5);
                    this.weapon.rotation = this.sprite.rotation;
                    this.weapon.animations.add("shoot", [0, 1, 0], 8, false);
                    this.weapon.animations.play("shoot");
                    var bullet: Phaser.Sprite = this.game.add.sprite(this.sprite.x + 24 * cosine, this.sprite.y + 24 * sine, "bullet", 0, this.weaponsGroup);
                    bullet.maxHealth = 2;
                    bullet.health = 2;
                    bullet.anchor.setTo(0.5, 0.5);
                    bullet.rotation = this.sprite.rotation;
                    bullet.body.setSize(6, 6);
                    bullet.body.velocity.setTo(420 * cosine, 420 * sine);
                }
            }
        }
    }

    onCollision() {
        if (this.invFrames <= 0) {
            Player.health--;
            this.invFrames = 750;
        }
        if (Player.health <= 0) {
            PlayState.music.stop();
            PlayState.music.loop = false;
            this.game.sound.stopAll();
            GameOverState.won = false;
            this.game.state.start("GameOver", true, false);
        }
    }
}