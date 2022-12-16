import { Calculator } from "./add";
import { describe, it, expect, beforeEach } from "vitest";

declare module "vitest" {
  export interface TestContext {
    calculator: Calculator;
  }
}

beforeEach((context) => {
  const calculator = new Calculator();
  context.calculator = calculator;
});

describe("Calculator", () => {
  it("Initializes with 0", ({ calculator }) => {
    expect(calculator.value).toBe(0);
  });
  describe("Addition", () => {
    it("should return the added value when performing addition immediatly after creation", ({
      calculator,
    }) => {
      expect(calculator.add(5)).toBe(5);
    });
    it("should store the result of an addition as the new calculated value", ({
      calculator,
    }) => {
      calculator.add(5);
      expect(calculator.value).toBe(5);
    });
    it("should allow multiple additions for be performed, returning the result of the final addition", ({
      calculator,
    }) => {
      calculator.add(9);
      calculator.add(2);
      expect(calculator.add(1)).toBe(12);
    });
    it("should store the result of multiple additions as the new calculated value", ({
      calculator,
    }) => {
      calculator.add(5);
      calculator.add(7);
      calculator.add(3);
      expect(calculator.value).toBe(15);
    });
  });
});
