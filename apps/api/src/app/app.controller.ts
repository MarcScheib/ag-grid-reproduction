import { APICollection, DeviceDTO } from '@ag-grid-reproduction/api-interfaces';
import {
  Controller,
  Get,
  HttpException,
  HttpStatus,
  Query,
} from '@nestjs/common';
import { AppService } from './app.service';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get('/devices')
  getData(
    @Query('$top') $top = 100,
    @Query('$skip') $skip = 0,
    @Query('$filter') $filter = ''
  ): APICollection<DeviceDTO> {
    const originalData = this.appService.getData();

    // apply filter
    let filteredData = this._applyFilter(originalData, $filter);

    // check paginate params
    const collectionSize = filteredData.length;
    if ($skip > collectionSize) {
      throw new HttpException(
        "Parameter '$skip' is bigger than result list size.",
        HttpStatus.BAD_REQUEST
      );
    }

    // paginate
    const end = $skip + $top;
    const paginatedData = filteredData.slice($skip, end);

    return {
      data: paginatedData,
      count: originalData.length,
      filterCount: filteredData.length,
      hasMore: this._hasMore(originalData, $top, $skip),
    };
  }

  private _applyFilter(data: DeviceDTO[], $filter: string): DeviceDTO[] {
    if (!$filter) {
      return data;
    }

    const filters = this._parseFilter($filter);
    const matcher = (value: DeviceDTO) =>
      filters
        .map(filter => filter(value))
        .reduce((acc, value) => acc && value, true);
    return data.filter(matcher);
  }

  private _parseFilter($filter: string): ((value: DeviceDTO) => boolean)[] {
    const parts = $filter.split(' and ');
    const filterList = [];
    for (const part of parts) {
      const model = part.split(' ');
      const key = model[0];
      const type = model[1];
      const filter = model[2].substr(1, model[2].length - 2);

      if (type === 'equals') {
        filterList.push((value: DeviceDTO) => String(value[key]) === filter);
      } else {
        filterList.push((value: DeviceDTO) =>
          String(value[key]).includes(filter)
        );
      }
    }
    return filterList;
  }

  private _hasMore(data: DeviceDTO[], $top: number, $skip: number): boolean {
    const toIndex = Math.min(data.length, $skip + $top);
    return data.length != toIndex;
  }
}
