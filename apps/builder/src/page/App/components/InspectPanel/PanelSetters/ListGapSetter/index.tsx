import { get } from "lodash-es"
import { FC, useMemo } from "react"
import { useTranslation } from "react-i18next"
import { InputNumber } from "@illa-design/react"
import GapXIcon from "@/assets/rightPagePanel/gridList/gap-x.svg?react"
import GapYIcon from "@/assets/rightPagePanel/gridList/gap-y.svg?react"
import { PanelLabel } from "@/page/App/components/InspectPanel/components/Label"
import { BaseInputSetterProps } from "../InputSetter/interface"
import { containerStyle, gapContainerStyle } from "./style"

const ListGapSetter: FC<BaseInputSetterProps> = (props) => {
  const {
    handleUpdateDsl,
    widgetType,
    attrName,
    defaultValue,
    componentNode,
    value,
  } = props

  const isGridGap = widgetType === "GRID_LIST_WIDGET"

  const { gapX, gapY } = useMemo(() => {
    const gapX = get(componentNode, `props.${attrName}X`, defaultValue)
    const gapY = get(componentNode, `props.${attrName}Y`, defaultValue)
    return {
      gapX,
      gapY,
    }
  }, [attrName, componentNode, defaultValue])

  const { t } = useTranslation()

  const handleOnChange = (attr: string, v: number | undefined) => {
    if (v !== undefined) {
      handleUpdateDsl(attr, v)
    }
  }

  return (
    <div css={containerStyle(isGridGap)}>
      <span>
        <PanelLabel
          labelName={t("editor.inspect.setter_label.grid_list.item_spacing")}
          labelDesc={t("editor.inspect.setter_tips.grid_list.item_spacing")}
        />
      </span>
      {isGridGap ? (
        <div css={gapContainerStyle}>
          <InputNumber
            colorScheme="techPurple"
            value={parseInt(gapX ?? "0")}
            w="100%"
            prefix={<GapXIcon />}
            onChange={(v) => handleOnChange(`${attrName}X`, v)}
          />
          <InputNumber
            colorScheme="techPurple"
            value={parseInt(gapY ?? "0")}
            w="100%"
            prefix={<GapYIcon />}
            onChange={(v) => handleOnChange(`${attrName}Y`, v)}
          />
        </div>
      ) : (
        <InputNumber
          colorScheme="techPurple"
          w="184px"
          value={parseInt(value ?? "0")}
          prefix={<GapYIcon />}
          onChange={(v) => handleOnChange(attrName, v)}
        />
      )}
    </div>
  )
}

export default ListGapSetter
