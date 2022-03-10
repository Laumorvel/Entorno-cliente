import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { ChistePage } from './chiste.page';

const routes: Routes = [
  {
    path: ':id',
    component: ChistePage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ChistePageRoutingModule {}
