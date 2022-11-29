import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { FormsModule } from '@angular/forms';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';

import { MatButtonModule } from '@angular/material/button';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatDividerModule } from '@angular/material/divider';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatMenuModule } from '@angular/material/menu';
import { MatRippleModule } from '@angular/material/core';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { MatTabsModule } from '@angular/material/tabs';
import { MatTooltipModule } from '@angular/material/tooltip';
import { MatButtonToggleModule } from '@angular/material/button-toggle';
import { MatSelectModule } from '@angular/material/select';

import { AppComponent } from './app.component';
import { CardComponent } from './components/card/card.component';
import { ContractListComponent } from './components/contract-list/contract-list.component';
import { ContractDetailsComponent } from './components/contract-details/contract-details.component';
import { ContractTargetDetailsComponent } from './components/contract-details/contract-target-details/contract-target-details.component';
import { AuthInterceptor } from './auth.interceptor';

@NgModule({
	declarations: [
		AppComponent,
		CardComponent,
		ContractListComponent,
		ContractDetailsComponent,
		ContractTargetDetailsComponent
	],
	imports: [
		BrowserModule,
		FormsModule,
		HttpClientModule,
		BrowserAnimationsModule,

		MatButtonModule,
		MatCheckboxModule,
		MatDividerModule,
		MatIconModule,
		MatInputModule,
		MatMenuModule,
		MatRippleModule,
		MatSnackBarModule,
		MatTabsModule,
		MatTooltipModule,
		MatButtonToggleModule,
		MatSelectModule,
	],
	providers: [
		{ provide: HTTP_INTERCEPTORS, useClass: AuthInterceptor, multi: true }
	],
	bootstrap: [AppComponent]
})
export class AppModule { }
