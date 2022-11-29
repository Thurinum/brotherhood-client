import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { Contract } from 'src/app/models/contract.model';

@Component({
	selector: 'app-contract-details',
	templateUrl: './contract-details.component.html',
	styleUrls: ['./contract-details.component.sass']
})
export class ContractDetailsComponent implements OnInit {
	@Input() model?: Contract

	@Output() share = new EventEmitter<void>()

	ngOnInit(): void {
		setTimeout(() => {
			const elem = document.querySelector('.carousel');
			// @ts-ignore
			const carousel = new Flickity(elem, {
				cellAlign: 'center',
				contain: true,
				imagesLoaded: true,
				pageDots: true,
				wrapAround: true,
			});

			// var imgs = elem!.querySelectorAll('.carousel-item img');

			// carousel.on('scroll', function () {
			// 	carousel.slides.forEach(function (slide: any, i: any) {
			// 		var img = imgs[i] as HTMLElement;
			// 		var x = (slide.target + carousel.x) * -1 / 3;
			// 		img.style.transform = 'translateX(' + x + 'px)';
			// 	});
			// });
		}, 1000);
	}
}
