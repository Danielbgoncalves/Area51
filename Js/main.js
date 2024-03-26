
import Intro from './intro.js'
import CenaJogo from './cena-jogo.js';
import CenaFim from './cena-fim.js';


const config = {
    type: Phaser.AUTO,
    width: 800,
    height: 700,
    parent: 'canvas',
    physics:{
        default: 'arcade',
        arcade: {
            gravity: {
                y: 0
            },
            debug: false
        }
    },
    scene: [
        Intro,
        CenaJogo,
        CenaFim
    ]
}

const jogo = new Phaser.Game(config);