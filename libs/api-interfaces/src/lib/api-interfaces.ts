export interface APICollection<T> {
  count: number;
  filterCount: number;
  hasMore: boolean;
  data: T[];
}

export interface DeviceDTO {
  id: number;
  name: string;
}
