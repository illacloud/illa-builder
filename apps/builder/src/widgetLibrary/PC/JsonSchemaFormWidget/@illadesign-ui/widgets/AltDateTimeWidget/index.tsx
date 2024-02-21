import {
  FormContextType,
  RJSFSchema,
  StrictRJSFSchema,
  WidgetProps,
} from "@rjsf/utils"
import _AltDateWidget from "../AltDateWidget"

function AltDateTimeWidget<
  T = any,
  S extends StrictRJSFSchema = RJSFSchema,
  F extends FormContextType = FormContextType,
>(props: WidgetProps<T, S, F>) {
  const { AltDateWidget } = props.registry.widgets
  return <AltDateWidget {...props} showTime />
}

AltDateTimeWidget.defaultProps = {
  ..._AltDateWidget.defaultProps,
  showTime: true,
}

export default AltDateTimeWidget
