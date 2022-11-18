import { Component, OnInit } from '@angular/core';
import { SafeResourceUrl } from '@angular/platform-browser';
import { ActivatedRoute } from '@angular/router';
import { UrlSanitizerPipe } from 'src/app/url-sanitizer.pipe';

@Component({
	selector: 'app-artist-album-track-embed',
	templateUrl: './artist-album-track-embed.component.html',
	styleUrls: ['./artist-album-track-embed.component.sass']
})
export class ArtistAlbumTrackEmbedComponent implements OnInit {
	youtubeUrl: string = "https://www.youtube.com/watch?v=dQw4w9WgXcQ";

	constructor(
		private route: ActivatedRoute,
	) { }
	ngOnInit(): void {
		this.route.params.subscribe(params => {
			this.youtubeUrl = `https://www.youtube.com/embed/${params["trackId"]}`;
		});
	}
}
