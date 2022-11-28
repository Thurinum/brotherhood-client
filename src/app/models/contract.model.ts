import { ContractTarget } from "./target.model"

export class Contract {
	id?: number
	briefing?: string
	featuredTarget?: ContractTarget
	targets?: ContractTarget[] = []
	contract?: Contract

	constructor(
		public name: string,
		public isPublic: boolean
	) {}
}
