import { Component, Input, OnInit } from '@angular/core';
import { Statistics } from 'src/app/models/statistics.model';

@Component({
	selector: 'app-statistics',
	templateUrl: './statistics.component.html',
	styleUrls: ['./statistics.component.sass']
})
export class StatisticsComponent {
	@Input() statistics?: Statistics;

	constructor() { }
}
