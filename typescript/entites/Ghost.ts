
class Ghost extends Phaser.Sprite {

    weapon: Phaser.Sprite;
    weaponGroup: Phaser.Group;
    myGroup: Phaser.Group;
    selected: number;
    movementTimer: number;
    attackTimer: number;
    swingTime: number;
    invFrames: number;
    

    constructor(game: Phaser.Game, x: number, y: number, key: any, frame: any, group:Phaser.Group) {
        super(game, x, y, key, frame);
        this.selected = Math.floor(Math.random() * 6);
        if (this.selected == 1) {
            this.selected += Math.floor(Math.random() * 2);
        }
        if (this.selected == 4) {
            this.selected -= Math.floor(Math.random() * 2);
        }
        this.anchor.setTo(0.5, 0.5);
        game.add.existing(this);
        this.myGroup = group;
        group.add(this);
        this.scale.setTo(1.3, 1.3);
        game.physics.enable(this, Phaser.Physics.ARCADE);
        this.body.velocity.setTo(Math.random() * 150, Math.random() * 150);
        this.body.setSize(24, 24);
        this.health = 4;
        this.movementTimer = 1500 + Math.random() * 4000;
        this.attackTimer = 2500 + Math.random() * 2000;
        PlayState.ghostRemaining += 1;
        this.events.onOutOfBounds.add(this.OoB, this);
    }

    getSubGroup(sGroup: Phaser.Group) {
        this.weaponGroup = sGroup;
    }

    update() {
        super.update();

        if (this.health <= 0) {
            this.kill();
            PlayState.ghostRemaining -= 1;
            if (this.weapon != null) {
                this.weapon.destroy();
                this.weapon = null;
            }
        }

        

        if (!this.alive) {
            this.destroy();
            return;
        }

        if (this.invFrames >= 0) {
            this.invFrames -= this.game.time.elapsed;
        }

        this.movementTimer -= this.game.time.elapsed;
        if (this.movementTimer <= 0) {
            var angle = Math.random() * 2 * Math.PI;
            this.body.velocity.setTo(150 * Math.cos(angle), 150 * Math.sin(angle));
            this.movementTimer += 1500 + Math.random() * 2000;
        }

        if (this.weapon != null) {
            this.weapon.body.x += this.x - this.previousPosition.x;
            this.weapon.body.y += this.y - this.previousPosition.y;
            if (this.selected == 0 || this.selected == 2) {
                this.weapon.rotation += this.game.time.elapsed / 250 * Math.PI / 2;
                
            }
            else {

            }
            this.swingTime -= this.game.time.elapsed;
            if (this.swingTime <= 0) {
                this.weapon.destroy();
                this.weapon = null;
            }
        }

        this.attackTimer -= this.game.time.elapsed;
        if (this.attackTimer <= 0) {
            var cosine = Math.cos(this.rotation);
            var sine = Math.sin(this.rotation);
            if (this.selected == 0) {
                this.weapon = this.game.add.sprite(this.x + 32 * cosine + 24 * sine, this.y + 32 * sine - 24 * cosine, "hatchet", 0, this.weaponGroup);
                this.weapon.anchor.setTo(0.5, 0.5);
                this.weapon.body.velocity.setTo(-256 * sine, 256 * cosine);
                this.weapon.rotation = this.rotation - Math.PI / 4;
                this.swingTime = 250;
            }
            else if (this.selected == 2) {
                this.weapon = this.game.add.sprite(this.x + 32 * cosine + 24 * sine, this.y + 32 * sine - 24 * cosine, "knife", 0, this.weaponGroup);
                this.weapon.anchor.setTo(0.5, 0.5);
                this.weapon.body.velocity.setTo(-256 * sine, 256 * cosine);
                this.weapon.rotation = this.rotation - Math.PI / 4;
                this.swingTime = 250;
            }
            else if (this.selected == 3) {
                this.weapon = this.game.add.sprite(this.x + 28 * cosine, this.y + 28 * sine, "revolver", 0, this.weaponGroup);
                this.weapon.anchor.setTo(0.5, 0.5);
                this.weapon.rotation = this.rotation;
                this.weapon.animations.add("shoot", [0, 1, 0], 8, false);
                this.weapon.animations.play("shoot");
                var bullet: Phaser.Sprite = this.game.add.sprite(this.x + 24 * cosine, this.y + 24 * sine, "bullet", 0, this.weaponGroup);
                bullet.maxHealth = 2;
                bullet.health = 2;
                bullet.anchor.setTo(0.5, 0.5);
                bullet.rotation = this.rotation - Math.PI / 16 + Math.random() * Math.PI / 8;
                bullet.body.setSize(6, 6);
                var angle = bullet.rotation;
                bullet.body.velocity.setTo(250 * Math.cos(angle), 250 * Math.sin(angle));
                this.swingTime = 1000;
            }
            else if (this.selected == 5) {
                this.weapon = this.game.add.sprite(this.x + 16 * cosine, this.y + 26 * sine, "winchester", 0, this.weaponGroup);
                this.weapon.anchor.setTo(0.5, 0.5);
                this.weapon.rotation = this.rotation;
                this.weapon.animations.add("shoot", [0, 1, 0], 8, false);
                this.weapon.animations.play("shoot");
                var bullet: Phaser.Sprite = this.game.add.sprite(this.x + 24 * cosine, this.y + 24 * sine, "bullet", 0, this.weaponGroup);
                bullet.maxHealth = 2;
                bullet.health = 2;
                bullet.anchor.setTo(0.5, 0.5);
                bullet.rotation = this.rotation;
                bullet.body.setSize(6, 6);
                bullet.body.velocity.setTo(250 * cosine, 250 * sine);
                this.swingTime = 1000;
            }
            this.attackTimer += 2500 + Math.random() * 2000;
        }
        this.rotation = Phaser.Math.angleBetween(this.x, this.y, PlayState.player.sprite.x, PlayState.player.sprite.y);
        
    }

    OoB = () => {
        if (this.alive) {
            this.kill();
            PlayState.ghostRemaining -= 1;
        }
    }

    
    
}