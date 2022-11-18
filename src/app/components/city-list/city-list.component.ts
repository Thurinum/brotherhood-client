import { Component, OnInit, Input } from '@angular/core';
import { City } from 'src/app/models/city.model';
import { HelperService } from 'src/app/services/helper.service';

@Component({
	selector: 'app-city-list',
	templateUrl: './city-list.component.html',
	styleUrls: ['./city-list.component.sass']
})
export class CityListComponent implements OnInit {
	artists: City[] = [];

	private localStorage: Storage = window.localStorage;

	constructor(
		private helper: HelperService,
	) {

	}
	ngOnInit(): void { }
}
