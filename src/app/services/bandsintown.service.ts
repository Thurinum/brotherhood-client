import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({ providedIn: 'root' })
export class BandsintownService {
	private API_KEY = "2b32475766802ac01eefda45e9e42ea0";

	async request(artist: string): Promise<Observable<any> | undefined> {
		return this.http.get(`https://rest.bandsintown.com/artists/${artist}/events?app_id=${this.API_KEY}`);
	}

	constructor(
		private http: HttpClient
	) { }
}
