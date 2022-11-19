import { Component } from '@angular/core';
import { Assassin } from './models/assassin.model';
import { City } from './models/city.model';
import { BrotherhoodService } from './services/brotherhood.service';
import { HelperService } from './services/helper.service';
import { HttpErrorResponse, HttpResponse } from '@angular/common/http';
import { Auth } from './models/auth.interface';

@Component({
	selector: 'app-root',
	templateUrl: './app.component.html',
	styleUrls: ['./app.component.sass']
})
export class AppComponent {
	cities: City[] = []
	currentCity: City = new City("", false)
	uiState: string = "none"
	isLoggedIn: boolean = false

	login(username: string, password: string) {
		let user: Assassin = new Assassin;
		user.username = username;
		user.password = password;

		this.brotherhood.login(user).subscribe(
			(response: Auth) => {
				if (!response)
					return;

				this.localStorage.setItem("authKey", response.token);
				this.helper.message(`Logged in as '${user.username}'.`);
				this.isLoggedIn = true;
				this.uiState = "none";
			},
			(error: HttpErrorResponse) => {
				this.helper.error(`Authentication invalid (error ${error.status}).`, error.message);
			}
		);
	}

	logout() {
		this.localStorage.removeItem("authKey");
		this.helper.message("Logged out.");
		this.isLoggedIn = false;
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

		this.brotherhood.register(user).subscribe(
			(response: HttpResponse<void>) => {
				this.helper.message(`Successfully registered as '${user.username}'.`);
				this.uiState = "none";
			},
			(error: HttpErrorResponse) => {
				this.helper.error(`Failed to register user (error ${error.status}).`, error.message);
			}
		);
	}

	refreshCities() {
		this.brotherhood.getCities().subscribe(
			(response: HttpResponse<City[]>) => {
				if (!response.body) {
					this.helper.message("Could not fetch cities from the database.");
					return;
				}

				this.cities = response.body;
			},
			(error: HttpErrorResponse) => {
				this.helper.error(`Cannot connect to database. Is the API server running?`, error.message);
			}
		);
	}

	addCity() {
		this.brotherhood.createCity(this.currentCity).subscribe((response: void) => {
			console.log(response);
			this.refreshCities();
			this.uiState = "none";
		});
	}

	nukeCity(id?: number) {
		this.brotherhood.deleteCity(id).subscribe((response: void) => {
			console.log(response);
			this.refreshCities();
		});
	}

	selectCity(city: City) {
		this.helper.message(`This action is unimplemented. OwO.`);
	}

	private localStorage: Storage = window.localStorage;

	constructor(
		private brotherhood: BrotherhoodService,
		private helper: HelperService
	) {
		if (this.localStorage.getItem("authKey"))
			this.isLoggedIn = true;

		this.refreshCities();
	}
}
