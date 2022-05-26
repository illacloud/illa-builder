import { FC } from "react"
import {
  SelectResourceFormProps,
  DatabaseItemProps,
  ApiItemProps,
} from "./interface"
import {
  MysqlIcon,
  PostgresIcon,
  RestApiIcon,
  RedisIcon,
} from "../assets/icons"
import {
  categoryCss,
  resourceListCss,
  resourceItemCss,
  resourceNameCss,
  selectLayoutCss,
} from "./style"

const databaseList: DatabaseItemProps[] = [
  { title: "Postgres", img: <PostgresIcon />, draft: true },
  { title: "MySQL", img: <MysqlIcon /> },
  { title: "Redis", img: <RedisIcon />, draft: true },
]
const apiList: ApiItemProps[] = [{ title: "REST API", img: <RestApiIcon /> }]

export const SelectResourceForm: FC<SelectResourceFormProps> = (props) => {
  const { onSelect } = props
  return (
    <div css={selectLayoutCss}>
      <div>
        <div css={categoryCss}>DATABASES</div>
        <div css={resourceListCss()}>
          {databaseList.map((database) => (
            <div
              key={database.title}
              css={resourceItemCss}
              onClick={() => {
                !database.draft && onSelect(database.title)
              }}
            >
              <div>{database.img}</div>
              <div css={resourceNameCss}>{database.title}</div>
            </div>
          ))}
        </div>
      </div>
      <div>
        <div css={categoryCss}>APIS</div>
        <div css={resourceListCss(true)}>
          {apiList.map((api) => (
            <div
              key={api.title}
              css={resourceItemCss}
              onClick={() => {
                !api.draft && onSelect(api.title)
              }}
            >
              <div>{api.img}</div>
              <div css={resourceNameCss}>{api.title}</div>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}
