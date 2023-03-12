import { styled } from '@nextui-org/react'
import { type AnchorHTMLAttributes } from 'react'

export const Box = styled('div', {
  boxSizing: 'border-box',
})

export const Link = (props: AnchorHTMLAttributes<HTMLAnchorElement>) => {
  return <a className="text-inherit no-underline w-full h-full" {...props} />
}
