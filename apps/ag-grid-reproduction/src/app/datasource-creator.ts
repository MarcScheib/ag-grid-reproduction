import {
  ColDef,
  IServerSideDatasource,
  IServerSideGetRowsParams,
} from '@ag-grid-community/core';
import { APICollection } from '@ag-grid-reproduction/api-interfaces';
import { HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';

export interface APICollectionRequestParams {
  $top?: number | string;
  $skip?: number;
  $filter?: string;
}

export declare type DataProducer<T> = (
  requestParams: APICollectionRequestParams
) => Observable<APICollection<T>>;

export function createAPICollectionQueryParams(
  props: APICollectionRequestParams | undefined | null
): HttpParams {
  const params: APICollectionRequestParams = { $top: 100, $skip: 0, ...props };
  let queryParamString = `$top=${params.$top}&$skip=${params.$skip}`;
  if (params.$filter) {
    queryParamString += `&$filter=${params.$filter}`;
  }
  return new HttpParams({ fromString: queryParamString });
}

export function createFilterParam(
  columnDefinitions: ColDef[] | null | undefined,
  filterModel: any
): string {
  if (!columnDefinitions || !filterModel) {
    return '';
  }

  return Object.keys(filterModel)
    .map(key => {
      const model = filterModel[key];
      return `${key} ${model.type} '${model.filter}'`;
    })
    .join(' and ');
}

export function createDatasource<T>(
  columnDefs: ColDef[],
  dataProducer: DataProducer<T>
): IServerSideDatasource {
  return {
    getRows(params: IServerSideGetRowsParams) {
      const $top = params.request.endRow - params.request.startRow;
      const $skip = params.request.startRow;
      const $filter = createFilterParam(columnDefs, params.request.filterModel);

      dataProducer({ $top, $skip, $filter }).subscribe(
        collection =>
          params.successCallback(collection.data, collection.filterCount),
        () => params.failCallback()
      );
    },
  };
}
