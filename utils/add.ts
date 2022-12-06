export class Calculator {
  value: number = 0;
  calculations: string[] = [];

  add(n: number) {
    this.value += n;
    return this.value;
  }

  addCalculation() {}
}
