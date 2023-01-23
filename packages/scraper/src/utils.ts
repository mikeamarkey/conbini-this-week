import { type ConbiniName, conbinisMap } from '../../core/src'

export const isValidConbiniName = (
  name: string
): name is ConbiniName | 'all' => {
  return name in conbinisMap || name === 'all'
}
