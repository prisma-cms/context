import { createContext } from 'react'

import { PrismaCmsContext } from './interfaces'

export * from './interfaces'

const context: PrismaCmsContext = {}

export default createContext(context)
