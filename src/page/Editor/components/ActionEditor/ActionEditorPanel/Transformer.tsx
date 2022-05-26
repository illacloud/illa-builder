import {
  actionCss,
  dashBorderBottomCss,
  fillingCss,
  panelPaddingCss,
  panelSubBarCss,
  sectionTitleCss,
} from "@/page/Editor/components/ActionEditor/ActionEditorPanel/style"
import { RadioGroup } from "@illa-design/radio"
import { EditorInput } from "@/components/EditorInput"

export const Transformer = () => {
  return (
    <>
      <div css={[actionCss, panelSubBarCss]}>
        <label css={[sectionTitleCss, dashBorderBottomCss]}>Transformer</label>
        <span css={fillingCss} />
        <RadioGroup
          type="button"
          size="small"
          options={["Disable", "Enable"]}
          defaultValue="Disable"
        />
      </div>
      <div css={panelPaddingCss}>
        <EditorInput mode="javascript" height="88px" />
      </div>
    </>
  )
}
