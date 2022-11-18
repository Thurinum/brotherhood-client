import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ArtistAlbumTrackEmbedComponent } from './components/artist-details/artist-albums/artist-album-tracks/artist-album-track-embed/artist-album-track-embed.component';
import { ArtistAlbumTracksComponent } from './components/artist-details/artist-albums/artist-album-tracks/artist-album-tracks.component';
import { ArtistAlbumsComponent } from './components/artist-details/artist-albums/artist-albums.component';
import { ArtistConcertsComponent } from './components/artist-details/artist-concerts/artist-concerts.component';
import { PageNotFoundComponent } from './components/page-not-found/page-not-found.component';

const routes: Routes = [
	{ path: "", component: ArtistAlbumsComponent, pathMatch: "full" },
	{ path: "artist", component: ArtistAlbumsComponent },
	{ path: "artist/:artistId", component: ArtistAlbumsComponent, },
	{ path: "artist/:artistId/albums", component: ArtistAlbumsComponent },
	{ path: "artist/:artistId/albums/:albumId", component: ArtistAlbumTracksComponent },
	{
		path: "artist/:artistId/albums/:albumId/tracks", component: ArtistAlbumTracksComponent,
		children: [
			{ path: ":trackId", component: ArtistAlbumTrackEmbedComponent },
			{ path: ":trackId/play", component: ArtistAlbumTrackEmbedComponent },
		]
	},
	{ path: "artist/:artistName/concerts", component: ArtistConcertsComponent },
	{ path: "**", component: PageNotFoundComponent },
];

@NgModule({
	imports: [RouterModule.forRoot(routes, { onSameUrlNavigation: "reload" })],
	exports: [RouterModule]
})
export class AppRoutingModule { }
