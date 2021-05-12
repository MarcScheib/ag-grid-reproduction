import { ColDef } from '@ag-grid-community/core';
import { ChangeDetectionStrategy, Component } from '@angular/core';
import { API } from './api.service';
import { createDatasource } from './datasource-creator';

@Component({
  selector: 'ag-grid-reproduction-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  host: { class: 'ag-theme-alpine' },
})
export class AppComponent {
  components = {};
  columnDefs: ColDef[] = [
    {
      colId: 'id',
      field: 'id',
      headerName: 'ID',
      sortable: true,
      filter: 'agTextColumnFilter',
    },
    {
      colId: 'name',
      field: 'name',
      headerName: 'Name',
      sortable: true,
      filter: 'agTextColumnFilter',
    },
  ];

  datasource = createDatasource(this.columnDefs, this.api.read.bind(this.api));

  constructor(private readonly api: API) {}
}
