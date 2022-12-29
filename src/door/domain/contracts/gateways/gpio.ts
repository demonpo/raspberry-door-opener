export interface Gpio {
  writeGpio(pin: number, value: 0 | 1): void;
}

export const Gpio = Symbol('Gpio');
