import { Component, Input, OnInit } from '@angular/core';
import { ContractTarget } from 'src/app/models/target.model';

@Component({
	selector: 'app-contract-target-list',
	templateUrl: './contract-target-list.component.html',
	styleUrls: ['./contract-target-list.component.sass']
})
export class ContractTargetListComponent {
	@Input() targets!: ContractTarget[]

	constructor() { }
}
