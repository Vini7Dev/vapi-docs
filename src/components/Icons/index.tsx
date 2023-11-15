import React from 'react'
import { FiCheck } from 'react-icons/fi'

import * as T from './types'

export const Check: React.FC<T.IconProps> = ({ ...rest }) => <FiCheck {...rest} />
