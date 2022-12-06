import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { Contract } from 'src/app/models/contract.model';
import { OwlOptions } from 'ngx-owl-carousel-o';
import { ContractTarget } from 'src/app/models/target.model';
import { BrotherhoodService } from 'src/app/services/brotherhood.service';
import { HttpErrorResponse, HttpResponse } from '@angular/common/http';
import { HelperService } from 'src/app/services/helper.service';
import { AppStateService } from 'src/app/services/appstate.service';

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
	@Output() setCover = new EventEmitter<Contract>()

	carouselOptions: OwlOptions = {
		loop: false,
		mouseDrag: true,
		touchDrag: true,
		pullDrag: true,
		dots: true,
		nav: true,
		navText: ['<', '>'],
		navSpeed: 700,
		items: 2,
		center: true
	}

	setContractCover(target: ContractTarget) {
		this.app.isLoading = true;

		this.brotherhood.setContractCover(this.contract!.id, target).subscribe(
			(response: Contract) => {
				this.helper.message(`Successfully set ${target.firstName} ${target.lastName} as cover for ${this.contract?.codename}.`);
				this.contract = response;
				this.setCover.emit(this.contract);
			},
			(errorResponse: HttpErrorResponse) => {
				this.app.isLoading = false;
				this.helper.errorWhile(`setting ${target.firstName} ${target.lastName} as cover for contract '${this.contract?.codename}'`, errorResponse);
			}
		);
	}

	removeTarget(target: ContractTarget) {
		this.app.isLoading = true;

		this.brotherhood.removeContractTarget(this.contract!.id, target).subscribe(
			(response: HttpResponse<void>) => {
				this.helper.message(`Successfully removed ${target.firstName} ${target.lastName} from ${this.contract?.codename}.`);
				this.refresh.emit();
			},
			(errorResponse: HttpErrorResponse) => {
				this.app.isLoading = false;
				this.helper.errorWhile(`removing ${target.firstName} ${target.lastName} from '${this.contract?.codename}'`, errorResponse);
			}
		);
	}

	constructor(
		private brotherhood: BrotherhoodService,
		private app: AppStateService,
		private helper: HelperService
	) { }
}
