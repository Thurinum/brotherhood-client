import { Component, Input, OnInit } from '@angular/core';
import { City } from 'src/app/models/city.model';

@Component({
	selector: 'app-city-list',
	templateUrl: './city-list.component.html',
	styleUrls: ['./city-list.component.sass']
})
export class CityListComponent {
	@Input() cities!: City[]

	constructor() { }

}
