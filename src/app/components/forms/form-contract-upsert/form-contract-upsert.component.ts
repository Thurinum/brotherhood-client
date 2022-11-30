import { Component, OnInit } from '@angular/core';
import { AppStateService } from 'src/app/services/appstate.service';
import { BrotherhoodService } from 'src/app/services/brotherhood.service';
import { HelperService } from 'src/app/services/helper.service';

@Component({
  selector: 'app-form-contract-upsert',
  templateUrl: './form-contract-upsert.component.html',
  styleUrls: ['./form-contract-upsert.component.sass']
})
export class FormContractUpsertComponent {
	constructor(
		private brotherhood: BrotherhoodService,
		private app: AppStateService,
		private helper: HelperService
	) {}
}

