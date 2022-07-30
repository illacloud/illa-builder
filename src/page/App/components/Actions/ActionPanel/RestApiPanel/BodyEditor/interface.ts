import { BodyContent, BodyType } from "@/redux/currentApp/action/restapiAction"

export interface BodyEditorProps {
  bodyType: BodyType
  body: BodyContent
  onChangeBodyType: (bodyType: BodyType) => void
  onChangeBody: (body: BodyContent) => void
}
