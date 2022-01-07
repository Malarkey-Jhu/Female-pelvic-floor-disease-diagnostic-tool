import React, { memo, FC, CSSProperties } from 'react';
import styled from "@emotion/styled"
import { Handle, Position, NodeProps, Connection, Edge } from 'react-flow-renderer';

const targetHandleStyle: CSSProperties = { border: 'none', background: 'transparent', bottom: 5};
const sourceHandleStyleB: CSSProperties = { border: 'none', background: 'transparent', right: 5 };
const onConnect = (params: Connection | Edge) => console.log('handle onConnect', params);

const Box = styled.div`
  width: 10px;
  height: 10px;
  text-align: center;
`

const FakeNode: FC<NodeProps> = ({ data, isConnectable }) => {
  return (
    <Box>
      <Handle type="target" position={Position.Bottom} style={targetHandleStyle} onConnect={onConnect} />
      <Handle type="source" position={Position.Right} style={sourceHandleStyleB} isConnectable={isConnectable} />
    </Box>
  );
};

export default memo(FakeNode);