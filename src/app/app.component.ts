import { Component } from '@angular/core';
import { Assassin } from './models/assassin.model';
import { City } from './models/city.model';
import { BrotherhoodService } from './services/brotherhood.service';
import { HelperService } from './services/helper.service';
import { HttpErrorResponse, HttpResponse } from '@angular/common/http';
import { Auth } from './models/auth.interface';
import { trigger, style, animate, transition } from '@angular/animations';


@Component({
	selector: 'app-root',
	templateUrl: './app.component.html',
	styleUrls: ['./app.component.sass'],
	animations: [
		trigger(
			"inOutAnimation",
			[
				transition(
					":enter",
					[
						style({ scale: 0.6, opacity: 0 }),
						animate('0.7s ease-out',
							style({ scale: 1, opacity: 1 }))
					]
				),
				transition(
					':leave',
					[
						style({ scale: 1, opacity: 1 }),
						animate('0.3s ease-in',
							style({ scale: 0.6, height: 0, opacity: 0 }))
					]
				)
			]
		)
	]
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
			(errorResponse: HttpErrorResponse) => {
				this.helper.httpError(`Authentication invalid`, errorResponse);
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

		console.log(user)
		this.brotherhood.register(user).subscribe(
			(response: HttpResponse<void>) => {
				this.helper.message(`Successfully registered as '${user.username}'.`);
				this.uiState = "none";
			},
			(errorResponse: HttpErrorResponse) => {
				this.helper.httpError(`Failed to register user`, errorResponse);
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
			(errorResponse: HttpErrorResponse) => {
				this.helper.httpError(`Cannot connect to database. Is the API server running?`, errorResponse);
			}
		);
	}

	addCity() {
		this.brotherhood.createCity(this.currentCity).subscribe(
			(response: HttpResponse<City[]>) => {
				this.helper.message(`Successfully added city '${this.currentCity.name}'.`);
				this.refreshCities();
				this.uiState = "none";
			},
			(errorResponse: HttpErrorResponse) => {
				this.helper.httpError(`Failed to add city`, errorResponse);
			}
		)
	}


	nukeCity(id?: number) {
		this.brotherhood.deleteCity(id).subscribe(
			(response: HttpResponse<City[]>) => {
				this.helper.message(`Successfully removed city.`);
				this.refreshCities();
			},
			(errorResponse: HttpErrorResponse) => {
				this.helper.httpError(`Failed to remove city (${errorResponse.status}):`, errorResponse.error.errors);
			}
		)
	}

	selectCity(city: City) {
		this.helper.message(`This action is unimplemented.`, "UWU");
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
