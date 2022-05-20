import { forwardRef, useState } from "react"
import { Input } from "@illa-design/input"
import { DeleteIcon, AddIcon } from "@illa-design/icon"
import { useFieldArray, Controller } from "react-hook-form"
import { ActionTextCSS } from "../../style"
import {
  ParamListWrapperCSS,
  ParamItemCSS,
  ParamItemKeyCSS,
  NewButtonCSS,
  DeleteIconCSS,
  ParamItemValueCSS,
} from "./style"
import { Params } from "../interface"
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
        <div css={ParamItemCSS} key={field.id}>
          <Controller
            render={({ field }) => (
              <Input {...field} placeholder={"key"} css={ParamItemKeyCSS} />
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
                      css={DeleteIconCSS}
                    />
                  ),
                }}
                placeholder={"value"}
                css={ParamItemValueCSS}
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
      <div css={ParamListWrapperCSS} ref={ref} {...restProps}>
        {paramList}
        <span css={[NewButtonCSS, ActionTextCSS]} onClick={addParamItem}>
          <AddIcon />
          New
        </span>
      </div>
    )
  },
)
