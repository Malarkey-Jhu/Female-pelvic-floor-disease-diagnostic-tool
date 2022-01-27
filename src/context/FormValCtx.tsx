import { defaultFormVals, FormVals } from "@/components/Form";
import { useCallback } from "react";
import { createContext, useContext, useState } from "react";

type FormValContextType =  {
  resetCounter: number;
  formVals: FormVals;
  setFormVals: React.Dispatch<React.SetStateAction<FormVals>>;
  handleReset: () => void;
}

const FormValGraphContext = createContext<FormValContextType>({
  resetCounter: 0,
  formVals: defaultFormVals,
  setFormVals: () => {},
  handleReset: () => {}
});

export const FormValContextProvider = ({children}) => {
  const [formVals, setFormVals] = useState<FormVals>(defaultFormVals)
  const [resetCounter, setResetCounter] = useState(0)

  const handleReset = useCallback(() => {
    setFormVals({...defaultFormVals})
    setResetCounter(v => v+1)
  }, [])
  
  const contextVal = {
    resetCounter,
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