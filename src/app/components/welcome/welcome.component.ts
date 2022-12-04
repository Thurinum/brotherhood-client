import { Component, Input, OnInit } from '@angular/core';
import { Statistics } from 'src/app/models/statistics.model';

@Component({
	selector: 'app-welcome',
	templateUrl: './welcome.component.html',
	styleUrls: ['./welcome.component.sass']
})
export class WelcomeComponent {
	@Input() role?: string
	@Input() isLoggedIn?: boolean
	@Input() statistics?: Statistics
	@Input() currentTab?: number
	@Input() user?: string

	constructor() { }
}
