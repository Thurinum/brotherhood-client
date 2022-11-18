import { Component } from '@angular/core';
import { City } from './models/city.model';
import { BrotherhoodService } from './services/brotherhood.service';
import { HelperService } from './services/helper.service';

@Component({
	selector: 'app-root',
	templateUrl: './app.component.html',
	styleUrls: ['./app.component.sass']
})
export class AppComponent {
	cities: City[] = [];
	currentCity: City = new City("", false);

	refreshCities() {
		this.brotherhood.getCities().subscribe((cities: City[]) => {
			if (cities.length === 0)
				this.helper.popup("There are no cities in database.");

			this.cities = cities;
		});
	}

	addCity() {
		this.brotherhood.createCity(this.currentCity).subscribe((response: void) => {
			console.log(response);
			this.refreshCities();
		});
	}

	nukeCity(id?: number) {
		this.brotherhood.deleteCity(id).subscribe((response: void) => {
			console.log(response);
			this.refreshCities();
		});
	}

	constructor(
		private brotherhood: BrotherhoodService,
		private helper: HelperService
	) {
		this.refreshCities();
	}
}
