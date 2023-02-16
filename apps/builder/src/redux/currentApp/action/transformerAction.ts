export interface TransformerAction {
  transformerString: string
}

export const TransformerActionInitial: TransformerAction = {
  transformerString: `{{(function (){// Tip: assign your external references to variables instead of chaining off the curly brackets.
return 5})()}}`,
}
