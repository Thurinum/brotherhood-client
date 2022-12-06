import { HttpResponse, HttpErrorResponse } from '@angular/common/http';
import { Component, EventEmitter, Input, Output } from '@angular/core';
import { ContractTarget } from 'src/app/models/target.model';
import { AppState, AppStateService } from 'src/app/services/appstate.service';
import { BrotherhoodService } from 'src/app/services/brotherhood.service';
import { HelperService } from 'src/app/services/helper.service';
import { resizeImage } from "simple-image-resize";
import { Contract } from 'src/app/models/contract.model';
import { Observable, Subscription } from 'rxjs';
import { lastValueFrom } from 'rxjs';

@Component({
	selector: 'app-form-contract-target-create',
	templateUrl: './form-contract-target-create.component.html',
	styleUrls: ['./form-contract-target-create.component.sass']
})
export class FormContractTargetCreateComponent {
	URL = URL

	@Input() assignTo?: Contract
	@Output() create = new EventEmitter();
	@Output() createAndAssign = new EventEmitter();

	firstName: string = ""
	lastName: string = ""
	title: string = ""
	file?: File

	async createContractTarget(file?: File) {
		this.app.isLoading = true;

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
			async (response: Contract) => {
				if (!response) {
					this.helper.error(`Failed to auto-assign target to contract ${this.assignTo?.codename}. Please do so manually.`);
					this.create.emit();
					return;
				}

				target.id = response.id;

				if (this.assignTo) {
					const assign$: any = this.brotherhood.addContractTarget(this.assignTo.id, target).subscribe(
						(response: HttpResponse<any>) => {
							this.helper.message(`Successfully assigned target ${target?.firstName} ${target?.lastName} to contract '${this.assignTo?.codename}'.`);
							this.createAndAssign.emit();
						},
						(error: HttpErrorResponse) => {
							this.app.isLoading = false;
							this.helper.errorWhile(`auto-assigning target to contract ${this.assignTo?.codename}`, error);
						}
					);

					await lastValueFrom(assign$);
				}

				this.app.state = AppState.None;
				this.create.emit();
				this.helper.message(`Successfully registered contract target ${target?.firstName} ${target?.lastName}.`);
			},
			(errorResponse: HttpErrorResponse) => {
				this.app.isLoading = false;
				this.helper.errorWhile(`registering contract target ${target?.firstName} ${target?.lastName} in the database`, errorResponse);
			}
		);
	}

	constructor(
		private brotherhood: BrotherhoodService,
		private app: AppStateService,
		private helper: HelperService
	) { }
}
