import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { Contract } from 'src/app/models/contract.model';
import { OwlOptions } from 'ngx-owl-carousel-o';
import { ContractTarget } from 'src/app/models/target.model';
import { BrotherhoodService } from 'src/app/services/brotherhood.service';
import { HttpErrorResponse, HttpResponse } from '@angular/common/http';
import { HelperService } from 'src/app/services/helper.service';

@Component({
	selector: 'app-contract-details',
	templateUrl: './contract-details.component.html',
	styleUrls: ['./contract-details.component.sass']
})
export class ContractDetailsComponent {
	@Input() model?: Contract
	@Output() share = new EventEmitter()
	@Output() addTarget = new EventEmitter()
	@Output() refresh = new EventEmitter()

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
		this.brotherhood.setContractCover(this.model!.id, target).subscribe(
			(response: HttpResponse<void>) => {
				console.info(`Successfully set ${target.firstName} ${target.lastName} as cover for ${this.model?.codename}.`);
				this.refresh.emit();
			},
			(errorResponse: HttpErrorResponse) => {
				this.helper.httpError(`Failed to set ${target.firstName} ${target.lastName} as cover for ${this.model?.codename}.`, errorResponse);
			}
		);
	}

	constructor(
		private brotherhood: BrotherhoodService,
		private helper: HelperService
	) { }
}
