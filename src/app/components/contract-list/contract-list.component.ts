import { Component, OnInit, Input } from '@angular/core';
import { Contract } from 'src/app/models/contract.model';
import { Output } from '@angular/core';
import { EventEmitter } from '@angular/core';
import { SlideAnimation, ZoomAnimation } from 'src/app/animations';

@Component({
	selector: 'app-contract-list',
	templateUrl: './contract-list.component.html',
	styleUrls: ['./contract-list.component.sass'],
	animations: [SlideAnimation, ZoomAnimation]
})
export class ContractListComponent {
	@Input()
	contracts: Contract[] = [];

	@Input()
	canAdd: boolean = false;

	@Input()
	isLoading: boolean = true;

	@Input()
	canRemove: boolean = false;

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
