/// <reference path="../phaser.d.ts" />
/// <reference path="../OGMOParser.ts" />

class PlayState extends Phaser.State {

    selectedMap: string;
    background: Phaser.Tilemap;
    bgLayer: Phaser.TilemapLayer;

    environmentLayer: Phaser.Group;
    enemyLayer: Phaser.Group;
    playerLayer: Phaser.Group;

    hudGroup: Phaser.Group;

    rockGroup: Phaser.Group;
    shrubGroup: Phaser.Group;
    chestGroup: Phaser.Group;
    itemGroup: Phaser.Group;

    enemyBullet: Phaser.Group;

    playerBullet: Phaser.Group;

    static music: Phaser.Sound;
    static player: Player;
    static roomsCleared: number;
    static ghostRemaining: number;
    arrow: Phaser.Sprite;
    weaponHud: Array<Phaser.Sprite>;
    ammoHud: Array<Phaser.Text>; 
    healthText: Phaser.Text;
    goalArrow: Phaser.Sprite;

    theTreasure: Phaser.Sprite;

    //Generate map data
    preload() {
        var number = Math.floor(Math.random() * 3 + 1);
        this.load.tilemap("level_map", "../templatelevels/output" + number.toString() + ".csv", null, Phaser.Tilemap.CSV);
    }

