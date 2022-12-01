import { HttpResponse, HttpErrorResponse } from '@angular/common/http';
import { Component, EventEmitter, Output } from '@angular/core';
import { ContractTarget } from 'src/app/models/target.model';
import { AppState, AppStateService } from 'src/app/services/appstate.service';
import { BrotherhoodService } from 'src/app/services/brotherhood.service';
import { HelperService } from 'src/app/services/helper.service';

@Component({
	selector: 'app-form-contract-target-create',
	templateUrl: './form-contract-target-create.component.html',
	styleUrls: ['./form-contract-target-create.component.sass']
})
export class FormContractTargetCreateComponent {
	URL = URL

	@Output() refresh = new EventEmitter()

	firstName: string = "";
	lastName: string = "";
	file?: File;

	createContractTarget(file?: File) {
		if (!file) {
			this.helper.message("Please select an image for the target.");
			return;
		}

		const target = new ContractTarget();
		const formData = new FormData;
		formData.append("file", file, file.name);
		target.formData = formData;

		this.brotherhood.createContractTarget(target).subscribe(
			(response: HttpResponse<any>) => {
				this.helper.message(`Successfully added ${this.firstName} ${this.lastName} to the list of targets.`);
				this.app.state = AppState.None;
				this.refresh.emit();
			},
			(errorResponse: HttpErrorResponse) => {
				this.helper.httpError(`Failed to add ${this.firstName} ${this.lastName} to the list of targets`, errorResponse);
			}
		);
	}

	constructor(
		private brotherhood: BrotherhoodService,
		private app: AppStateService,
		private helper: HelperService
	) { }
}
