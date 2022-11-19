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
	showUserCities: boolean = false
	currentCity: City = new City("", false)
	uiState: string = "none"
	isLoggedIn: boolean = false

	login(identifier: string, password: string) {
		let user: Assassin = new Assassin;

		// detect email (simple check for x@y)
		if (identifier.match(/^\S+@\S+$/)) {
			user.email = identifier;
		} else {
			user.username = identifier;
		}

		user.password = password;

		this.brotherhood.login(user).subscribe(
			(response: Auth) => {
				if (!response)
					return;

				localStorage.setItem("authKey", response.token);
				this.helper.message(`Logged in as '${identifier}'.`);
				this.isLoggedIn = true;
				this.uiState = "none";

				this.refreshCities();
			},
			(errorResponse: HttpErrorResponse) => {
				this.helper.httpError(`Authentication invalid`, errorResponse);
			}
		);
	}

	logout() {
		localStorage.removeItem("authKey");
		this.showUserCities = false;
		this.helper.message("Logged out.");
		this.isLoggedIn = false;

		this.refreshCities();
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
			(errorResponse: HttpErrorResponse) => {
				this.helper.httpError(`Failed to register user`, errorResponse);
			}
		);
	}

	refreshCities() {
		let request = this.showUserCities ? this.brotherhood.getMyCities() : this.brotherhood.getCities();

		request.subscribe(
			(response: HttpResponse<City[]>) => {
				if (!response.body) {
					this.helper.message("Could not fetch cities from the database.");
					return;
				}

				this.cities = response.body;
				console.info("Successfully fetched cities from the database.");
			},
			(errorResponse: HttpErrorResponse) => {
				this.helper.httpError(`Could not fetch cities from the database`, errorResponse);
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

	constructor(
		private brotherhood: BrotherhoodService,
		private helper: HelperService
	) {
		if (localStorage.getItem("authKey"))
			this.isLoggedIn = true;

		this.refreshCities();
	}
}
