import { expect, test } from "vitest"
import { example } from "./example"

test("Should return Error object", () => {
  expect(example(1,1)).toBe(2)
})
