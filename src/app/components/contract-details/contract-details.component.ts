import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { Contract } from 'src/app/models/contract.model';
import { OwlOptions } from 'ngx-owl-carousel-o';
import { ContractTarget } from 'src/app/models/target.model';

@Component({
	selector: 'app-contract-details',
	templateUrl: './contract-details.component.html',
	styleUrls: ['./contract-details.component.sass']
})
export class ContractDetailsComponent {
	@Input() model?: Contract
	@Output() share = new EventEmitter()
	@Output() addTarget = new EventEmitter()

	carouselOptions: OwlOptions = {
		loop: true,
		mouseDrag: true,
		touchDrag: true,
		pullDrag: true,
		dots: true,
		navSpeed: 700,
		navText: ['<', '>'],
		responsive: {
			0: {
				items: 1
			},
			400: {
				items: 2
			},
			740: {
				items: 3
			},
			940: {
				items: 4
			}
		},
		nav: true
	}

	setContractCover(target: ContractTarget) {

	}
}
