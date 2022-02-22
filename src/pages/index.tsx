import React from 'react';
import { Helmet } from "react-helmet"
import Flow from '@/components/Flow/index'
import styled from '@emotion/styled';
import { useTranslation } from 'react-i18next';
import { FormValContextProvider } from "@/context/FormValCtx";
import { DrawerContextProvider } from '@/context/DrawerCtx';
import MaterialUISwitch from '@/components/DarkMode';
import { useDarkMode } from '@/hooks/useDarkMode';

const Title = styled.div`
  height: 93px;
  line-height: 93px;
  font-size: 20px;
  color: rgb(44, 62, 80);
`

const Wrapper = styled.div`
  width: 1290px;
  font-family: Microsoft YaHei;
  margin: 0 auto;
`

const lngs = {
  en: { nativeName: 'English' },
  cn: { nativeName: '中文' }
};

export default function Home() {
  const { t, i18n } = useTranslation();
  const { isDark, toggleDark } = useDarkMode();
  return (
    <FormValContextProvider>
    <DrawerContextProvider>
    <Helmet>
    <script src="https://cdn.jsdelivr.net/npm/darkreader@4.9.44/darkreader.min.js"></script>
        </Helmet>
    <Wrapper>
      <div style={{display: 'flex', justifyContent: 'space-between', alignItems: 'center'}}>
      <Title>{t('Title')}</Title>
      <div>
        {Object.keys(lngs).map((lng) => (
          <Title key={lng} style={{ cursor: 'pointer', display: i18n.resolvedLanguage != lng ? 'inline-block' : 'none', marginRight: 20  }} onClick={() => i18n.changeLanguage(lng)}>
            {lngs[lng].nativeName}
          </Title>
        ))}
      <MaterialUISwitch checked={isDark} onChange={toggleDark} />
      </div>
      </div>
      <div style={{ padding: "10px 0px", borderTop: "solid 40px #f2f2f2", height : '960px'}}>
      <Flow />
      </div>
    </Wrapper>
    </DrawerContextProvider>  
    </FormValContextProvider>
  );
}
