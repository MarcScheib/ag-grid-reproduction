import { DeviceDTO } from '@ag-grid-reproduction/api-interfaces';
import { Injectable } from '@nestjs/common';

const deviceFactory = (id: number): DeviceDTO => ({
  id,
  name: `${id}-abc`,
});

const DEVICE_CACHE = {};

@Injectable()
export class AppService {
  constructor() {
    for (let i = 0; i < 100000; i++) {
      DEVICE_CACHE[i] = deviceFactory(i);
    }
  }

  getData(): DeviceDTO[] {
    return Object.values(DEVICE_CACHE);
  }
}
