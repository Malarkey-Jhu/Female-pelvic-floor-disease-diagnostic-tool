// import { useEffect, useState } from 'react';
// import {
//   enable as enableDarkMode,
//   disable as disableDarkMode,
//   exportGeneratedCSS as collectCSS,
//   isEnabled as isDarkReaderEnabled
// } from 'darkreader';

// export function useDarkMode() {

//   const [isDark, setDark] = useState(false)
//   const toggleDark = () => {
//     if (isDark) {
//       disableDarkMode()
//       setDark(false)
//     } else {
//       enableDarkMode({
//         brightness: 100,
//         contrast: 90,
//         sepia: 10,
//     })
//     setDark(true)
//     }
//   }
  
//   useEffect(() => {
//     (async() => {
//       const css = await collectCSS();
//       console.log(css)
//     })()
//   })

//   return { isDark, toggleDark }
// }