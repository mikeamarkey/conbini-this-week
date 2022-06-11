import { conbinis } from 'constant'
import { ConbiniName } from 'types'

export const isValidConbiniName = (
  name: string
): name is ConbiniName | 'all' => {
  return name in conbinis || name === 'all'
}
