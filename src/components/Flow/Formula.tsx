import React, { memo, FC, CSSProperties } from 'react';
import styled from "@emotion/styled"
import { Handle, Position, NodeProps, Connection, Edge } from 'react-flow-renderer';
import { MathJax } from 'better-react-mathjax';
import { useTranslation } from 'react-i18next';

const targetHandleStyle: CSSProperties = { background: 'transparent', };
const sourceHandleStyleA: CSSProperties = { ...targetHandleStyle };
const sourceHandleStyleB: CSSProperties = { ...targetHandleStyle };

const onConnect = (params: Connection | Edge) => console.log('handle onConnect', params);

const Box = styled.div`
  background: #F8CECC;
  border: solid 1px #B85450;
  margin: 5px;
  width: 230px;
  height: 81px;
  padding: 14px 8px;
  text-align: center;
`

const Formula: FC<NodeProps> = ({ data, isConnectable }) => {
  const {t} = useTranslation();
  const f = "\\(\\propto \\dfrac{\P_m \\: \P_e}{\P_d^\\alpha \\: \P_m^\\beta \\: \P_o^\\gamma} \\cdot \\pi \\)";
  return (
    <Box>
      <Handle type="target" id="Formula-Target-T" position={Position.Top} style={targetHandleStyle} onConnect={onConnect} />
      <Handle type="target" id="Formula-Target-L" position={Position.Left} style={targetHandleStyle} onConnect={onConnect} />
      <Handle type="target" id="Formula-Target-B" position={Position.Bottom} style={targetHandleStyle} onConnect={onConnect} />
      <div>
      <div style={{marginBottom: 8, whiteSpace: 'nowrap'}}>{t('SurgeryProbability')}</div>
      <span style={{fontSize: 16}}><MathJax>{f}</MathJax></span>
      </div>
      <Handle type="source" position={Position.Right} id="Formula-Source-R" style={sourceHandleStyleB} isConnectable={isConnectable} />
    </Box>
  );
};

export default memo(Formula);
