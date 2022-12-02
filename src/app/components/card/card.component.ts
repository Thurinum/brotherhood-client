import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { Contract } from 'src/app/models/contract.model';

@Component({
	selector: 'app-card',
	templateUrl: './card.component.html',
	styleUrls: ['./card.component.sass'],
})
export class CardComponent implements OnInit {
	fallbackImage: string = "https://i.pinimg.com/564x/36/21/55/36215579663ec50ce28f6cd2233de365.jpg"

	@Input() allowRemove: boolean = false;
	@Input() selected: boolean = false;
	@Input() model: any
	@Input() title: string = "???"
	@Input() image: string = this.fallbackImage
	@Input() overlay: string = ""

	@Output() select = new EventEmitter<any>();
	@Output() remove = new EventEmitter<any>();

	constructor() { }
	ngOnInit(): void { }
}
