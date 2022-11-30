import {
	HttpResponse,
	HttpErrorResponse,
	HttpParamsOptions,
} from "@angular/common/http";
import { Component, EventEmitter, Input, OnInit, Output } from "@angular/core";
import { Contract } from "src/app/models/contract.model";
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
	@Input() target?: ContractTarget;
	@Output() refresh = new EventEmitter();

	firstName: string = "";
	lastName: string = "";

	URL = URL;

	createContractTarget(file: File) {
		if (!file) {
			this.helper.message("You must select an image file!");
			return;
		}

		if (this.target) {
			this.helper.message("There is already a current target!");
			return;
		}

		this.target = new ContractTarget(this.firstName, this.lastName);

		const formdata = new FormData();
		formdata.append("file", file, file.name);
		this.target.formData = formdata;

		this.brotherhood.createContractTarget(this.target).subscribe(
			(response: HttpResponse<any>) => {
				this.helper.message(
					`Successfully added ${this.target?.firstName} ${this.target?.lastName} to the list of targets.`
				);
				this.app.state = AppState.None;
				this.refresh.emit();
			},
			(errorResponse: HttpErrorResponse) => {
				this.helper.httpError(
					`Failed to add ${this.target?.firstName} ${this.target?.lastName} to the list of targets.`,
					errorResponse
				);
			}
		);
	}

	updateContractTarget(file: File) {
		if (!this.target) {
			this.helper.message("There is already a current target!");
			return;
		}

		if (file) {
			const formdata = new FormData();
			formdata.append("file", file, file.name);
			this.target.formData = formdata;
		}

		this.brotherhood.updateContractTarget(this.target).subscribe(
			(response: HttpResponse<any>) => {
				this.helper.message(
					`Successfully added ${this.target?.firstName} ${this.target?.lastName} to the list of targets.`
				);
				this.app.state = AppState.None;
				this.refresh.emit();
			},
			(errorResponse: HttpErrorResponse) => {
				this.helper.httpError(
					`Failed to add ${this.target?.firstName} ${this.target?.lastName} to the list of targets.`,
					errorResponse
				);
			}
		);
	}

	constructor(
		private brotherhood: BrotherhoodService,
		private app: AppStateService,
		private helper: HelperService
	) { }
}
