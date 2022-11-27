import { AssassinationTarget } from "./target.model"

export class City {
	id?: number
	image?: string
	targets?: AssassinationTarget[] = []

	constructor(
		public name: string,
		public isPublic: boolean
	) {}
}
