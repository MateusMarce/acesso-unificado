import React, { useEffect, useState } from "react"
import { useCookies } from "react-cookie"
import { ThemeContextType } from "../assets/types/type"

export const ThemeContext = React.createContext<ThemeContextType>({})

export const ThemeProvider = (props: any) => {
    const [mode, setMode] = useState('light')

    
    return(
        <ThemeContext.Provider value={{mode, setMode}}>
            {props.children}
        </ThemeContext.Provider>
    )
}

export const useTheme = () => React.useContext(ThemeContext)