/// <reference path="../phaser.d.ts" />
var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
var MenuState = (function (_super) {
    __extends(MenuState, _super);
    function MenuState() {
        var _this = this;
        _super.apply(this, arguments);
        this.storyPage = 0;
        this.mouseDownThisFrame = false;
        this.mouseDownLastFrame = false;
        this.tickStory = function () {
            _this.storyPage += 1;
            if (_this.storyPage >= _this.story.length) {
                _this.loadTitlePage();
            }
            else {
                _this.storyText.text = _this.story[_this.storyPage];
                _this.storyText.setTextBounds(60, 100, 600, 280);
                _this.storyText.wordWrapWidth = 600;
                _this.storyText.wordWrap = true;
            }
        };
    }
    //Check global variables, initialize strings
    MenuState.prototype.preload = function () {
        this.story = new Array();
        this.story.push("Yo, I heard there's treasure in those hills.");
        this.story.push("Yeah, almost two hundered years ago a bandit known as Cactus Chuck robbed a Spanish monastary.");
        this.story.push("Him and his gang took all the silver, wine, and fine cloth they could carry.");
        this.story.push("They took it into the mountains where the met a group of Indians.");
        this.story.push("Chuck would've robbed them too if the braves amoung them hadn't fought back.");
        this.story.push("Yeah, Silent River and his group fought valiantly and their tribesman escaped, but...");
        this.story.push("Chuck had too many lackeys. They killed all the braves.");
        this.story.push("But in his dying breath, Silent River placed a curse on the treasure.");
        this.story.push("He said, 'You shall take your stolen treasures and you shall hide them well, so well that not even you can find them'");
        this.story.push("Chuck hid the treasure, with intention of claiming it later when it was safe, but he never did find it again.");
        this.story.push("He returned every year to claim it to no avail. On day, he disappeared in these hills too.");
        this.story.push("They say, that if the moon is full on the eve of the summer solstice.");
        this.story.push("The moonlight will guide a worthy soul to the treasure. But, be wary.");
        this.story.push("For Cactus Chuck and his band of outlaws will also be searching for the treasure.");
        this.story.push("Man, if I could just get a piece of that silver. I could leave this slum.");
        this.story.push("I could help my sister through school, I could have a better life.");
        this.story.push("I'm not one to normally believe in folk tales, but...");
        this.story.push("The moon will be full this solstice. So what have I got to lose.");
        this.instructions = new Array();
        this.instructions.push("Controls");
        this.instructions.push("[W] [A] [S] [D] to move");
        this.instructions.push("[Q] [E]         to change weapons");
        this.instructions.push("[1] [2] [3] [4] to use abilities (if available)");
        this.instructions.push("Mouse to aim and Click to shoot/attack");
        this.instructions.push("Click anywhere to start");
    };
    MenuState.prototype.create = function () {
        this.music = this.game.add.audio("old_west", 1, true);
        this.music.allowMultiple = false;
        this.music.loopFull();
        if (MenuState.storyViewed) {
            this.loadTitlePage();
        }
        else {
            this.storyText = this.game.add.text(0, 0, this.story[0], { font: "bold 32px Arial", fill: "#ffffff", boundsAlignH: "center", boundsAlignV: "middle", wordWrap: true, wordWrapWidth: 600 });
            this.storyText.setTextBounds(60, 100, 600, 280);
            this.storyText.wordWrapWidth = 600;
            this.storyText.wordWrap = true;
            this.timedEvent = this.game.time.events.loop(Phaser.Timer.SECOND * 7, this.tickStory);
            this.alphaTween = this.game.add.tween(this.storyText);
            this.alphaTween.to({ alpha: 0 }, Phaser.Timer.SECOND * 7, Phaser.Easing.Exponential.In, true, 0, 100, false);
        }
    };
    MenuState.prototype.beforeUpdate = function () {
        this.mouseDownThisFrame = this.game.input.activePointer.leftButton.isDown;
    };
    MenuState.prototype.update = function () {
        this.beforeUpdate();
        if (MenuState.storyViewed) {
            if (this.mouseDownThisFrame && !this.mouseDownLastFrame) {
            }
        }
        else {
            if (this.mouseDownThisFrame) {
                this.loadTitlePage();
            }
        }
        this.afterUpdate();
    };
    MenuState.prototype.afterUpdate = function () {
        this.mouseDownLastFrame = this.game.input.activePointer.leftButton.isDown;
    };
    MenuState.prototype.loadTitlePage = function () {
        MenuState.storyViewed = true;
        if (this.storyText != null) {
            this.game.time.events.stop(this.timedEvent);
            this.storyText.destroy();
        }
        this.game.add.image(200, 25, "title");
        this.instructionsText = new Array(this.instructions.length);
        for (var i = 0; i < this.instructions.length; i++) {
            this.instructionsText[i] = this.game.add.text(60, 100 + 50 * i, this.instructions[i], { font: "bold 32px Arial", fill: "#ffffff", boundsAlignH: "Left", boundsAlignV: "middle" });
        }
    };
    MenuState.storyViewed = false;
    return MenuState;
}(Phaser.State));
//# sourceMappingURL=MenuState.js.map