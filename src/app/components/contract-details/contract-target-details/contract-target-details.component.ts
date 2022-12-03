import { Component, EventEmitter, Input, Output } from '@angular/core';
import { ContractTarget } from 'src/app/models/target.model';

@Component({
	selector: 'app-contract-target-details',
	templateUrl: './contract-target-details.component.html',
	styleUrls: ['./contract-target-details.component.sass']
})
export class ContractTargetDetailsComponent {
	@Input() target!: ContractTarget
	@Input() allowEdit: boolean = false

	@Output() share = new EventEmitter()
	@Output() edit = new EventEmitter()
	@Output() setAsCover = new EventEmitter()
	@Output() remove = new EventEmitter()
	@Output() delete = new EventEmitter()
}
