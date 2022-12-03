import { Assassin } from "./assassin.model"
import { City } from "./city.model"
import { ContractTarget } from "./target.model"

export class Contract {
	id!: number
	cityId!: number
	coverTargetId?: number
	assassins: Assassin[] = []
	targets: ContractTarget[] = []

	constructor(
		public codename: string,
		public briefing: string,
		public city: City,
		public isPublic: boolean
	) {}
}
