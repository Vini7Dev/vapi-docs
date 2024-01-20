import { ButtonHTMLAttributes } from 'react'
import { IconBase } from 'react-icons'

export interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  text: string
  variant?: 'primary' | 'secondary'
  Icon?: IconBase
  height?: 'big' | 'medium'
  isFullWidth?: boolean
}
