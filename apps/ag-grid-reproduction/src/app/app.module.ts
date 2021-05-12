import { AgGridModule } from '@ag-grid-community/angular';
import { ClientSideRowModelModule } from '@ag-grid-community/client-side-row-model';
import { ModuleRegistry } from '@ag-grid-community/core';
import { ColumnsToolPanelModule } from '@ag-grid-enterprise/column-tool-panel';
import { FiltersToolPanelModule } from '@ag-grid-enterprise/filter-tool-panel';
import { RowGroupingModule } from '@ag-grid-enterprise/row-grouping';
import { ServerSideRowModelModule } from '@ag-grid-enterprise/server-side-row-model';
import { SetFilterModule } from '@ag-grid-enterprise/set-filter';
import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppComponent } from './app.component';

ModuleRegistry.registerModules([
  ClientSideRowModelModule,
  ServerSideRowModelModule,
  SetFilterModule,
  RowGroupingModule,
  ColumnsToolPanelModule,
  FiltersToolPanelModule,
]);

@NgModule({
  imports: [BrowserModule, HttpClientModule, CommonModule, AgGridModule],
  declarations: [AppComponent],
  bootstrap: [AppComponent],
})
export class AppModule {}
