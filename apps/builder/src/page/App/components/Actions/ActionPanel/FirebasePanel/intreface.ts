import {
  FirebaseCheckboxParams,
  FirebaseContentType,
  FirebaseWhere,
} from "@illa-public/public-types"

export interface FirebaseActionPartProps {
  options: FirebaseContentType
  handleValueChange: (
    value: string | boolean | FirebaseWhere[] | FirebaseCheckboxParams,
    name: string,
  ) => void
}
