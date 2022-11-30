import { HttpResponse, HttpErrorResponse, HttpParamsOptions, } from "@angular/common/http";
import { Component, EventEmitter, Input, OnInit, Output } from "@angular/core";
import { first } from "rxjs";
import { ContractTarget } from "src/app/models/target.model";
import { AppState, AppStateService } from "src/app/services/appstate.service";
import { BrotherhoodService } from "src/app/services/brotherhood.service";
import { HelperService } from "src/app/services/helper.service";

@Component({
	selector: "app-form-contract-target-upsert",
	templateUrl: "./form-contract-target-upsert.component.html",
	styleUrls: ["./form-contract-target-upsert.component.sass"],
})
export class FormContractTargetUpsertComponent {
	@Input() target? = new ContractTarget()
	@Input() isUpdate: boolean = false;
	@Output() refresh = new EventEmitter()

	file?: File;

	URL = URL;

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
				this.helper.message(`Successfully added ${this.target.firstName} ${this.target.lastName} to the list of targets.`);
				this.app.state = AppState.None;
				this.refresh.emit();
			},
			(errorResponse: HttpErrorResponse) => {
				this.helper.httpError(`Failed to add ${this.target.firstName} ${this.target.lastName} to the list of targets`, errorResponse);
			}
		);
	}

	updateContractTarget(file?: File) {
		if (file) {
			const formdata = new FormData();
			formdata.append("file", file, file.name);
			this.target.formData = formdata;
		}

		this.brotherhood.updateContractTarget(this.target).subscribe(
			(response: HttpResponse<any>) => {
				this.helper.message(`Successfully updated target ${this.target?.firstName} ${this.target?.lastName}.`);
				this.app.state = AppState.None;
				this.refresh.emit();
			},
			(errorResponse: HttpErrorResponse) => {
				this.helper.httpError(`Failed to update target ${this.target?.firstName} ${this.target?.lastName}`, errorResponse);
			}
		);
	}

	constructor(
		private brotherhood: BrotherhoodService,
		private app: AppStateService,
		private helper: HelperService
	) { }
}
