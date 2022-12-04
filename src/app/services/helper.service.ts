import { Injectable } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { HttpErrorResponse } from '@angular/common/http';

@Injectable({ providedIn: 'root' })
export class HelperService {
	message(message: string, action: string = "OK") {
		this.snackBar.open(message, action, { verticalPosition: "top", panelClass: ["snackbar"] });
		console.info(message);
	}

	error(message: string, action: string = "OK") {
		this.snackBar.open(message, action, { verticalPosition: "top", panelClass: ["snackbar", "snackbar-error"] });
		console.error(message);
	}

	errorWhile(attemptedAction: string, errorResponse: HttpErrorResponse, action: string = "OK") {
		const errorMessage = errorResponse.error?.errors
			? Object.values(errorResponse.error.errors).join('\n').replace(/,/g, '\n')
			: errorResponse.error?.message ?? errorResponse.message ?? "Unknown error";
		const errorStatus = errorResponse.error.statusName ?? "Form validation error";
		const fullMessage = `${errorResponse.status} ${errorStatus.toUpperCase()} while ${attemptedAction.toUpperCase()}:\n\n${errorMessage}`;

		this.snackBar.open(fullMessage, action, { verticalPosition: "top", panelClass: ["snackbar", "snackbar-error"] });
		console.error(fullMessage);
	}

	constructor(private snackBar: MatSnackBar) { }
}
