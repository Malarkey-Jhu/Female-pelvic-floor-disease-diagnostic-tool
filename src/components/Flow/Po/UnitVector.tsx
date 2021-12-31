import React, { memo, FC, CSSProperties } from 'react';
import styled from "@emotion/styled"
import { Handle, Position, NodeProps, Connection, Edge } from 'react-flow-renderer';

const InnerBox = styled.div`
  border: solid 1px;
  flex: 1;
  margin: 5px;
  width: 90px;
  text-align: center;
`

const targetHandleStyle: CSSProperties = { background: 'transparent' };
const targetHandleStyleB: CSSProperties = { ...targetHandleStyle, background: 'black' };

const onConnect = (params: Connection | Edge) => console.log('handle onConnect', params);

const UnitVector: FC<NodeProps> = ({ data, isConnectable }) => {
  return (
      <InnerBox>
        Unit Vector
        <Handle type="target" position={Position.Right} style={targetHandleStyleB} id="Po-UnitVector" onConnect={onConnect} />
      </InnerBox>
  );
};

export default memo(UnitVector);
