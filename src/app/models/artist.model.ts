import { Album } from "./album.model";

export class Artist {
	albums?: Album[] // on-demand

	constructor(
		public id: string,
		public name: string,
		public image: string
	) {}
}