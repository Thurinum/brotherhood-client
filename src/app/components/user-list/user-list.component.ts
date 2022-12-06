import { Component, EventEmitter, Input, Output } from '@angular/core';
import { SlideAnimation } from 'src/app/animations';
import { User } from 'src/app/models/user.model';

@Component({
	selector: 'app-user-list',
	templateUrl: './user-list.component.html',
	styleUrls: ['./user-list.component.sass'],
	animations: [SlideAnimation]
})
export class UserListComponent {
	@Input() users?: User[];
	@Input() allowEdit: boolean = false;

	@Output() add = new EventEmitter();
	@Output() remove = new EventEmitter<User>();
	@Output() refresh = new EventEmitter();

	constructor() { }
}
