import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { Contract } from 'src/app/models/contract.model';
import { OwlOptions } from 'ngx-owl-carousel-o';

@Component({
	selector: 'app-contract-details',
	templateUrl: './contract-details.component.html',
	styleUrls: ['./contract-details.component.sass']
})
export class ContractDetailsComponent implements OnInit {
	@Input() model?: Contract
	@Output() share = new EventEmitter<void>()
	@Output() addTarget = new EventEmitter<void>()

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

	ngOnInit(): void {
		// setTimeout(() => {
		// 	const elem = document.querySelector('.carousel');
		// 	// @ts-ignore
		// 	const carousel = new Flickity(elem, {
		// 		cellAlign: 'center',
		// 		contain: true,
		// 		imagesLoaded: true,
		// 		pageDots: true,
		// 		wrapAround: true,
		// 	});
		// }, 1000);
	}
}
