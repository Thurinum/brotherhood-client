import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { Contract } from 'src/app/models/contract.model';

@Component({
	selector: 'app-card',
	templateUrl: './card.component.html',
	styleUrls: ['./card.component.sass'],
})
export class CardComponent implements OnInit {
	@Input() canRemove: boolean = false;
	@Input() selected: boolean = false;
	@Input() model?: Contract
	@Input() image: string = ""
	@Output() select = new EventEmitter<any>();
	@Output() remove = new EventEmitter<any>();

	constructor() { }
	ngOnInit(): void { }
}
