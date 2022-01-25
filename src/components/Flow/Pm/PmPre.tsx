import React, { memo, FC, CSSProperties } from 'react';
import styled from "@emotion/styled"
import { Handle, Position, NodeProps, Connection, Edge } from 'react-flow-renderer';
import { MathJax } from 'better-react-mathjax';
import { useTranslation } from 'react-i18next';

const InnerBox = styled.div`
  border: solid 1px;
  flex: 1;
  margin: 5px;
  width: 90px;
  padding: 15px 10px;
  text-align: center;
  z-index: 1;
  position: relative;
`

const EdgeTxt = styled.div`
  position: absolute;
  left: -68px;
  top: 8px;
`

const targetHandleStyle: CSSProperties = { background: 'transparent', border: 'none', top: 30 };

const onConnect = (params: Connection | Edge) => console.log('handle onConnect', params);

const PmPre: FC<NodeProps> = ({ data, isConnectable }) => {
  const {t} = useTranslation()
  const f = "\\(\P_{m,pre} \\)"
  return (
    <InnerBox>
      <EdgeTxt>{t('Yes')}</EdgeTxt>
      <MathJax>{f}</MathJax>
      <Handle type="target" position={Position.Left} style={targetHandleStyle} id="Pm-Pre" onConnect={onConnect} />
    </InnerBox>
  );
};

export default memo(PmPre);
