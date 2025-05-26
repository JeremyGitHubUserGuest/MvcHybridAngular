import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'lang-selector-app-root',
  imports: [CommonModule],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})

export class AppComponent {
  title = 'lang-selector';
  currentLang: 'fr' | 'en' = 'fr';
  label: string = 'English';

  constructor() {
    this.currentLang = this.getLangFromCookie();
    this.updateLabel();
  }

  // Lit la valeur du cookie "lang"
  private getLangFromCookie(): 'fr' | 'en' {
    const match = document.cookie.match(/(?:^|;\s*)lang=([a-zA-Z]{2})/);
    const lang = match ? match[1].toLowerCase() : 'fr';
    return lang === 'en' ? 'en' : 'fr';
  }

  // Met à jour le label selon la langue courante
  private updateLabel() {
    this.label = this.currentLang === 'en' ? 'Français' : 'English';
  }

  // Change la langue et recharge la page avec le bon préfixe d'URL
  switchLang(lang: 'fr' | 'en') {
    if (lang === this.currentLang) return;
    // Met à jour le cookie
    document.cookie = `lang=${lang};path=/;max-age=31536000`;
    // Redirige vers la même page avec le préfixe de langue
    const path = window.location.pathname;
    const regex = /^\/(fr|en)(\/|$)/i;
    let newPath: string;
    if (regex.test(path)) {
      newPath = path.replace(regex, `/${lang}/`);
    } else {
      newPath = `/${lang}${path.startsWith('/') ? '' : '/'}${path}`;
    }
    window.location.pathname = newPath;
  }
}
