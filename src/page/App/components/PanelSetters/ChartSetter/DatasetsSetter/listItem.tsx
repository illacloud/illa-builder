import { FC, useCallback, useContext, useMemo, useRef, useState } from "react"
import { Trigger } from "@illa-design/trigger"
import {
  applyColorIndentStyle,
  labelNameAndIconCss,
  labelNameWrapper,
  applyOptionListItemStyle,
} from "./style"
import { EyeOffIcon, EyeOnIcon } from "@illa-design/icon"
import { BaseModal } from "@/page/App/components/PanelSetters/PublicComponent/Modal"
import { DatasetSetterContext } from "@/page/App/components/PanelSetters/ChartSetter/DatasetsSetter/context/datasetsListContext"
import { css } from "@emotion/react"
import { ModalHeader } from "@/page/App/components/PanelSetters/ChartSetter/DatasetsSetter/modalHeader"
import { ListItemProps } from "./interface"

export const ListItem: FC<ListItemProps> = (props) => {
  const { name, lineColor, aggregationMethod, hidden, index } = props

  const [modalVisible, setModalVisible] = useState(false)

  const ref = useRef<HTMLDivElement>(null)
  const triggerRef = useRef<HTMLDivElement>(null)

  const handleCloseModal = useCallback(() => {
    setModalVisible(false)
  }, [])

  const handleClickItemBody = useCallback(() => {
    setModalVisible(true)
  }, [])

  const { widgetDisplayName, attrPath, childrenSetter, handleUpdateDsl } =
    useContext(DatasetSetterContext)

  const _attrPath = useMemo(() => {
    return `${attrPath}.${index}`
  }, [attrPath, index])

  return (
    <div ref={ref}>
      <div css={applyOptionListItemStyle(hidden)}>
        <Trigger
          withoutPadding={true}
          colorScheme="white"
          popupVisible={modalVisible}
          content={
            <BaseModal
              header={
                <ModalHeader
                  title={name ?? "set"}
                  handleCloseModal={handleCloseModal}
                />
              }
              title={name ?? "set"}
              handleCloseModal={handleCloseModal}
              attrPath={_attrPath}
              widgetDisplayName={widgetDisplayName}
              childrenSetter={childrenSetter}
              _css={css`
                width: 272px;
                padding: 0;
              `}
            />
          }
          trigger="click"
          showArrow={false}
          position="left"
          clickOutsideToClose
          onVisibleChange={(visible) => {
            if (!visible) {
              setModalVisible(false)
            }
          }}
        >
          <div
            css={labelNameAndIconCss}
            ref={triggerRef}
            onClick={handleClickItemBody}
          >
            <div>
              <span
                css={applyColorIndentStyle(
                  typeof lineColor === "string"
                    ? lineColor
                    : lineColor?.[0] ?? "",
                )}
              />
              <span css={labelNameWrapper}>{name || "No label"}</span>
            </div>
          </div>
        </Trigger>
        <span
          onClick={() => {
            handleUpdateDsl(_attrPath + ".hidden", !hidden)
          }}
        >
          {hidden ? <EyeOffIcon /> : <EyeOnIcon />}
        </span>
      </div>
    </div>
  )
}
