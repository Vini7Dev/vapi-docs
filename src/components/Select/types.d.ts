import { SelectHTMLAttributes } from 'react'

export interface SelectProps extends SelectHTMLAttributes<HTMLSelectElement> {
  name: string
  label: string
  placeholder: string
  options: string[]
  backgroundColor?: string
}
