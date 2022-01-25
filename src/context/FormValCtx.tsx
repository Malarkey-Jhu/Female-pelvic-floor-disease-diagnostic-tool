import { defaultFormVals, FormVals } from "@/components/Form";
import { useCallback } from "react";
import { createContext, useContext, useState } from "react";

type FormValContextType =  {
  formVals: FormVals;
  setFormVals: React.Dispatch<React.SetStateAction<FormVals>>;
  handleReset: () => void;
}

const FormValGraphContext = createContext<FormValContextType>({
  formVals: defaultFormVals,
  setFormVals: () => {},
  handleReset: () => {}
});

export const FormValContextProvider = ({children}) => {
  const [formVals, setFormVals] = useState<FormVals>(defaultFormVals)
 
  const handleReset = useCallback(() => {
    setFormVals({...defaultFormVals})
  }, [])
  
  const contextVal = {
    formVals,
    setFormVals,
    handleReset
  }

  return (
    <FormValGraphContext.Provider value={contextVal}>
      {children}
    </FormValGraphContext.Provider>
  )
}

export const useFormValCtx = () => {
  const ctxVal = useContext(FormValGraphContext)
  return ctxVal
}