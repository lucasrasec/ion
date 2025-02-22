import {
  Component,
  EventEmitter,
  Input,
  Output,
  OnInit,
  DoCheck,
  AfterViewInit,
} from '@angular/core';
import {
  BadgeType,
  DropdownItem,
  DropdownParams,
  IconType,
  InfoBadgeStatus,
} from '../core/types';

export type ChipSize = 'sm' | 'md';
export type IconDirection = 'right' | 'left';

interface ChipEvent {
  selected: boolean;
  disabled: boolean;
}
export interface IonChipProps {
  label: string;
  disabled?: boolean;
  selected?: boolean;
  size?: ChipSize;
  events?: EventEmitter<ChipEvent>;
  options?: DropdownItem[];
  icon?: string;
  multiple?: boolean;
  infoBadge?: InfoBadgeStatus;
  iconPosition?: IconDirection;
  rightBadge?: RightBadge;
  showToggle?: boolean;
  dropdownEvents?: EventEmitter<DropdownItem[]>;
  dropdownSearchConfig?: Pick<DropdownParams, 'searchOptions' | 'enableSearch'>;
  dropdownSearchEvents?: EventEmitter<string>;
}

type Badge = {
  value: number;
};

interface RightBadge {
  label: string;
  type: BadgeType;
}

@Component({
  selector: 'ion-chip',
  templateUrl: './chip.component.html',
  styleUrls: ['./chip.component.scss'],
})
export class ChipComponent implements OnInit, AfterViewInit, DoCheck {
  @Input() label!: string;
  @Input() disabled = false;
  @Input() selected = false;
  @Input() size?: ChipSize = 'sm';
  @Input() icon?: IconType;
  @Input() showDropdown = false;
  @Input() dropdownSearchConfig: IonChipProps['dropdownSearchConfig'];
  @Input() options: DropdownItem[];
  @Input() multiple = false;
  @Input() infoBadge?: IonChipProps['infoBadge'];
  @Input() iconPosition?: IconDirection = 'left';
  @Input() rightBadge?: RightBadge;
  @Input() showToggle = false;
  @Input() required = false;

  @Output() events = new EventEmitter<ChipEvent>();
  @Output() dropdownEvents = new EventEmitter<DropdownItem[]>();
  @Output() dropdownSearchEvents = new EventEmitter<string>();

  dropdownId: string;
  chipId: string;
  badge: Badge = {
    value: 0,
  };

  tempFilter: DropdownItem[] = [];

  placeholder = '';

  firstCheck = true;

  select(): void {
    this.toggleDropdown();
    if (!this.options) {
      this.selected = !this.selected;
    }
    this.events.emit({
      selected: this.selected,
      disabled: this.disabled,
    });
  }

  toggleDropdown(): void {
    if (this.showToggle) {
      this.showDropdown = true;
      return;
    }

    if (this.options) {
      this.showDropdown = !this.showDropdown;
    }
  }

  clearBadgeValue(): void {
    this.setBadgeValue(0);
  }

  selectDropdownItem(selecteds: DropdownItem[]): void {
    this.dropdownEvents.emit(selecteds);
    if (selecteds.length) {
      if (this.multiple) {
        this.setBadgeValue(selecteds.length);
        return;
      }
      this.setPlaceHolder(selecteds[0].label);
    } else {
      this.clearBadgeValue();
    }
  }

  setPlaceHolder(label: string): void {
    this.placeholder = label || this.label;
    this.selected = false;
    this.toggleDropdown();
  }

  dropdownSearchChange(value: string): void {
    this.dropdownSearchEvents.emit(value);
  }

  ngOnInit(): void {
    this.chipId = this.generateId('ion-chip__container-');
    this.dropdownId = this.generateId('ion-chip__container-dropdown-');
    const selecteds = this.getSelectedOptions();
    if (selecteds && this.multiple) {
      this.setBadgeValue(selecteds.length);
    }
  }

  generateId = (name: string): string =>
    name + Math.floor(Math.random() * 100000000) + 1;

  ngDoCheck(): void {
    this.updateLabel();
  }

  getSelectedOptions(): DropdownItem[] {
    return (this.options || []).filter((option) => option.selected);
  }

  ngAfterViewInit(): void {
    if (this.showToggle) {
      return;
    }
  }

  updateLabel(): void {
    this.placeholder = this.label;
    if (this.firstCheck) {
      this.firstUpdateLabel();
      return;
    }

    if (this.multiple || (this.options && this.options.length === 0)) {
      return;
    }

    const [selectedOption] = this.getSelectedOptions();

    if (!selectedOption) {
      return;
    }

    this.placeholder = selectedOption.label;
  }

  firstUpdateLabel(): void {
    if (!this.multiple && this.options) {
      const optionSelected = this.options.find(
        (option) => option.selected === true
      );
      if (optionSelected) {
        this.placeholder = optionSelected.label || '';
      }
    } else {
      this.placeholder = this.label;
    }
    this.firstCheck = false;
  }

  closeDropdown(): void {
    if (this.showDropdown) {
      this.showDropdown = false;
    }
  }

  setTempOptions(selectedArray: DropdownItem[]): void {
    this.tempFilter = selectedArray;
    this.closeDropdown();
  }

  private setBadgeValue(newValue: number): void {
    this.badge = { ...this.badge, value: newValue };
  }
}
