import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { Observable } from "rxjs";
import { City } from "../models/city.model";
import { Assassin } from "../models/assassin.model";
import { HttpResponse } from "@angular/common/http";


@Injectable({ providedIn: "root" })
export class BrotherhoodService {
	login(user: Assassin): any {
		return this.http.post<any>("https://localhost:5001/api/assassins/login", user);
	}

	register(user: Assassin): any {
		return this.http.post<any>("https://localhost:5001/api/assassins/register", user);
	}

	getCities(): any {
		return this.http.get<City[]>("https://localhost:5001/api/cities/", {observe: "response"});
	}

	createCity(city: City): any {
		return this.http.post<City>("https://localhost:5001/api/cities/add", city);
	}

	deleteCity(id?: number): any {
		return this.http.delete<City>(`https://localhost:5001/api/cities/${id}/nuke`);
	}

	constructor(
		private http: HttpClient,
	) { }
}
