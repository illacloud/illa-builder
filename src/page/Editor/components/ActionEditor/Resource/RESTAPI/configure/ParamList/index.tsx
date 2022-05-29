import { forwardRef } from "react"
import { Input } from "@illa-design/input"
import { DeleteIcon, AddIcon } from "@illa-design/icon"
import { useFieldArray, Controller } from "react-hook-form"
import { actionTextCss } from "@/page/Editor/components/ActionEditor/Resource/style"
import { Params } from "@/page/Editor/components/ActionEditor/Resource/RESTAPI"
import {
  paramListWrapperCss,
  paramItemCss,
  paramItemKeyCss,
  newButtonCss,
  deleteIconCss,
  paramItemValueCss,
} from "./style"
import { ParamListProps } from "./interface"

const EmptyField: Params = { key: "", value: "" }

export const ParamList = forwardRef<HTMLDivElement, ParamListProps>(
  (props, ref) => {
    const { control, name, ...restProps } = props
    const { fields, append, remove, update } = useFieldArray({
      control,
      name,
    })

    const paramList = fields.map((field, index) => {
      return (
        <div css={paramItemCss} key={field.id}>
          <Controller
            render={({ field }) => (
              <Input {...field} placeholder={"key"} css={paramItemKeyCss} />
            )}
            control={control}
            name={`${name}.${index}.key`}
          />
          <Controller
            render={({ field }) => (
              <Input
                {...field}
                addonAfter={{
                  render: (
                    <DeleteIcon
                      onClick={() => removeParamItem(index)}
                      css={deleteIconCss}
                    />
                  ),
                }}
                placeholder={"value"}
                css={paramItemValueCss}
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
      <div css={paramListWrapperCss} ref={ref} {...restProps}>
        {paramList}
        <span css={[newButtonCss, actionTextCss]} onClick={addParamItem}>
          <AddIcon />
          New
        </span>
      </div>
    )
  },
)
