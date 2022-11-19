import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CityListComponent } from './components/city-list/city-list.component';

const routes: Routes = [
	{ path: "", component: CityListComponent, pathMatch: "full" },
];

@NgModule({
	imports: [RouterModule.forRoot(routes, { onSameUrlNavigation: "reload" })],
	exports: [RouterModule]
})
export class AppRoutingModule { }
