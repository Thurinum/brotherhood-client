import { HttpResponse, HttpErrorResponse } from '@angular/common/http';
import { Component, Input } from '@angular/core';
import { Contract } from 'src/app/models/contract.model';
import { ContractShareDTO } from 'src/app/models/contractShareDTO';
import { User } from 'src/app/models/user.model';
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
	@Input() currentUserName?: string;
	@Input() users?: User[];

	addContractAssassin(owner?: string, contract?: Contract) {
		this.app.isLoading = true;

		if (!owner) {
			this.helper.error("Please provide an assassin name.");
			return;
		}

		if (!contract) {
			this.helper.error("Failed to add user since no contract was provided. Please try again.");
			return;
		}

		const dto: ContractShareDTO = new ContractShareDTO(contract.id, owner);

		this.brotherhood.shareContract(dto).subscribe(
			(response: HttpResponse<any>) => {
				this.helper.message(`Successfully assigned ${owner} to ${contract.codename}.`);
				this.app.state = AppState.None;
			},
			(errorResponse: HttpErrorResponse) => {
				this.app.isLoading = false;
				this.helper.errorWhile(`assigning ${owner} to contract '${contract.codename}'`, errorResponse);
			}
		)
	}

	isNotCurrentUser = (value: User) => `${value.firstName} ${value.lastName}` !== this.currentUserName;

	constructor(
		private brotherhood: BrotherhoodService,
		private app: AppStateService,
		private helper: HelperService
	) {}
}
