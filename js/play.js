var ScenePlay = new Phaser.Class({
    Extends: Phaser.Scene,

    initialize:

        // Constructor
        function ScenePlay() {
            // New Scene
            Phaser.Scene.call(this, {
                key: 'sceneplay'
            });
        },

    preload: function () {
        // function started before gameplay
        this.load.image('background', 'assets/BG.png');
        this.load.image('foreground', 'assets/FG.png');
        this.load.image('foreground_start', 'assets/FG_Awal.png');
        this.load.image('button_play', 'assets/Button_Play.png');
        this.load.image('title', 'assets/Title.png');
    },

    onObjectClick: function (pointer, gameObject) {
        console.log('Object Click');
    },

    onObjectOver: function (pointer, gameObject) {
        console.log('Object Over');
    },

    onObjectOut: function (pointer, gameObject) {
        console.log('Object Out');
    },

    onObjectClickEnd: function (pointer, gameObject) {
        console.log('Object End Click');

        if (gameObject == this.button_play) {
            this.scene.start('scene2');
        }
    },

    onPointerUp: function (pointer, currentlyOver) {
        console.log('Mouse Up');
    },

    startInputEvents: function () {
        this.input.on('pointerup', this.onPointerUp, this);
        this.input.on('gameobjectdown', this.onObjectClick, this);
        this.input.on('gameobjectup', this.onObjectClickEnd, this);
        this.input.on('gameobjectover', this.onObjectOver, this);
        this.input.on('gameobjecout', this.onObjectOut, this);
    },

    create: function () {
        //function started when gameplay
        // this.add.image(x,y,name asset)
        this.time.delayedCall(0, this.startInputEvents, [], this);
        this.add.image(1366 / 2, 768 / 2, 'background');

        this.add.image(1366 / 2, 768 / 2, 'foreground');

        var foreground_start = this.add.image(1366 / 2, 768 / 2, 'foreground_start');
        foreground_start.setDepth(10);

        this.button_play = this.add.image(1366 / 2, 768 / 2 + 75, 'button_play');
        this.button_play.setDepth(10);

        var title = this.add.image(1366 / 2, 200, 'title');
        title.setDepth(10);

        foreground_start.y -= 768;

        this.tweens.add({
            targets: foreground_start,
            duration: 750,
            y: 768 / 2
        });

        this.button_play.setScale(0);

        this.tweens.add({
            targets: this.button_play,
            ease: 'Back',
            duration: 1000,
            delay: 1500,
            scaleX: 1,
            scaleY: 1
        });

        title.setScale(0);

        this.tweens.add({
            targets: title,
            ease: 'Elastic',
            duration: 1500,
            delay: 1000,
            scaleX: 1,
            scaleY: 1
        });

        this.button_play.setInteractive(); // button clickable

    }
});

var config = {
    type: Phaser.AUTO,
    width: 1366,
    heisght: 768,
    scene: [ScenePlay, Scene2]
}

var game = new Phaser.Game(config);