export class Personagem{
    constructor(cena,x, y,nome, sprite, fala, spriteOver, ehEt){
        this.cena = cena;
        this.nome = nome; 
        this.spriteName = sprite;
        this.spriteOver = spriteOver;
        this.sprite = cena.physics.add.sprite(x,y, sprite);
        this.fala = fala;
        this.ehEt = ehEt;
        //cena.add.sprite(x, y, fala).setVisible(false);
    }

}

