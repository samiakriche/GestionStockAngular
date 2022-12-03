import { HttpClient } from '@angular/common/http';
import { CartOrder } from 'src/app/Shared/services/order.service';
import { Injectable } from '@angular/core';
import pdfMake from 'pdfmake/build/pdfmake';
import pdfFonts from 'pdfmake/build/vfs_fonts';
pdfMake.vfs = pdfFonts.pdfMake.vfs;

@Injectable({
  providedIn: 'root',
})
export class PdfMakerService {
  invoice: CartOrder;
  constructor(private http: HttpClient) {}
  // Use In Moment When Facture Craete
  generatePDF(invoices, client,send=false) {
    this.invoice = invoices;
    console.log('from pdf service  : ');

    console.log(client);
    console.log(this.invoice);

    let docDefinition = {
      content: [
        {
          text: 'FACTURE',
          fontSize: 20,
          bottom: 20,
          bold: true,
          alignment: 'left',
          decoration: 'underline',
          color: 'skyblue',
        },
        {
          margin: [0, 0, 0, 30],
          text: new Date().toDateString(),
          fontSize: 10,
          bottom: 20,
          alignment: 'left',
          color: 'gray',
        },
        {
          columns: [
            {
              text: 'Émetteur',
              bold: true,
              alignment: 'left',
              decoration: 'underline',
            },
            {
              text: 'Destinataire',
              bold: true,
              alignment: 'right',
              decoration: 'underline',
            },
          ],
        },
        {
          margin: [0, 0, 0, 30],
          columns: [
            [
              {
                margin: [0, 10, 0, 0],
                text: 'Ressorts Boughaz',
                bold: true,
                alignment: 'left',
              },
              { text: '15, zone indus de Martil TETOUAN MAROC', alignment: 'left' },
              { text: 'contact@RessortsBoughaz.ma', alignment: 'left' },
            ],
            [
              {
                margin: [0, 10, 0, 0],
                text: client.firstname,
                bold: true,
                alignment: 'right',
              },
              { text: client.address, alignment: 'right' },
              { text: client.email, alignment: 'right' },
              { text: client.phone, alignment: 'right' },
            ],
          ],
        },
        {
          text: 'Détail',
          style: 'sectionHeader',
        },
        {
          table: {
            headerRows: 1,
            widths: ['*', '*', '*', '*', '*'],
            body: [
              [
                { text: 'Id Produit', style: 'filledHeader' },
                { text: 'Prix unitaire HT', style: 'filledHeader' },
                { text: 'Quantite', style: 'filledHeader' },
                { text: 'TVA', style: 'filledHeader' },
                { text: 'Total HT', style: 'filledHeader' },
              ],
              ...this.invoice.lignes.map((p) => [
                p.idProduct,
                p.prixht,
                p.quantity,
                p.tva + '%',
                p.totalHT,
              ]),
            ],
          },
        },

        {
          margin: [0, 20, 0, 0],
          columns: [
            [
              { text: 'Total HT', style: 'totalstyle' },

              { text: 'Total TTC', style: 'totalstyle' },
            ],
            [
              {
                text:
                  this.invoice.lignes
                    .reduce((sum, p) => sum + p.totalHT, 0)
                    .toFixed(2) + 'DH',
                style: 'totalstyle2',
              },

              {
                text:
                  this.invoice.lignes
                    .reduce((sum, p) => sum + p.totalTTC, 0)
                    .toFixed(2) + 'DH',
                style: 'totalstyle2',
              },
            ],
          ],
        },
      ],
      styles: {
        filledHeader: {
          bold: true,
          fontSize: 14,
          color: 'white',
          fillColor: '#AAAAAA',
          alignment: 'center',
        },
        sectionHeader: {
          bold: true,
          decoration: 'underline',
          fontSize: 14,
          margin: [0, 15, 0, 15],
        },
        totalstyle: {
          bold: true,
          fontSize: 14,
          color: 'black',
          alignment: 'right',
        },
        totalstyle2: {
          bold: true,
          fontSize: 14,
          color: 'gray',
          alignment: 'right',
        },
      },
    };


    // pdfMake.createPdf(docDefinition).open();

    const pdfDocGenerator = pdfMake.createPdf(docDefinition);

    if(send){
      pdfDocGenerator.getBase64((data) => {
        let datos={'data':data};
        this.sendVieEmail({
          "to":client.email,
          "file":data
        });
        // this.sendVieEmail(JSON.stringify(datos));
      })
    }else{
      pdfDocGenerator.open();
    }

  }

