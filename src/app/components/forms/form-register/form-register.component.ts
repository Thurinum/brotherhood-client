import { HttpErrorResponse, HttpResponse } from '@angular/common/http';
import { Component, EventEmitter, OnInit, Output } from '@angular/core';
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
	@Output() add = new EventEmitter();

	register(
		username: string,
		firstName: string,
		lastName: string,
		email: string,
		password: string,
		passwordConfirm: string
	) {
		let user: User = new User;
		user.username = username;
		user.firstName = firstName;
		user.lastName = lastName;
		user.email = email;
		user.password = password;
		user.passwordConfirm = passwordConfirm;

		this.brotherhood.createUser(user).subscribe(
			(response: HttpResponse<void>) => {
				this.helper.message(`Successfully registered '${user.username}'.`);
				this.add.emit();
				this.app.state = AppState.None;
			},
			(errorResponse: HttpErrorResponse) => {
				// TODO: Handle first name and last name
				this.helper.errorWhile(`registering user '${user.firstName} ${user.lastName}'`, errorResponse);
			}
		);
	}

	constructor(
		private brotherhood: BrotherhoodService,
		private app: AppStateService,
		private helper: HelperService
	) { }
}
