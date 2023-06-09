import React, { useEffect, useState } from "react"
import { useCookies } from "react-cookie"
import { ThemeContextType } from "../assets/types/type"

export const ThemeContext = React.createContext<ThemeContextType>({})

export const ThemeProvider = (props: any) => {
    const [cookies, setCookies] = useCookies(['theme', 'user'])
    const [mode, setMode] = useState('light')

    useEffect(()=>{
        
        if(cookies.user && cookies.user.tema){
            //coloca oq tem no cookie
            setMode(cookies.user.tema)
            document.body.setAttribute('data-theme', cookies.user.tema)
            
        } else if(cookies.theme) {
            //coloca oq tem no cookie
            setMode(cookies.theme)
            document.body.setAttribute('data-theme', cookies.theme)
        } else {
            //set default
            setMode('light')
            document.body.setAttribute('data-theme', 'light')
        }
    }, [])
    
    return(
        <ThemeContext.Provider value={{mode, setMode}}>
            {props.children}
        </ThemeContext.Provider>
    )
}

export const useTheme = () => React.useContext(ThemeContext)