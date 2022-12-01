import { css } from "@emotion/react"
import { FC } from "react"
import { Select } from "@illa-design/react"
import { CodeEditor } from "@/components/CodeEditor"
import { PanelLabel } from "@/page/App/components/InspectPanel/label"
import { DynamicIcon } from "@/page/App/components/PanelSetters/PublicComponent/DynamicIcon"
import { BaseDynamicSelectSetterProps } from "@/page/App/components/PanelSetters/SelectSetter/interface"
import {
  dynamicSelectHeaderStyle,
  dynamicSelectSetterStyle,
} from "@/page/App/components/PanelSetters/SelectSetter/style"

export const BaseDynamicSelect: FC<BaseDynamicSelectSetterProps> = (props) => {
  const {
    labelName,
    labelDesc,
    isDynamic,
    onClickFxButton,
    value,
    onChangeInput,
    onChangeSelect,
    expectedType,
    path,
    options,
    selectPlaceholder,
    inputPlaceholder,
    isError,
  } = props
  return (
    <>
      <div css={dynamicSelectHeaderStyle}>
        <PanelLabel labelName={labelName} labelDesc={labelDesc} />
        <DynamicIcon
          isDynamic={isDynamic}
          onClick={onClickFxButton}
          hasRightContent={false}
        />
      </div>
      <div css={dynamicSelectSetterStyle}>
        {isDynamic ? (
          <CodeEditor
            value={value ?? ""}
            placeholder={inputPlaceholder}
            onChange={onChangeInput}
            mode="TEXT_JS"
            expectedType={expectedType}
            path={path}
            maxHeight="208px"
            css={css`
              width: 100%;
            `}
          />
        ) : (
          <Select
            colorScheme="techPurple"
            placeholder={selectPlaceholder}
            options={options}
            value={value}
            onChange={onChangeSelect}
            showSearch
            allowClear
            error={isError}
          />
        )}
      </div>
    </>
  )
}
