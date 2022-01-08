import styled from '@emotion/styled';
import { MathJax } from 'better-react-mathjax';
import React, { memo, FC, CSSProperties } from 'react';

import { Handle, Position, NodeProps, Connection, Edge } from 'react-flow-renderer';

const targetHandleStyle: CSSProperties = { background: 'transparent', };
const sourceHandleStyleA: CSSProperties = { ...targetHandleStyle, top: 0 };
const sourceHandleStyleB: CSSProperties = { ...targetHandleStyle, bottom: 10};

const Box = styled.div`
  background: #FFE6CC;
  border: solid 1px #D79B00;
  margin: 5px;
  width: 90px;
  padding: 20px;
  text-align: center;
`

const onConnect = (params: Connection | Edge) => console.log('handle onConnect', params);

const Pe: FC<NodeProps> = ({ data, isConnectable }) => {
  const f = "\\(\P_e \\)";
  return (
    <Box>
      <Handle type="target" position={Position.Left} style={targetHandleStyle} onConnect={onConnect} />
      <MathJax>{f}</MathJax>
      <Handle type="source" position={Position.Top} style={sourceHandleStyleB} isConnectable={isConnectable} />
    </Box>
  );
};

export default memo(Pe);
