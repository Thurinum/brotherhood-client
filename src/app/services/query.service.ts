import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { BandsintownService } from './bandsintown.service';
import { GoogleService } from './google.service';
import { HelperService } from './helper.service';
import { SpotifyService } from './spotify.service';

interface IQueryService {
	getArtist(name: string): Promise<Observable<any> | undefined>
	getArtistConcerts(name: string): Promise<Observable<any> | undefined>
	getArtistAlbums(artistid: string): Promise<Observable<any> | undefined>
	getAlbumTracks(albumid: string): Promise<Observable<any> | undefined>
	getTrackYoutubeId(query: string): Promise<Observable<any> | undefined>
}

@Injectable({ providedIn: 'root' })
export class QueryService implements IQueryService {
	async getArtist(name: string): Promise<Observable<any> | undefined> {
		return this.spotify.request(`https://api.spotify.com/v1/search?type=artist&offset=0&limit=25&q=${name}`);
	}

	async getArtistConcerts(artistname: string): Promise<Observable<any> | undefined> {
		return this.bandsintown.request(artistname);
	}

	async getArtistAlbums(artistid: string): Promise<Observable<any> | undefined> {
		return this.spotify.request(`https://api.spotify.com/v1/artists/${artistid}/albums?market=US&limit=50&offset=0`);
	}

	async getAlbumTracks(albumid: string): Promise<Observable<any> | undefined> {
		return this.spotify.request(`https://api.spotify.com/v1/albums/${albumid}/tracks?market=US&limit=50&offset=0`);
	}

	async getTrackYoutubeId(query: string): Promise<Observable<any> | undefined> {
		return this.google.searchYoutube(query);
	}

	constructor(
		private spotify: SpotifyService,
		private google: GoogleService,
		private bandsintown: BandsintownService
	) { 
		if (!spotify.authorized)
			spotify.authorize();
	}
}
