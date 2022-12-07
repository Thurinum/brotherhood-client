import { Component } from '@angular/core';
import { Contract } from './models/contract.model';
import { BrotherhoodService } from './services/brotherhood.service';
import { HelperService } from './services/helper.service';
import { HttpErrorResponse, HttpResponse } from '@angular/common/http';
import { ContractTarget } from './models/target.model';
import { City } from './models/city.model';
import { AppState, AppStateService } from './services/appstate.service';
import { ZoomAnimation, FormAnimation } from './animations';
import { User as User } from './models/user.model';
import { Statistics } from './models/statistics.model';
import { lastValueFrom, Observable } from 'rxjs';

@Component({
	selector: 'app-root',
	templateUrl: './app.component.html',
	styleUrls: ['./app.component.sass'],
	animations: [FormAnimation, ZoomAnimation]
})
export class AppComponent {
	AppState = AppState;

	contracts: Contract[] = []
	cities: City[] = []
	targets: ContractTarget[] = []
	users: User[] = [];
	statistics?: Statistics

	showUserContracts: boolean = false
	selectedContract?: Contract
	assignedContract?: Contract
	selectedTarget?: ContractTarget
	storage: Storage = window.localStorage

	get selectedTargetImage() : string {
		return this.selectedTarget ? `https://localhost:5001/images/targets/lg/${this.selectedTarget.id}.webp` : "/assets/attract.webp";
	}

	get isLoggedIn() {
		return this.app.isLoggedIn;
	}

	get isLoading() {
		return this.app.isLoading;
	}

	set isLoading(isLoading: boolean) {
		this.app.isLoading = isLoading;
	}

	get user() {
		return this.app.isLoggedIn ? this.app.user : undefined;
	}
	get role() {
		return this.app.isLoggedIn ? this.app.role : undefined;
	}

	get state() {
		return this.app.state;
	}
	set state(state: AppState) {
		this.app.state = state;
	}

	get currentTab() {
		return this.storage.getItem('lastTabIndex') as any;
	}

	set currentTab(index: number) {
		this.storage.setItem('lastTabIndex', index.toString());

		if (index > 1)
			this.selectedContract = undefined;

		this.showUserContracts = index == 1 && this.isLoggedIn;
	}

	logout() {
		localStorage.removeItem("authKey");
		localStorage.removeItem("authTime");
		localStorage.removeItem("authUser");
		localStorage.removeItem("authRole");
		this.showUserContracts = false;
		this.helper.message("Logged out successfully.");
		this.app.isLoggedIn = false;
		this.currentTab = 0;

		this.refreshContracts();
	}

	refreshContracts() {
		console.log("Refreshing contracts...");
		this.isLoading = true;
		this.contracts = [];

		const request = this.showUserContracts ? this.brotherhood.getPrivateContracts() : this.brotherhood.getPublicContracts();

		request.subscribe(
			(response: HttpResponse<Contract[]>) => {
				if (!response.body) {
					this.helper.error("Failed to fetch contracts from the database.");
					return;
				}

				this.contracts = response.body;
				console.info("Successfully fetched contracts from the database.");
				this.refreshStatistics();
			},
			(errorResponse: HttpErrorResponse) => {
				this.isLoading = false;
				if (errorResponse.status === 0)
					this.helper.errorWhile("connecting to the database", errorResponse);
				else
					this.helper.errorWhile("fetching contracts from the database", errorResponse);
			}
		);
	}

	refreshContractTargets() {
		this.isLoading = true;
		this.targets = [];

		this.brotherhood.getAllContractTargets().subscribe(
			(response: HttpResponse<ContractTarget[]>) => {
				if (!response.body) {
					this.helper.error("Failed to fetch contract targets from the database.");
					return;
				}

				this.targets = response.body;
				console.info("Successfully fetched contract targets from the database.");
				this.refreshStatistics();
			},
			(errorResponse: HttpErrorResponse) => {
				this.isLoading = false;
				if (errorResponse.status === 0)
					this.helper.errorWhile("connecting to the database", errorResponse);
				else
					this.helper.errorWhile("fetching contract targets from the database", errorResponse);
			}
		);
	}

	refreshUsers() {
		this.isLoading = true;
		this.users = [];

		const request = this.role == "Mentor" ? this.brotherhood.getAllUsers() : this.brotherhood.getPublicUsers();
		request.subscribe(
			(response: HttpResponse<User[]>) => {
				if (!response.body) {
					this.helper.error("Failed to fetch users from the database.");
					return;
				}

				this.users = response.body;

				console.info("Successfully fetched users from the database.");
				this.refreshStatistics();
			},
			(errorResponse: HttpErrorResponse) => {
				this.isLoading = false;
				if (errorResponse.status === 0)
					this.helper.errorWhile("connecting to the database", errorResponse);
				else
					this.helper.errorWhile("fetching users from the database", errorResponse);
			}
		);
	}

