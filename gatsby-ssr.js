import { I18nextProvider } from "react-i18next";
import { MathJaxContext } from 'better-react-mathjax'
import i18n from 'i18next';
import lng from './i18n';

i18n
  .init({
    debug: true,
    fallbackLng: 'en',
    interpolation: {
      escapeValue: false, // not needed for react as it escapes by default
    },
    lng: "en", // if you're using a language detector, do not define the lng option
    resources: lng
  })

export const wrapRootElement = ({ element }) => {
  return (
    <MathJaxContext>
      <I18nextProvider i18n={i18n}>
        {element}
      </I18nextProvider>
    </MathJaxContext>
  )
}

// export const onRenderBody = ({ setHeadComponents }) => {
//   setHeadComponents([
//     <script key="mathJax" type="text/javascript" id="MathJax-script" async
//     src="https://cdn.jsdelivr.net/npm/mathjax@3/es5/tex-svg.js">
//     </script>,
//     <script
//     key="fun_javascript"
//     dangerouslySetInnerHTML={{
//       __html: `
//       MathJax = {
//         tex: {
//           inlineMath: [['$', '$'], ['\\(', '\\)']]
//         },
//         svg: {
//           fontCache: 'global'
//         }
//       };
//     `,
//     }}
//   />,
//   ])
// }