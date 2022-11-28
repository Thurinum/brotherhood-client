import { Component, Input } from '@angular/core';
import { Contract } from 'src/app/models/contract.model';

@Component({
	selector: 'app-contract-details',
	templateUrl: './contract-details.component.html',
	styleUrls: ['./contract-details.component.sass']
})
export class ContractDetailsComponent {
	@Input() model?: Contract

	constructor() { }
}
