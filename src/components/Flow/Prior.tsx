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
  background: #F9F7ED;
  border: solid 1px;
  margin: 5px;
  width: 90px;
  height: 22px;
  padding: 20px;
  text-align: center;
`

const Prior: FC<NodeProps> = ({ data, isConnectable }) => {
  const {t} = useTranslation();
  const f = "\\(\\pi\\)";
  return (
    <Box>
      <Handle type="target" position={Position.Left} style={targetHandleStyle} onConnect={onConnect} />
      <div>
        {t("MathPrior")}: <MathJax style={{display: 'inline-block'}}>{f}</MathJax>
      </div>
      <Handle type="source" position={Position.Right} id="Prior-Source-R" style={sourceHandleStyleB} isConnectable={isConnectable} />
    </Box>
  );
};

export default memo(Prior);
