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
		),
		trigger(
			"slideXAnimation",
			[
				transition(
					":enter",
					[
						style({ transform: "translateX(-100px) scaleY(0)", opacity: 0 }),
						animate('0.7s cubic-bezier(0.8, 0.15, 0.2, 1)',
							style({ transform: "translateX(0) scaleY(1)", opacity: 1 }))
					]
				),
				transition(
					':leave',
					[
						style({ transform: "translateX(0px) scaleY(1)", opacity: 1 }),
						animate('0.3s cubic-bezier(0.8, 0.15, 0.2, 1)',
							style({ transform: "translateX(100px) scaleY(0)", opacity: 0 }))
					]
				)
			]
		)
	]
})
export class CityListComponent {
	@Input()
	model: City[] = [];

	@Input()
	canAdd: boolean = false;

	@Output()
	add = new EventEmitter<void>();

	@Output()
	remove = new EventEmitter<City>();

	@Output()
	select = new EventEmitter<City>();

	@Output()
	refresh = new EventEmitter<void>();

	selectedId: number = -1;
}
