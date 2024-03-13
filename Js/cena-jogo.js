import { Personagem } from './personagens.js'

let personagens = [
    {nome: 'Cientista1', sprite: 'cientista1', carteira: 'cientista1', fala: 'cientista1'},
    {nome: 'Cientista2', sprite: 'cientista2', carteira: 'cientista2', fala: 'cientista2'}
]

export default class CenaJogo extends Phaser.Scene{
    constructor(){
        super({
            key: 'CenaJogo'
        });
    }

    preload(){

        this.load.image('fundo1', '/imagens/fundo1.png');
        this.load.image('fundo2', '/imagens/fundo2.png');
        this.load.image('botaoVerm', 'imagens/botao.png');
        this.load.image('botaoVerd', 'imagens/botao2.png');
        this.load.image('abrir', 'imagens/abrir.png');
        this.load.image('prancheta', 'imagens/prancheta.png');
        this.load.image('cientista1', 'imagens/cientista1.png');
        this.load.image('cientista2', 'imagens/cientista2.png');
        this.load.spritesheet('explosao', 'imagens/explosao.png', {frameWidth: 165, frameHeight: 350});

    }

    create(){
        this.add.image(400,350, 'fundo2');

        let persAleatorio = personagens[Math.floor(Math.random() * personagens.length)];
        this.persAtual = new Personagem(this, 100, 330, persAleatorio.sprite, persAleatorio.carteira, persAleatorio.fala);
        let npc = this.persAtual.sprite;

        this.add.image(400,350, 'fundo1');
        let botaoVerm = this.add.image(601,597, 'botaoVerm');
        botaoVerm.setInteractive();

        this.add.image(745,605, 'abrir');
        let botaoVerd = this.add.image(747,595, 'botaoVerd');
        botaoVerm.setInteractive();

        

        //variaveis
        this.mostraCarteira = false;
        this.mover = true;
        this.moverAux = true;
        let self = this; // armazena a referencia ao this dessa cena
    
        //Botão vermelho
        botaoVerm.setInteractive();
        botaoVerm.on('pointerover', function () {
            this.setTint(0xf07451);
        });
        
        botaoVerm.on('pointerout', function () {
            this.clearTint();
        });

        botaoVerd.setInteractive();
        botaoVerd.on('pointerover', function () {
            this.setTint(0xf07451);
            //pers1.andar();
        });
        botaoVerd.on('pointerout', function () {
            this.clearTint();
        });

        let prancheta = this.add.image(268,597, 'prancheta');
        prancheta.setInteractive();
        prancheta.on('pointerover', function () {
            this.setTint(0xf7e6be);
        });
        prancheta.on('pointerout', function () {
            this.clearTint();
        });

        botaoVerm.on('pointerdown',function() {
            console.log("Clicou no botao vermelho!");
            explosion.setVisible(true);
            explosion.play('explode');
        });

        botaoVerd.on('pointerdown',function() {
            console.log("Clicou no botao verde!");
            //this.persAtual.sprite.body.setVelocityX(100);
            self.mover = true;
            //console.log(self.mover);
        });

        this.anims.create({
            key: 'explode',
            frames: this.anims.generateFrameNumbers('explosao', {start: 0, end: 6, first: 0}),
            frameRate: 10,
            repeat: 0,
            hideOnComplete: true
        });

        let explosion = this.add.sprite(400,300, 'explosao');
        explosion.setVisible(false);
        
   
    }

    

    

    update(){

        if(this.mover){
            this.persAtual.sprite.body.setVelocityX(100);
            //console.log('vai andar');
            if((this.persAtual.sprite.x >= 410 && this.moverAux === true) || this.persAtual.sprite.x >= 750){
                //console.log('nao vai andar');
                this.moverAux = false;
                this.mover = false;
                this.persAtual.sprite.body.setVelocityX(0);
            }
        } 

    }
}
