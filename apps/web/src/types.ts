import type { ConbiniName as DBConbiniName } from '@conbini-this-week/db'

export type Conbini = {
  [name in DBConbiniName]: {
    name: string
  }
}
