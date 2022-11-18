import { Injectable } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { HttpErrorResponse } from '@angular/common/http';

@Injectable({ providedIn: 'root' })
export class HelperService {
	message(msg: string, action: string = "OK") {
		this.snackBar.open(msg, action, { verticalPosition: 'top' });
	}

	error(msg: string, error: string, action: string = "OK") {
		this.snackBar.open(msg, action, { verticalPosition: 'top', panelClass: ["red-snackbar"] });
		console.error(`${msg}\n\n${error.toUpperCase()}`);
	}

	constructor(private snackBar: MatSnackBar) { }
}
