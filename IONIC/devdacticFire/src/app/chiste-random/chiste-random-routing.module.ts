import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { ChisteRandomPage } from './chiste-random.page';

const routes: Routes = [
  {
    path: '',
    component: ChisteRandomPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ChisteRandomPageRoutingModule {}
