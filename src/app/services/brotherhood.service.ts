import { Injectable } from "@angular/core";
import { HttpClient, HttpParams, HttpHeaders } from "@angular/common/http";
import { Observable } from "rxjs";
import { HelperService } from "./helper.service";
import { City } from "../models/city.model";


@Injectable({ providedIn: "root" })
export class BrotherhoodService {
	getCities(): Observable<City[]> {
		return this.http.get<City[]>("https://localhost:5001/api/cities/");
	}

	createCity(city: City): any {
		return this.http.post<City>("https://localhost:5001/api/cities/add", city);
	}

	deleteCity(id?: number): any {
		return this.http.delete<City>(`https://localhost:5001/api/cities/${id}/nuke`);
	}

	constructor(
		private http: HttpClient,
		private helper: HelperService
	) { }
}
