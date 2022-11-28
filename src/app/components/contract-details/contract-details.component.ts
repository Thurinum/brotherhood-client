import { Component, Input, OnInit } from '@angular/core';
import { Contract } from 'src/app/models/contract.model';

@Component({
	selector: 'app-contract-details',
	templateUrl: './contract-details.component.html',
	styleUrls: ['./contract-details.component.sass']
})
export class ContractDetailsComponent implements OnInit {
	@Input() model?: Contract

	constructor() { }

	ngOnInit(): void {
		setTimeout(() => {
			const elem = document.querySelector('.carousel');
			// @ts-ignore
			const carousel = new Flickity(elem, {
				cellAlign: 'center',
				contain: true,
				imagesLoaded: true,
				pageDots: false,
				wrapAround: true
			});
		}, 1000);
	}
}
