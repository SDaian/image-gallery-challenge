import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { GridViewComponent } from './components/grid-view/grid-view.component';

const routes: Routes = [
  { path: '', redirectTo: '/', pathMatch: 'full' },
  { path: '', component: GridViewComponent },];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
