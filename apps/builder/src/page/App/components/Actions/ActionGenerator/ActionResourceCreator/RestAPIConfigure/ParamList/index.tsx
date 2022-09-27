import { css } from "@emotion/react"
import { forwardRef, useCallback, useMemo, useState } from "react"
import { useTranslation } from "react-i18next"
import { Input } from "@illa-design/input"
import { DeleteIcon, AddIcon } from "@illa-design/icon"
import { useFieldArray, Controller } from "react-hook-form"
import {
  paramListWrapperStyle,
  paramItemStyle,
  paramItemKeyStyle,
  newButtonStyle,
  deleteIconStyle,
  applyParamItemValueStyle,
} from "./style"
import { ParamListProps } from "./interface"
import { Params } from "../interface"
import i18n from "@/i18n/config"
import { actionTextStyle } from "@/page/App/components/Actions/ActionGenerator/ActionResourceCreator/MySQLConfigure/style"

const EmptyField: Params = { key: "", value: "" }

export const ParamList = forwardRef<HTMLDivElement, ParamListProps>(
  (props, ref) => {
    const { control, name, ...restProps } = props
    const { t } = useTranslation()
    const { fields, append, remove, update } = useFieldArray({
      control,
      name,
    })
    const [isValueFocus, setIsValueFocus] = useState({
      index: 0,
      focus: false,
    })

    const addParamItem = useCallback(() => append(EmptyField), [append])
    const removeParamItem = useCallback(
      index => {
        if (fields.length === 1) {
          update(index, EmptyField)
          return
        }

        remove(index)
      },
      [update, remove, fields],
    )

    const paramList = useMemo(
      () =>
        fields.map((field, index) => {
          return (
            <div css={paramItemStyle} key={field.id}>
              <Controller
                render={({ field }) => (
                  <Input
                    {...field}
                    placeholder={i18n.t(
                      "editor.action.resource.restapi.placeholder.param_key",
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
                    placeholder={i18n.t(
                      "editor.action.resource.restapi.placeholder.param_value",
                    )}
                    css={applyParamItemValueStyle(
                      isValueFocus.focus && isValueFocus.index === index,
                    )}
                    onFocus={() => setIsValueFocus({ index, focus: true })}
                    onBlur={() => setIsValueFocus({ index, focus: false })}
                  />
                )}
                control={control}
                name={`${name}.${index}.value`}
              />
            </div>
          )
        }),
      [fields, isValueFocus],
    )

    return (
      <div css={paramListWrapperStyle} ref={ref} {...restProps}>
        {paramList}
        <span css={css(newButtonStyle, actionTextStyle)} onClick={addParamItem}>
          <AddIcon />
          {i18n.t("editor.action.resource.restapi.btns.new")}
        </span>
      </div>
    )
  },
)

ParamList.displayName = "ParamList"