    create() {
        
        MenuState.music.stop();
        PlayState.ghostRemaining = 0;

        if (PlayState.roomsCleared == 0) {
            this.game.sound.stopAll();
        }

        if (PlayState.music == null) {
            
            PlayState.music = this.game.add.sound("battle", 0.7, true);
            PlayState.music.allowMultiple = false;
            PlayState.music.play();
        }

        var rockX = [14, 15, 16, 17, 18, 19, 20, 21, 14, 15, 16, 17, 18, 19, 20, 21, 4, 5, 6, 7, 8, 9, 10, 11, 4, 5, 6, 7, 8, 9, 10, 11, 6, 7, 6,  7, 4, 5, 6, 7, 8, 9, 10, 13, 14, 13, 14, 15, 16, 17, 18, 19, 20, 21, 6, 6, 6, 6, 18, 19, 18, 19, 6, 7, 6, 7, 14, 14, 14, 18, 19, 18, 19, 16, 17, 16, 17];
        var rockY = [19, 19, 19, 19, 19, 19, 19, 19, 0, 0, 0, 0, 0, 0, 0, 0, 19, 19, 19, 19, 19, 19, 19, 19, 0, 0, 0, 0, 0, 0, 0, 0, 3, 3, 4, 4, 10, 10, 10, 10, 10, 10, 10, 4, 4, 5, 5, 10, 10, 10, 10, 10, 10, 10, 8, 9, 11, 13, 15, 15, 16, 16, 15, 15, 16, 16, 13, 14, 15, 3, 3, 4, 4, 7, 7, 8, 8];
        var rockProb = [1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 0.7, 0.5, 0.5, 0.4, 0.5, 0.5, 0.5, 0.5, 0.5, 0.5, 0.6, 0.5, 0.4, 0.6, 0.5, 0.5, 0.5, 0.5, 0.5, 0.5, 0.5, 0.55, 0.5, 0.5, 0.5, 0.5, 0.5, 0.8, 0.5, 0.5, 0.5, 0.6, 0.5, 0.5, 0.5, 0.5, 0.5, 0.5, 0.5, 0.5, 0.5, 0.5, 0.5, 0.5, 0.5, 0.4, 0.5, 0.5, 0.5, 0.5, 0.5, 0.5, 0.5];

        var bushX = [12, 13, 11, 11, 14, 15, 14, 10, 10, 10, 12, 13, 12, 13, 13, 15, 17, 17, 18, 19, 12, 8, 9, 6, 7, 8, 9, 10, 10, 11, 10, 11, 12, 12, 12, 15, 15, 15, 15, 16, 16, 16, 17, 17, 17, 17, 18, 18, 18, 6, 9, 9, 9];
        var bushY = [19, 19, 17, 18, 17, 17, 18, 12, 13, 14, 12, 12, 13, 13, 15, 15, 12, 13, 12, 12, 10, 4, 5, 7, 7, 7, 7, 1, 2, 2, 7, 7, 7, 8, 9, 4, 5, 6, 7, 4, 5, 6, 3, 4, 5, 6, 5, 6, 6, 12, 14, 15, 16];
        var bushProb = [1, 1, 0.5, 0.5, 0.5, 0.5, 0.5, 0.5, 0.5, 0.5, 0.5, 0.5, 0.5, 0.5, 0.5, 0.5, 0.5, 0.5, 0.5, 0.5, 0.5, 0.5, 0.5, 0.5, 0.5, 0.5, 0.5, 0.5, 0.5, 0.5, 0.5, 0.5, 0.5, 0.5, 0.5, 0.5, 0.5, 0.5, 0.5, 0.5, 0.5, 0.5, 0.5, 0.5, 0.5, 0.5, 0.5, 0.5, 0.5, 0.5, 0.5, 0.5, 0.5, 0.5];

        var ghostX = [4, 7, 9, 10, 13, 18, 4, 7, 18];
        var ghostY = [1, 1, 4, 11, 6, 9, 12, 14, 15];
        var ghostProb = [0.5, 0.5, 0.5, 0.5, 0.5, 0.5, 0.5, 0.5, 0.5, 0.5, 0.5, 0.5, 0.5, 0.5, 0.5, 0.5];

        var chestX = [5, 5, 20, 20];
        var chestY = [2, 17, 2, 17];
        var chestProb = [0.2, 0.2, 0.2, 0.25 ];

        this.game.physics.startSystem(Phaser.Physics.ARCADE);

        this.background = this.add.tilemap("level_map", 32, 32, 20, 20);
        this.background.addTilesetImage("tiles");

        this.bgLayer = this.background.createLayer(0);
        this.bgLayer.resizeWorld();

        this.environmentLayer = this.add.group();

        this.rockGroup = this.add.group(this.environmentLayer);

        for (var i = 0; i < 20; i++) {
            var rock1: Phaser.Sprite;
            rock1 = this.add.sprite(96, 0 + 32 * i, "rock", 0, this.rockGroup);
            var rock2: Phaser.Sprite;
            rock2 = this.add.sprite(704, 0 + 32 * i, "rock", 0, this.rockGroup);
        }
        if (PlayState.roomsCleared <= 7) {
            for (var i = 0; i < rockX.length; i++) {
                if (Math.random() < rockProb[i]) {
                    this.add.sprite(rockX[i] * 32, rockY[i] * 32, "rock", 0, this.rockGroup);
                }
            }
        }

        this.shrubGroup = this.add.group(this.environmentLayer);

        if (PlayState.roomsCleared <= 7) {
            for (var i = 0; i < bushX.length; i++) {
                if (Math.random() < bushProb[i]) {
                    this.add.sprite(bushX[i] * 32, bushY[i] * 32, "shrub", 0, this.shrubGroup);
                }
            }
        }

        this.chestGroup = this.game.add.physicsGroup(Phaser.Physics.ARCADE, this.environmentLayer);

        this.itemGroup = this.game.add.physicsGroup(Phaser.Physics.ARCADE, this.environmentLayer);

        if (PlayState.roomsCleared <= 7) {
            for (var i = 0; i < chestX.length; i++) {
                if (Math.random() < chestProb[i]) {
                    var chest: Phaser.Sprite = this.add.sprite(chestX[i] * 32, chestY[i] * 32, "chest", 0, this.chestGroup);
                    chest.animations.add("open", [0, 1], 10, false);
                    chest.maxHealth = 1;
                }
            }
        }

        this.game.physics.enable(this.shrubGroup, Phaser.Physics.ARCADE);
        this.shrubGroup.forEach(function (s) { s.body.immovable = true, s.body.moves = false }, this);

        this.game.physics.enable(this.rockGroup, Phaser.Physics.ARCADE);
        this.rockGroup.forEach(function (s) {s.body.immovable = true, s.body.moves = false}, this);

        this.enemyBullet = this.add.physicsGroup(Phaser.Physics.ARCADE);

        this.enemyLayer = this.add.physicsGroup(Phaser.Physics.ARCADE);
        if (PlayState.roomsCleared <= 7) {
            for (var i = 0; i < ghostX.length; i++) {
                if (ghostProb[i] > Math.random()) {
                    var ghost = new Ghost(this.game, ghostX[i] * 32 + 16, ghostY[i] * 32 + 16, "ghost_head", 0, this.enemyLayer);
                    ghost.getSubGroup(this.enemyBullet);
                }
            }
        }

        this.playerLayer = this.add.group();

        if (PlayState.roomsCleared > 7) {
            this.theTreasure = this.game.add.sprite(12 * 32, 10 * 32, "chest", 0, this.playerLayer);
            this.game.physics.enable(this.theTreasure, Phaser.Physics.ARCADE);
        }

        this.goalArrow = this.game.add.sprite(12.5 * 32, 0, "stock_arrows", 1, this.playerLayer);
        this.game.physics.enable(this.goalArrow, Phaser.Physics.ARCADE);
        this.goalArrow.body.setSize(32, 32);
        this.goalArrow.body.immovable = true;
        this.goalArrow.body.moves = false;

        PlayState.player = new Player(416, 576, this.game, this.playerLayer);

        this.hudGroup = this.game.add.group();
        var hudBG: Phaser.BitmapData = this.game.add.bitmapData(96, 480);
        
        hudBG.ctx.fillStyle = "#0A194B";
        hudBG.ctx.fillRect(0, 0, 96, 480);

        var hudBGSprite = this.game.add.sprite(0, 0, hudBG, 0, this.hudGroup);
        hudBGSprite.fixedToCamera = true;

        this.weaponHud = new Array<Phaser.Sprite>();

        this.weaponHud[0] = this.game.add.sprite(32, 64, "moon_hatchet", 0, this.hudGroup);
        this.weaponHud[1] = this.game.add.sprite(32, 128, "bow_starry", 0, this.hudGroup);
        this.weaponHud[2] = this.game.add.sprite(32, 192, "ghastly_knife", 0, this.hudGroup);
        this.weaponHud[3] = this.game.add.sprite(32, 256, "devils_revolver", 0, this.hudGroup);
        this.weaponHud[4] = this.game.add.sprite(32, 320, "blessed_tomahawk", 0, this.hudGroup);
        this.weaponHud[5] = this.game.add.sprite(32, 384, "phantom_winchester", 0, this.hudGroup);

        for (var i = 0; i < 6; i++) {
            this.weaponHud[i].fixedToCamera = true;
        }

        this.ammoHud = new Array<Phaser.Text>(3);

        for (var i = 0; i < 3; i++) {
            this.ammoHud[i] = this.game.add.text(48, 160 + 128 * 8, Player.weaponAmmo[i * 2 + 1].toString(), { font: "bold 16px Arial", fill: "#ffffff", boundsAlignH: "Left", boundsAlignV: "middle" }, this.hudGroup);
            this.ammoHud[i].fixedToCamera = true;
            this.ammoHud[i].cameraOffset.setTo(48, 160 + 128 * 8);
        }

        this.healthText = this.add.text(5, 5, "HP " + Player.health.toString(), { font: "bold 14px Arial", fill: "#ffffff", boundsAlignH: "Left", boundsAlignV: "middle" }, this.hudGroup);
        this.healthText.fixedToCamera = true;

        this.arrow = this.game.add.sprite(8, 84 + 64 * Player.selectedWeapon, "stock_arrows", 0, this.hudGroup);
        this.arrow.fixedToCamera = true;
    }

