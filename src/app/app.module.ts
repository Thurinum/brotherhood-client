import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
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

import { CarouselModule } from 'ngx-owl-carousel-o';

import { AppComponent } from './app.component';
import { CardComponent } from './components/card/card.component';
import { ContractListComponent } from './components/contract-list/contract-list.component';
import { ContractDetailsComponent } from './components/contract-details/contract-details.component';
import { ContractTargetDetailsComponent } from './components/contract-details/contract-target-details/contract-target-details.component';
import { AuthInterceptor } from './auth.interceptor';
import { ContractTargetListComponent } from './components/contract-target-list/contract-target-list.component';
import { CityListComponent } from './components/city-list/city-list.component';
import { FormLoginComponent } from './components/forms/form-login/form-login.component';
import { FormRegisterComponent } from './components/forms/form-register/form-register.component';
import { FormContractCreateComponent } from './components/forms/form-contract-create/form-contract-create.component';
import { FormContractShareComponent } from './components/forms/form-contract-share/form-contract-share.component';
import { FormContractTargetAddComponent } from './components/forms/form-contract-target-add/form-contract-target-add.component';
import { FormContractTargetUpdateComponent } from './components/forms/form-contract-target-update/form-contract-target-update.component';
import { FormContractTargetCreateComponent } from './components/forms/form-contract-target-create/form-contract-target-create.component';
import { FormContractTargetNukeComponent } from './components/forms/form-contract-target-nuke/form-contract-target-nuke.component';
import { FormContractUpdateComponent } from './components/forms/form-contract-update/form-contract-update.component';
import { UserListComponent } from './components/user-list/user-list.component';
import { StatisticsComponent } from './components/statistics/statistics.component';
import { WelcomeComponent } from './components/welcome/welcome.component';

@NgModule({
	declarations: [
		AppComponent,
		CardComponent,
		ContractListComponent,
		ContractDetailsComponent,
		ContractTargetDetailsComponent,
		ContractTargetListComponent,
		CityListComponent,
		FormLoginComponent,
		FormRegisterComponent,
		FormContractCreateComponent,
		FormContractShareComponent,
		FormContractTargetAddComponent,
		FormContractTargetUpdateComponent,
		FormContractTargetCreateComponent,
		FormContractTargetNukeComponent,
		FormContractUpdateComponent,
		UserListComponent,
		StatisticsComponent,
		WelcomeComponent,
	],
	imports: [
		BrowserModule,
		FormsModule,
		RouterModule,
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

		CarouselModule
	],
	providers: [
		{ provide: HTTP_INTERCEPTORS, useClass: AuthInterceptor, multi: true }
	],
	bootstrap: [AppComponent]
})
export class AppModule { }
