import {
  FormContextType,
  RJSFSchema,
  RegistryWidgetsType,
  StrictRJSFSchema,
} from "@rjsf/utils"
import AltDateTimeWidget from "./AltDateTimeWidget"
import AltDateWidget from "./AltDateWidget"
import CheckboxWidget from "./CheckboxWidget"
import CheckboxesWidget from "./CheckboxesWidget"
import DateTimeWidget from "./DateTimeWidget"
import DateWidget from "./DateWidget"
import RadioWidget from "./RadioWidget"
import RangeWidget from "./RangeWidget"
import SelectWidget from "./SelectWidget"
import TextareaWidget from "./TextareaWidget"
import TimeWidget from "./TimeWidget"
import UpDownWidget from "./UpDownWidget"

export function generateWidgets<
  T = any,
  S extends StrictRJSFSchema = RJSFSchema,
  F extends FormContextType = FormContextType,
>(): RegistryWidgetsType<T, S, F> {
  return {
    AltDateTimeWidget,
    AltDateWidget,
    DateWidget,
    TimeWidget,
    DateTimeWidget,
    CheckboxWidget,
    CheckboxesWidget,
    RadioWidget,
    RangeWidget,
    SelectWidget,
    TextareaWidget,
    UpDownWidget,
  }
}

export default generateWidgets()
