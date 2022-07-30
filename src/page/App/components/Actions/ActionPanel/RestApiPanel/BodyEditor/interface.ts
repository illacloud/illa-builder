import {
  BodyContent,
  BodyType,
  RawBodyType,
} from "@/redux/currentApp/action/restapiAction"

export interface BodyEditorProps {
  bodyType: BodyType
  body: BodyContent
  onChangeBodyType: (bodyType: BodyType) => void
  onChangeRawBodyType: (rawBodyType: RawBodyType) => void
  onChangeBody: (body: BodyContent) => void
}
