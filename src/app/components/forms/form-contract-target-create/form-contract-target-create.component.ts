import { HttpResponse, HttpErrorResponse } from '@angular/common/http';
import { Component, EventEmitter, Output } from '@angular/core';
import { ContractTarget } from 'src/app/models/target.model';
import { AppState, AppStateService } from 'src/app/services/appstate.service';
import { BrotherhoodService } from 'src/app/services/brotherhood.service';
import { HelperService } from 'src/app/services/helper.service';
import { resizeImage } from "simple-image-resize";

@Component({
	selector: 'app-form-contract-target-create',
	templateUrl: './form-contract-target-create.component.html',
	styleUrls: ['./form-contract-target-create.component.sass']
})
export class FormContractTargetCreateComponent {
	URL = URL

	@Output() refresh = new EventEmitter()

	firstName: string = ""
	lastName: string = ""
	title: string = ""
	file?: File

	async createContractTarget(file?: File) {
		let target = new ContractTarget();
		target.firstName = this.firstName;
		target.lastName = this.lastName;
		target.title = this.title;

		const formData = new FormData();
		formData.append("model", JSON.stringify(target));

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

		this.brotherhood.createContractTarget(formData).subscribe(
			(response: HttpResponse<any>) => {
				this.helper.message(`Successfully registered contract target ${target?.firstName} ${target?.lastName}.`);
				this.app.state = AppState.None;
				this.refresh.emit();
			},
			(errorResponse: HttpErrorResponse) => {
				this.helper.httpError(`Failed to register contract target ${target?.firstName} ${target?.lastName}`, errorResponse);
			}
		);
	}

	constructor(
		private brotherhood: BrotherhoodService,
		private app: AppStateService,
		private helper: HelperService
	) { }
}
