import { Component, OnInit } from '@angular/core';
import { Assassin } from './models/assassin.model';
import { Contract } from './models/contract.model';
import { BrotherhoodService } from './services/brotherhood.service';
import { HelperService } from './services/helper.service';
import { HttpErrorResponse, HttpResponse } from '@angular/common/http';
import { Auth } from './models/auth.interface';
import { trigger, style, animate, transition } from '@angular/animations';
import { ContractTarget } from './models/target.model';
import { City } from './models/city.model';

enum FormState {
	None,
	Login,
	Register,
	AddContract,
	AddContractOwner
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
				style({ opacity: 0, backdropFilter: "blur(0px)", scale: 1.25 }),
				animate('0.3s ease-out',
					style({ opacity: 1, backdropFilter: "blur(50px)", scale: 1 }))
			]),
			transition(':leave', [
				style({ opacity: 1, backdropFilter: "blur(50px)", scale: 1 }),
				animate('0.3s ease-in',
					style({ opacity: 0, backdropFilter: "blur(0px)", scale: 0.75 }))
			])
		])
	]
})
export class AppComponent {
	FormState = FormState;

	contracts: Contract[] = []
	cities: City[] = []
	showUserContracts: boolean = false
	selectedContract?: Contract
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

				this.refreshContracts();
			},
			(errorResponse: HttpErrorResponse) => {
				this.helper.httpError(`Authentication invalid`, errorResponse);
			}
		);
	}

	logout() {
		localStorage.removeItem("authKey");
		localStorage.removeItem("authTime");
		this.showUserContracts = false;
		this.helper.message("Logged out.");
		this.isLoggedIn = false;

		this.refreshContracts();
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

	refreshContracts() {
		let request = this.showUserContracts ? this.brotherhood.getMyContracts() : this.brotherhood.getContracts();

		this.contracts = [];

		request.subscribe(
			(response: HttpResponse<Contract[]>) => {
				if (!response.body) {
					this.helper.message("Could not fetch contracts from the database.");
					return;
				}

				this.contracts = response.body;
				console.info("Successfully fetched contracts from the database.");
			},
			(errorResponse: HttpErrorResponse) => {
				if (errorResponse.status === 0)
					this.helper.httpError("Could not connect to the database. Is the API server running?", errorResponse);
				else
					this.helper.httpError("Could not fetch contracts from the database.", errorResponse);
			}
		);
	}

	refreshCities() {
		this.cities = [];

		this.brotherhood.getCities().subscribe(
			(response: HttpResponse<City[]>) => {
				if (!response.body) {
					this.helper.message("Could not fetch cities from the database.");
					return;
				}

				this.cities = response.body;
				console.info("Successfully fetched cities from the database.");

				this.cities.forEach(city => {
					const name = city.name.toLowerCase();
					const cachedImage = localStorage.getItem("contractImg_" + name);

					if (cachedImage) {
						city.image = cachedImage;
					} else {
						this.brotherhood.getImageFromPlace(name).subscribe(
							(response: any) => {
								const url: string | null = response?.photos[0]?.image?.mobile;

								if (url) {
									city.image = url;
									localStorage.setItem("contractImg_" + name, url);
								} else {
									console.warn(`No image found for city '${name}'.`);
									console.log(response);
								}
							},
							(errorResponse: HttpErrorResponse) => {
								console.error(`Failed to fetch image for city '${name}', which will now be skipped.`);
								localStorage.setItem("contractImg_" + name, "https://images.rawpixel.com/image_social_landscape/cHJpdmF0ZS9sci9pbWFnZXMvd2Vic2l0ZS8yMDIyLTA2L2pvYjk0OC0yNTYtdi1sNDdyOXNoNC5qcGc.jpg");
							}
						);
					}
				})
			},
			(errorResponse: HttpErrorResponse) => {
				this.helper.httpError("Could not fetch cities from the database.", errorResponse);
			}
		);
	}

	addContract(name: string, city: City, isPublic: boolean) {
		const contract: Contract = new Contract(name, city, isPublic);

		this.brotherhood.createContract(contract).subscribe(
			(response: HttpResponse<Contract[]>) => {
				this.helper.message(`Successfully added contract '${contract.codename}'.`);
				this.refreshContracts();
				this.state = FormState.None;
			},
			(errorResponse: HttpErrorResponse) => {
				this.helper.httpError(`Failed to add contract`, errorResponse);
			}
		)
	}

	addContractAssassin(owner?: string, contract?: Contract) {
		if (!owner) {
			this.helper.message("Please enter an assassin name.");
			return;
		}

		if (!contract) {
			this.helper.message("Something went wrong. Please retry.");
			return;
		}

		this.brotherhood.shareContract(contract, owner).subscribe(
			(response: HttpResponse<Contract[]>) => {
				this.helper.message(`Successfully assigned ${owner} to ${contract.codename}.`);
				this.state = FormState.None;
			},
			(errorResponse: HttpErrorResponse) => {
				this.helper.httpError(`Failed to assign ${owner} to ${contract.codename}`, errorResponse);
			}
		)
	}

	nukeContract(contract?: Contract) {
		this.brotherhood.deleteContract(contract?.id).subscribe(
			(response: HttpResponse<Contract[]>) => {
				this.helper.message(`Successfully unregistered ${contract?.codename}.`);
				this.refreshContracts();
			},
			(errorResponse: HttpErrorResponse) => {
				this.helper.httpError(`Failed to remove ${contract?.codename}`, errorResponse);
			}
		)
	}

	selectContract(contract: Contract) {
		if (!this.isLoggedIn)
			this.helper.message("Please log in to assign assassins to contracts.");

		this.brotherhood.getTargetsInContract(contract.id!).subscribe(
			(response: HttpResponse<ContractTarget[]>) => {
				this.selectedContract = contract;

				if (!response.body) {
					this.helper.message("Could not fetch targets from the database.");
					return;
				}

				this.selectedContract.targets = response.body;
			},
			(errorResponse: HttpErrorResponse) => {
				this.helper.httpError(`Failed to get assassination targets within ${contract?.codename}`, errorResponse);
			}
		);

		// this.uiState = "addContractOwner"; TODO: Reimplement
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

		this.refreshContracts();

	}
}
