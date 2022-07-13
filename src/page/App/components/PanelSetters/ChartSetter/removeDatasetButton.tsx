import { FC } from "react"
import { Button } from "@illa-design/button"
import { RemoveButtonSetter } from "@/page/App/components/PanelSetters/ChartSetter/interface"
import { css } from "@emotion/react"

export const RemoveDatasetButton: FC<RemoveButtonSetter> = (props) => {
  const { attrName, panelConfig, handleUpdateDsl } = props

  return (
    <Button
      colorScheme={"red"}
      _css={css`
        width: 100%;
        justify-content: center;
      `}
      onClick={() => {
        const _attrNameArr = attrName.split(".")
        const _attrName = _attrNameArr[0]
        if (panelConfig?.[_attrName]?.length === 1) {
          handleUpdateDsl(_attrName, [])
        } else {
          const _index = parseInt(_attrNameArr[1])
          const _newValue = [...panelConfig?.[_attrName]]
          _newValue.splice(_index, 1)
          handleUpdateDsl(_attrName, _newValue)
        }
      }}
    >
      remove dataset
    </Button>
  )
}

RemoveDatasetButton.displayName = "RemoveDatasetButton"
