export interface TransformerAction {
  transformerString: string
}

export const TransformerActionInitial: TransformerAction = {
  transformerString:
    "// Tip: assign your external references to variables instead of chaining off the curly brackets.\n" +
    "return 5",
}
