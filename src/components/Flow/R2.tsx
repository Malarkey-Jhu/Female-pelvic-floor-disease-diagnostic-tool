import styled from '@emotion/styled';
import React, { memo, FC, CSSProperties } from 'react';

import { Handle, Position, NodeProps, Connection, Edge } from 'react-flow-renderer';

const targetHandleStyle: CSSProperties = { background: 'transparent', border: 'none' };
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
  position: relative;

  .redBold {
    color: #CC0000;
    font-weight: 500;
  }
`

const EdgeTxt = styled.span<{ right: string, top: string}>`
  position: absolute;
  right: ${props =>
    props.right};
  top: ${props =>
    props.top};
`

const onConnect = (params: Connection | Edge) => console.log('handle onConnect', params);

const R2: FC<NodeProps> = ({ data, isConnectable }) => {
  return (
    <Oval>
      <Handle type="target" position={Position.Left} style={targetHandleStyle} onConnect={onConnect} />
      <EdgeTxt right="-125px" top="-71px"><span className='redBold'>R2.</span>Ba {'>'} 1</EdgeTxt>
      <EdgeTxt right="-121px" top="52px"><span className='redBold'>R2.</span>C {'>'} 1</EdgeTxt>
      <EdgeTxt right="-128px" top="170px"><span className='redBold'>R2.</span>Bp {'>'} 1</EdgeTxt>
      <span className='redBold'>R2.</span> POP-Q 
      <Handle type="source" position={Position.Right} id="R2-Source-T" style={sourceHandleStyleB} isConnectable={isConnectable} />
      <Handle type="source" position={Position.Right} id="R2-Source-C" style={sourceHandleStyleB} isConnectable={isConnectable} />
      <Handle type="source" position={Position.Right} id="R2-Source-B" style={sourceHandleStyleB} isConnectable={isConnectable} />
    </Oval>
  );
};

export default memo(R2);
