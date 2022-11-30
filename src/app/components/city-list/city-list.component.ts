import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { City } from 'src/app/models/city.model';
import { SlideAnimation } from 'src/app/animations.module';

@Component({
	selector: 'app-city-list',
	templateUrl: './city-list.component.html',
	styleUrls: ['./city-list.component.sass'],
	animations: [SlideAnimation]
})
export class CityListComponent {
	@Input() cities!: City[]

	@Output() add = new EventEmitter
	@Output() refresh = new EventEmitter
}
