import React from 'react';
import Flow from '@/components/Flow/index'
import styled from '@emotion/styled';
import { useTranslation, withTranslation } from 'react-i18next';

const Title = styled.div`
  height: 93px;
  line-height: 93px;
  font-size: 20px;
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
  return (
    <Wrapper>
      <Title>女性盆底疾病辅助诊断工具</Title>

      <div>
        {Object.keys(lngs).map((lng) => (
          <button key={lng} style={{ fontWeight: i18n.resolvedLanguage === lng ? 'bold' : 'normal' }} type="submit" onClick={() => i18n.changeLanguage(lng)}>
            {lngs[lng].nativeName}
          </button>
        ))}
      </div>
      <div style={{ padding: "10px 0px", borderTop: "solid 40px #f2f2f2", height : '1100px'}}>
      <Flow />
      </div>
    </Wrapper>
  );
}
