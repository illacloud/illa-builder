enum OperationType {
  EQUAL = "==",
  GREATER = ">",
  LESS = "<",
  LESS_EQUAL = "<=",
  GREATER_EQUAL = ">=",
  CONTAINS = "contains",
  IN = "in",
  CONTAINS_ANY = "array contains any",
}

enum OperationTypeValue {
  EQUAL = "==",
  GREATER = ">",
  LESS = "<",
  LESS_EQUAL = "<=",
  GREATER_EQUAL = ">=",
  CONTAINS = "array-contains",
  IN = "in",
  CONTAINS_ANY = "array-contains-any",
}

export const OperationSelectList = [
  {
    label: OperationType.EQUAL,
    value: OperationTypeValue.EQUAL,
  },
  {
    label: OperationType.GREATER,
    value: OperationTypeValue.GREATER,
  },
  {
    label: OperationType.LESS,
    value: OperationTypeValue.LESS,
  },
  {
    label: OperationType.LESS_EQUAL,
    value: OperationTypeValue.LESS_EQUAL,
  },
  {
    label: OperationType.GREATER_EQUAL,
    value: OperationTypeValue.GREATER_EQUAL,
  },
  {
    label: OperationType.CONTAINS,
    value: OperationTypeValue.CONTAINS,
  },
  {
    label: OperationType.IN,
    value: OperationTypeValue.IN,
  },
  {
    label: OperationType.CONTAINS_ANY,
    value: OperationTypeValue.CONTAINS_ANY,
  },
]
