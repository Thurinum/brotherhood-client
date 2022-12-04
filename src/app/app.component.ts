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
	showNews: boolean = true;
	selectedContract?: Contract
	assignedContract?: Contract
	selectedTarget?: ContractTarget
	storage: Storage = window.localStorage

	get isLoggedIn() {
		return this.app.isLoggedIn;
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

		this.refreshContracts();
		this.refreshUsers();
	}

	refreshContracts() {
		console.log("Refreshing contracts...");
		let request = this.showUserContracts ? this.brotherhood.getPrivateContracts() : this.brotherhood.getPublicContracts();

		this.contracts = [];

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
				if (errorResponse.status === 0)
					this.helper.errorWhile("connecting to the database", errorResponse);
				else
					this.helper.errorWhile("fetching contracts from the database", errorResponse);
			}
		);
	}

	refreshContractTargets() {
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
				if (errorResponse.status === 0)
					this.helper.errorWhile("connecting to the database", errorResponse);
				else
					this.helper.errorWhile("fetching contract targets from the database", errorResponse);
			}
		);
	}

	refreshUsers() {
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
				if (errorResponse.status === 0)
					this.helper.errorWhile("connecting to the database", errorResponse);
				else
					this.helper.errorWhile("fetching users from the database", errorResponse);
			}
		);
	}

	refreshCities() {
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
								console.warn(`Failed to fetch image for city '${name}', which will now be skipped.`);
								localStorage.setItem("contractImg_" + name, "https://images.rawpixel.com/image_social_landscape/cHJpdmF0ZS9sci9pbWFnZXMvd2Vic2l0ZS8yMDIyLTA2L2pvYjk0OC0yNTYtdi1sNDdyOXNoNC5qcGc.jpg");
							}
						);
					}
				})
			},
			(errorResponse: HttpErrorResponse) => {
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
			},
			(errorResponse: HttpErrorResponse) => {
				this.helper.errorWhile("fetching statistics from the database", errorResponse);
			}
		);
	}

	selectContract(contract: Contract) {
		this.brotherhood.getContractTargets(contract.id!).subscribe(
			(response: HttpResponse<ContractTarget[]>) => {
				this.selectedContract = contract;

				if (!response.body) {
					this.helper.error("Failed to fetch contract targets from the database.");
					return;
				}

				this.selectedContract.city = this.cities.find(city => city.id === this.selectedContract?.cityId)!;
				this.selectedContract.targets = response.body;
			},
			(errorResponse: HttpErrorResponse) => {
				this.helper.errorWhile(`fetching those targeted by contract '${contract?.codename}'`, errorResponse);
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
				this.helper.errorWhile(`ending contract '${contract?.codename}'`, errorResponse);
			}
		)
	}

	deleteUser(user: User) {
		this.brotherhood.deleteUser(user.id!).subscribe(
			(response: HttpResponse<any>) => {
				this.helper.message(`Successfully deleted user ${user.username}.`);
				this.refreshUsers();
			},
			(errorResponse: HttpErrorResponse) => {
				this.helper.errorWhile(`deleting user '${user.username}'`, errorResponse);
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
		if (user && role && localStorage.getItem("authKey")) {
			this.app.isLoggedIn = true;
			this.app.user = user;
			this.app.role = role;
		}

		let validToStr = localStorage.getItem("authTime");

		if (validToStr && new Date() > new Date(validToStr)) {
			this.logout();
			this.helper.message("Your session has expired. Please log in again.");
		}

		this.refreshContracts();
		this.refreshCities();
		this.refreshUsers();

		if (this.isLoggedIn) {
			this.refreshContractTargets();
			this.showUserContracts = this.currentTab == 1;
		}

		this.tryToShowNews();

		window.addEventListener("keydown", (e) => {
			if (e.key === "Escape")
				this.state = AppState.None;
		})
	}

	private tryToShowNews() {
		if (!this.isLoggedIn) {
			setTimeout(() => this.tryToShowNews(), 10000);
			return;
		}

		setTimeout(() => {
			document.querySelector(".breakingNews")!.innerHTML = "";
			for (let i = 0; i < 5; i++, this.generateRandomNews());
		}, 3000);

		setInterval(() => {
			for (let i = 0; i < 5; i++, this.generateRandomNews());
		}, 300000);
	}

	private random(array: Array<any>): any {
		return array[Math.floor(Math.random() * array.length)];
	}

	private async generateRandomNews() {
		const target = this.random(this.targets);
		const location$ = this.brotherhood.getRandomAddress();
		const user$ = this.brotherhood.getRandomPerson();
		const location: HttpResponse<any> = await lastValueFrom(location$);
		const user: HttpResponse<any> = await lastValueFrom(user$);
		const content = `${target.firstName} ${target.lastName} was ${this.random(this.ACTIONS)} at ${location.body.city} by ${user.body.first_name} ${user.body.last_name}. It is ${this.random(this.BELIEVED)}, ${this.random(this.NEVERTHELESS)}, that these ${this.random(this.IMPORTANT)} news will have ${this.random(this.TREMENDOUS)} impact on ${Math.random() > 0.5 ? "our" : "the"} brotherhood's efforts in ${this.random(this.OBJECTIVES)} the ${this.random(this.OBJECT)} of ${this.random(this.OWNER)}, which it has been ${this.random(this.COVETING)} for over ${Math.round(Math.random() * 100)} years. - `;
		document.querySelector(".breakingNews")!.innerHTML += content;
	}

	private IMPORTANT = [
		"important",
		"significant",
		"crucial",
		"critical",
		"worrying",
		"alarming",
		"disturbing",
		"concerning",
		"troubling",
		"precarious",
		"saddening",
		"disheartening",
		"disappointing"
	]

	private NEVERTHELESS = [
		"nevertheless",
		"however",
		"on the other hand",
		"still",
		"yet",
		"despite this",
		"despite that",
		"notwithstanding",
		"although",
		"furthermore",
		"moreover",
		"besides",
		"also",
		"additionally",
		"in addition"
	]

	private TREMENDOUS = [
		"tremendous",
		"great",
		"significant",
		"substantial",
		"considerable",
		"incredible",
		"unbelievable",
		"astonishing",
		"amazing",
		"staggering",
		"stunning",
		"jaw-dropping",
		"mind-blowing",
		"mind-boggling",
		"mind-bending",
		"worrying",
		"alarming",
		"disturbing",
		"concerning",
		"troubling",
		"precarious",
		"important",
		"significant",
		"crucial",
		"critical",
		"crucial",
		"critical"
	]

	private BELIEVED = [
		"believed",
		"suspected",
		"known",
		"certain",
		"sure",
		"assumed",
		"thought",
		"thought to be",
		"thought to have been",
		"without question",
		"without doubt",
		"known for fact",
		"known for sure"
	]

	private ACTIONS = [
		"found",
		"detected",
		"located",
		"identified",
		"discovered",
		"tracked",
		"spotted",
		"caught",
		"captured",
		"arrested",
		"busted",
		"apprehended",
		"snapped",
		"photographed",
		"filmed",
		"recorded",
		"documented",
		"observed",
		"watched",
		"spied",
		"monitored",
		"tracked down"
	];

	private OBJECTIVES = [
		"destroying",
		"eliminating",
		"eradicating",
		"extinguishing",
		"extirpating",
		"exterminating",
		"erasing",
		"obliterating",
		"removing",
		"finding",
		"tracking",
		"locating",
		"identifying",
		"discovering",
		"tracking down",
		"obtaining",
		"acquiring",
		"deciphering",
		"unraveling",
		"figuring out"
	]

	private OBJECT = [
		"artifact",
		"treasure",
		"elixir",
		"sword",
		"shield",
		"book",
		"scroll",
		"map",
		"document",
		"letter",
		"message",
		"note",
		"spear",
		"bow",
		"arrow",
		"chalice",
		"cup",
		"statue",
		"painting",
		"portrait",
		"helmet",
		"armor",
		"stock market shares"
	]

	private OWNER = [
		"the Knights Templar",
		"the Knights of the Templar",
		"the Knights of the Temple",
		"the Templars",
		"the Knights of the Round Table",
		"Aristotle",
		"Plato",
		"Pythagoras",
		"Leonardo da Vinci",
		"Spinoza",
		"Newton",
		"Galileo",
		"Darwin",
		"Tesla",
		"Edison",
		"Franklin",
		"Washington",
		"Lincoln",
		"Arwindale",
		"the Brotherhood",
		"the Order"
	]

	private COVETING = [
		"coveting",
		"desiring",
		"wanting",
		"needing",
		"craving",
		"yearning",
		"longing",
		"desperately wanting",
		"desperately needing",
		"desperately craving",
		"seeking",
		"searching for",
		"looking for",
		"trying to find",
		"trying to locate",
		"trying to identify",
		"trying to discover",
		"trying to track down",
		"trying to obtain",
		"trying to acquire",
		"trying to decipher",
		"trying to unravel",
		"trying to figure out",
		"tracking",
		"locating",
		"identifying"
	]
}
