import { Injectable } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { HttpErrorResponse } from '@angular/common/http';
import { AppState, AppStateService } from './appstate.service';

@Injectable({ providedIn: 'root' })
export class HelperService {
	message(message: string, action: string = "OK") {
		this.snackBar.open(message, action, { verticalPosition: "top", panelClass: ["snackbar"] });
		console.info(message);
	}

	error(message: string, action: string = "OK") {
		this.snackBar.open(message, action, { verticalPosition: "top", panelClass: ["snackbar", "snackbar-error"] });
		console.error(message);
		this.app.isLoading = false;
	}

	// garbage
	errorWhile(attemptedAction: string, errorResponse: HttpErrorResponse, action: string = "OK") {
		const errorMessage = errorResponse.error?.errors
			? Object.values(errorResponse.error.errors).join('\n').replace(/,/g, '\n')
			: errorResponse.error?.message ?? errorResponse.message ?? "Unknown error";
		const errorStatus = errorResponse.error?.statusName ?? errorResponse.status === 401 ? "Unauthorized" : errorResponse.status === 500 ? "Internal server error" : "Unknown error";
		const fullMessage = `${errorResponse.status} ${errorStatus.toUpperCase()} while ${attemptedAction.toUpperCase()}:\n\n${errorMessage}`;

		this.snackBar.open(fullMessage, action, { verticalPosition: "top", panelClass: ["snackbar", "snackbar-error"] });
		console.error(fullMessage);
		this.app.isLoading = false;
	}

	shownPrompt: boolean = false;

	promptToSelect() {
		if (this.shownPrompt) return;

		this.snackBar.open("Double-click to view full image.", "OK", { verticalPosition: "bottom", duration: 4000 });
		this.shownPrompt = true;
	}

	constructor(
		private app: AppStateService,
		private snackBar: MatSnackBar
	) { }
}
