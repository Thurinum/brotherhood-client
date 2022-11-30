import { HttpResponse, HttpErrorResponse } from '@angular/common/http';
import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { Contract } from 'src/app/models/contract.model';
import { ContractTarget } from 'src/app/models/target.model';
import { AppState, AppStateService } from 'src/app/services/appstate.service';
import { BrotherhoodService } from 'src/app/services/brotherhood.service';
import { HelperService } from 'src/app/services/helper.service';

@Component({
	selector: 'app-form-contract-target-upsert',
	templateUrl: './form-contract-target-upsert.component.html',
	styleUrls: ['./form-contract-target-upsert.component.sass']
})
export class FormContractTargetUpsertComponent {
	@Input() target?: ContractTarget

	firstName: string = ""
	lastName: string = ""


	createContractTarget() {
		this.brotherhood.createContractTarget(this.target!).subscribe(
			(response: HttpResponse<any>) => {
				this.helper.message(`Successfully added ${this.target?.firstName} ${this.target?.lastName} to the list of targets.`);
				this.app.state = AppState.None;
			},
			(errorResponse: HttpErrorResponse) => {
				this.helper.httpError(`Failed to add ${this.target?.firstName} ${this.target?.lastName} to the list of targets.`, errorResponse);
			}
		)
	}

	constructor(
		private brotherhood: BrotherhoodService,
		private app: AppStateService,
		private helper: HelperService
	) { }
}
