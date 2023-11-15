import { FC, memo } from "react"
import { useTranslation } from "react-i18next"
import { useDispatch } from "react-redux"
import { RadioGroup } from "@illa-design/react"
import { configActions } from "@/redux/config/configSlice"
import { MockOperationProps } from "./interface"
import { mockOperationContainerStyle, mockOperationTitleStyle } from "./style"

const MockOperation: FC<MockOperationProps> = (props) => {
  const dispatch = useDispatch()
  const { t } = useTranslation()

  const handleChangeDataType = (value: boolean) => {
    dispatch(
      configActions.updateCachedActionMockConfigReducer({
        enabled: value,
      }),
    )
  }

  return (
    <div css={mockOperationContainerStyle}>
      <span css={mockOperationTitleStyle}>
        {t("editor.action.panel.option.mock.data_label")}
      </span>
      <RadioGroup
        type="button"
        options={[
          {
            label: t("editor.action.panel.option.mock.data_production"),
            value: false,
          },
          {
            label: t("editor.action.panel.option.mock.data_mock"),
            value: true,
          },
        ]}
        size="medium"
        onChange={handleChangeDataType}
        value={props.enableMock}
        colorScheme="techPurple"
      />
    </div>
  )
}

export default memo(MockOperation)
