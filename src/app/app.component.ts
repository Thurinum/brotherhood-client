import { Component } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { City } from 'src/models/city.model';

@Component({
	selector: 'app-root',
	templateUrl: './app.component.html',
	styleUrls: ['./app.component.css']
})
export class AppComponent {
	cities: City[] = [];
	city: City = new City('', false);

	getCities(): void {
		this.http.get<City[]>('https://localhost:5001/api/cities').subscribe(cities => {
			this.cities = cities;
		});
	}

	saveCity(): void {
		this.http.post<City>('https://localhost:5001/api/cities/add', this.city).subscribe();
	}

	constructor(private http: HttpClient) {
		this.getCities();
	}
}
