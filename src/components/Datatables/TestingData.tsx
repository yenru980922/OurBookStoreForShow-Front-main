/*TestingData.tsx*/
import {Tabulator} from "react-tabulator/lib/types/TabulatorTypes";
import CellComponent = Tabulator.CellComponent;

export const data = [
  {
    "couponId": 1,
    "code": "Pure10off",
    "startDate": "2024-02-01T00:00:00",
    "endDate": "2025-02-01T00:00:00",
    "valid": true,
    "description": "純粹只有10塊錢的折扣",
    "availabilityCount": 100,
    "usingStatus": "Used",
    "minimumValue": 100,
    "discountValue": 10,
    "discountLimit": 10000,
    "couponRedemptions": [],
    "promotion": null
  },
  {
    "couponId": 2,
    "code": "wow100off",
    "startDate": "2024-02-10T00:00:00",
    "endDate": "2024-05-10T00:00:00",
    "valid": true,
    "description": "小促銷但有100",
    "availabilityCount": 10,
    "usingStatus": "Deprecated",
    "minimumValue": 1000,
    "discountValue": 100,
    "discountLimit": 10000,
    "couponRedemptions": [],
    "promotion": null
  }
];

type SorterType = "string" | "number" | "boolean" | "time" | "alphanum" | "exists" | "date" | "datetime";

interface Column {
  title: string;
  field: string;
  sorter: SorterType;
  formatter?: (cell: CellComponent) => string;
}

export const columns: Column[] = [
  // { title: '序號ID', field: 'couponId', sorter: 'number' },
  { title: '序號', field: 'code', sorter: 'string' },
  { title: '是否有效', field: 'valid', sorter: 'boolean', formatter: (cell: CellComponent) => (cell.getValue() ? 'Yes' : 'No') },
  { title: '折扣面額', field: 'discountValue', sorter: 'number' },
  { title: '使用狀況', field: 'usingStatus', sorter: 'string' },
  { title: '數量', field: 'availabilityCount', sorter: 'number' },
  // { title: '最小金額', field: 'minimumValue', sorter: 'number' },
  // { title: '折扣上限', field: 'discountLimit', sorter: 'number' },
  { title: '開始日期', field: 'startDate', sorter: 'string' },
  { title: '結束日期', field: 'endDate', sorter: 'string' },
  { title: '敘述', field: 'description', sorter: 'string' },
];
