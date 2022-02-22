import { useEffect, useState } from 'react';

const darkModeParams = {
  brightness: 100,
  contrast: 90,
  sepia: 10,
}


export function useDarkMode() {
  const [isDark, setDark] = useState(false)
  const toggleDark = () => {
    if (isDark) {
        window?.DarkReader?.disable()
        setDark(false)
    } else {
        window?.DarkReader?.enable(darkModeParams)
      setDark(true)
    }
  }
  
  // useEffect(() => {
  //   enableDarkMode(darkModeParams)
  // }, [])

  return { isDark, toggleDark }
}