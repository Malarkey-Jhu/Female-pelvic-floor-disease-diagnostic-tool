import React, { memo, FC, CSSProperties } from 'react';
import styled from "@emotion/styled"
import { Handle, Position, NodeProps, Connection, Edge } from 'react-flow-renderer';
import { MathJax } from 'better-react-mathjax';

const InnerBox = styled.div`
  border: solid 1px;
  flex: 1;
  margin: 5px;
  width: 90px;
  text-align: center;
  padding: 15px 10px;
  z-index: 1;
  position: relative;
`

const EdgeTxt = styled.div`
  position: absolute;
  right: -58px;
  top: 8px;
`
const targetHandleStyle: CSSProperties = { background: 'transparent', border: 'none', top: 30 }

const onConnect = (params: Connection | Edge) => console.log('handle onConnect', params);

const PoPre: FC<NodeProps> = ({ data, isConnectable }) => {
  const f = "\\(\P_{o,pre} \\)";
  return (
    <InnerBox>
      <EdgeTxt>Yes</EdgeTxt>
      <MathJax>{f}</MathJax>
      <Handle type="target" position={Position.Right} style={targetHandleStyle} id="Po-Pre" onConnect={onConnect} />
    </InnerBox>
  );
};

export default memo(PoPre);
