import { HttpResponse, HttpErrorResponse } from '@angular/common/http';
import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { City } from 'src/app/models/city.model';
import { Contract } from 'src/app/models/contract.model';
import { AppState, AppStateService } from 'src/app/services/appstate.service';
import { BrotherhoodService } from 'src/app/services/brotherhood.service';
import { HelperService } from 'src/app/services/helper.service';

@Component({
	selector: 'app-form-contract-update',
	templateUrl: './form-contract-update.component.html',
	styleUrls: ['./form-contract-update.component.sass']
})
export class FormContractUpdateComponent {
	@Input() cities: City[] = [];
	@Input() contract!: Contract
	@Output() refresh = new EventEmitter

	updateContract() {
		this.app.isLoading = true;

		this.brotherhood.updateContract(this.contract.id, this.contract).subscribe(
			(response: HttpResponse<any>) => {
				this.helper.message(`Successfully updated contract ${this.contract.codename}.`);
				this.app.state = AppState.None;
				this.refresh.emit();
			},
			(errorResponse: HttpErrorResponse) => {
				this.app.isLoading = false;
				this.helper.errorWhile(`updating contract ${this.contract.codename}`, errorResponse);
			}
		);
	}

	constructor(
		private brotherhood: BrotherhoodService,
		private app: AppStateService,
		private helper: HelperService
	) { }
}
