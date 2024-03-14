export class Personagem{
    constructor(cena,x, y,sprite, fala, carteira){
        this.cena = cena;
        this.sprite = cena.physics.add.sprite(x,y, sprite);
        this.carteira = cena.add.sprite(x, y, carteira).setVisible(false);
        this.fala = cena.add.sprite(x, y, fala).setVisible(false);
    }

    mostraCarteira(x,y){
        this.carteira.setPosition(x, y).setVisible(true);
    }

}

