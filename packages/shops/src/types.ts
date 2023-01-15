import { ConbiniName as DBConbiniName } from '@conbini-this-week/db/types'

export type ConbiniName = DBConbiniName

export type Conbini = {
  baseurl: string
  displayName: string
  hostname: string
  name: ConbiniName
}
