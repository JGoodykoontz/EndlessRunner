class Play extends Phaser.Scene {
    constructor() {
        super("play");
    }

    create() {
        // background
        this.background = this.add.tileSprite(0, 0, 420, 600, 'background').setOrigin(0, 0);

        // -- PLAYER / LIZARD ----

        // Player Animation Controller
        this.anims.create({
            key: 'walk',
            frames: this.anims.generateFrameNumbers('lizard', { start: 0, end: 3, first: 0 }),
            frameRate: 6
        })
        // Player/Lizard
        this.p1Lizard = new Lizard(this, lane2, row0, 'lizard').setOrigin(0.5, 0);
        this.p1Lizard.setScale(0.7);
        this.p1Lizard.play({ key: 'walk', repeat: -1 });
        this.p1Lizard.body.setSize(90, 90);

        // Player/Lizard Keybinds
        keyA = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.A);
        keyD = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.D);
        keyW = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.W);

        // -- END OF PLAYER -----


        // -- ENEMIES --------------------------------------------------------------------

        // Enemy Spawn Timer (every 3 seconds)
        this.spawnTimer = this.time.addEvent({
            delay: 3000,
            callback: this.spawn,
            callbackScope: this,
            loop: true
        });
        this.preOption = 2;

        // -- BRANCHES --
        // container of branches
        this.branches = [];


        // -- BIRDS -- (working on alert still)
        // container of birds
        this.birds = [];

        // create alerts
        this.alert1 = this.add.sprite(lane1, rowAlert, 'alert').setOrigin(0.5, 0);
        this.alert2 = this.add.sprite(lane2, rowAlert, 'alert').setOrigin(0.5, 0);
        this.alert3 = this.add.sprite(lane3, rowAlert, 'alert').setOrigin(0.5, 0);
        this.alert1.alpha = 0
        this.alert2.alpha = 0
        this.alert3.alpha = 0


        // -- SNAKE --
        // snake animation controller
        this.anims.create({
            key: 'slithering',
            frames: this.anims.generateFrameNumbers('snake', { start: 0, end: 3, first: 0 }),
            frameRate: 4
        });

        // container
        this.snakes = [];

        for (let snake of this.snakes) {
            snake.anims.play({ key: 'slithering', repeat: -1 });
        }


        // -- ROCK --
        // Rock Animation Controller
        this.anims.create({
            key: 'rockFall',
            frames: this.anims.generateFrameNumbers('rock', { start: 0, end: 3, first: 0 }),
            frameRate: 0.6
        });

        // rock container
        this.rocks = [];

        // this.rock1.play({key: 'rockFall', repeat: -1});
        // this.rock2.play({key: 'rockFall', repeat: -1});

        // ---- END OF ENEMIES ---------------


        // ---- SCORE ----

        // top rectangle (score UI) (dark green)
        this.add.rectangle(0, 0, game.config.width, borderUISize * 2 + borderpadding, 0x013220).setOrigin(0, 0);

        // initialize score
        score = 0;

        // display score counter
        let scoreConfig = {
            fontFamily: 'Impact',
            fontSize: '28px',
            color: '#FFFFFF',
            align: 'left',
            padding: {
                top: 5,
                bottom: 5,
            },
            fixedWidth: 100
        }

        this.add.text(game.config.width / 4, borderpadding, 'SCORE: ', scoreConfig);
        this.scoreCounter = this.add.text(game.config.width / 2, borderpadding, score, scoreConfig);

        // increment score every second
        this.increaseScore = this.time.addEvent({
            delay: 1000,
            callback: this.scoreUP,
            callbackScope: this,
            loop: true
        });
        // -- END SCORE ----


        // border art
        this.border1 = this.add.tileSprite(0, 0, 420, 600, 'border1').setOrigin(0, 0);
        this.border2 = this.add.tileSprite(0, 0, 420, 600, 'border2').setOrigin(0, 0);
        this.border3 = this.add.tileSprite(0, 0, 420, 600, 'border3').setOrigin(0, 0);

        this.gameoverFlag = false

        // difficulty ramp (speed up)
        this.increaseSpeed = this.time.addEvent({
            delay: 15000,
            callback: this.speedUP,
            callbackScope: this,
            loop: true
        });

        //key tutorial
        this.tutorialA = this.add.sprite(lane1, config.height/2 + 50, 'tutorialA').setOrigin(0.5).setScale(0.25);
        this.tutorialW = this.add.sprite(config.width/2, config.height/2, 'tutorialW').setOrigin(0.5).setScale(0.25);
        this.tutorialD = this.add.sprite(lane3, config.height/2 + 50, 'tutorialD').setOrigin(0.5).setScale(0.25);
    }

    update() {
        this.tutorial(this.tutorialA);
        this.tutorial(this.tutorialD);
        this.tutorial(this.tutorialW);
        if (!this.gameoverFlag) {
            // background
            this.background.tilePositionY -= gameSpeed;
            this.border1.tilePositionY -= gameSpeed;
            this.border2.tilePositionY -= gameSpeed + 0.3;
            this.border3.tilePositionY -= gameSpeed + 0.5;

            this.p1Lizard.update();

            // dash logic
            if (Phaser.Input.Keyboard.JustDown(keyW) &&
                this.p1Lizard.y == row0) {
                //console.log('dash!');
                this.p1Lizard.isDash = true;
                this.time.delayedCall(700, reset, null, this);
            }

            // -- Collision Checks --
            // branch
            for (let i = 0; i < this.branches.length; i++) {
                this.branches[i].update();
                if (this.physics.collide(this.p1Lizard, this.branches[i])) {
                    console.log("hit Branch");
                    this.gameoverFlag = true;
                }
            }

            // bird
            for (let i = 0; i < this.birds.length; i++) {
                this.birds[i].update();
                if (this.birds[i].y > game.config.height &&
                    this.birds[i].x === lane1) {
                    this.birds[i].alert = true;
                    this.alert1.alpha = 1;
                }
                else {
                    this.birds[i].alert = false;
                    this.alert1.alpha = 0;
                }
                if (this.birds[i].y > game.config.height &&
                    this.birds[i].x === lane2) {
                    this.birds[i].alert = true;
                    this.alert2.alpha = 1;
                }
                else {
                    this.birds[i].alert = false;
                    this.alert2.alpha = 0;
                }
                if (this.birds[i].y > game.config.height &&
                    this.birds[i].x === lane3) {
                    this.birds[i].alert = true;
                    this.alert3.alpha = 1;
                }
                else {
                    this.birds[i].alert = false;
                    this.alert3.alpha = 0;
                }
                if (this.physics.collide(this.p1Lizard, this.birds[i])) {
                    console.log("hit Bird");
                    this.gameoverFlag = true;
                }
            }

            // snake
            for (let i = 0; i < this.snakes.length; i++) {
                this.snakes[i].update();
                if (this.physics.collide(this.p1Lizard, this.snakes[i]) && this.snakes[i].attack == true) {
                    console.log("hit Snake");
                    this.gameoverFlag = true;
                }
            }

            // rock
            for (let i = 0; i < this.rocks.length; i++) {
                this.rocks[i].update();
                if (this.physics.collide(this.p1Lizard, this.rocks[i])) {
                    console.log("hit Rock");
                    this.gameoverFlag = true;
                }
            }
        }
        else {
            this.time.delayedCall(1000, () => {
                this.scene.start('gameover');
            });
        }
    }

    tutorial(keyTexture) {
        this.time.delayedCall(2000, () => {
                keyTexture.destroy();
        });
    }

    scoreUP() {
        // console.log("scoreUP");
        score += 10;
        this.scoreCounter.text = score;
    }

    speedUP() {
        gameSpeed += 0.5;
    }

    spawn() {
        do {
            // option will be either 0, 1, 2, never repeating
            this.option = Math.floor(Math.random() * 5);
        }
        while (this.option == this.preOption);  // will always pick a new pattern

        if (this.option == 0) {
            this.makeBranch(lane1);
            this.makeBird(lane3);
            this.preOption = 0;
        }
        else if (this.option == 1) {
            this.makeBranch(lane2);
            this.makeSnake(lane3);
            this.preOption = 1;
        }
        else if (this.option == 2) {
            this.makeBranch(lane3);
            this.makeBird(lane1);
            this.preOption = 2;
        }
        else if (this.option == 3) {
            this.makeBranch(lane2);
            this.makeSnake(lane1);
            this.makeRock(lane3);
            this.preOption = 3;
        }
        else if (this.option == 4) {
            this.makeBird(lane2);
            this.makeRock(lane3);
            this.makeSnake(lane3);
        }

        // play animations
        for (let snake of this.snakes) {
            if (snake.anims) {
                snake.anims.play({ key: 'slithering', repeat: -1 });
            }
        }
    }

    // ---- ENEMY SPAWNING FUNCTIONS ----
    makeBranch(lane) {
        this.branches.push(new Branch(this, lane, -100, 'branch').setOrigin(0.5, 0));
    }
    makeBird(lane) {
        this.birds.push(new Bird(this, lane, game.config.height + 600, 'bird').setOrigin(0.5, 0));
    }
    makeSnake(lane) {
        if (lane === lane1) {
            this.snakes.push(new Snake(this, -350, -100, 'snake').setOrigin(0, 0));
        } else if (lane === lane3) {
            this.snakes.push(new Snake(this, game.config.width - 75, -100, 'snake').setOrigin(0, 0));
        }
    }
    makeRock(lane) {
        this.rocks.push(new Rock(this, lane, -100, 'rock').setOrigin(0.5, 0));
    }
}

function reset() {
    this.p1Lizard.isDash = false;
}