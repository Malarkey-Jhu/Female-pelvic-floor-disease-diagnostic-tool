import { useEffect, useState } from 'react';
import {
  enable as enableDarkMode,
  disable as disableDarkMode,
} from 'darkreader';

const darkModeParams = {
  brightness: 100,
  contrast: 90,
  sepia: 10,
}

export function useDarkMode() {
  const [isDark, setDark] = useState(false)
  const toggleDark = () => {
    if (isDark) {
      disableDarkMode()
      setDark(false)
    } else {
      enableDarkMode(darkModeParams)
      setDark(true)
    }
  }
  
  // useEffect(() => {
  //   enableDarkMode(darkModeParams)
  // }, [])

  return { isDark, toggleDark }
}