  // Use In orderDetails component
  generateOrderpdf(order) {
    console.log('from pdf service  : ');
    console.log(order);

    let docDefinition = {
      content: [
        {
          text: 'FACTURE',
          fontSize: 20,
          bottom: 20,
          bold: true,
          alignment: 'left',
          decoration: 'underline',
          color: 'skyblue',
        },
        {
          margin: [0, 0, 0, 30],
          text: new Date().toDateString(),
          fontSize: 10,
          bottom: 20,
          alignment: 'left',
          color: 'gray',
        },
        {
          columns: [
            {
              text: 'Émetteur',
              bold: true,
              alignment: 'left',
              decoration: 'underline',
            },
            {
              text: 'Destinataire',
              bold: true,
              alignment: 'right',
              decoration: 'underline',
            },
          ],
        },
        {
          margin: [0, 0, 0, 30],
          columns: [
            [
              {
                margin: [0, 10, 0, 0],
                text: 'Ressorts Boughaz',
                bold: true,
                alignment: 'left',
              },
              { text: '15, zone indus de Martil TETOUAN MAROC', alignment: 'left' },
              { text: 'contact@RessortsBoughaz.ma', alignment: 'left' },
            ],
            [
              {
                margin: [0, 10, 0, 0],
                text: order.customer.firstname,
                bold: true,
                alignment: 'right',
              },
              { text: order.customer.address, alignment: 'right' },
              { text: order.customer.email, alignment: 'right' },
              { text: order.customer.phone, alignment: 'right' },
            ],
          ],
        },
        {
          text: 'Détail',
          style: 'sectionHeader',
        },
        {
          table: {
            headerRows: 1,
            widths: ['*', '*', '*', '*', '*'],
            body: [
              [
                { text: 'Produit', style: 'filledHeader' },
                { text: 'Prix unitaire HT', style: 'filledHeader' },
                { text: 'Quantite', style: 'filledHeader' },
                { text: 'TVA', style: 'filledHeader' },
                { text: 'Total HT', style: 'filledHeader' },
              ],
              ...order.orderProducts.map((p) => [
                p.product.name,
                p.prix_ht,
                p.quantity,
                p.tva + '%',
                p.totalHT,
              ]),
            ],
          },
        },

        {
          margin: [0, 20, 0, 0],
          columns: [
            [
              { text: 'Total HT', style: 'totalstyle' },

              { text: 'Total TTC', style: 'totalstyle' },
            ],
            [
              {
                text: order.totalht + 'DH',
                style: 'totalstyle2',
              },

              {
                text: order.total + 'DH',
                style: 'totalstyle2',
              },
            ],
          ],
        },
      ],
      styles: {
        filledHeader: {
          bold: true,
          fontSize: 14,
          color: 'white',
          fillColor: '#AAAAAA',
          alignment: 'center',
        },
        sectionHeader: {
          bold: true,
          decoration: 'underline',
          fontSize: 14,
          margin: [0, 15, 0, 15],
        },
        totalstyle: {
          bold: true,
          fontSize: 14,
          color: 'black',
          alignment: 'right',
        },
        totalstyle2: {
          bold: true,
          fontSize: 14,
          color: 'gray',
          alignment: 'right',
        },
      },
    };

    pdfMake.createPdf(docDefinition).open();
  }



  sendVieEmail(file){

    // let formData=new FormData();
    // formData.append('file', file);    
     return this.http.post(" http://localhost:8098/order/send",file).subscribe(
       res => console.log(res),
       err => console.log(err)
     );
  }
}
