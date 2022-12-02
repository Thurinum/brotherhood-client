import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { City } from 'src/app/models/city.model';
import { SlideAnimation } from 'src/app/animations';

@Component({
	selector: 'app-city-list',
	templateUrl: './city-list.component.html',
	styleUrls: ['./city-list.component.sass'],
	animations: [SlideAnimation]
})
export class CityListComponent {
	@Input() cities!: City[]
	@Input() allowEdit: boolean = false

	@Output() add = new EventEmitter
	@Output() refresh = new EventEmitter
}
