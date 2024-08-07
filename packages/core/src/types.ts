import type { ConbiniName as DBConbiniName } from '~/db'

export type ConbiniName = DBConbiniName

export type Conbini<Name> = {
  baseurl: string
  displayName: string
  hostname: string
  name: Name
  newItemsUrl: (page?: number) => string
}

export type ConbiniMap = {
  [Name in ConbiniName]: Conbini<Name>
}
