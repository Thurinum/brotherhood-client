import { HttpResponse, HttpErrorResponse } from '@angular/common/http';
import { Component, EventEmitter, Input, Output } from '@angular/core';
import { Contract } from 'src/app/models/contract.model';
import { ContractTarget } from 'src/app/models/target.model';
import { AppState, AppStateService } from 'src/app/services/appstate.service';
import { BrotherhoodService } from 'src/app/services/brotherhood.service';
import { HelperService } from 'src/app/services/helper.service';

@Component({
	selector: 'app-form-contract-target-add',
	templateUrl: './form-contract-target-add.component.html',
	styleUrls: ['./form-contract-target-add.component.sass']
})
export class FormContractTargetAddComponent {
	@Input() contract?: Contract
	@Input() contractTargets?: ContractTarget[]

	@Output() refresh = new EventEmitter()

	addTargetToCurrentContract(target: ContractTarget) {
		this.brotherhood.addContractTarget(this.contract?.id!, target).subscribe(
			(response: HttpResponse<void>) => {
				console.log("Added target to contract");
				this.refresh.emit();
			},
			(errorResponse: HttpErrorResponse) => {
				this.helper.errorWhile(`adding target ${target.firstName} ${target.lastName} to contract '${this.contract?.codename}'`, errorResponse);
			}
		);
	}

	constructor(
		private brotherhood: BrotherhoodService,
		private helper: HelperService
	) { }
}
