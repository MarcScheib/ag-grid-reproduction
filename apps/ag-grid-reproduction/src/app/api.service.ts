import { APICollection, DeviceDTO } from '@ag-grid-reproduction/api-interfaces';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import {
  APICollectionRequestParams,
  createAPICollectionQueryParams,
} from './datasource-creator';

const BASE = 'http://localhost:3333/api';

@Injectable({ providedIn: 'root' })
export class API {
  constructor(private readonly http: HttpClient) {}

  read(
    requestParams?: APICollectionRequestParams
  ): Observable<APICollection<DeviceDTO>> {
    const params = createAPICollectionQueryParams(requestParams);
    return this.http.get<APICollection<DeviceDTO>>(`${BASE}/devices`, {
      params,
    });
  }
}
