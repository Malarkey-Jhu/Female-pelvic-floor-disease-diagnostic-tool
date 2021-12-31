import styled from '@emotion/styled';
import React, { memo, FC, CSSProperties } from 'react';

import { Handle, Position, NodeProps, Connection, Edge } from 'react-flow-renderer';

const sourceHandleStyle: CSSProperties = { background: 'transparent', };

const Box = styled.div`
  background: #F5F5F5;
  border: solid 1px #666;
  margin: 5px;
  width: 90px;
  padding: 20px;
  text-align: center;
`

const onConnect = (params: Connection | Edge) => console.log('handle onConnect', params);

const SafeReview: FC<NodeProps> = ({ data, isConnectable }) => {
  return (
    <Box>
      <Handle type="source" position={Position.Left} style={sourceHandleStyle} isConnectable={isConnectable} />
      Safety-related 
      literature review
    </Box>
  );
};

export default memo(SafeReview);
