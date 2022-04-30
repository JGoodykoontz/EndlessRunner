// Developers:  Jonathan Lewis
//              Jacqui
//              Lucas
// Date: Started 4/13/2022
// Project: Endless Runner for CMPM 120 / ARTG 120 @ UCSC Spring 2022

let config = {
    type: Phaser.CANVAS,
    width: 420,
    height: 600,
    parent: "phaser_canvas",
    mode: Phaser.Scale.FIT,
    physics: {
        default: 'arcade',
        arcade: {
            debug: true
        }
    },
    scene: [Preload, Menu, Play, Gameover],
    scale: {
        autoCenter: Phaser.Scale.CENTER_BOTH,
        mode: Phaser.Scale.NONE,
        width:420,
        height:600
    },
};
let game = new Phaser.Game(config);

let borderUISize = config.height / 30;  // should be 20px
let borderpadding = borderUISize / 2;   // 10px

let score;
let highscore;
let gameSpeed = 3;

let lane1 = config.width/6;
let lane2 = config.width/2;
let lane3 = config.width * (5/6);
let rowAlert = game.config.height - borderUISize - borderpadding;
let row0 = game.config.height - borderUISize - borderpadding * 10;
let row1 = config.height* (7/8);
let row2 = config.height/2;

// set aside keybinds
let keyA, keyD, keyW, keySPACE;