import React, { memo, FC, CSSProperties } from 'react';
import styled from "@emotion/styled"
import { Handle, Position, NodeProps, Connection, Edge } from 'react-flow-renderer';

const targetHandleStyle: CSSProperties = { background: 'transparent', border: 'none' };
const sourceHandleStyleA: CSSProperties = { ...targetHandleStyle };
const sourceHandleStyleB: CSSProperties = { ...targetHandleStyle };

const onConnect = (params: Connection | Edge) => console.log('handle onConnect', params);

const Box = styled.div`
  background: #F8CECC;
  border: solid 1px #B85450;
  margin: 5px;
  padding: 10px 20px;
  text-align: center;
  position: relative;
  .no {
    position: absolute;
    bottom: -30px;
    left: 55%;
  }
`

const PFMT: FC<NodeProps> = ({ data, isConnectable }) => {
  return (
    <Box>
      <Handle type="target" position={Position.Bottom} style={targetHandleStyle} onConnect={onConnect} />
      <div>
        <span style={{ whiteSpace: 'nowrap' }}>Life style intervention + </span>
        <br />
        PFMT
        <span className='no'>No</span>
      </div>
    </Box>
  );
};

export default memo(PFMT);

