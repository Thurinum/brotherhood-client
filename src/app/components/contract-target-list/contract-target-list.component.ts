import { Component, Input, OnInit } from '@angular/core';
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

	constructor() { }
}
