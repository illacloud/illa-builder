export interface Params {
  key: string
  value: string
}
export interface GraphQLAction {
  query: string
  variables: Params[]
  headers: Params[]
}

export const GraphQLActionInitial: GraphQLAction = {
  query: "",
  variables: [
    {
      key: "",
      value: "",
    },
  ],
  headers: [
    {
      key: "",
      value: "",
    },
  ],
}
