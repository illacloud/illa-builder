import { GraphQLAuthType, GraphQLAuthValue } from "@illa-public/public-types"

export const GraphQLAuthTypeSelect = [
  {
    label: GraphQLAuthType.NONE,
    value: GraphQLAuthValue.NONE,
  },
  {
    label: GraphQLAuthType.BASIC,
    value: GraphQLAuthValue.BASIC,
  },
  {
    label: GraphQLAuthType.BEARER,
    value: GraphQLAuthValue.BEARER,
  },
  {
    label: GraphQLAuthType.APIKEY,
    value: GraphQLAuthValue.APIKEY,
  },
]
