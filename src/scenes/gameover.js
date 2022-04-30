class Gameover extends Phaser.Scene {
    constructor () {
        super("gameover");
    }

    create() {
        let textConfig = {
            fontFamily: 'Impact',
            fontSize: '28px',
            color: '#FFFFFF',
            align: 'center',
            padding: {
                top: 5,
                bottom: 5,
            },
            fixedWidth: 400
        }

        // background
        this.background = this.add.tileSprite(0, 0, 420, 600, 'background').setOrigin(0, 0);


        // border art
        this.border1 = this.add.tileSprite(0, 0, 420, 600, 'border1').setOrigin(0, 0);
        this.border2 = this.add.tileSprite(0, 0, 420, 600, 'border2').setOrigin(0, 0);
        this.border3 = this.add.tileSprite(0, 0, 420, 600, 'border3').setOrigin(0, 0);

        this.add.text(game.config.width/2, game.config.height/2, "GAMEOVER", textConfig).setOrigin(0.5, 0.5);
        this.add.text(game.config.width/2, game.config.height/2 + 75, "SPACE to restart", textConfig).setOrigin(0.5, 0.5);

        keySPACE = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.SPACE);
    }

    update() {
        this.background.tilePositionY -= gameSpeed;
        this.border1.tilePositionY -= gameSpeed;
        this.border2.tilePositionY -= gameSpeed + 0.3;
        this.border3.tilePositionY -= gameSpeed + 0.5;
        if(Phaser.Input.Keyboard.JustDown(keySPACE)) {
            this.scene.start('play');
        }
    }
}