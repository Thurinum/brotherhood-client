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
	@Input() contract?: Contract
	@Input() allowEdit: boolean = false

	@Output() refresh = new EventEmitter()
	@Output() edit = new EventEmitter()
	@Output() remove = new EventEmitter()
	@Output() share = new EventEmitter()
	@Output() createTarget = new EventEmitter()
	@Output() addTarget = new EventEmitter()
	@Output() editTarget = new EventEmitter<ContractTarget>()
	@Output() deleteTarget = new EventEmitter()

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
		this.brotherhood.setContractCover(this.contract!.id, target).subscribe(
			(response: HttpResponse<void>) => {
				this.helper.message(`Successfully set ${target.firstName} ${target.lastName} as cover for ${this.contract?.codename}.`);
				this.refresh.emit();
			},
			(errorResponse: HttpErrorResponse) => {
				this.helper.httpError(`Failed to set ${target.firstName} ${target.lastName} as cover for ${this.contract?.codename}.`, errorResponse);
			}
		);
	}

	removeTarget(target: ContractTarget) {
		this.brotherhood.removeContractTarget(this.contract!.id, target).subscribe(
			(response: HttpResponse<void>) => {
				this.helper.message(`Successfully removed ${target.firstName} ${target.lastName} from ${this.contract?.codename}.`);
				this.refresh.emit();
			},
			(errorResponse: HttpErrorResponse) => {
				this.helper.httpError(`Failed to remove ${target.firstName} ${target.lastName} from ${this.contract?.codename}.`, errorResponse);
			}
		);
	}

	constructor(
		private brotherhood: BrotherhoodService,
		private helper: HelperService
	) { }
}
