import { SafeAny } from '../../utils/safe-any';

export interface IonModalConfiguration {
  id?: string;
  title?: string;
  width?: number;
  showOverlay?: boolean;
  overlayCanDismiss?: boolean;
  ionParams?: SafeAny;

  footer?: IonModalFooterConfiguration;
}

export interface IonModalFooterConfiguration {
  hide?: boolean;
  showDivider?: boolean;

  primaryButton?: ModalButton;
  secondaryButton?: ModalButton;
}

export interface ModalButton {
  label?: string;
  iconType?: string;
  disabled?: boolean;
}

export interface IonModalResponse {
  [key: string]: unknown;
}
