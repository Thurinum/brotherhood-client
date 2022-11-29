import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { Contract } from "../models/contract.model";
import { Assassin } from "../models/assassin.model";
import { HttpHeaders } from "@angular/common/http";
import { ContractTarget } from "../models/target.model";
import { City } from "../models/city.model";
import { ContractShareDTO } from "../models/contractShareDTO";


@Injectable({ providedIn: "root" })
export class BrotherhoodService {
	login(user: Assassin): any {
		return this.http.post<any>("https://localhost:5001/api/login", user);
	}

	register(user: Assassin): any {
		return this.http.post<any>("https://localhost:5001/api/register", user);
	}

	getPublicContracts(): any {
		return this.http.get<Contract[]>("https://localhost:5001/api/contracts/public", {observe: "response"});
	}

	getPrivateContracts(): any {
		return this.http.get<Contract[]>("https://localhost:5001/api/contracts/private", {observe: "response"});
	}

	getContractTargets(id: number): any {
		return this.http.get<ContractTarget[]>(`https://localhost:5001/api/contract/${id}/targets`, {observe: "response"});
	}

	addContractTarget(contractId: number, target: ContractTarget) {
		return this.http.put<ContractTarget>(`https://localhost:5001/api/contract/${contractId}/target/add`, target);
	}

	createContract(contract: Contract): any {
		return this.http.post<Contract>("https://localhost:5001/api/contract/create", contract);
	}

	shareContract(dto: ContractShareDTO): any {
		return this.http.put<string>(`https://localhost:5001/api/contract/${dto.contractId}/share`, dto.assassinName);
	}

	deleteContract(id?: number): any {
		return this.http.delete<Contract>(`https://localhost:5001/api/contract/${id}/nuke`);
	}

	getCities(): any {
		return this.http.get<City[]>("https://localhost:5001/api/cities", {observe: "response"});
	}

	getTargets(): any {
		return this.http.get<ContractTarget[]>(`https://localhost:5001/api/contract/targets`, {observe: "response"});
	}

	// getContractsInCity(city: City): any {
	// 	return this.http.get<Contract[]>(`https://localhost:5001/api/city${city.id}/contracts`, {observe: "response"});
	// }

	getImageFromPlace(place: string): any {
		return this.http.get(`https://api.teleport.org/api/urban_areas/slug:${place}/images/`);
	}

	constructor(
		private http: HttpClient,
	) { }
}
