import { HttpErrorResponse, HttpResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { User } from 'src/app/models/user.model';
import { AppState, AppStateService } from 'src/app/services/appstate.service';
import { BrotherhoodService } from 'src/app/services/brotherhood.service';
import { HelperService } from 'src/app/services/helper.service';

@Component({
	selector: 'app-form-register',
	templateUrl: './form-register.component.html',
	styleUrls: ['./form-register.component.sass']
})
export class FormRegisterComponent {
	register(
		username: string,
		email: string,
		password: string,
		passwordConfirm: string
	) {
		let user: User = new User;
		user.username = username;
		user.email = email;
		user.password = password;
		user.passwordConfirm = passwordConfirm;

		this.brotherhood.createUser(user).subscribe(
			(response: HttpResponse<void>) => {
				this.helper.message(`Successfully registered as '${user.username}'.`);
				this.app.state = AppState.None;
			},
			(errorResponse: HttpErrorResponse) => {
				// TODO: Handle first name and last name
				this.helper.errorWhile(`registering user '${user.username}'`, errorResponse);
			}
		);
	}

	constructor(
		private brotherhood: BrotherhoodService,
		private app: AppStateService,
		private helper: HelperService
	) { }
}
