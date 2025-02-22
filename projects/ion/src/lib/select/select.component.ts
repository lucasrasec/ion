import {
  Component,
  EventEmitter,
  Input,
  OnInit,
  Output,
  ViewChild,
} from '@angular/core';
import { IonSelectProps } from '../core/types/select';
import { DropdownItem } from '../core/types';

@Component({
  selector: 'ion-select',
  templateUrl: './select.component.html',
  styleUrls: ['./select.component.scss'],
})
export class IonSelectComponent implements OnInit {
  @ViewChild('ionSelectInput', { static: true }) ionSelectInput;
  @Input() mode: IonSelectProps['mode'] = 'default';
  @Input() placeholder = '';
  @Input() options: IonSelectProps['options'] = [];
  @Input() maxSelected?: IonSelectProps['maxSelected'];
  @Output() events = new EventEmitter<IonSelectProps['options']>();
  @Output() search = new EventEmitter<string>();

  showDropdown = false;
  inputValue = '';
  visibleOptions: IonSelectProps['options'] = [];
  showPlaceholder = true;

  ngOnInit(): void {
    this.visibleOptions = this.options;
  }

  handleClick(): void {
    this.focusInput();
    this.showDropdown = !this.showDropdown;
  }

  focusInput(): void {
    this.ionSelectInput.nativeElement.focus();
  }

  selected(selectedOptions: IonSelectProps['options']): void {
    this.events.emit(selectedOptions);
    this.inputValue = '';
    this.visibleOptions = this.options;
    if (this.mode === 'default') {
      this.unselectAllOptions();
      const [option] = selectedOptions;
      if (option) {
        option.selected = true;
      }
    }
  }

  hasSelectedOption = (): boolean => {
    return this.options.some((option) => !!option.selected);
  };

  unselectAllOptions(): void {
    this.options.forEach((option) => (option.selected = false));
  }

  unselectOption(currentOption: DropdownItem): void {
    currentOption.selected = false;
  }

  onSearchChange(): void {
    this.showDropdown = true;

    this.visibleOptions = this.options.filter((option) => {
      return option.label.toLowerCase().includes(this.inputValue.toLowerCase());
    });

    this.search.emit(this.inputValue);
  }

  onCloseDropdown(): void {
    if (this.showDropdown) {
      this.showDropdown = false;
    }
    this.inputValue = '';
    this.visibleOptions = this.options;
  }
}
