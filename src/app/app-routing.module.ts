/*
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */

import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { HomeComponent } from './home/home.component';

import { ProductComponent } from './Product/Product.component';

import { GrowerComponent } from './Grower/Grower.component';
import { ShipperComponent } from './Shipper/Shipper.component';
import { ImporterComponent } from './Importer/Importer.component';

import { HistoryComponent } from './History/History.component';

import { transferProductComponent } from './transferProduct/transferProduct.component';
import { SetupDemoComponent } from './SetupDemo/SetupDemo.component';

const routes: Routes = [
  { path: '', component: HomeComponent },
  { path: 'Product', component: ProductComponent },
  { path: 'Grower', component: GrowerComponent },
  { path: 'Shipper', component: ShipperComponent },
  { path: 'Importer', component: ImporterComponent },
  { path: 'History', component: HistoryComponent },
  { path: 'transferProduct', component: transferProductComponent },
  { path: 'SetupDemo', component: SetupDemoComponent },
  { path: '**', redirectTo: '' }
];

@NgModule({
 imports: [RouterModule.forRoot(routes)],
 exports: [RouterModule],
 providers: []
})
export class AppRoutingModule { }
