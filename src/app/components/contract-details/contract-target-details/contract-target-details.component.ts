import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { Contract } from 'src/app/models/contract.model';
import { ContractTarget } from 'src/app/models/target.model';

@Component({
	selector: 'app-contract-target-details',
	templateUrl: './contract-target-details.component.html',
	styleUrls: ['./contract-target-details.component.sass']
})
export class ContractTargetDetailsComponent {
	@Input() target!: ContractTarget

	@Output() share = new EventEmitter<void>()
}
