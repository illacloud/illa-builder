import { ReactComponent as PartialIcon } from "@assets/rightPagePanel/partial.svg"
import { FC, useState } from "react"
import { useTranslation } from "react-i18next"
import { RadioGroup } from "@illa-design/react"
import { ReactComponent as AllIcon } from "@/assets/rightPagePanel/all.svg"
import { PageLabel } from "../../../../Components/Label"
import {
  labelContainerStyle,
  sectionContainerStyle,
  setterContainerStyle,
} from "../../style"
import { DirectionPaddingSetter } from "../DirectionPaddingSetter"

const options = [
  {
    label: <AllIcon />,
    value: true,
  },
  {
    label: <PartialIcon />,
    value: false,
  },
]

export const PaddingSetter: FC = () => {
  const { t } = useTranslation()

  const [isAll, setIsAll] = useState(true)

  return (
    <section css={sectionContainerStyle}>
      <div css={labelContainerStyle}>
        <PageLabel
          labelName={t("editor.inspect.setter_group.padding")}
          size="big"
        />
      </div>
      <div css={setterContainerStyle}>
        <PageLabel labelName={t("editor.page.label_name.body")} size="small" />
        <RadioGroup
          type="button"
          options={options}
          value={isAll}
          onChange={setIsAll}
          size="small"
        />
      </div>
      <DirectionPaddingSetter isAll={isAll} />
      <div css={setterContainerStyle}>
        <PageLabel
          labelName={t("editor.page.label_name.header")}
          size="small"
        />
        <RadioGroup
          type="button"
          options={options}
          value={isAll}
          onChange={setIsAll}
          size="small"
        />
      </div>
      <DirectionPaddingSetter isAll={isAll} />
      <div css={setterContainerStyle}>
        <PageLabel
          labelName={t("editor.page.label_name.left_panel")}
          size="small"
        />
        <RadioGroup
          type="button"
          options={options}
          value={isAll}
          onChange={setIsAll}
          size="small"
        />
      </div>
      <DirectionPaddingSetter isAll={isAll} />
      <div css={setterContainerStyle}>
        <PageLabel
          labelName={t("editor.page.label_name.right_panel")}
          size="small"
        />
        <RadioGroup
          type="button"
          options={options}
          value={isAll}
          onChange={setIsAll}
          size="small"
        />
      </div>
      <DirectionPaddingSetter isAll={isAll} />
      <div css={setterContainerStyle}>
        <PageLabel
          labelName={t("editor.page.label_name.footer")}
          size="small"
        />
        <RadioGroup
          type="button"
          options={options}
          value={isAll}
          onChange={setIsAll}
          size="small"
        />
      </div>
      <DirectionPaddingSetter isAll={isAll} />
    </section>
  )
}
