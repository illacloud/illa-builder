import { FC, useCallback } from "react"
import { AlignmentSetterProps } from "./interface"
import Label from "@/page/Editor/components/InspectPanel/label"
import { RadioGroup } from "@illa-design/radio"
import { radioGroupWrapperCss } from "./style"

const horizontalOptions = [
  {
    label: <div>l</div>,
    value: "left",
  },
  {
    label: <div>c</div>,
    value: "center",
  },
  {
    label: <div>r</div>,
    value: "right",
  },
]

const verticalOptions = [
  {
    label: <div>t</div>,
    value: "top",
  },
  {
    label: <div>m</div>,
    value: "middle",
  },
  {
    label: <div>b</div>,
    value: "bottom",
  },
]

const AlignmentSetter: FC<AlignmentSetterProps> = (props) => {
  const {
    labelName,
    labelDesc,
    defaultHorizontal,
    defaultVertical,
    handleChange,
  } = props

  const onChange = useCallback(
    (value: string, attrName: "horizontalAlign" | "verticalAlign") => {
      handleChange(value, attrName)
    },
    [handleChange],
  )

  return (
    <div>
      <div>
        <Label labelName={labelName} labelDesc={labelDesc} />
      </div>
      <div css={radioGroupWrapperCss}>
        <RadioGroup
          defaultValue={defaultHorizontal}
          options={horizontalOptions}
          type="button"
          size="small"
          onChange={(value) => onChange(value, "horizontalAlign")}
        />
        <RadioGroup
          defaultValue={defaultVertical}
          type="button"
          options={verticalOptions}
          size="small"
          onChange={(value) => onChange(value, "verticalAlign")}
        />
      </div>
    </div>
  )
}

export default AlignmentSetter
