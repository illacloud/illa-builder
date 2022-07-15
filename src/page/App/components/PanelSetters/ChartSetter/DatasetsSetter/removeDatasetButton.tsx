import { FC, useCallback } from "react"
import { Button } from "@illa-design/button"
import { RemoveButtonSetter } from "@/page/App/components/PanelSetters/ChartSetter/interface"
import {
  buttonContainerStyle,
  removeButtonStyle,
} from "@/page/App/components/PanelSetters/ChartSetter/DatasetsSetter/style"
import { get } from "lodash"

export const RemoveDatasetButton: FC<RemoveButtonSetter> = (props) => {
  const { attrName, panelConfig, handleUpdateDsl, parentAttrName } = props

  const handleClick = useCallback(() => {
    const _attrNameArr = attrName.split(".")
    const _attrName = _attrNameArr[0]
    if (panelConfig?.[_attrName]?.length === 1) {
      handleUpdateDsl(_attrName, [])
    } else {
      const _index = parseInt(_attrNameArr[1])
      const _newValue = [...get(panelConfig, `${_attrName}`)]
      _newValue.splice(_index, 1)
      handleUpdateDsl(_attrName, _newValue)
    }
  }, [attrName, panelConfig, handleUpdateDsl])

  return (
    <div css={buttonContainerStyle}>
      <Button
        variant="outline"
        colorScheme={"red"}
        _css={removeButtonStyle}
        onClick={handleClick}
      >
        remove dataset
      </Button>
    </div>
  )
}

RemoveDatasetButton.displayName = "RemoveDatasetButton"
