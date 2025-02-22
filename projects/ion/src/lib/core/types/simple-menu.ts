import { EventEmitter } from '@angular/core';
import { SafeAny } from '../../utils/safe-any';
import { TabInGroup } from './tab-group';

interface MenuProfile {
  imageUrl: string;
  name: string;
}

export interface SimpleMenuProps {
  options: TabInGroup[];
  profile: MenuProfile;
  selected?: EventEmitter<TabInGroup>;
  logoutClick?: EventEmitter<SafeAny>;
}
