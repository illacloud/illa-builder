import { FC, useState, useRef, useEffect } from "react"
import {
  ActionCSS,
  DashBorderBottomCSS,
  FillingCSS,
  PanelPaddingCSS,
  PanelSubBarCSS,
  SectionTitleCSS,
} from "@/page/Editor/components/ActionEditor/ActionEditorPanel/style"
import { RadioGroup } from "@illa-design/radio"
import { EditorInput } from "@/components/EditorInput"

export const Transformer = () => {
  return (
    <>
      <div css={[ActionCSS, PanelSubBarCSS]}>
        <label css={[SectionTitleCSS, DashBorderBottomCSS]}>Transformer</label>
        <span css={FillingCSS} />
        <RadioGroup
          type="button"
          size="small"
          options={["Disable", "Enable"]}
          defaultValue="Disable"
        />
      </div>
      <div css={PanelPaddingCSS}>
        <EditorInput mode="javascript" height="88px" />
      </div>
    </>
  )
}
