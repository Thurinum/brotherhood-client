import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, NavigationEnd, Router } from '@angular/router';
import { Album } from 'src/app/models/album.model';
import { HelperService } from 'src/app/services/helper.service';
import { QueryService } from 'src/app/services/query.service';
import { TranslateService } from '@ngx-translate/core';

@Component({
	selector: 'app-artist-albums',
	templateUrl: './artist-albums.component.html',
	styleUrls: ['./artist-albums.component.sass']
})
export class ArtistAlbumsComponent implements OnInit {
	albums: Album[] = [];

	getAlbums(artistid?: string | null): void {
		if (!artistid) {
			return;
		}

		this.query.getArtistAlbums(artistid).then(
			request => {
				if (!request) {
					this.helper.popup(this.translate.instant( `An error occured while fetching the albums from Spotify's API.`), this.translate.instant( `DAMN IT`));
					return;
				}

				request.subscribe(
					response => {
						const albums = response.items;
						this.albums = [];

						albums.forEach((album: any) => {
							this.albums.push(new Album(
								album.id,
								album.name,
								album.images[0].url,
							))
						});
					}
				)
			}
		)
	}

	constructor(
		private router: Router,
		private route: ActivatedRoute,
		private query: QueryService,
		private helper: HelperService,
		private translate: TranslateService
	) { }

	ngOnInit(): void {
		this.getAlbums(this.route.snapshot.paramMap.get("artistId"));				
		this.router.events.subscribe((e => {
			if (e instanceof NavigationEnd)
				this.getAlbums(this.route.snapshot.paramMap.get("artistId"));				
		}));
	}
}
