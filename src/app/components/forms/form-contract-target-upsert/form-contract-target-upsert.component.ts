import { HttpErrorResponse } from '@angular/common/http';
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

	constructor(
		private brotherhood: BrotherhoodService,
		private app: AppStateService,
		private helper: HelperService
	) { }
}
