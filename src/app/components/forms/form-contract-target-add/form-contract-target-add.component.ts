import { HttpResponse, HttpErrorResponse } from '@angular/common/http';
import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { Contract } from 'src/app/models/contract.model';
import { ContractShareDTO } from 'src/app/models/contractShareDTO';
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
	@Input() contract?: Contract;
	@Input() contractTargets?: ContractTarget[];
	@Output() added = new EventEmitter;

	addTargetToCurrentContract(target: ContractTarget) {
		this.brotherhood.addContractTarget(this.contract?.id!, target).subscribe(
			(response: any) => {
				this.added.emit();
			},
			(errorResponse: HttpErrorResponse) => {
				this.helper.errorWhile(`adding target ${target.firstName} ${target.lastName} to contract '${this.contract?.codename}'`, errorResponse);
			})
		this.app.state = AppState.None;
	}

	constructor(
		private brotherhood: BrotherhoodService,
		private app: AppStateService,
		private helper: HelperService
	) { }
}
