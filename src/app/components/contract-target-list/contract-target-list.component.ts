import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { ContractTarget } from 'src/app/models/target.model';
import { SlideAnimation } from 'src/app/animations';
import { BrotherhoodService } from 'src/app/services/brotherhood.service';
import { HttpErrorResponse, HttpResponse } from '@angular/common/http';
import { HelperService } from 'src/app/services/helper.service';
import { AppStateService } from 'src/app/services/appstate.service';

@Component({
	selector: 'app-contract-target-list',
	templateUrl: './contract-target-list.component.html',
	styleUrls: ['./contract-target-list.component.sass'],
	animations: [SlideAnimation]
})
export class ContractTargetListComponent {
	@Input() targets!: ContractTarget[]
	@Input() allowEdit: boolean = false
	@Input() allowRemove: boolean = false

	@Output() add = new EventEmitter()
	@Output() refresh = new EventEmitter()
	@Output() remove = new EventEmitter()
	@Output() select = new EventEmitter<ContractTarget>()

	selectedId: number = -1;

	removeContractTarget(target: ContractTarget) {
		this.app.isLoading = true;

		this.brotherhood.deleteContractTarget(target).subscribe(
			(response: HttpResponse<void>) => {
				this.helper.message(`Contract target ${target.firstName} ${target.lastName} unregistered successfully`);
				this.refresh.emit();
			},
			(errorResponse: HttpErrorResponse) => {
				this.app.isLoading = false;
				this.helper.errorWhile(`unregistering ${target.firstName} ${target.lastName}`, errorResponse);
			}
		);
	}

	constructor(
		private brotherhood: BrotherhoodService,
		private app: AppStateService,
		private helper: HelperService,
	) {}
}
