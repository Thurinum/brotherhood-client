import { Component, OnInit } from '@angular/core';
import { Artist } from 'src/app/models/artist.model';
import { Router } from '@angular/router';

@Component({
	selector: 'app-artist-details',
	templateUrl: './artist-details.component.html',
	styleUrls: ['./artist-details.component.sass']
})
export class ArtistDetailsComponent implements OnInit {
	artist?: Artist;

	private localStorage: Storage = window.localStorage

	constructor(
		private router: Router,
	) { }

	ngOnInit(): void {
		this.router.events.subscribe((() => {
			this.artist = JSON.parse(this.localStorage.getItem("selectedArtist") || "{}");
		}));
	}
}
