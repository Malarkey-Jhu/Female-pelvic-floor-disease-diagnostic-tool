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
    lng: "cn", // if you're using a language detector, do not define the lng option
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