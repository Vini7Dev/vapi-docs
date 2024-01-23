import React from 'react'
import {
  FiCheck,
  FiPlus,
  FiEdit2,
  FiTrash,
  FiChevronDown,
  FiChevronRight,
  FiX,
  FiInfo,
} from 'react-icons/fi'

import * as T from './types'

export const Check: React.FC<T.IconProps> = ({ ...rest }) => <FiCheck {...rest} />

export const Plus: React.FC<T.IconProps> = ({ ...rest }) => <FiPlus {...rest} />

export const Edit: React.FC<T.IconProps> = ({ ...rest }) => <FiEdit2 {...rest} />

export const Trash: React.FC<T.IconProps> = ({ ...rest }) => <FiTrash {...rest} />

export const ArrowDown: React.FC<T.IconProps> = ({ ...rest }) => <FiChevronDown {...rest} />

export const ArrowRight: React.FC<T.IconProps> = ({ ...rest }) => <FiChevronRight {...rest} />

export const XClose: React.FC<T.IconProps> = ({ ...rest }) => <FiX {...rest} />

export const Info: React.FC<T.IconProps> = ({ ...rest }) => <FiInfo {...rest} />
