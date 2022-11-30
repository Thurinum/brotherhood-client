import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { ContractTarget } from 'src/app/models/target.model';
import { SlideAnimation } from 'src/app/animations.module';

@Component({
	selector: 'app-contract-target-list',
	templateUrl: './contract-target-list.component.html',
	styleUrls: ['./contract-target-list.component.sass'],
	animations: [SlideAnimation]
})
export class ContractTargetListComponent {
	@Input() targets!: ContractTarget[]

	@Output() add = new EventEmitter
	@Output() refresh = new EventEmitter
	@Output() select = new EventEmitter<ContractTarget>()

	selectedId: number = -1;
}
