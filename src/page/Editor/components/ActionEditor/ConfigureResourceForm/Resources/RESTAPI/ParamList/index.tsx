import { FC, useState } from "react"
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

export const ParamList: FC<ParamListProps> = (props) => {
  const { ...restProps } = props;

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
      return;
    }

    const paramsCopy = params.slice(0)
    paramsCopy.splice(index, 1)
    setParams(paramsCopy)
  }

  return (
    <div css={ParamListWrapperCSS} {...restProps}>
      {paramList}
      <Button
        variant="text"
        size="medium"
        colorScheme="techPurple"
        type="button"
        css={NewButtonCSS}
        onClick={addParamItem}
      >
        <AddIcon />
        New
      </Button>
    </div>
  )
}
