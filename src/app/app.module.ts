import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { FormsModule } from '@angular/forms';
import { AppRoutingModule } from './app-routing.module';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';

import { MatButtonModule } from '@angular/material/button';
import { MatInputModule } from '@angular/material/input';
import { MatTabsModule } from '@angular/material/tabs';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { MatIconModule } from '@angular/material/icon';
import { MatDividerModule } from '@angular/material/divider';
import { MatRippleModule } from '@angular/material/core';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatTooltipModule } from '@angular/material/tooltip';

import { AppComponent } from './app.component';
import { CardComponent } from './components/card/card.component';
import { CityListComponent } from './components/city-list/city-list.component';
import { CityDetailsComponent } from './components/city-details/city-details.component';
import { AuthInterceptor } from './auth.interceptor';

@NgModule({
	declarations: [
		AppComponent,
		CardComponent,
		CityListComponent,
		CityDetailsComponent
	],
	imports: [
		BrowserModule,
		AppRoutingModule,
		FormsModule,
		HttpClientModule,
		BrowserAnimationsModule,

		MatButtonModule,
		MatInputModule,
		MatTabsModule,
		MatSnackBarModule,
		MatIconModule,
		MatDividerModule,
		MatRippleModule,
		MatCheckboxModule,
		MatTooltipModule
	],
	providers: [
		{ provide: HTTP_INTERCEPTORS, useClass: AuthInterceptor, multi: true }
	],
	bootstrap: [AppComponent]
})
export class AppModule { }
