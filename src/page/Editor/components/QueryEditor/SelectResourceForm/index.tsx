import { FC } from "react"
import {
  SelectResourceFormProps,
  DatabaseItemProps,
  ApiItemProps,
} from "./interface"

const databaseList: DatabaseItemProps[] = [
  { title: "MySQL", img: "../assets/ic_mysql.svg" },
]
const apiList: ApiItemProps[] = [
  { title: "REST", img: "../assets/ic_rest api.svg" },
]

export const SelectResourceForm: FC<SelectResourceFormProps> = (props) => {
  const { onSelect } = props
  return (
    <div>
      <div>
        <div>DATABASES</div>
        <div>
          {databaseList.map((database) => (
            <div>
              <img src={database.img} />
              <span>{database.title}</span>
            </div>
          ))}
        </div>
      </div>
      <div>
        <div>APIS</div>
        <div>
          {apiList.map((api) => (
            <div>
              <img src={api.img} />
              <span>{api.title}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}
