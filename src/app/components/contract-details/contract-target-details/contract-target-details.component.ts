import { Component, EventEmitter, Input, Output } from '@angular/core';
import { ContractTarget } from 'src/app/models/target.model';
import { OwlOptions } from 'ngx-owl-carousel-o';

@Component({
	selector: 'app-contract-target-details',
	templateUrl: './contract-target-details.component.html',
	styleUrls: ['./contract-target-details.component.sass']
})
export class ContractTargetDetailsComponent {
	@Input() target!: ContractTarget
	@Output() share = new EventEmitter()
	@Output() setAsCover = new EventEmitter()
}
