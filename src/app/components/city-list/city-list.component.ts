import { Component, OnInit, Input } from '@angular/core';
import { City } from 'src/app/models/city.model';
import { Output } from '@angular/core';
import { EventEmitter } from '@angular/core';
import { trigger, style, animate, transition } from '@angular/animations';

@Component({
	selector: 'app-city-list',
	templateUrl: './city-list.component.html',
	styleUrls: ['./city-list.component.sass'],
	animations: [
		trigger(
			"inOutAnimation",
			[
				transition(
					":enter",
					[
						style({ scale: 0.9, opacity: 0 }),
						animate('0.7s ease-out',
							style({ scale: 1, opacity: 1 }))
					]
				),
				transition(
					':leave',
					[
						style({ scale: 1, opacity: 1 }),
						animate('0.3s ease-in',
							style({ scale: 0.6, opacity: 0 }))
					]
				)
			]
		)
	]
})
export class CityListComponent {
	@Input()
	cities: City[] = [];

	@Output()
	add = new EventEmitter<void>();

	@Output()
	remove = new EventEmitter<number | undefined>();

	@Output()
	select = new EventEmitter<City>();
}
