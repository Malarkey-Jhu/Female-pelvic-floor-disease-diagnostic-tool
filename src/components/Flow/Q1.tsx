import styled from '@emotion/styled';
import React, { memo, FC, CSSProperties } from 'react';
import { Handle, Position, NodeProps, Connection, Edge } from 'react-flow-renderer';
import { DiamondBox } from '../Shapes';

const targetHandleStyle: CSSProperties = { background: 'transparent', border: 'none' };
const sourceHandleStyleA: CSSProperties = { ...targetHandleStyle, top: 0 };
const sourceHandleStyleB: CSSProperties = { ...targetHandleStyle, bottom: 10};

const onConnect = (params: Connection | Edge) => console.log('handle onConnect', params);

const E1 = styled.span`
  position: absolute;
  right: -60px;
  top: 0px;
`

const Q1: FC<NodeProps> = ({ data, isConnectable }) => {
  return (
    <DiamondBox>
      <Handle type="target" position={Position.Left} style={targetHandleStyle} onConnect={onConnect} />
      <div>
        Q1. Vaginal 
        <br />
        bulge symptoms?
      </div>

      <E1>Severe</E1>
      <Handle type="source" position={Position.Right} id="Q1-Source-R" style={sourceHandleStyleB} isConnectable={isConnectable} />
    </DiamondBox>
  );
};

export default memo(Q1);
