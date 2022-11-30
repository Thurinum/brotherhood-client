import { HttpResponse, HttpErrorResponse } from '@angular/common/http';
import { Component, Input } from '@angular/core';
import { Contract } from 'src/app/models/contract.model';
import { ContractShareDTO } from 'src/app/models/contractShareDTO';
import { AppState, AppStateService } from 'src/app/services/appstate.service';
import { BrotherhoodService } from 'src/app/services/brotherhood.service';
import { HelperService } from 'src/app/services/helper.service';

@Component({
	selector: 'app-form-contract-share',
	templateUrl: './form-contract-share.component.html',
	styleUrls: ['./form-contract-share.component.sass']
})
export class FormContractShareComponent {
	@Input() contract?: Contract;

	addContractAssassin(owner?: string, contract?: Contract) {
		if (!owner) {
			this.helper.message("Please enter an assassin name.");
			return;
		}

		if (!contract) {
			this.helper.message("Something went wrong. Please retry.");
			return;
		}

		const dto: ContractShareDTO = new ContractShareDTO(contract.id, owner);

		this.brotherhood.shareContract(dto).subscribe(
			(response: HttpResponse<any>) => {
				this.helper.message(`Successfully assigned ${owner} to ${contract.codename}.`);
				this.app.state = AppState.None;
			},
			(errorResponse: HttpErrorResponse) => {
				this.helper.httpError(`Failed to assign ${owner} to ${contract.codename}`, errorResponse);
			}
		)
	}

	constructor(
		private brotherhood: BrotherhoodService,
		private app: AppStateService,
		private helper: HelperService
	) {}
}
