import { Component, OnInit } from '@angular/core';
import { Assassin } from './models/assassin.model';
import { City } from './models/city.model';
import { BrotherhoodService } from './services/brotherhood.service';
import { HelperService } from './services/helper.service';
import { HttpErrorResponse, HttpResponse } from '@angular/common/http';
import { Auth } from './models/auth.interface';
import { trigger, style, animate, transition } from '@angular/animations';
import { AssassinationTarget } from './models/target.model';

enum FormState {
	None,
	Login,
	Register,
	AddCity,
	AddCityOwner
}

@Component({
	selector: 'app-root',
	templateUrl: './app.component.html',
	styleUrls: ['./app.component.sass'],
	animations: [
		trigger("zoom-animation", [
			transition(":enter", [
				style({ opacity: 0, scale: 0.9, height: 0 }),
				animate('0.7s ease-out',
					style({ opacity: 1, scale: 1 }))
			]),
			transition(':leave', [
				style({ opacity: 1, scale: 1 }),
				animate('0.5s ease-in',
					style({ opacity: 0, scale: 0.9 }))
			])
		]),
		trigger("form-animation", [
			transition(":enter", [
				style({ opacity: 0, backdropFilter: "blur(0px)", scale: 0.95 }),
				animate('0.3s ease-out',
					style({ opacity: 1, backdropFilter: "blur(50px)", scale: 1 }))
			]),
			transition(':leave', [
				style({ opacity: 1, backdropFilter: "blur(50px)", scale: 1 }),
				animate('0.3s ease-in',
					style({ opacity: 0, backdropFilter: "blur(0px)", scale: 0.95 }))
			])
		])
	]
})
export class AppComponent {
	FormState = FormState;

	cities: City[] = []
	showUserCities: boolean = false
	selectedCity?: City
	state: FormState = FormState.None;
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
				this.state = FormState.None;

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
				this.state = FormState.None;
			},
			(errorResponse: HttpErrorResponse) => {
				this.helper.httpError(`Failed to register user`, errorResponse);
			}
		);
	}

	refreshCities() {
		let request = this.showUserCities ? this.brotherhood.getMyCities() : this.brotherhood.getCities();

		this.cities = [];

		request.subscribe(
			(response: HttpResponse<City[]>) => {
				if (!response.body) {
					this.helper.message("Could not fetch cities from the database.");
					return;
				}

				this.cities = response.body;
				console.info("Successfully fetched cities from the database.");

				this.cities.forEach(city => {
					const name = city.name.toLowerCase();
					const cachedImage = localStorage.getItem("cityImg_" + name);

					if (cachedImage) {
						city.image = cachedImage;
					} else {
						this.brotherhood.getImageFromPlace(name).subscribe(
							(response: any) => {
								const url: string | null = response?.photos[0]?.image?.mobile;

								if (url) {
									city.image = url;
									localStorage.setItem("cityImg_" + name, url);
								} else {
									console.warn(`No image found for city '${name}'.`);
									console.log(response);
								}
							},
							(errorResponse: HttpErrorResponse) => {
								console.error(`Failed to fetch image for city '${name}'. Image for city '${name}' will now be skipped.`);
								localStorage.setItem("cityImg_" + name, "https://images.rawpixel.com/image_social_landscape/cHJpdmF0ZS9sci9pbWFnZXMvd2Vic2l0ZS8yMDIyLTA2L2pvYjk0OC0yNTYtdi1sNDdyOXNoNC5qcGc.jpg");
							}
						);
					}
				})
			},
			(errorResponse: HttpErrorResponse) => {
				if (errorResponse.status === 0)
					this.helper.httpError("Could not connect to the database. Is the API server running?", errorResponse);
				else
					this.helper.httpError("Could not fetch cities from the database.", errorResponse);
			}
		);
	}

	addCity(name: string, isPublic: boolean) {
		const city: City = new City(name, isPublic);

		this.brotherhood.createCity(city).subscribe(
			(response: HttpResponse<City[]>) => {
				this.helper.message(`Successfully added city '${city.name}'.`);
				this.refreshCities();
				this.state = FormState.None;
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
				this.state = FormState.None;
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
		if (!this.isLoggedIn)
			this.helper.message("Please log in to assign assassins to cities.");

		this.brotherhood.getTargetsInCity(city.id!).subscribe(
			(response: HttpResponse<AssassinationTarget[]>) => {
				this.selectedCity = city;

				if (!response.body) {
					this.helper.message("Could not fetch targets from the database.");
					return;
				}

				this.selectedCity.targets = response.body;
			},
			(errorResponse: HttpErrorResponse) => {
				this.helper.httpError(`Failed to get assassination targets within ${city?.name}`, errorResponse);
			}
		);

		// this.uiState = "addCityOwner"; TODO: Reimplement
	}


	constructor(
		private brotherhood: BrotherhoodService,
		private helper: HelperService,
		// private carousel: Carousel
	) {
		if (localStorage.getItem("authKey"))
			this.isLoggedIn = true;

		let validToStr = localStorage.getItem("authTime");

		if (validToStr && new Date() > new Date(validToStr))
			this.logout();

		this.refreshCities();

	}
}
