import { Personagem } from './personagens.js'

//let npc;

export default class CenaJogo extends Phaser.Scene{
    constructor(){
        super({
            key: 'CenaJogo'
        });
        this.personagens = [
            {nome: 'Ana' ,sprite: 'cientista1', fala: 'fala1', spriteOver: 'cientista1'},
            {nome: 'senhor' ,sprite: 'cientista2', fala: 'fala2', spriteOver: 'cientista2'},
            {nome: 'et' ,sprite: 'cientista3', fala: 'fala3', spriteOver: 'cientista3Over'}
        ]
    }

    preload(){

        this.load.image('fundo1', 'Imagens/fundo1.png');
        this.load.image('fundo2', 'Imagens/fundo2.png');
        this.load.image('areaDeFala', 'Imagens/areaDeFala.png');
        this.load.image('fala1', 'Imagens/fala1.png');
        this.load.image('fala2', 'Imagens/fala2.png');
        this.load.image('fala3', 'Imagens/fala3.png');
        this.load.image('botaoVerm', 'Imagens/botao.png');
        this.load.image('botaoVerd', 'Imagens/botao2.png');
        this.load.image('abrir', 'Imagens/abrir.png');
        this.load.image('prancheta', 'Imagens/prancheta.png');
        this.load.image('cientista1', 'Imagens/cientista1.png');
        this.load.image('cientista2', 'Imagens/cientista2.png');
        this.load.image('cientista3', 'Imagens/cientista3.png');
        this.load.image('cientista3Over', 'Imagens/cientista3Over.png');
        this.load.image('laiser', 'Imagens/laiser2.png');

        this.load.spritesheet('explosao', 'Imagens/explosao5.png', {frameWidth: 350, frameHeight: 300});

        this.load.audio('anMediun', 'sons/anMediun.mp3');
        this.load.audio('sonlaiser', 'sons/sonlaiser.mp3');
    }

    selecionaPersonagem() {
        let index = Math.floor(Math.random() * this.personagens.length);
        let persAleatorio = this.personagens[index];
        this.personagens.splice(index, 1);
        return persAleatorio;
    }

    reiniciaCiclo(){
        // Se persAtual já existe, remova os ouvintes de eventos
        if (this.persAtual) {
            console.log('ja existia um personagem');
            this.persAtual.sprite.removeAllListeners();
            this.persAtual.sprite.destroy();
            this.persAtual = null;
            console.log('terminou de limpar o this.persAtual antigo');
        } 

        this.persAleatorio = this.selecionaPersonagem();
        this.persAtual = new Personagem(this, 100, 330,this.persAleatorio.nome, this.persAleatorio.sprite, this.persAleatorio.fala, this.persAleatorio.spriteOver);
        console.log(this.persAtual.nome);
        this.persAtual.sprite.setDepth(-1);
        this.persAtual.sprite.setInteractive();


        this.add.existing(this.persAtual);

        this.persAtual.sprite.on('pointerover', () => {
            //console.log('mouse over personagem');
            this.persAtual.sprite.setTexture(this.persAtual.spriteOver);
            this.spriteFala.setTexture(this.persAtual.fala);
        });
        this.persAtual.sprite.on('pointerout', () => {
            //console.log('mouse out personagem');
            this.persAtual.sprite.setTexture(this.persAtual.spriteName);
            this.spriteFala.setTexture('areaDeFala');
        });

        //return this.persAtual.sprite;

    }

    create(){
        let fundo2 = this.add.image(400,350, 'fundo2');
        fundo2.setDepth(-2);

        this.reiniciaCiclo();

        /*npc = this.reiniciaCiclo();

        npc.setVisible(true);
        npc.setInteractive();*/

        /*
            Os erros estao sendo: over dos personagens nao esta 
            funcionando dps de eu ter troccado npc para this.persAtual.sprite
        */

        this.laiser = this.add.image(100,330, 'laiser');

        this.add.image(400,350, 'fundo1');
        this.spriteFala =this.add.image(417,493, 'areaDeFala');
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
        this.moverLaiserDir = false;
        this.moverLaiserEsq = false;
        
    
        //Botão vermelho
        botaoVerm.setInteractive();
        botaoVerm.on('pointerover', function () {
            this.setTint(0xf07451);
            //console.log(self.persAtual.nome);
        });
        
        botaoVerm.on('pointerout', function () {
            this.clearTint();
        });

        botaoVerd.setInteractive();
        botaoVerd.on('pointerover', function () {
            this.setTint(0xf07451);
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
            self.moverLaiserDir = true;
            self.time.delayedCall(1700, function(){
                explosion.setVisible(true);
                explosion.play('explode');
                self.persAtual.sprite.setVisible(false);
                self.efeitoLaiser.play();
                self.time.delayedCall(2500, ()=>{
                    self.mover = true;
                }, [], this);
                self.moverAux = true;
                self.reiniciaCiclo();
                //npc = self.reiniciaCiclo(); 
            }, [], this);
            
        });

        botaoVerd.on('pointerdown',function() {
            console.log("Clicou no botao verde!");
            self.mover = true;
        });

        // mouse over no npc
        /*self.persAtual.sprite.setInteractive();
        self.persAtual.sprite.on('pointerover', () => {
            console.log('mouse over personagem');
            self.persAtual.sprite.setTexture(self.persAtual.spriteOver);
            spriteFala.setTexture(self.persAtual.fala);
        });
        self.persAtual.sprite.on('pointerout', () => {
            console.log('mouse out personagem');
            self.persAtual.sprite.setTexture(self.persAtual.spriteName);
            spriteFala.setTexture('areaDeFala');
        });*/

        this.anims.create({
            key: 'explode',
            frames: this.anims.generateFrameNumbers('explosao', {start: 0, end: 7, first: 0}),
            frameRate: 10,
            repeat: 0,
            hideOnComplete: true
        });

        let explosion = this.add.sprite(400,340, 'explosao');
        explosion.setVisible(false);

        this.musica = this.sound.add('anMediun');
        this.musica.play();
        this.musica.setLoop(true);

        this.efeitoLaiser = this.sound.add('sonlaiser');
   
    }

    update(){
        let laiser = this.laiser;

        //presonagem se move
        if(this.mover){
            this.persAtual.sprite.body.setVelocityX(100);
            if(this.persAtual.sprite.x >= 410 && this.moverAux === true){
                this.moverAux = false;
                this.mover = false;
                this.persAtual.sprite.body.setVelocityX(0);
            }
        } 
        if(this.persAtual.sprite.x >= 740){
            this.persAtual.sprite.setVisible(false);
            this.moverAux = true;
            this.reiniciaCiclo();
         
        }

        if(this.moverLaiserDir){
            //laiser.setVelocityX(100);
            laiser.x += 2;
            if(laiser.x >= 280 ) {
                this.moverLaiserDir = false;
                //this.persAtual.sprite.body.setVelocityX(0);
                this.time.delayedCall(1000, function(){
                    this.moverLaiserEsq = true;
                }, [], this);
                
            }
        } 
        if(this.moverLaiserEsq){
            laiser.x -= 1.2;
            //laiser.setVelocityX(-100);
            if(laiser.x <= 150 ) {
                this.moverLaiserEsq = false;
                //this.persAtual.sprite.body.setVelocityX(0);
            }
        } 


    }
}