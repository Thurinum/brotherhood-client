import { Component } from '@angular/core';
import { Assassin } from './models/assassin.model';
import { City } from './models/city.model';
import { BrotherhoodService } from './services/brotherhood.service';
import { HelperService } from './services/helper.service';
import { HttpErrorResponse, HttpResponse } from '@angular/common/http';

@Component({
	selector: 'app-root',
	templateUrl: './app.component.html',
	styleUrls: ['./app.component.sass']
})
export class AppComponent {
	cities: City[] = [];
	currentCity: City = new City("", false);

	login(username: string, password: string) {
		let user: Assassin = new Assassin;
		user.username = username;
		user.password = password;

		this.brotherhood.login(user).subscribe((response: any) => {
			console.log(response);
			this.localStorage.setItem("authKey", response["token"]);
		});
	}

	register(
		username: string,
		email: string,
		password: string,
		passwordConfirm: string
	) {
		let user: Assassin = new Assassin;
		user.username = username;
		user.email = email;
		user.password = password;
		user.passwordConfirm = passwordConfirm;

		this.brotherhood.register(user).subscribe((response: any) => {
			console.log(response);
		});
	}

	refreshCities() {
		this.brotherhood.getCities().subscribe(
			(response: HttpResponse<City[]>) => {
				if (!response.body) {
					this.helper.popup("Could not fetch cities from the database.");
					return;
				}

				this.cities = response.body;
			},
			(error: HttpErrorResponse) => {
				this.helper.popup(`Cannot connect to database. Is the API server running?`);
				console.error(`Failed to connect to database:\n\n${error.message.toUpperCase()}`);
			});
	}

	addCity() {
		this.brotherhood.createCity(this.currentCity).subscribe((response: void) => {
			console.log(response);
			this.refreshCities();
		});
	}

	nukeCity(id?: number) {
		this.brotherhood.deleteCity(id).subscribe((response: void) => {
			console.log(response);
			this.refreshCities();
		});
	}

	private localStorage: Storage = window.localStorage;

	constructor(
		private brotherhood: BrotherhoodService,
		private helper: HelperService
	) {
		this.refreshCities();
	}
}
