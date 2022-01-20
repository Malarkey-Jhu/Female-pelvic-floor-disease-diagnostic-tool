import { createContext, useContext, useState } from "react";

type ContextType =  {
  open: boolean;
  setDrawerOpen: React.Dispatch<React.SetStateAction<boolean>>

}

const DrawerContext = createContext<ContextType>({
  open: false,
  setDrawerOpen: () => {},
});

export const DrawerContextProvider = ({children}) => {
  const [open, setDrawerOpen] = useState(false)
 
  
  const contextVal = {
    open,
    setDrawerOpen,
  }

  return (
    <DrawerContext.Provider value={contextVal}>
      {children}
    </DrawerContext.Provider>
  )
}

export const useDrawerCtx = () => {
  const ctxVal = useContext(DrawerContext)
  return ctxVal
}