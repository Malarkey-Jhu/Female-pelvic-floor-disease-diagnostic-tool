import styled from '@emotion/styled';
import React, { memo, FC, CSSProperties } from 'react';

import { Handle, Position, NodeProps, Connection, Edge } from 'react-flow-renderer';

const sourceHandleStyle: CSSProperties = { background: 'transparent', };

const Box = styled.div`
  background: #FFE6CC;
  border: solid 1px #D79B00;
  margin: 5px;
  width: 90px;
  padding: 20px;
  text-align: center;
`

const onConnect = (params: Connection | Edge) => console.log('handle onConnect', params);

const MedialRecords: FC<NodeProps> = ({ data, isConnectable }) => {
  return (
    <Box>
      Medial Records
      <Handle type="source" position={Position.Right} style={sourceHandleStyle} isConnectable={isConnectable} />
    </Box>
  );
};

export default memo(MedialRecords);
