import { Component } from '@angular/core';
import * as htmlExample from './example'
import { HttpClient } from '@angular/common/http';
import * as FileSaver from 'file-saver';

@Component({
  selector: 'my-app',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {

  tabDefault = { text: null, title: null };
  tabs = [];
  urlDemo = '';
  constructor(private http: HttpClient) {
    this.addTab();
  }

  getFile(filename: string) {
    return new Promise((resolve, reject) => {
      this.http.get(filename, { responseType: 'text' })
        .subscribe(data => {
          resolve(data);
        }, (error => {
          reject(error);
        }));
    })
  }

  async render() {
    const { tabs } = this;

    const section = `
    <section class="step FIRST">
        <div class="step__container">
            <h2 class="step__title">TITLE</h2>
            <div class="step__description-wrap">
                <p class="step__description">
                    TEXT
                </p>
                <img src="https://www.itau.com.br/_arquivosestaticos/Itaumail/campanhas/app_full_evolucao/educacao-financeira/emkt-01/icon-1.jpg" alt="" class="step_icon" width="67" height="67">
            </div>
        </div>
    </section>`;

    let sections = '';
    for (let index = 0; index < tabs.length; index++) {
      const element = tabs[index];
      const first = (index == 0) ? 'is-highlighted is-active' : 'shazamClass';
      sections += this.replaceCumulative(section, ['FIRST', 'TITLE', 'TEXT'], [first, element.title, element.text]);
    }

    const html = `<main class="inapp">
        <a href="adbinapp://cancel" class="inapp__close"></a>
        <section class="steps">
            ${sections}
        </section>
        <span class="step__bullet is-highlighted">
            <span class="step__bullet-dot is-active"></span>
            <span class="step__bullet-dot"></span>
            <span class="step__bullet-dot"></span>
        </span>
    </main>`;


    const url = this.getGeneratedPageURL({
      html,
      css: htmlExample.default.style
    });

    this.urlDemo = url;
  }

  addTab() {
    this.tabs.push({ text: '', title: '' });
    this.render();
  }

  removeTab(index) {
    this.tabs = this.tabs.filter((_, i) => i !== index);
    this.render();
  }

  async downloadHtml() {
    let html = null;

    await this.getFile(this.urlDemo)
      .then(result => html = result)
      .catch(error => error);

    const now = this.getFormattedTime();

    FileSaver.saveAs(
      new File([html], "in-app-".concat(now), { type: "text/html;charset=utf-8" })
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

  getGeneratedPageURL = ({ html, css }) => {
    const getBlobURL = (code, type) => {
      const blob = new Blob([code], { type })
      URL.revokeObjectURL
      return URL.createObjectURL(blob);
    }

    const source = this.replaceCumulative(htmlExample.default.source, ['CSS', 'HTML'], [css, html]);

    return getBlobURL(source, 'text/html')
  }

  replaceCumulative(str, find, replace) {
    for (var i = 0; i < find.length; i++)
      str = str.replace(new RegExp(find[i], "g"), replace[i]);
    return str;
  };

}
