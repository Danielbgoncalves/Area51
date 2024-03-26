export default class intro extends Phaser.Scene{
    constructor(){
        super({
            key: 'Intro'
        });
    }

    preload(){
        this.load.image('fundo1', 'Imagens/fundo1.png');
        this.load.image('fundo2', 'Imagens/fundo2.png');
        this.load.image('areaDeFala', 'Imagens/areaDeFala.png');
        this.load.image('fala1', 'Imagens/fala1.png');
        this.load.image('fala2', 'Imagens/fala2.png');
        this.load.image('fala3', 'Imagens/fala3.png');
        this.load.image('fala4', 'Imagens/fala4.png');
        this.load.image('botaoVerm', 'Imagens/botao.png');
        this.load.image('botaoVerd', 'Imagens/botao2.png');
        this.load.image('abrir', 'Imagens/abrir.png');
        this.load.image('prancheta', 'Imagens/prancheta.png');
        this.load.image('cientista1', 'Imagens/cientista1.png');
        this.load.image('cientista2', 'Imagens/cientista2.png');
        this.load.image('cientista3', 'Imagens/cientista3.png');
        this.load.image('vai-rolar', 'Imagens/vai-comecar.png');
        this.load.image('discurso', 'Imagens/discurso.png');
        this.load.spritesheet('general', 'Imagens/general.png', {frameWidth: 230,frameHeiight: 270});

    }

    create(){
        // fundo
        //this.add.image(400,350, 'fundoPreto');
        this.comecar = this.add.image(520, 600, 'vai-rolar' );
        this.discurso = this.add.image(520, 970, 'discurso');
        

        this.anims.create({
            key: 'generalFala',
            frames: this.anims.generateFrameNumbers('general', {start: 0, end:1, first: 0}),
            frameRate: 7,
            repeat: -1,
        });
        
        this.general = this.add.sprite(160,300, 'general');
        this.general.anims.play('generalFala');


    }

    update(){

        if(this.discurso.y > -250){
            this.discurso.y -= 0.7;
        } else {
            this.scene.start('CenaJogo');
        }


    }
}
