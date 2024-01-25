import { ChangeEvent, TextAreaHTMLAttributes } from 'react'

export interface TextAreaProps extends TextAreaHTMLAttributes<HTMLTextAreaElement> {
  name: string
  label: string
  placeholder: string
  value?: string
  onChange?(e: ChangeEvent<HTMLTextAreaElement>): void
}
