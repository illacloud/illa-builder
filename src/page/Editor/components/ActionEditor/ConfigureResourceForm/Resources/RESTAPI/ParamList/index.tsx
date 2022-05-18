import { forwardRef, useState } from "react"
import { Input } from "@illa-design/input"
import { Button } from "@illa-design/button"
import { DeleteIcon, AddIcon } from "@illa-design/icon"
import { Params } from "../interface"
import {
  ParamListWrapperCSS,
  ParamItemCSS,
  ParamItemKeyCSS,
  NewButtonCSS,
  DeleteIconCSS,
  ParamItemValueCSS,
} from "./style"

import { ParamListProps } from "./interface"
import { ActionTextCSS } from "../../style"

export const ParamList = forwardRef<HTMLDivElement, ParamListProps>(
  (props, ref) => {
    const { ...restProps } = props

    const [params, setParams] = useState<Params[]>([{ key: "", value: "" }])

    const paramList = params.map(({ key, value }, index) => {
      return (
        /* todo: set unique key */
        <div css={ParamItemCSS} key={index}>
          <Input value={key} placeholder={"key"} css={ParamItemKeyCSS} />
          <Input
            value={value}
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
        </div>
      )
    })

    function addParamItem() {
      setParams([...params, { key: "", value: "" }])
    }

    function removeParamItem(index: number) {
      if (params.length === 1) {
        return
      }

      const paramsCopy = params.slice(0)
      paramsCopy.splice(index, 1)
      setParams(paramsCopy)
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
