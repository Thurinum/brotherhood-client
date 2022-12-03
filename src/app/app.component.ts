import { Component } from '@angular/core';
import { Contract } from './models/contract.model';
import { BrotherhoodService } from './services/brotherhood.service';
import { HelperService } from './services/helper.service';
import { HttpErrorResponse, HttpResponse } from '@angular/common/http';
import { ContractTarget } from './models/target.model';
import { City } from './models/city.model';
import { AppState, AppStateService } from './services/appstate.service';
import { ZoomAnimation, FormAnimation } from './animations';



@Component({
	selector: 'app-root',
	templateUrl: './app.component.html',
	styleUrls: ['./app.component.sass'],
	animations: [FormAnimation, ZoomAnimation]
})
export class AppComponent {
	AppState = AppState;

	get isLoggedIn() {
		return this.app.isLoggedIn;
	}
	get user() {
		return this.app.isLoggedIn ? this.app.user : undefined;
	}
	get state() {
		return this.app.state;
	}
	set state(state: AppState) {
		this.app.state = state;
	}

	contracts: Contract[] = []
	cities: City[] = []
	targets: ContractTarget[] = []
	showUserContracts: boolean = false
	selectedContract?: Contract
	assignedContract?: Contract
	selectedTarget?: ContractTarget
	storage: Storage = window.localStorage

	logout() {
		localStorage.removeItem("authKey");
		localStorage.removeItem("authTime");
		localStorage.removeItem("authUser");
		this.showUserContracts = false;
		this.helper.message("Logged out successfully.");
		this.app.isLoggedIn = false;

		this.refreshContracts();
	}

	refreshContracts() {
		let request = this.showUserContracts ? this.brotherhood.getPrivateContracts() : this.brotherhood.getPublicContracts();

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

	refreshContractTargets() {
		this.targets = [];

		this.brotherhood.getAllContractTargets().subscribe(
			(response: HttpResponse<ContractTarget[]>) => {
				if (!response.body) {
					this.helper.message("Could not fetch contract targets from the database.");
					return;
				}

				this.targets = response.body;
				console.info("Successfully fetched contract targets from the database.");
			},
			(errorResponse: HttpErrorResponse) => {
				if (errorResponse.status === 0)
					this.helper.httpError("Could not connect to the database. Is the API server running?", errorResponse);
				else
					this.helper.httpError("Could not fetch contract targets from the database.", errorResponse);
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

	selectContract(contract: Contract) {
		this.brotherhood.getContractTargets(contract.id!).subscribe(
			(response: HttpResponse<ContractTarget[]>) => {
				this.selectedContract = contract;

				if (!response.body) {
					this.helper.message("Could not fetch targets from the database.");
					return;
				}

				this.selectedContract.city = this.cities.find(city => city.id === this.selectedContract?.cityId)!;
				this.selectedContract.targets = response.body;
			},
			(errorResponse: HttpErrorResponse) => {
				this.helper.httpError(`Failed to get assassination targets within ${contract?.codename}`, errorResponse);
			}
		);
	}

	selectContractTarget(target: ContractTarget) {
		if (!this.isLoggedIn)
			return;

		this.selectedTarget = target;
		this.state = AppState.UpdateContractTarget;
	}

	nukeContract(contract?: Contract) {
		this.brotherhood.deleteContract(contract?.id).subscribe(
			(response: HttpResponse<Contract[]>) => {
				this.helper.message(`Successfully ended contract ${contract?.codename}.`);
				this.refreshContracts();
				this.selectedContract = undefined;
			},
			(errorResponse: HttpErrorResponse) => {
				this.helper.httpError(`Failed to remove ${contract?.codename}`, errorResponse);
			}
		)
	}

	changeTab(index: number) {
		if (index > 1)
			this.selectedContract = undefined;
	}

	constructor(
		private brotherhood: BrotherhoodService,
		private app: AppStateService,
		private helper: HelperService,
	) {
		const user = localStorage.getItem("authUser");
		if (user && localStorage.getItem("authKey")) {
			this.app.isLoggedIn = true;
			this.app.user = user;
		}

		let validToStr = localStorage.getItem("authTime");

		if (validToStr && new Date() > new Date(validToStr)) {
			this.logout();
			this.helper.message("Your session has expired. Please log in again.");
		}

		this.refreshContracts();
		this.refreshContractTargets();
		this.refreshCities();

		window.addEventListener("keydown", (e) => {
			if (e.key === "Escape")
				this.state = AppState.None;
		})
	}
}
