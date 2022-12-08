import {
  CheckboxParams,
  FirebaseContentType,
  Params,
} from "@/redux/currentApp/action/firebaseAction"

export interface FirebaseActionPartProps {
  options: FirebaseContentType
  handleValueChange: (
    value: string | boolean | Params[] | CheckboxParams,
    name: string,
  ) => void
}
