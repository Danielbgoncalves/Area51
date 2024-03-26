export default class CenaFim extends Phaser.Scene{
    constructor(){
        super({
            key: 'CenaFim'
        });
    }

    init(data){
        this.EM = data.EM;
        this.HM = data.HM;
        this.EP = data.EP;
        this.HP = data.HP;
    }

    preload(){
        this.load.image('fimBom', 'Imagens/fundoBom.png');
        this.load.image('fimRuim', 'Imagens/fundoRuim.png');
        this.load.image('conq-psic', 'Imagens/conq-psic.png');
        this.load.image('conq-melh', 'Imagens/conq-melh.png');
        this.load.image('conq-pior', 'Imagens/conq-pior.png');
        this.load.image('conq-cora', 'Imagens/conq-cora.png');
        this.load.image('conq-ass', 'Imagens/conq-ass.png');
        this.load.image('fundoFim', 'Imagens/fundoFim.png');
        this.load.image('reload', 'Imagens/reload.png');
        
    }

    create(){
        
        let fimRuim = this.add.image(400, 350, 'fimRuim');
        fimRuim.setVisible(false);
        let fimBom = this.add.image(400, 350, 'fimBom');
        fimBom.setVisible(false);
        let fundoFim = this.add.image(400, 350, 'fundoFim');
        fundoFim.setVisible(true);
        let conqPs = this.add.image(100, 100, 'conq-psic');
        conqPs.setVisible(false);
        let conqMe = this.add.image(100, 100, 'conq-melh');
        conqMe.setVisible(false);
        let conqPi = this.add.image(100, 100, 'conq-pior');
        conqPi.setVisible(false);
        let conqCo = this.add.image(100, 100, 'conq-cora');
        conqCo.setVisible(false);
        let conqAs = this.add.image(100, 100, 'conq-ass');
        conqAs.setVisible(false);
        let botao = this.add.image(750, 650, 'reload');
        botao.setVisible(false);
        botao.setInteractive();

        this.time.delayedCall( 5000, ()=>{
            fundoFim.setVisible(false);
            botao.setVisible(true);
            if(this.HP === 0 && this.EP === 0){
                conqPs.setVisible(true);
            } else if(this.EP === 0 && this.HP === 2 ){ // 2 é o numero de humanos
                conqMe.setVisible(true);
            } else if(this.EM === 0 && this.HM === 0){
                conqCo.setVisible(true);
            } else if(this.HM != 0){
                conqAs.setVisible(true);
            } else if(this.EP != 0){
                conqPi.setVisible(true);
            }
        });

        botao.on('pointerover', function () {
            this.setTint(0xf07451);
        });
        botao.on('pointerout', function () {
            this.clearTint();
        });

        botao.on('pointerdown', ()=>{
            window.location.reload();
        });
        



        //Define se ganou ou perdeu
        if(this.EP != 0)
            fimRuim.setVisible(true);
        else 
            fimBom.setVisible(true);


    }

    update(){}
}