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
	RemoveDeleteContractTarget,
	FullScreenPhoto
}

@Injectable({ providedIn: "root" })
export class AppStateService {
	state: AppState = AppState.None;
	user?: string;
	role?: string;
	isLoggedIn: boolean = false
	isLoading: boolean = true
}
