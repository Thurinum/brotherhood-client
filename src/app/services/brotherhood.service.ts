import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { Contract } from "../models/contract.model";
import { Assassin } from "../models/assassin.model";
import { HttpHeaders } from "@angular/common/http";
import { ContractTarget } from "../models/target.model";
import { City } from "../models/city.model";


@Injectable({ providedIn: "root" })
export class BrotherhoodService {
	login(user: Assassin): any {
		return this.http.post<any>("https://localhost:5001/api/login", user);
	}

	register(user: Assassin): any {
		return this.http.post<any>("https://localhost:5001/api/register", user);
	}

	getContracts(): any {
		return this.http.get<Contract[]>("https://localhost:5001/api/contracts/public", {observe: "response"});
	}

	getMyContracts(): any {
		return this.http.get<Contract[]>("https://localhost:5001/api/contracts/private", {observe: "response"});
	}

	getTargetsInContract(id: number): any {
		return this.http.get<ContractTarget[]>(`https://localhost:5001/api/contract/${id}/targets`, {observe: "response"});
	}

	createContract(contract: Contract): any {
		return this.http.post<Contract>("https://localhost:5001/api/contract/add", contract);
	}

	shareContract(contract: Contract, assassinId: string): any {
		return this.http.put<Contract>(`https://localhost:5001/api/contract/share`, {
			contractId: contract.id,
			assassinId: assassinId
		});
	}

	deleteContract(id?: number): any {
		return this.http.delete<Contract>(`https://localhost:5001/api/contract/${id}/nuke`);
	}

	getCities(): any {
		return this.http.get<City[]>("https://localhost:5001/api/cities", {observe: "response"});
	}

	getImageFromPlace(place: string): any {
		return this.http.get(`https://api.teleport.org/api/urban_areas/slug:${place}/images/`);
	}

	constructor(
		private http: HttpClient,
	) { }
}
