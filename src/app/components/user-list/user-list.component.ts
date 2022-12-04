import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { User } from 'src/app/models/user.model';
import { AppState } from 'src/app/services/appstate.service';

@Component({
	selector: 'app-user-list',
	templateUrl: './user-list.component.html',
	styleUrls: ['./user-list.component.sass']
})
export class UserListComponent {
	@Input() users?: User[];
	@Input() allowEdit: boolean = false;

	@Output() add = new EventEmitter();
	@Output() refresh = new EventEmitter();

	constructor() { }
}
