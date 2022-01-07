import styled from '@emotion/styled';
import React, { memo, FC, CSSProperties } from 'react';

import { Handle, Position, NodeProps, Connection, Edge } from 'react-flow-renderer';

const targetHandleStyle: CSSProperties = { background: 'transparent', };
const sourceHandleStyleA: CSSProperties = { ...targetHandleStyle, top: 0 };
const sourceHandleStyleB: CSSProperties = { ...targetHandleStyle, bottom: 10};

const Oval = styled.div`
  background: #FFE6CC;
  border: solid 1px #D79B00;
  margin: 5px;
  width: 90px;
  height: 30px;
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 20px;
  text-align: center;
  border-radius: 100%;

  .redBold {
    color: #CC0000;
    font-weight: 500;
  }
`

const onConnect = (params: Connection | Edge) => console.log('handle onConnect', params);

const R2: FC<NodeProps> = ({ data, isConnectable }) => {
  return (
    <Oval>
      <Handle type="target" position={Position.Left} style={targetHandleStyle} onConnect={onConnect} />
      <span className='redBold'>R2.</span> POP-Q 
      <Handle type="source" position={Position.Right} id="R2-Source-T" style={sourceHandleStyleB} isConnectable={isConnectable} />
      <Handle type="source" position={Position.Right} id="R2-Source-C" style={sourceHandleStyleB} isConnectable={isConnectable} />
      <Handle type="source" position={Position.Right} id="R2-Source-B" style={sourceHandleStyleB} isConnectable={isConnectable} />
    </Oval>
  );
};

export default memo(R2);
