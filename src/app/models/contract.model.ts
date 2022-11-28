import { Assassin } from "./assassin.model"
import { City } from "./city.model"
import { ContractTarget } from "./target.model"

export class Contract {
	id!: number
	featuredContractId?: number
	briefing?: string
	assassins: Assassin[] = []
	targets: ContractTarget[] = []

	constructor(
		public codename: string,
		public city: City,
		public isPublic: boolean
	) {}
}
