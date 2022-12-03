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

	createContract(contract: Contract): any {
		return this.http.post<Contract>("https://localhost:5001/api/contract/create", contract);
	}

	updateContract(id: number, contract: Contract): any {
		return this.http.put<Contract>(`https://localhost:5001/api/contract/${id}/edit`, contract);
	}

	shareContract(dto: ContractShareDTO): any {
		return this.http.put<string>(`https://localhost:5001/api/contract/${dto.contractId}/share`, dto.assassinName);
	}

	setContractCover(id: number, target: ContractTarget): any {
		return this.http.put<number>(`https://localhost:5001/api/contract/${id}/setcover`, target);
	}

	deleteContract(id?: number): any {
		return this.http.delete<Contract>(`https://localhost:5001/api/contract/${id}/nuke`);
	}

	getContractTargets(id: number): any {
		return this.http.get<ContractTarget[]>(`https://localhost:5001/api/contract/${id}/targets`, {observe: "response"});
	}

	getAllContractTargets(): any {
		return this.http.get<ContractTarget[]>(`https://localhost:5001/api/contract/targets`, {observe: "response"});
	}

	addContractTarget(id: number, target: ContractTarget): any {
		return this.http.put<ContractTarget>(`https://localhost:5001/api/contract/${id}/target/add`, target);
	}

	createContractTarget(data: FormData): any {
		return this.http.post<ContractTarget>(`https://localhost:5001/api/contract/target/create`, data);
	}

	updateContractTarget(id: number, data: FormData): any {
		return this.http.put<ContractTarget>(`https://localhost:5001/api/contract/target/${id}/edit`, data);
	}

	removeContractTarget(id: number, target: ContractTarget): any {
		return this.http.put<ContractTarget>(`https://localhost:5001/api/contract/${id}/target/remove`, target);
	}

	softDeleteContractTarget(target: ContractTarget): any {
		return this.http.delete(`https://localhost:5001/api/contract/target/${target.id}/delete/soft`);
	}

	deleteContractTarget(target: ContractTarget): any {
		return this.http.delete(`https://localhost:5001/api/contract/target/${target.id}/delete/hard`);
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
