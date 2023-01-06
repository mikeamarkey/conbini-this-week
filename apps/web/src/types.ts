import type { ConbiniName as DBConbiniName } from '@conbini-this-week/db/types'

export type Conbini = {
  [name in DBConbiniName]: {
    name: string
  }
}