	refreshCities() {
		this.isLoading = true;
		this.cities = [];

		this.brotherhood.getCities().subscribe(
			(response: HttpResponse<City[]>) => {
				if (!response.body) {
					this.helper.error("Failed to fetch cities from the database.");
					return;
				}

				this.cities = response.body;
				console.info("Successfully fetched cities from the database.");
				this.refreshStatistics();

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
								this.isLoading = false;
								console.warn(`Failed to fetch image for city '${name}', which will now be skipped.`);
								localStorage.setItem("contractImg_" + name, "https://images.rawpixel.com/image_social_landscape/cHJpdmF0ZS9sci9pbWFnZXMvd2Vic2l0ZS8yMDIyLTA2L2pvYjk0OC0yNTYtdi1sNDdyOXNoNC5qcGc.jpg");
							}
						);
					}
				})
			},
			(errorResponse: HttpErrorResponse) => {
				this.isLoading = false;
				this.helper.errorWhile("fetching cities from the database", errorResponse);
			}
		);
	}

	refreshStatistics() {
		this.brotherhood.getStatistics().subscribe(
			(response: Statistics) => {
				if (!response) {
					this.helper.error("Failed to fetch statistics from the database.");
					return;
				}

				this.statistics = response;
				console.info("Successfully fetched statistics from the database.");
				this.isLoading = false;
			},
			(errorResponse: HttpErrorResponse) => {
				this.isLoading = false;
				this.helper.errorWhile("fetching statistics from the database", errorResponse);
			}
		);
	}

	selectContract(contract?: Contract) {
		this.isLoading = true;

		if (!contract) {
			console.warn("An attempt was made to select a contract that doesn't exist.");
			return;
		}

		this.brotherhood.getContractTargets(contract.id!).subscribe(
			(response: HttpResponse<ContractTarget[]>) => {
				this.selectedContract = contract;

				if (!response.body) {
					this.helper.error("Failed to fetch contract targets from the database.");
					return;
				}

				this.selectedContract.city = this.cities.find(city => city.id === this.selectedContract?.cityId)!;
				this.selectedContract.targets = response.body;
				console.info(`Selected contract '${contract.codename}'.`);
				this.isLoading = false;
			},
			(errorResponse: HttpErrorResponse) => {
				this.isLoading = false;
				this.helper.errorWhile(`fetching those targeted by contract '${contract?.codename}'`, errorResponse);
			}
		);
	}

	selectContractTarget(target: ContractTarget) {
		if (!this.isLoggedIn)
			return;

		this.selectedTarget = target;
		this.state = AppState.UpdateContractTarget;
		console.info(`Selected target '${target.firstName} ${target.lastName}'.`);
	}

	nukeContract(contract?: Contract) {
		this.isLoading = true;

		this.brotherhood.deleteContract(contract?.id).subscribe(
			(response: HttpResponse<Contract[]>) => {
				this.helper.message(`Successfully ended contract ${contract?.codename}.`);
				this.refreshContracts();
				this.selectedContract = undefined;
			},
			(errorResponse: HttpErrorResponse) => {
				this.isLoading = false;
				this.helper.errorWhile(`ending contract '${contract?.codename}'`, errorResponse);
			}
		)
	}

	deleteUser(user: User) {
		this.isLoading = true;

		this.brotherhood.deleteUser(user.id!).subscribe(
			(response: HttpResponse<any>) => {
				this.helper.message(`Successfully deleted user ${user.userName}.`);
				this.refreshUsers();
			},
			(errorResponse: HttpErrorResponse) => {
				this.isLoading = false;
				this.helper.errorWhile(`deleting user '${user.userName}'`, errorResponse);
			}
		)
	}

	constructor(
		private brotherhood: BrotherhoodService,
		private app: AppStateService,
		private helper: HelperService,
	) {
		const user = localStorage.getItem("authUser");
		const role = localStorage.getItem("authRole");
		const validToStr = localStorage.getItem("authTime");

		if (user && role && localStorage.getItem("authKey")) {
			this.app.isLoggedIn = true;
			this.app.user = user;
			this.app.role = role;
		}

		if (validToStr && new Date() > new Date(validToStr)) {
			this.logout();
			this.helper.message("Your session has expired. Please log in again.");
		}

		if (this.isLoggedIn) {
			this.showUserContracts = this.currentTab == 1;
			this.refreshContractTargets();
			this.refreshUsers();
		}

		this.refreshContracts();
		this.refreshCities();

		window.addEventListener("keydown", (e) => {
			if (e.key === "Escape")
				this.state = AppState.None;
		})
	}
}
