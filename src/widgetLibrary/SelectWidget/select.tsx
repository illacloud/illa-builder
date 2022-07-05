import { forwardRef } from "react"
import { Select } from "@illa-design/select"
import { WrappedSelectProps } from "./interface"
import { containerStyle } from "@/widgetLibrary/PublicSector/containerStyle"

export const WrappedSelect = forwardRef<any, WrappedSelectProps>(
  (props, ref) => {
    const {
      showClear,
      options,
      value,
      placeholder,
      disabled,
      loading,
      readOnly,
      showSearch,
      inputValue,
      colorScheme,
      handleUpdateDsl,
    } = props
    return (
      <div css={containerStyle}>
        <Select
          allowClear={showClear}
          options={options}
          value={value}
          placeholder={placeholder}
          disabled={disabled}
          loading={loading}
          readOnly={readOnly}
          showSearch={showSearch}
          inputValue={inputValue}
          size="small"
          colorScheme={colorScheme}
          onChange={(value) => {
            handleUpdateDsl({ value })
          }}
        />
      </div>
    )
  },
)

WrappedSelect.displayName = "SelectWidget"

export const SelectWidget = WrappedSelect
