import { HttpErrorResponse } from '@angular/common/http';
import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { Assassin } from 'src/app/models/assassin.model';
import { Auth } from 'src/app/models/auth.interface';
import { AppStateService, AppState } from 'src/app/services/appstate.service';
import { BrotherhoodService } from 'src/app/services/brotherhood.service';
import { HelperService } from 'src/app/services/helper.service';

@Component({
	selector: 'app-form-login',
	templateUrl: './form-login.component.html',
	styleUrls: ['./form-login.component.sass']
})
export class FormLoginComponent {
	@Output() login = new EventEmitter

	_login(identifier: string, password: string) {
		let user: Assassin = new Assassin;

		// detect email (simple check for x@y)
		if (identifier.match(/^\S+@\S+$/))
			user.email = identifier;
		else
			user.username = identifier;

		user.password = password;

		this.brotherhood.login(user).subscribe(
			(response: Auth) => {
				if (!response)
					return;

				localStorage.setItem("authKey", response.token);
				localStorage.setItem("authTime", response.validTo.toString());
				localStorage.setItem("authUser", response.username);
				localStorage.setItem("authRole", response.role);
				this.helper.message(`Logged in as '${response.username}'.`);

				this.app.isLoggedIn = true;
				this.app.state = AppState.None;
				this.app.user = response.username;
				this.app.role = response.role;
				this.login.emit();
			},
			(errorResponse: HttpErrorResponse) => {
				this.helper.errorWhile(`authenticating to the server`, errorResponse);
			}
		);
	}

	constructor(
		private brotherhood: BrotherhoodService,
		private app: AppStateService,
		private helper: HelperService
	) {}
}
