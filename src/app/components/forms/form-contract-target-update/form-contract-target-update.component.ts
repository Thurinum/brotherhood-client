import { HttpResponse, HttpErrorResponse, HttpParamsOptions, } from "@angular/common/http";
import { Component, EventEmitter, Input, OnInit, Output } from "@angular/core";
import { ContractTarget } from "src/app/models/target.model";
import { AppState, AppStateService } from "src/app/services/appstate.service";
import { BrotherhoodService } from "src/app/services/brotherhood.service";
import { HelperService } from "src/app/services/helper.service";
import { resizeImage } from "simple-image-resize";

@Component({
	selector: "app-form-contract-target-update",
	templateUrl: "./form-contract-target-update.component.html",
	styleUrls: ["./form-contract-target-update.component.sass"],
})
export class FormContractTargetUpdateComponent {
	URL = URL;

	@Input() target = new ContractTarget()
	@Output() refresh = new EventEmitter()

	file?: File;

	async updateContractTarget(file?: File) {
		this.app.isLoading = true;
		const formData = new FormData();
		formData.append("model", JSON.stringify(this.target));

		if (file) {
			const smImage = await resizeImage(file, {
				maxWidth: 256,
				maxHeight: Infinity,
				quality: 1.0,
			});
			formData.append("image-sm", new File([smImage], file.name));

			const lgImage = await resizeImage(file, {
				maxWidth: 1024,
				maxHeight: Infinity,
				quality: 1.0,
			});
			formData.append("image-lg", new File([lgImage], file.name));
		}

		this.brotherhood.updateContractTarget(this.target.id!, formData).subscribe(
			(response: HttpResponse<any>) => {
				this.helper.message(`Successfully updated target ${this.target?.firstName} ${this.target?.lastName}.`);
				this.app.state = AppState.None;
				this.refresh.emit();
			},
			(errorResponse: HttpErrorResponse) => {
				this.app.isLoading = false;
				this.helper.errorWhile(`updating contract target ${this.target?.firstName} ${this.target?.lastName}`, errorResponse);
			}
		);
	}

	constructor(
		private brotherhood: BrotherhoodService,
		private app: AppStateService,
		private helper: HelperService
	) { }
}
