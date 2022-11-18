import { Injectable } from "@angular/core";
import { HttpClient, HttpParams, HttpHeaders } from "@angular/common/http";
import { Observable } from "rxjs";
import { HelperService } from "./helper.service";


@Injectable({ providedIn: "root" })
export class SpotifyService {
	authorized: boolean = false

	authorize(): void {
		const body = new HttpParams().set("grant_type", "client_credentials");
		const httpOptions = {
			headers: new HttpHeaders({
				"Content-Type": "application/x-www-form-urlencoded",
				"Authorization": "Basic " + btoa(this.CLIENT_ID + ":" + this.CLIENT_SECRET)
			})
		};

		this.http.post<any>("https://accounts.spotify.com/api/token", body.toString(), httpOptions)
			.subscribe(response => {
				if (!response.access_token)
					this.helper.popup("Could not authenticate to Spotify. Are credentials correct?");

				this.token = response.access_token;
			});

		this.authorized = true;
		console.info(`Authorized ${this.CLIENT_ID} at Spotify.`);
	}

	async request(url: string): Promise<Observable<any> | undefined> {
		if (!this.token) {
			this.authorize();
		}

		const httpOptions = {
			headers: new HttpHeaders({
				"Content-Type": "application/json",
				"Authorization": "Bearer " + this.token
			})
		};

		return this.http.get<any>(url, httpOptions);
	}

	private CLIENT_ID = "887f38697712471d8cbc1290c72147f8";
	private CLIENT_SECRET = "9a6f963840b44c638eeb7d667afa64e2";
	private token?: string

	constructor(
		private http: HttpClient,
		private helper: HelperService
	) { }
}