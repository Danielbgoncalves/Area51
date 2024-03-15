import { Personagem } from './personagens.js'

/*let personagens = [
    {sprite: 'cientista1', fala: 'fala1', spriteOver: 'cientista1'},
    {sprite: 'cientista2', fala: 'cientista2', spriteOver: 'cientista2'},
    {sprite: 'cientista3', fala: 'cientista3', spriteOver: 'cientista3Over'}
]*/

export default class CenaJogo extends Phaser.Scene{
    constructor(){
        super({
            key: 'CenaJogo'
        });
        this.personagens = [
            {sprite: 'cientista1', fala: 'fala1', spriteOver: 'cientista1'},
            {sprite: 'cientista2', fala: 'fala2', spriteOver: 'cientista2'},
            {sprite: 'cientista3', fala: 'cientista3', spriteOver: 'cientista3Over'}
        ]
    }

    preload(){

        this.load.image('fundo1', 'Imagens/fundo1.png');
        this.load.image('fundo2', 'Imagens/fundo2.png');
        this.load.image('areaDeFala', 'Imagens/areaDeFala.png');
        this.load.image('fala1', 'Imagens/fala1.png');
        this.load.image('fala2', 'Imagens/fala2.png');
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
        this.persAleatorio = this.selecionaPersonagem();
        this.persAtual = new Personagem(this, 100, 330, this.persAleatorio.sprite, this.persAleatorio.fala, this.persAleatorio.spriteOver);
        this.persAtual.sprite.setDepth(-1);
    }

    create(){
        let fundo2 = this.add.image(400,350, 'fundo2');
        fundo2.setDepth(-2);
    

        this.reiniciaCiclo();

        let npc = this.persAtual.sprite;
        npc.setVisible(true);
        npc.setInteractive();

        /*
            O erro está sendo que o laiser nao faz os novos personagens sumirem. os novos
            inclusive estao aparecendo na frente do fundo1, o que noa deveria aocntecer, isso p
            q pq eles estao sendo gerados porterioremente isso a genet resolve usando o setDeepth ou algo assim
            já o laiser é  pq o laiser usa o npc.setVisible, o this.persAtual é atualizado pelo reiniciaCiclo 
            mas a variavel npc nao, acho que é por causa disso o erro
        */





        this.laiser = this.add.image(100,330, 'laiser');

        this.add.image(400,350, 'fundo1');
        let spriteFala =this.add.image(417,493, 'areaDeFala');
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
            }, [], this);
            
        });

        botaoVerd.on('pointerdown',function() {
            console.log("Clicou no botao verde!");
            self.mover = true;
        });

        // mouse over no npc
        npc.on('pointerover', () => {
            self.persAtual.sprite.setTexture(this.persAleatorio.spriteOver);
            spriteFala.setTexture(this.persAleatorio.fala);
        });
        npc.on('pointerout', () => {
            self.persAtual.sprite.setTexture(this.persAleatorio.sprite);
            spriteFala.setTexture('areaDeFala');

        });

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
            console.log('anda')
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