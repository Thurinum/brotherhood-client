import { HttpResponse, HttpErrorResponse } from '@angular/common/http';
import { Component, EventEmitter, Input, Output } from '@angular/core';
import { ContractTarget } from 'src/app/models/target.model';
import { BrotherhoodService } from 'src/app/services/brotherhood.service';
import { HelperService } from 'src/app/services/helper.service';

@Component({
	selector: 'app-form-contract-target-nuke',
	templateUrl: './form-contract-target-nuke.component.html',
	styleUrls: ['./form-contract-target-nuke.component.sass']
})
export class FormContractTargetNukeComponent {
	@Input() target!: ContractTarget
	@Output() refresh = new EventEmitter()

	removeContractTarget() {
		this.brotherhood.softDeleteContractTarget(this.target).subscribe(
			(response: HttpResponse<void>) => {
				this.helper.message(`${this.target.firstName} ${this.target.lastName} is no longer targeted by any contract.`);
				this.refresh.emit();
			},
			(errorResponse: HttpErrorResponse) => {
				this.helper.errorWhile(`removing target ${this.target.firstName} ${this.target.lastName} from all contracts`, errorResponse);
			}
		);
	}

	deleteContractTarget() {
		this.brotherhood.deleteContractTarget(this.target).subscribe(
			(response: HttpResponse<void>) => {
				this.helper.message(`Contract target ${this.target.firstName} ${this.target.lastName} unregistered successfully.`);
				this.refresh.emit();
			},
			(errorResponse: HttpErrorResponse) => {
				this.helper.errorWhile(`unregistering contract target ${this.target.firstName} ${this.target.lastName} from the database`, errorResponse);
			}
		);
	}

	constructor(
		private brotherhood: BrotherhoodService,
		private helper: HelperService,
	) { }
}
