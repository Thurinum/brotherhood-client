import { Injectable } from '@angular/core';
import {
	HttpRequest,
	HttpHandler,
	HttpEvent,
	HttpInterceptor
} from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable()
export class AuthInterceptor implements HttpInterceptor {
	intercept(request: HttpRequest<unknown>, next: HttpHandler): Observable<HttpEvent<unknown>> {
		if (request.url != "https://localhost:5001/api/assassins/register") {
			request = request.clone({
				setHeaders: {
					"Content-Type": "application/json",
					"Authorization": "Bearer " + localStorage.getItem("authKey")
				}
			})
		}

		return next.handle(request);
	}
}
