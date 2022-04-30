class Preload extends Phaser.Scene {
    constructor() {
        super("preload");
    }

    preload() {
        // Sounds
        this.load.audio('sfx_dash', './assets/Sounds/liz_jump.wav');
        this.load.audio('sfx_snake', './assets/Sounds/mob_snake.wav');
        this.load.audio('sfx_bird', './assets/Sounds/mob_bird.wav');

        // Player/Lizard
        this.load.spritesheet('lizard', './assets/new_lizard.png', {
            frameWidth: 150,
            frameHeight: 150,
            startFrame: 0,
            endFrame: 3
        });

        // Entities1
        // branch
        this.load.image('branch', './assets/branch1.png');
        // snake
        this.load.spritesheet('snake', './assets/snake_sheet.png', {
            frameWidth: 420, 
            frameHeight: 150, 
            startFrame: 0, 
            endFrame: 3
        });
        // birb
        this.load.image('bird', './assets/bird.png');
        this.load.image('alert', './assets/alert.png');
        // dwayne johnson
        this.load.spritesheet('rock', './assets/rock.png', {
            frameWidth: 100,
            frameHeight: 95,
            startFrame: 0,
            endFrame: 3
        });

        // Background & border
        this.load.image('background', './assets/Background/background2.png');
        this.load.image('border1', './assets/Background/border1.png');
        this.load.image('border2', './assets/Background/border2.png');
        this.load.image('border3', './assets/Background/border3.png');       
        
        this.load.image('menuTitle', './assets/menuTitle.png');
        this.load.image('tutorialA', './assets/menuA.png');
        this.load.image('tutorialW', './assets/tutorialW.png');
        this.load.image('tutorialD', './assets/tutorialD.png');
    }

    update() {
        this.scene.start('menu');
    }
}