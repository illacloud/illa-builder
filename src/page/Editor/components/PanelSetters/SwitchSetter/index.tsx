import { FC, useMemo } from "react"
import PanelLabel from "../../InspectPanel/label"
import { SwitchSetterProps } from "./interface"
import { Switch } from "@illa-design/switch"
import { switchSetterCss, switchWrapperStyle } from "./style"

const SwitchSetter: FC<SwitchSetterProps> = (props) => {
  const { labelName, labelDesc, defaultValue, handleChange } = props

  const renderContent = useMemo(() => {
    return (
      <>
        <PanelLabel labelName={labelName} labelDesc={labelDesc} />
        <div css={switchWrapperStyle}>
          <Switch
            onChange={handleChange}
            defaultChecked={defaultValue}
            colorScheme="purple"
          />
        </div>
      </>
    )
  }, [labelName, labelDesc, handleChange])
  return <div css={switchSetterCss}>{renderContent}</div>
}

export default SwitchSetter
