// Function to show the decimals you want
var formatNumber = {
    separador: ".", // thousands
    sepDecimal: ',', // decimals
    formatear: function (num) {
        num += '';
        var splitStr = num.split('.');
        var splitLeft = splitStr[0];
        var xright = splitStr[1] < 10 ? splitStr[1] * 10 : splitStr[1];
        var splitRight = splitStr.length > 1 ? this.sepDecimal + xright : this.sepDecimal + '00';
        var regx = /(\d+)(\d{3})/;
        while (regx.test(splitLeft)) {
            splitLeft = splitLeft.replace(regx, '$1' + this.separador + '$2');
        }
        return this.simbol + splitLeft + splitRight;
    },
    new: function (num, simbol) {
        this.simbol = simbol || '';
        return this.formatear(num);
    }
}

class Card {
  constructor(idcard, imgprov, tipocrd, cnumber, nombres, monto) {
    // Initialize variables
    this.padre = '';
    this.idcard = idcard;
    this.imgprov = imgprov;
    this.tipocrd = tipocrd;
    this.msjtipo = (tipocrd=='giftcard') ? 'Gift card' : 'Prepaid card';
    this.cnumber = cnumber;
    this.numcard = cnumber.substr(0,4)+' '+cnumber.substr(4,4)+' '+cnumber.substr(8,4)+' '+cnumber.substr(12,4);
    this.nombres = nombres;
    let fecha = new Date();
    let month = fecha.getMonth()+1;
    month = (month < 10) ? '0'+month : month ;
    let year = fecha.getFullYear()+1;
    let cfecha = month+'/'+year;
    this.validez = "Valida hasta: "+cfecha;
    this.icongft = (tipocrd=='giftcard') ? "./ico.jpg" : "./monedas.png";
    this.saldo = parseFloat(monto);
  }

  dibuja(padre) {
    this.padre = padre;
    // Create objects
    // auxiliars variables
    const ancho = '340px';
    // height is width * .65
    const alto = '221px';
    // Create card base
    let card = document.createElement("div");
    card.id = this.idcard;
    card.style.width = ancho;
    card.style.height = alto;
    card.style.margin = 'auto';
    card.style.position = 'relative';
    card.style.top = '10%';
    card.style.borderRadius = '6%';
    card.style.display = 'flex';
    card.style.flexDirection = 'column';
    card.style.justifyContent = 'space-between';
    card.style.background = (this.tipocrd=='prepago') ? 'black' : 'white' ;
    card.style.color = (this.tipocrd=='prepago') ? 'white' : 'black' ;
    card.style.border = (this.tipocrd=='prepago') ? 'solid 2px white' : 'solid 2px black' ;

        // border
        let card2 = document.createElement("div");
        card2.style.border = (this.tipocrd=='prepago') ? 'solid 2px white' : 'solid 2px black' ;
        card2.style.margin = '5px';
        card2.style.borderRadius = '5%';
        card2.style.height = '94%';

            // logo and logo area
            let area_logo = document.createElement("div");
            area_logo.style.width = '30%';
            area_logo.style.height = '20%';
            area_logo.style.top = '5px';
            area_logo.style.left = '5px';
            area_logo.style.position = 'relative';
            area_logo.style.padding = '2% 0 0 2%';
                let img_logo = document.createElement("img");
                img_logo.style.width = '90%';
                img_logo.style.height = 'auto';
                img_logo.src = this.imgprov;
            area_logo.appendChild(img_logo);

            // card body
            let cuerpo = document.createElement("div");
            cuerpo.style.display = 'flex';
            cuerpo.style.flexDirection = 'column';
            cuerpo.style.alignItems = 'flex-end';
            cuerpo.style.marginRight = '7.5px';
                // type
                let tipo = document.createElement("span");
                tipo.style.fontSize = '100%';
                let txttipo = document.createTextNode(this.msjtipo);
                tipo.appendChild(txttipo);
                // number
                let numero = document.createElement("span");
                numero.style.fontSize = '120%';
                let txtnumero = document.createTextNode(this.numcard);
                numero.appendChild(txtnumero);
                // name
                let nombre = document.createElement("span");
                nombre.style.fontSize = '100%';
                let txtnombre = document.createTextNode(this.nombres);
                nombre.appendChild(txtnombre);
                // expire date
                let valida = document.createElement("span");
                valida.style.fontSize = '80%';
                let txtvalida = document.createTextNode(this.validez);
                valida.appendChild(txtvalida);

            cuerpo.appendChild(tipo);
            cuerpo.appendChild(numero);
            cuerpo.appendChild(nombre);
            cuerpo.appendChild(valida);

            // downpart card
            let debajo = document.createElement("div");
            debajo.style.display = 'flex';
            debajo.style.flexDirection = 'row';
            debajo.style.justifyContent = 'space-between';
            debajo.style.marginTop = '-3%';
            debajo.style.height = '40%';
                // QR area
                let area_qr = document.createElement("div");
                area_qr.style.width = '25%';
                area_qr.style.height = 'auto';
                area_qr.style.position = 'relative';
                area_qr.style.bottom = '-25px';
                area_qr.style.padding = '0 0 2% 15%';
                // balance
                let saldo = document.createElement("span");
                saldo.id = 'saldoTarjeta';
                saldo.style.fontSize = '120%';
                let txtsaldo = document.createTextNode('Saldo: '+formatNumber.new(this.saldo));
                saldo.appendChild(txtsaldo);
                area_qr.appendChild(saldo);

                // giftcard icon 
                let area_ico = document.createElement("div");
                area_ico.style.width = '15%';
                area_ico.style.height = 'auto';
                area_ico.style.position = 'relative';
                area_ico.style.bottom = '-30px';
                area_ico.style.padding = '0 5% 2% 0';
                    let img_gift = document.createElement("img");
                    img_gift.style.width = '100%';
                    img_gift.style.height = 'auto';
                    img_gift.src = this.icongft;
                area_ico.appendChild(img_gift);
            debajo.appendChild(area_qr);
            debajo.appendChild(area_ico);

        card2.appendChild(area_logo);
        card2.appendChild(cuerpo);
        card2.appendChild(debajo);
    card.appendChild(card2);

    // Place card where wal called
    document.getElementById(this.padre).appendChild(card);
    document.getElementById(this.padre).style.display = "block";
  }

  refrescaSaldo() {
    saldoTarjeta.innerHTML = "Saldo: "+formatNumber.new(this.saldo);
  }

  actualizaSaldo(monto) {
    this.saldo += monto;
    this.refrescaSaldo();
  }
}