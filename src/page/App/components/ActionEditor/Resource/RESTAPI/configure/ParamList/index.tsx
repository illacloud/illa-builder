import { css } from "@emotion/react"
import { forwardRef } from "react"
import { useTranslation } from "react-i18next"
import { Input } from "@illa-design/input"
import { DeleteIcon, AddIcon } from "@illa-design/icon"
import { useFieldArray, Controller } from "react-hook-form"
import { actionTextStyle } from "@/page/App/components/ActionEditor/Resource/style"
import { Params } from "@/page/App/components/ActionEditor/Resource/RESTAPI"
import {
  paramListWrapperStyle,
  paramItemStyle,
  paramItemKeyStyle,
  newButtonStyle,
  deleteIconStyle,
  paramItemValueStyle,
} from "./style"
import { ParamListProps } from "./interface"

const EmptyField: Params = { key: "", value: "" }

export const ParamList = forwardRef<HTMLDivElement, ParamListProps>(
  (props, ref) => {
    const { control, name, ...restProps } = props
    const { t } = useTranslation()
    const { fields, append, remove, update } = useFieldArray({
      control,
      name,
    })

    const paramList = fields.map((field, index) => {
      return (
        <div css={paramItemStyle} key={field.id}>
          <Controller
            render={({ field }) => (
              <Input
                {...field}
                placeholder={t(
                  "editor.action.resource.rest_api.placeholder.param_key",
                )}
                css={paramItemKeyStyle}
                borderColor="techPurple"
              />
            )}
            control={control}
            name={`${name}.${index}.key`}
          />
          <Controller
            render={({ field }) => (
              <Input
                {...field}
                borderColor="techPurple"
                addonAfter={{
                  render: (
                    <DeleteIcon
                      onClick={() => removeParamItem(index)}
                      css={deleteIconStyle}
                    />
                  ),
                }}
                placeholder={t(
                  "editor.action.resource.rest_api.placeholder.param_value",
                )}
                css={paramItemValueStyle}
              />
            )}
            control={control}
            name={`${name}.${index}.value`}
          />
        </div>
      )
    })

    function addParamItem() {
      append(EmptyField)
    }

    function removeParamItem(index: number) {
      if (fields.length === 1) {
        update(index, EmptyField)
        return
      }

      remove(index)
    }

    return (
      <div css={paramListWrapperStyle} ref={ref} {...restProps}>
        {paramList}
        <span css={css(newButtonStyle, actionTextStyle)} onClick={addParamItem}>
          <AddIcon />
          New
        </span>
      </div>
    )
  },
)
