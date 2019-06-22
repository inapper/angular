import { Component, ElementRef, ViewChild } from '@angular/core';
import * as htmlExample from './example'
import { HttpClient } from '@angular/common/http';
import * as FileSaver from 'file-saver';

@Component({
  selector: 'my-app',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {

  tabDefault = { text: null };
  htmlContent: any;
  cssContent: any;
  name = 'LOREM IPSUM';
  tabs = [];
  tabsCount = 2;
  constructor(private http: HttpClient,
    private _elementRef: ElementRef) {
    this.render();
  }

  getFile(filename) {
    return new Promise((resolve, reject) => {
      this.http.get(filename, { responseType: 'text' })
        .subscribe(data => {
          resolve(data);
        }, (error => {
          reject(error);
        }));
    })
  }

  tabsCountUpdate() {
    let newTabsCount = [{}];
    for (let i = 1; i < this.tabsCount; i++) {
      newTabsCount.push(this.tabDefault)
    }
    this.tabs = newTabsCount;
  }

  test() {
    console.log(this.tabs);
  }

  async render() {

    let response = { error: false, result: null }

    await this.getFile('assets/example.html')
      .then(result => Object.assign(response, { result }))
      .catch(result => Object.assign(response, { error: true, result }))
    //this.htmlContent = response.result;


    const html = '<main class="inapp">' +
      '        <a href="adbinapp://cancel" class="inapp__close"></a>' +
      '        <section class="steps">' +
      '            <section class="step is-highlighted is-active">' +
      '                <div class="step__container">' +
      '                    <h2 class="step__title">' +
      '                        <span>Buscando melhorar sua</span>' +
      '                        <span>vida financeira?</span>' +
      '                        <span class="step__title--icon"></span>' +
      '                    </h2>' +
      '                    <p class="step__description">' +
      '                        Conte com a gente ;) <br>' +
      '                        Nos próximos meses, o Itaú vai sempre trazer uma dica pra você aqui no app. Vamos nessa?' +
      '                    </p>' +
      '                </div>' +
      '            </section>' +
      '            <section class="step">' +
      '                <div class="step__container">' +
      '                    <h2 class="step__title">monitore tudo que entra e sai da sua conta aqui no app.</h2>' +
      '                    <div class="step__description-wrap">' +
      '                        <p class="step__description">' +
      '                            Acompanhando seus gastos e ganhos mensais na tela do extrato, você identifica despesas desnecessárias.' +
      '                        </p>' +
      '                        <img src="https://www.itau.com.br/_arquivosestaticos/Itaumail/campanhas/app_full_evolucao/educacao-financeira/emkt-01/icon-1.jpg" alt="" class="step_icon" width="67" height="67">' +
      '                    </div>' +
      '                </div>' +
      '            </section>' +
      '            <section class="step">' +
      '                <div class="step__container">' +
      '                    <h2 class="step__title">no fim do mês, você economiza sem nem perceber.</h2>' +
      '                    <div class="step__description-wrap">' +
      '                        <p class="step__description">' +
      '                            Transforme essa dica em hábito e veja sua vida financeira sempre saudável ;)' +
      '                        </p>' +
      '                        <img src="https://www.itau.com.br/_arquivosestaticos/Itaumail/campanhas/app_full_evolucao/educacao-financeira/emkt-01/icon-2.jpg" alt="" class="step_icon" width="67" height="67">' +
      '                    </div>' +
      '                </div>' +
      '                <a href="adbinapp://confirm/?url=itauvarejo://extrato" role="button" title="Acompanhar extrato" class="step__cta">Acompanhar extrato</a>' +
      '            </section>' +
      '        </section>' +
      '        <span class="step__bullet is-highlighted">' +
      '            <span class="step__bullet-dot is-active"></span>' +
      '            <span class="step__bullet-dot"></span>' +
      '            <span class="step__bullet-dot"></span>' +
      '        </span>' +
      '    </main>';


    const url = this.getGeneratedPageURL({
      html,
      css: htmlExample.default.style,
      js: htmlExample.default.script
    })
    document.querySelector('iframe').src = url;

    let shazamCarai = null;
    await this.getFile(url)
      .then(result => shazamCarai = result)
      .catch(error => error)
    const now = this.getFormattedTime();

    FileSaver.saveAs(
      new File([shazamCarai], "generator ".concat(now), { type: "text/html;charset=utf-8" })
    );
  }

  getFormattedTime() {
    var today = new Date();
    var y = today.getFullYear().toString();
    var m = (today.getMonth() + 1).toString();
    var d = today.getDate().toString();
    var h = today.getHours().toString();
    var mi = today.getMinutes().toString();
    var s = today.getSeconds().toString();

    return y.concat(m.concat(d.concat(h.concat(mi.concat(s)))));
  }

  generateHTML() {

  }

  getGeneratedPageURL = ({ html, css, js }) => {
    const getBlobURL = (code, type) => {
      const blob = new Blob([code], { type })
      return URL.createObjectURL(blob)
    }

    const cssURL = getBlobURL(css, 'text/css')
    const jsURL = getBlobURL(js, 'text/javascript')

    console.log(css);

    const source = `
    <html>
        <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <meta http-equiv="X-UA-Compatible" content="ie=edge">
    <title>InApp</title>
    <link href='https://fonts.googleapis.com/css?family=Roboto' rel='stylesheet'>
      <head>
      <style>
      ${css}
      </style>
            <meta name="ADBMessageAssets" content="
        ['https://www.itau.com.br/_arquivosestaticos/Itaumail/campanhas/app_full_evolucao/educacao-financeira/emkt-01/sprite.png', 'sprite.png'],
        ['https://www.itau.com.br/_arquivosestaticos/Itaumail/campanhas/app_full_evolucao/educacao-financeira/emkt-01/icon-1.jpg', 'icon-1.jpg'],
        ['https://www.itau.com.br/_arquivosestaticos/Itaumail/campanhas/app_full_evolucao/educacao-financeira/emkt-01/icon-2.jpg', 'icon-2.jpg'],
        ['https://www.itau.com.br/_arquivosestaticos/Itaumail/campanhas/app_full_evolucao/educacao-financeira/emkt-01/icon-search.jpg', 'icon-search.jpg']
    "/>
      </head>
      <body>
        ${html || ''}
        <script>
        ${js}
        </script>
      </body>
    </html>
  `

    return getBlobURL(source, 'text/html')
  }

}
