import { Component, OnInit, Input } from '@angular/core';
import { Contract } from 'src/app/models/contract.model';
import { Output } from '@angular/core';
import { EventEmitter } from '@angular/core';
import { trigger, style, animate, transition } from '@angular/animations';

@Component({
	selector: 'app-contract-list',
	templateUrl: './contract-list.component.html',
	styleUrls: ['./contract-list.component.sass'],
	animations: [
		trigger(
			"inOutAnimation",
			[
				transition(
					":enter",
					[
						style({ scale: 0.9, opacontract: 0 }),
						animate('0.7s ease-out',
							style({ scale: 1, opacontract: 1 }))
					]
				),
				transition(
					':leave',
					[
						style({ scale: 1, opacontract: 1 }),
						animate('0.3s ease-in',
							style({ scale: 0.6, opacontract: 0 }))
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
export class ContractListComponent {
	@Input()
	contracts: Contract[] = [];

	@Input()
	canAdd: boolean = false;

	@Output()
	add = new EventEmitter<void>();

	@Output()
	remove = new EventEmitter<Contract>();

	@Output()
	select = new EventEmitter<Contract>();

	@Output()
	refresh = new EventEmitter<void>();

	selectedId: number = -1;
}
