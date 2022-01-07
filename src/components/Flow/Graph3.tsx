import { useFormValCtx } from '@/context/FormValCtx';
import { MarkLineData } from '@/utils/NM';
import styled from '@emotion/styled';
import React, { memo, FC, CSSProperties } from 'react';
import { Handle, Position, NodeProps, Connection, Edge } from 'react-flow-renderer';
import NormalDistGraph from '../NormalDist';
import allNM from '../NormalDist/config';

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

// R2.C>1

const tC = -4;

const Graph3: FC<NodeProps> = ({ data, isConnectable }) => {

  const { formVals } = useFormValCtx()
  
  const isInit = formVals.isInit;
  // 根據用戶輸入，算出 markline data
  // default 時傳 undefined
 
  const CENTRAL_M_DATA:[MarkLineData] | undefined = (isInit || formVals.Q11_b == undefined) ? undefined : [{ name: 'C-tC', xAxis: +formVals.Q11_b - tC }]

  return (
    <Box>
       <Handle type="target" position={Position.Left} style={sourceHandleStyle} onConnect={onConnect} />
       <Handle type="source" position={Position.Right} style={sourceHandleStyle} onConnect={onConnect} />
      <Outter>
        <Inner>
          <NormalDistGraph options={allNM.CENTRAL_ATVM_NM.getEchartOption("CENTRAL", CENTRAL_M_DATA)}/>
        </Inner>
        <Inner>
          <NormalDistGraph options={allNM.CENTRAL_LSC_NM.getEchartOption("CENTRAL", CENTRAL_M_DATA)}/>
        </Inner>
        <Inner>
          <NormalDistGraph options={allNM.CENTRAL_SLFF_NM.getEchartOption("CENTRAL", CENTRAL_M_DATA)}/>
        </Inner>
        <Inner>
          <NormalDistGraph options={allNM.CENTRAL_ULS_NM.getEchartOption("CENTRAL", CENTRAL_M_DATA)}/>
        </Inner>
        <Inner>
          <NormalDistGraph options={allNM.CENTRAL_PVTM_NM.getEchartOption("CENTRAL", CENTRAL_M_DATA)}/>
        </Inner>
      </Outter>
    </Box>
  );
};

export default memo(Graph3);