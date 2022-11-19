import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { City } from "../models/city.model";
import { Assassin } from "../models/assassin.model";
import { HttpHeaders } from "@angular/common/http";


@Injectable({ providedIn: "root" })
export class BrotherhoodService {
	login(user: Assassin): any {
		return this.http.post<any>("https://localhost:5001/api/assassins/login", user);
	}

	register(user: Assassin): any {
		return this.http.post<any>("https://localhost:5001/api/assassins/register", user);
	}

	getCities(): any {
		return this.http.get<City[]>("https://localhost:5001/api/cities/public", {observe: "response"});
	}

	getMyCities(): any {
		return this.http.get<City[]>("https://localhost:5001/api/cities/user", {observe: "response"});
	}

	createCity(city: City): any {
		return this.http.post<City>("https://localhost:5001/api/cities/add", city);
	}

	shareCity(city: City, assassin: string): any {
		return this.http.put<City>(`https://localhost:5001/api/cities/share/${assassin}`, city);
	}

	deleteCity(id?: number): any {
		return this.http.delete<City>(`https://localhost:5001/api/cities/${id}/nuke`);
	}

	constructor(
		private http: HttpClient,
	) { }
}
