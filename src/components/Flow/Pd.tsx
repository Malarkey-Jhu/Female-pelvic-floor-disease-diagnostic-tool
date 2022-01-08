import styled from '@emotion/styled';
import { MathJax } from 'better-react-mathjax';
import React, { memo, FC, CSSProperties } from 'react';

import { Handle, Position, NodeProps, Connection, Edge } from 'react-flow-renderer';

const targetHandleStyle: CSSProperties = { background: 'transparent', };
const sourceHandleStyleA: CSSProperties = { ...targetHandleStyle, top: 0 };
const sourceHandleStyleB: CSSProperties = { ...targetHandleStyle, bottom: 10};

const Box = styled.div`
  background: #F5F5F5;
  border: solid 1px #666;
  margin: 5px;
  width: 60px;
  padding: 20px;
  text-align: center;
`

const onConnect = (params: Connection | Edge) => console.log('handle onConnect', params);

const Pd: FC<NodeProps> = ({ data, isConnectable }) => {
  const f = "\\(\P_d \\)";
  return (
    <Box>
      <Handle type="target" position={Position.Right} style={targetHandleStyle} onConnect={onConnect} />
      <MathJax>{f}</MathJax>    
      <Handle type="source" position={Position.Top} style={sourceHandleStyleB} isConnectable={isConnectable} />
    </Box>
  );
};

export default memo(Pd);
