import styled from '@emotion/styled';
import React, { memo, FC, CSSProperties } from 'react';
import { Handle, Position, NodeProps, Connection, Edge } from 'react-flow-renderer';
import NormalDistGraph from '../NormalDist';

const sourceHandleStyle: CSSProperties = { background: 'transparent', };

const Box = styled.div`
  background: transparent;
  padding: 0px 40px;
  text-align: center;
  /* border: solid 1px; */
`

const Outter = styled.div`
  display: flex;
`

const Inner = styled.div`
  width: 150px;
  height: 180px
`

const onConnect = (params: Connection | Edge) => console.log('handle onConnect', params);

// R2.Ba>1
const Graph2: FC<NodeProps> = ({ data, isConnectable }) => {
  return (
    <Box>
       <Handle type="target" position={Position.Left} style={sourceHandleStyle} onConnect={onConnect} />
       <Handle type="source" position={Position.Right} style={sourceHandleStyle} onConnect={onConnect} />
      <Outter>
        <Inner>
          <NormalDistGraph />
        </Inner>
        <Inner>
          <NormalDistGraph />
        </Inner>
        <Inner>
          <NormalDistGraph />
        </Inner>
        <Inner>
          <NormalDistGraph />
        </Inner>
        <Inner>
          <NormalDistGraph />
        </Inner>
      </Outter>
    </Box>
  );
};

export default memo(Graph2);