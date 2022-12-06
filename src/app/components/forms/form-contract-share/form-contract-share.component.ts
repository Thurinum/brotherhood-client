import { HttpResponse, HttpErrorResponse } from '@angular/common/http';
import { Component, Input } from '@angular/core';
import { Contract } from 'src/app/models/contract.model';
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

	addContractAssassin(sharee?: User, contract?: Contract) {
		this.app.isLoading = true;

		if (!sharee) {
			this.helper.error("Please provide an assassin name.");
			return;
		}

		if (!contract) {
			this.helper.error("Failed to add user since no contract was provided. Please try again.");
			return;
		}

		this.brotherhood.shareContract(contract.id, sharee).subscribe(
			(response: HttpResponse<any>) => {
				this.helper.message(`Successfully assigned ${sharee.firstName} ${sharee.lastName} to ${contract.codename}.`);
				this.app.state = AppState.None;
				this.app.isLoading = false;
			},
			(errorResponse: HttpErrorResponse) => {
				this.helper.errorWhile(`assigning ${sharee.firstName} ${sharee.lastName} to contract '${contract.codename}'`, errorResponse);
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
