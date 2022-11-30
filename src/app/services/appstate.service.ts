import { Injectable } from "@angular/core";

export enum AppState {
	None,
	Login,
	Register,
	CreateContract,
	ShareContract,
	AddContractTarget,
	EditContractTarget
}

@Injectable({ providedIn: "root" })
export class AppStateService {
	state: AppState = AppState.None;
	isLoggedIn: boolean = false
}
