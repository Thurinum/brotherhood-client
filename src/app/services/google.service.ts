import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpClient, HttpParams, HttpHeaders } from "@angular/common/http";

@Injectable({ providedIn: 'root' })
export class GoogleService {
	private API_KEY = "AIzaSyDCYMOr375pqYymINRnloOGaaMbAsF2JcI";

	searchYoutube(query: string): Observable<any | undefined> {
		return this.http.get(`https://www.googleapis.com/youtube/v3/search?part=id&maxResults=1&key=${this.API_KEY}&q=${query}`);
	}

	constructor(
		private http: HttpClient
	) { }
}
