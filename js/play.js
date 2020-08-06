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

        this.load.image('chara', 'assets/Chara.png');
        this.load.image('peluru', 'assets/Peluru.png');
        this.load.image('panel', 'assets/Panel_Nilai.png');

        this.score = 0;

        this.isGameRunning = false;
        this.backgrounds = [];

        this.timer_halangan = 0;
        this.halangan = [];
    },

    startGame: function () {
        this.tweens.add({
            targets: this.foreground_start,
            ease: 'Power1',
            duration: 500,
            y: 768 / 2 - 768
        });

        this.tweens.add({
            targets: this.button_play,
            ease: 'Back.easeIn',
            duration: 750,
            scaleX: 0,
            scaleY: 0
        });

        this.tweens.add({
            targets: this.title,
            ease: 'Elastic',
            duration: 750,
            scaleX: 0,
            scaleY: 0
        });

        this.isGameRunning = true;

        this.chara.setPosition(130, 768 / 2);
        this.chara.setVisible(true);
        this.chara.setScale(1);

        this.score = 0;
        this.label_score.setText(this.score);
    },

    finishGame: function () {
        this.tweens.add({
            targets: this.foreground_start,
            duration: 750,
            y: 768 / 2
        });

        this.tweens.add({
            targets: this.button_play,
            ease: 'Back',
            duration: 1000,
            delay: 1500,
            scaleX: 1,
            scaleY: 1
        });

        this.tweens.add({
            targets: this.title,
            ease: 'Elastic',
            duration: 1000,
            delay: 1000,
            scaleX: 1,
            scaleY: 1
        });

        this.chara.setVisible(false);

        for (let i = 0; i < this.halangan.length; i++) {
            this.halangan[i].destroy();
        }

        this.halangan.splice(0, this.halangan.length);
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

        if (!this.isGameRunning && gameObject == this.button_play) {
            this.startGame();
        }
    },

    onPointerUp: function (pointer, currentlyOver) {
        console.log('Mouse Up');

        if (!this.isGameRunning) return;

        this.charaTweens = this.tweens.add({
            targets: this.chara,
            ease: 'Power1',
            duration: 750,
            y: this.chara.y + 200
        });
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

        this.panel_score = this.add.image(1366 / 2, 60, 'panel');
        this.panel_score.setOrigin(0.5);
        this.panel_score.setDepth(10);
        this.panel_score.setAlpha(0.8);

        this.label_score = this.add.text(this.panel_score.x + 25, this.panel_score.y, this.score);
        this.label_score.setOrigin(0.5);
        this.label_score.setDepth(10);
        this.label_score.setFontSize(30);
        this.label_score.setTint(0xff732e);

        var bg_x = 1366 / 2;

        for (let i = 0; i < 2; i++) {
            var bg_awal = [];

            //background
            var bg = this.add.image(bg_x, 768 / 2, 'background');
            var fg = this.add.image(bg_x, 768 / 2, 'foreground');
            //custom data
            bg.setData('kecepatan', 2);
            fg.setData('kecepatan', 2);
            fg.setDepth(2);

            bg_awal.push(bg);
            bg_awal.push(fg);

            this.backgrounds.push(bg_awal);

            bg_x += 1366;

        }

        this.foreground_start = this.add.image(1366 / 2, 768 / 2, 'foreground_start');
        this.foreground_start.setDepth(10);

        this.button_play = this.add.image(1366 / 2, 768 / 2 + 75, 'button_play');
        this.button_play.setDepth(10);

        this.title = this.add.image(1366 / 2, 200, 'title');
        this.title.setDepth(10);


        this.foreground_start.y -= 768;

        this.tweens.add({
            targets: this.foreground_start,
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

        this.title.setScale(0);

        this.tweens.add({
            targets: this.title,
            ease: 'Elastic',
            duration: 1500,
            delay: 1000,
            scaleX: 1,
            scaleY: 1
        });

        this.button_play.setInteractive(); // button clickable
        this.chara = this.add.image(130, 768 / 2, 'chara');
        this.chara.setDepth(2);

        this.chara.setVisible(false);

    },

    update: function (time, delta) {
        if (this.isGameRunning) {
            this.chara.y -= 5;

            if (this.chara.y > 690) {
                this.chara.y = 690;
            }

            //background
            for (let i = 0; i < this.backgrounds.length; i++) {

                for (let j = 0; j < this.backgrounds[i].length; j++) {
                    this.backgrounds[i][j].x -= this.backgrounds[i][j].getData('kecepatan');

                    if (this.backgrounds[i][j].x <= -(1366 / 2)) {
                        var diff = this.backgrounds[i][j].x + (1366 / 2);

                        this.backgrounds[i][j].x = 1366 + 1366 / 2 + diff;
                    }

                }

            }

            // create obstacle
            if (this.timer_halangan == 0) {
                var acak_y = Math.floor((Math.random() * 680) + 60);

                var peluru = this.add.image(1500, acak_y, 'peluru');

                peluru.setOrigin(0.0);
                peluru.setData("status_aktif", true);
                peluru.setData("kecepatan", Math.floor((Math.random() * 15) + 10));
                peluru.setDepth(5);

                this.halangan.push(peluru);

                this.timer_halangan = Math.floor((Math.random() * 50) + 10);
            }

            // move obstacle
            for (let i = this.halangan.length - 1; i >= 0; i--) {
                this.halangan[i].x -= this.halangan[i].getData("kecepatan");

                if (this.halangan[i].x < -200) {
                    this.halangan[i].destroy();
                    this.halangan.splice(i, 1);
                }
            }
            // score
            for (let i = this.halangan.length - 1; i >= 0; i--) {
                if (this.chara.x > this.halangan[i].x + 50 && this.halangan[i].getData("status_aktif") == true) {
                    this.halangan[i].setData('status_aktif', false);

                    this.score++;

                    this.label_score.setText(this.score);
                }

            }

            // collisions
            for (let i = this.halangan.length - 1; i >= 0; i--) {
                if (this.chara.getBounds().contains(this.halangan[i].x, this.halangan[i].y)) {
                    this.halangan[i].setData("status_Aktif", false);

                    this.charaTweens.stop();

                    this.isGameRunning = false;

                    var myScene = this;

                    this.charaTweens = this.tweens.add({
                        targets: this.chara,
                        ease: 'Power1',
                        duration: 2000,
                        scaleX: 3,
                        scaleY: 0,
                        onCompleteParams: [myScene],
                        onComplete: function () { myScene.finishGame(); }
                    });
                }
            }

            if (this.chara.y < -50) {
                this.isGameRunning = false;
                var myScene = this;
                this.charaTweens = this.tweens.add({
                    targets: this.chara,
                    ease: 'Power1',
                    duration: 2000,
                    scaleX: 3,
                    scaleY: 0,
                    onCompleteParams: [myScene],
                    onComplete: function () { myScene.finishGame(); }
                });
            }

            this.timer_halangan--;
        }
    }
});

var config = {
    type: Phaser.AUTO,
    width: 1366,
    heisght: 768,
    scene: [ScenePlay]
}

var game = new Phaser.Game(config);