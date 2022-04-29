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
  CategoryCSS,
  ResourceListCSS,
  ResourceItemCSS,
  ResourceNameCSS,
} from "./style"

const databaseList: DatabaseItemProps[] = [
  { title: "Postgres", img: <PostgresIcon /> },
  { title: "MySQL", img: <MysqlIcon /> },
  { title: "Redis", img: <RedisIcon /> },
]
const apiList: ApiItemProps[] = [{ title: "REST API", img: <RestApiIcon /> }]

export const SelectResourceForm: FC<SelectResourceFormProps> = (props) => {
  const { onSelect } = props
  return (
    <div>
      <div>
        <div css={CategoryCSS}>DATABASES</div>
        <div css={ResourceListCSS()}>
          {databaseList.map((database) => (
            <div css={ResourceItemCSS}>
              <div>{database.img}</div>
              <div css={ResourceNameCSS}>{database.title}</div>
            </div>
          ))}
        </div>
      </div>
      <div>
        <div css={CategoryCSS}>APIS</div>
        <div css={ResourceListCSS(true)}>
          {apiList.map((api) => (
            <div
              css={ResourceItemCSS}
              onClick={() => {
                onSelect(api.title)
              }}
            >
              <div>{api.img}</div>
              <div css={ResourceNameCSS}>{api.title}</div>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}
