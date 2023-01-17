import React, { Dispatch, ReactNode, SetStateAction, useContext } from 'react'
import { useLocalStorage } from '../hooks/useLocalStorage'

interface ISearchState {
  positive?: boolean
  fiveDays?: boolean
  zipCode?: string
}

interface IContextType {
  storedValue: ISearchState
  setStoredValue: Dispatch<SetStateAction<ISearchState>>
}

// initial state
const defaultSearchState: ISearchState = {
  positive: undefined,
  fiveDays: undefined,
  zipCode: '',
}

export const SearchContext = React.createContext<IContextType | undefined>(
  undefined
)

export const useSearch = () => useContext(SearchContext)

const SearchProvider = ({ children }: { children: ReactNode }) => {
  const [storedValue, setStoredValue] = useLocalStorage<any>(
    'searchState',
    defaultSearchState
  )

  return (
    <SearchContext.Provider value={{ storedValue, setStoredValue }}>
      {children}
    </SearchContext.Provider>
  )
}

export default SearchProvider
