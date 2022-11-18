import { Component } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';

@Component({
	selector: 'app-root',
	templateUrl: './app.component.html',
	styleUrls: ['./app.component.sass']
})
export class AppComponent {
	localStorage: Storage = window.localStorage;
	languages = {
		codes: ["en", "de", "fr", "owo"],
		names: ["English", "Deutsch <3", "Français", "Fuwwy :3"]
	}

	setLanguage(lang: string): void {
		this.translate.use(lang)
		this.localStorage.setItem("lang", lang);
	}

	constructor(
		public translate: TranslateService
	) { 
		//translate.setDefaultLang("en");
		translate.addLangs(this.languages.codes);
		translate.use(this.localStorage.getItem("lang") || "en");
	}
}
