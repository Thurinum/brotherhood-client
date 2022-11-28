import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { Contract } from "../models/contract.model";
import { Assassin } from "../models/assassin.model";
import { HttpHeaders } from "@angular/common/http";
import { ContractTarget } from "../models/target.model";


@Injectable({ providedIn: "root" })
export class BrotherhoodService {
	login(user: Assassin): any {
		return this.http.post<any>("https://localhost:5001/api/assassins/login", user);
	}

	register(user: Assassin): any {
		return this.http.post<any>("https://localhost:5001/api/assassins/register", user);
	}

	getContracts(): any {
		return this.http.get<Contract[]>("https://localhost:5001/api/contracts/public", {observe: "response"});
	}

	getTargetsInContract(id: number): any {
		return this.http.get<ContractTarget[]>(`https://localhost:5001/api/contracts/${id}/targets`, {observe: "response"});
	}

	getMyContracts(): any {
		return this.http.get<Contract[]>("https://localhost:5001/api/contracts/user", {observe: "response"});
	}

	createContract(contract: Contract): any {
		return this.http.post<Contract>("https://localhost:5001/api/contracts/add", contract);
	}

	shareContract(contract: Contract, assassin: string): any {
		return this.http.put<Contract>(`https://localhost:5001/api/contracts/share/${assassin}`, contract);
	}

	deleteContract(id?: number): any {
		return this.http.delete<Contract>(`https://localhost:5001/api/contracts/${id}/nuke`);
	}

	getImageFromPlace(place: string): any {
		return this.http.get(`https://api.teleport.org/api/urban_areas/slug:${place}/images/`);
	}

	constructor(
		private http: HttpClient,
	) { }
}
