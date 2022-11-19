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
	selectedCity?: City
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
				localStorage.setItem("authTime", response.validTo.toString());
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
		localStorage.removeItem("authTime");
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

	addCity(name: string, isPublic: boolean) {
		const city: City = new City(name, isPublic);

		this.brotherhood.createCity(city).subscribe(
			(response: HttpResponse<City[]>) => {
				this.helper.message(`Successfully added city '${city.name}'.`);
				this.refreshCities();
				this.uiState = "none";
			},
			(errorResponse: HttpErrorResponse) => {
				this.helper.httpError(`Failed to add city`, errorResponse);
			}
		)
	}

	addCityAssassin(owner?: string, city?: City) {
		if (!owner) {
			this.helper.message("Please enter an assassin name.");
			return;
		}

		if (!city) {
			this.helper.message("Something went wrong. Please retry.");
			return;
		}

		this.brotherhood.shareCity(city, owner).subscribe(
			(response: HttpResponse<City[]>) => {
				this.helper.message(`Successfully assigned ${owner} to ${city.name}.`);
				this.uiState = "none";
			},
			(errorResponse: HttpErrorResponse) => {
				this.helper.httpError(`Failed to assign ${owner} to ${city.name}`, errorResponse);
			}
		)
	}

	nukeCity(city?: City) {
		this.brotherhood.deleteCity(city?.id).subscribe(
			(response: HttpResponse<City[]>) => {
				this.helper.message(`Successfully unregistered ${city?.name}.`);
				this.refreshCities();
			},
			(errorResponse: HttpErrorResponse) => {
				this.helper.httpError(`Failed to remove ${city?.name}`, errorResponse);
			}
		)
	}

	selectCity(city: City) {
		this.selectedCity = city;
		this.uiState = "addCityOwner";
	}

	constructor(
		private brotherhood: BrotherhoodService,
		private helper: HelperService
	) {
		if (localStorage.getItem("authKey"))
			this.isLoggedIn = true;

		let validToStr = localStorage.getItem("authTime");

		if (validToStr && new Date() > new Date(validToStr))
			this.logout();

		this.refreshCities();
	}
}
