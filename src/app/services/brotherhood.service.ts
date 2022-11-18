import { Injectable } from "@angular/core";
import { HttpClient, HttpParams, HttpHeaders } from "@angular/common/http";
import { Observable } from "rxjs";
import { HelperService } from "./helper.service";


@Injectable({ providedIn: "root" })
export class BrotherhoodService {


	constructor(
		private http: HttpClient,
		private helper: HelperService
	) { }
}
