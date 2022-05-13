import { Input } from "@illa-design/input"
import { Switch } from "@illa-design/switch"

// TODO: setterType is enum,wait to fix
export function parserSetter(setterType: string) {
  // TODO: Wait to change to Map, because this can customize the setter(only support UMD)
  switch (setterType) {
    case "input": {
      return <Input borderColor="purple" />
    }
    case "switch": {
      return <Switch colorScheme="purple" />
    }
    default: {
      return <Input borderColor="purple" />
    }
  }
}
