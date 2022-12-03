import { Injectable } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { HttpErrorResponse } from '@angular/common/http';

@Injectable({ providedIn: 'root' })
export class HelperService {
	message(msg: string, action: string = "OK") {
		this.snackBar.open(msg, action, { verticalPosition: "top", panelClass: ["snackbar"] });
		console.info(msg);
	}

	httpError(msg: string, errorResponse: HttpErrorResponse, action: string = "OK") {
		const details = errorResponse.error?.errors
			? Object.values(errorResponse.error.errors).join('\n').replace(/,/g, '\n')
			: errorResponse.error?.message ?? errorResponse.message ?? "Unknown error";
		const fullMsg = `${msg.toUpperCase()} (${errorResponse.status}):\n\n${details}`;

		this.snackBar.open(fullMsg, action, { verticalPosition: "top", panelClass: ["snackbar", "snackbar-error"] });
		console.error(fullMsg);
	}

	constructor(private snackBar: MatSnackBar) { }
}
