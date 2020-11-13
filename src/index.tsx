import { createContext } from 'react'

// TODO add generic
export interface PrismaCmsContext extends Record<string, any> {}

const context: PrismaCmsContext = {}

export default createContext(context)
