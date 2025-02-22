import { EventEmitter } from '@angular/core';
import { IonInputProps } from './input';
import { IonNoDataProps } from './no-data';

export interface DropdownItem {
  label: string;
  key?: string;
  selected?: boolean;
  disabled?: boolean;
  hovered?: boolean;
}

export interface DropdownParams {
  options: DropdownItem[];
  selected: EventEmitter<DropdownItem[]>;
  maxSelected?: number;
  multiple?: boolean;
  required?: boolean;
  enableSearch?: boolean;
  searchOptions?: IonInputProps;
  searchChange?: EventEmitter<string>;
  notShowClearButton?: boolean;
  noDataConfig?: IonNoDataProps;
}