    update() {

        this.game.physics.arcade.collide(PlayState.player.sprite, this.rockGroup);
        this.game.physics.arcade.collide(PlayState.player.sprite, this.shrubGroup);
        this.game.physics.arcade.collide(this.enemyLayer, this.rockGroup, this.ghostVsRock);
        this.game.physics.arcade.collide(this.enemyLayer, this.shrubGroup);
        this.game.physics.arcade.collide(this.enemyLayer, this.goalArrow);
        this.game.physics.arcade.overlap(PlayState.player.weaponsGroup, this.enemyLayer, this.bulletVsGhost, this.processHandler, this);
        this.game.physics.arcade.overlap(PlayState.player.weaponsGroup, this.rockGroup, this.bulletVsRock, this.processHandler, this);
        this.game.physics.arcade.overlap(PlayState.player.weaponsGroup, this.chestGroup, this.bulletVsChest, this.processHandler, this);
        this.game.physics.arcade.overlap(this.enemyBullet, this.rockGroup, this.bulletVsRock, this.processHandler, this);
        this.game.physics.arcade.overlap(PlayState.player.sprite, this.enemyBullet, this.playerVsBullet, this.processHandler, this);
        this.game.physics.arcade.overlap(PlayState.player.sprite, this.itemGroup, this.playerVsItem, this.processHandler, this);
        if (this.game.physics.arcade.collide(PlayState.player.sprite, this.goalArrow, this.playerVsGoal, this.processHandler, this)) {
            
        }
        if (this.game.physics.arcade.overlap(PlayState.player.sprite, this.theTreasure, this.playerVsTheTreasure, this.processHandler, this)) {
            return;
        }

        if (PlayState.player != null) {
            PlayState.player.update();
        }

        for (var i = 0; i < this.weaponHud.length; i++) {
            if (Player.weaponAmmo[i] <= 0) { this.weaponHud[i].visible = false; }
            else { this.weaponHud[i].visible = true; }
        }

        for (var i = 0; i < this.ammoHud.length; i++) {
            this.ammoHud[i].text = Player.weaponAmmo[i * 2 + 1].toString();
        }

        this.healthText.text = "HP " + Player.health.toString();
        
        this.arrow.cameraOffset.y = 84 + 64 * Player.selectedWeapon;
    }

