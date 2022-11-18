import { Component, OnInit, Input } from '@angular/core';
import { City } from 'src/app/models/city.model';
import { BrotherhoodService } from 'src/app/services/brotherhood.service';
import { HelperService } from 'src/app/services/helper.service';
import { Output } from '@angular/core';
import { EventEmitter } from '@angular/core';

@Component({
	selector: 'app-city-list',
	templateUrl: './city-list.component.html',
	styleUrls: ['./city-list.component.sass']
})
export class CityListComponent implements OnInit {
	@Input()
	cities: City[] = [];

	@Output()
	remove = new EventEmitter<number | undefined>();

	constructor(
		private helper: HelperService,
		private brotherhood: BrotherhoodService
	) {}
	ngOnInit(): void { }
}
