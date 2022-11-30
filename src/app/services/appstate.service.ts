import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { Contract } from "../models/contract.model";
import { Assassin } from "../models/assassin.model";
import { HttpHeaders } from "@angular/common/http";
import { ContractTarget } from "../models/target.model";
import { City } from "../models/city.model";
import { ContractShareDTO } from "../models/contractShareDTO";

export enum AppState {
	None,
	Login,
	Register,
	AddContract,
	AddContractOwner,
	AddContractTarget,
	EditContractTarget
}

@Injectable({ providedIn: "root" })
export class AppStateService {
	state: AppState = AppState.None;
	isLoggedIn: boolean = false
}
