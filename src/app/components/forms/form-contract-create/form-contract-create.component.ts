import { HttpResponse, HttpErrorResponse } from '@angular/common/http';
import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { City } from 'src/app/models/city.model';
import { Contract } from 'src/app/models/contract.model';
import { AppState, AppStateService } from 'src/app/services/appstate.service';
import { BrotherhoodService } from 'src/app/services/brotherhood.service';
import { HelperService } from 'src/app/services/helper.service';

@Component({
  selector: 'app-form-contract-create',
  templateUrl: './form-contract-create.component.html',
  styleUrls: ['./form-contract-create.component.sass']
})
export class FormContractCreateComponent {
	@Input() cities: City[] = [];
	@Output() create = new EventEmitter

	createContract(codename: string, briefing: string, city: City, isPublic: boolean) {
		const contract: Contract = new Contract(codename, briefing, city, isPublic);

		this.brotherhood.createContract(contract).subscribe(
			(response: HttpResponse<Contract[]>) => {
				this.helper.message(`Successfully added contract '${contract.codename}'.`);
				this.app.state = AppState.None;
				this.create.emit();
			},
			(errorResponse: HttpErrorResponse) => {
				this.helper.httpError(`Failed to add contract`, errorResponse);
			}
		)
	}

	constructor(
		private brotherhood: BrotherhoodService,
		private app: AppStateService,
		private helper: HelperService
	) {}
}

