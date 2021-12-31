import React, { memo, FC, CSSProperties } from 'react';
import styled from "@emotion/styled"
import { Handle, Position, NodeProps, Connection, Edge } from 'react-flow-renderer';

const InnerBox = styled.div`
  border: solid 1px;
  flex: 1;
  margin: 5px;
  width: 90px;
  text-align: center;
  z-index: 1;
`

const targetHandleStyle: CSSProperties = { background: 'transparent' };
const targetHandleStyleA: CSSProperties = { ...targetHandleStyle, background: 'black' };

const onConnect = (params: Connection | Edge) => console.log('handle onConnect', params);

const PoPre: FC<NodeProps> = ({ data, isConnectable }) => {
  return (
    <InnerBox>
      Po, pre
      <Handle type="target" position={Position.Right} style={targetHandleStyleA} id="Po-Pre" onConnect={onConnect} />
    </InnerBox>
  );
};

export default memo(PoPre);
