import {
  FirebaseContentType,
  Params,
} from "@/redux/currentApp/action/firebaseAction"

export interface FirebaseActionPartProps {
  options: FirebaseContentType
  handleValueChange: (value: string | boolean | Params[], name: string) => void
}
