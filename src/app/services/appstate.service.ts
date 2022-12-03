import { Injectable } from "@angular/core";

export enum AppState {
	None,
	Login,
	Register,
	CreateContract,
	EditContract,
	ShareContract,
	AddContractTarget,
	CreateContractTarget,
	UpdateContractTarget,
	RemoveDeleteContractTarget
}

@Injectable({ providedIn: "root" })
export class AppStateService {
	state: AppState = AppState.None;
	user?: string;
	isLoggedIn: boolean = false
}
