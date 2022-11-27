import { Component, Input } from '@angular/core';
import { City } from 'src/app/models/city.model';

@Component({
	selector: 'app-city-details',
	templateUrl: './city-details.component.html',
	styleUrls: ['./city-details.component.sass']
})
export class CityDetailsComponent {
	@Input() model?: City

	constructor() { }
}
