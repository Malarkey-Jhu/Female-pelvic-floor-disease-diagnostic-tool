import React, { memo, FC, CSSProperties } from 'react';
import styled from "@emotion/styled"
import { Handle, Position, NodeProps, Connection, Edge } from 'react-flow-renderer';
import { MathJax } from 'better-react-mathjax';

const OutterBox = styled.div`
  background: #DAE8FC;
  border: solid 1px;
  padding: 10px 20px;
  width: 100px;
  height: 160px;
  z-index: -1;
`

const sourceHandleStyle: CSSProperties = { background: 'transparent', border: 'none' };

const onConnect = (params: Connection | Edge) => console.log('handle onConnect', params);

const Po: FC<NodeProps> = ({ data, isConnectable }) => {
  const f = "\\(\P_o \\)";
  return (
    <OutterBox>
      <Handle type="source" position={Position.Bottom} style={sourceHandleStyle} isConnectable={isConnectable} />
      <MathJax>{f}</MathJax>
    </OutterBox>
  );
};

export default memo(Po);
