import { Vibration } from "react-native";

export interface IVibrationService {
  vibrateError(): void;
}

export class VibrationService implements IVibrationService {
  vibrateError(): void {
    const duration = 1000;
    Vibration.vibrate(duration, false);
  }
}