import styled from '@emotion/styled';
import React, { memo, FC, CSSProperties } from 'react';
import { Handle, Position, NodeProps, Connection, Edge } from 'react-flow-renderer';
import NormalDistGraph from '../NormalDist';

const sourceHandleStyle: CSSProperties = { background: 'transparent', };

const Box = styled.div`
  background: #fff;
  border: solid 1px black;
  margin: 5px;
  padding: 20px 10px;
  text-align: center;
  border-radius: 30px;
`

const Outter = styled.div`
  display: flex;
`

const Inner = styled.div`
  width: 150px;
  height: 200px;
  display: flex;
  flex-direction: column;
`

const onConnect = (params: Connection | Edge) => console.log('handle onConnect', params);

const Graph1: FC<NodeProps> = ({ data, isConnectable }) => {
  return (
    <Box>
       <Handle type="target" position={Position.Left} style={sourceHandleStyle} onConnect={onConnect} />
       <Handle type="source" position={Position.Right} style={sourceHandleStyle} onConnect={onConnect} />
       
      <Outter>
        <Inner>
          <div>ATVM</div>
          <NormalDistGraph />
          <NormalDistGraph />
        </Inner>

        <Inner>
          <div>LSC</div>
          <NormalDistGraph />
          <NormalDistGraph />
        </Inner>

        <Inner>
          <div style={{ "whiteSpace": "pre" }}>SLFF/IFF/ISFF</div>
          <NormalDistGraph />
          <NormalDistGraph />
        </Inner>

        <Inner>
          <div>HUS</div>
          <NormalDistGraph />
          <NormalDistGraph />
        </Inner>

        <Inner>
          <div>PVTM</div>
          <NormalDistGraph />
          <NormalDistGraph />
        </Inner>

        <Inner>
          <div>Lefort</div>
          <NormalDistGraph />
          <NormalDistGraph />
        </Inner>

      </Outter>
    </Box>
  );
};

export default memo(Graph1);