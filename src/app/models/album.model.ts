export class Album {
	songs?: string[]; // on-demand

	constructor(
		public id: number,
		public name: string,
		public image: string,
	) {}
}