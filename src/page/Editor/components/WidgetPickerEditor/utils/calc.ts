function addTwoNumbers(a: number, b: number) {
  if (typeof a !== "number" || typeof b !== "number") {
    throw new Error("addTwoNumbers: a and b must be numbers")
  }
  return a + b
}