    ghostVsRock(ghost:Phaser.Sprite, rock:Phaser.Sprite) {
        if (ghost.x > 360) {
            ghost.x -= 1;
        }
        else {
            ghost.x += 1;
        }
        if (ghost.y > 360) {
            ghost.y -= 1;
        }
        else {
            ghost.y += 1;
        }
    }

    bulletVsRock(bullet: Phaser.Sprite, rock: Phaser.Sprite) {
        if (bullet.health == 2) {
            bullet.kill();
        }
    }

    bulletVsChest(bullet: Phaser.Sprite, chest: Phaser.Sprite) {
        if (chest.maxHealth == 1) {
            var rng = Math.floor(Math.random() * 6);
            var item: Phaser.Sprite;
            if (rng == 0) {
                item = this.game.add.sprite(chest.x, chest.y, "moon_hatchet", 0, this.itemGroup);
                item.scale.setTo(0.5, 0.5);
                item.body.setSize(32, 32);
                item.maxHealth = 1;
            }
            else if (rng == 1) {
                item = this.game.add.sprite(chest.x, chest.y, "bow_starry", 0, this.itemGroup);
                item.scale.setTo(0.5, 0.5);
                item.body.setSize(32, 32);
                item.maxHealth = 2;
            }
            else if (rng == 2) {
                item = this.game.add.sprite(chest.x, chest.y, "ghastly_knife", 0, this.itemGroup);
                item.scale.setTo(0.5, 0.5);
                item.body.setSize(32, 32);
                item.maxHealth = 3;
            }
            else if (rng == 3) {
                item = this.game.add.sprite(chest.x, chest.y, "devils_revolver", 0, this.itemGroup);
                item.scale.setTo(0.5, 0.5);
                item.body.setSize(32, 32);
                item.maxHealth = 4;
            }
            else if (rng == 4) {
                item = this.game.add.sprite(chest.x, chest.y, "blessed_tomahawk", 0, this.itemGroup);
                item.scale.setTo(0.5, 0.5);
                item.body.setSize(32, 32);
                item.maxHealth = 5;
            }
            else if (rng == 5) {
                item = this.game.add.sprite(chest.x, chest.y, "phantom_winchester", 0, this.itemGroup);
                item.scale.setTo(0.5, 0.5);
                item.body.setSize(32, 32);
                item.maxHealth == 6;
            }
            chest.animations.play("open");
            if (bullet.health == 2) {
                bullet.kill();
            }
            chest.maxHealth = 2;
        }
    }

    bulletVsGhost(bullet: Phaser.Sprite, ghost: Ghost) {
        ghost.body.x += Math.cos(bullet.rotation) * 10;
        ghost.body.y += Math.sin(bullet.rotation) * 10;
        if (Player.selectedWeapon == 1 || Player.selectedWeapon == 3 || Player.selectedWeapon == 5) {
            if (bullet.health == 2) {
                bullet.kill();
            }
            ghost.health -= Player.selectedWeapon % 2 + 1;
        }
        else if (Player.selectedWeapon == 0 || Player.selectedWeapon == 2) {
            ghost.health -= 0.7;

       }
       else {
            ghost.health -= 1.2;
        }
            
    }

    playerVsBullet(player: Phaser.Sprite, bullet: Phaser.Sprite) {
        PlayState.player.onCollision();
        bullet.kill();
    }

    playerVsItem(player: Phaser.Sprite, item: Phaser.Sprite) {
        if (Player.weaponAmmo[Math.floor(item.maxHealth - 1)] < 1) {
            Player.weaponAmmo[Math.floor(item.maxHealth - 1)] += 1;
        }
        else {
            Player.health += 1;
        }
        item.kill();
    }

    playerVsGoal(player: Phaser.Sprite, goal: Phaser.Sprite) {
        if (PlayState.ghostRemaining < 2) {
            PlayState.roomsCleared += 1;
            goal.game.world.removeAll();
            goal.game.state.restart(true);
        }
    }

    playerVsTheTreasure(player: Phaser.Sprite, goal: Phaser.Sprite) {
        GameOverState.won = true;
        PlayState.music.stop();
        PlayState.music.loop = false;
        goal.game.sound.stopAll();
        goal.game.world.removeAll();
        goal.game.state.start("GameOver", true);
    }

    processHandler() {
        return true;
    }

    

}