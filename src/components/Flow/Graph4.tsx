import { useFormValCtx } from '@/context/FormValCtx';
import { MarkLineData } from '@/utils/NM';
import styled from '@emotion/styled';
import React, { memo, FC, CSSProperties } from 'react';
import { Handle, Position, NodeProps, Connection, Edge } from 'react-flow-renderer';
import { Trans } from 'react-i18next';
import NormalDistGraph from '../NormalDist';
import allNM from '../NormalDist/config';

const sourceHandleStyle: CSSProperties = { background: 'transparent', };

const Box = styled.div`
  background: transparent;
  padding: 0px 40px;;
  text-align: center;
  /* border: solid 1px; */
`

const Outter = styled.div`
  display: flex;
  position: relative;
`

const Inner = styled.div`
  width: 150px;
  height: 180px
`

const EdgeTxt = styled.div`
  position: absolute;
  left: 50%;
  transform: translateX(-50%);
  top: 140px;
`

const onConnect = (params: Connection | Edge) => console.log('handle onConnect', params);

// R2.Bp>11
const tP = -1;

const Graph4: FC<NodeProps> = ({ data, isConnectable }) => {
  
  const { formVals } = useFormValCtx()
  
  const {isInit, earlyOver} = formVals;
  // 根據用戶輸入，算出 markline data
  // default 時傳 undefined
 
  const POSTERIOR_M_DATA:[MarkLineData] | undefined = 
    (isInit || formVals.Q11_c == undefined || earlyOver) ?
    undefined : 
    [{ name: 'Bp-tP', xAxis: +formVals.Q11_c - tP }]

  return (
    <Box>
       <Handle type="target" position={Position.Left} style={sourceHandleStyle} onConnect={onConnect} />
       <Handle type="source" position={Position.Right} style={sourceHandleStyle} onConnect={onConnect} />
      <Outter>
        <EdgeTxt>
          <Trans i18nKey="EstimatedImprovement" values={{type: 'Bp'}}></Trans>
        </EdgeTxt>
        <Inner>
          <NormalDistGraph options={allNM.POSTERIOR_ATVM_NM.getEchartOption("POSTERIOR", POSTERIOR_M_DATA)}/>
        </Inner>
        <Inner>
          <NormalDistGraph options={allNM.POSTERIOR_LSC_NM.getEchartOption("POSTERIOR", POSTERIOR_M_DATA)}/>
        </Inner>
        <Inner>
          <NormalDistGraph options={allNM.POSTERIOR_SLFF_NM.getEchartOption("POSTERIOR", POSTERIOR_M_DATA)}/>
        </Inner>
        <Inner>
          <NormalDistGraph options={allNM.POSTERIOR_ULS_NM.getEchartOption("POSTERIOR", POSTERIOR_M_DATA)}/>
        </Inner>
        <Inner>
          <NormalDistGraph options={allNM.ANTERIOR_PVTM_NM.getEchartOption("POSTERIOR", POSTERIOR_M_DATA)}/>
        </Inner>
      </Outter>
    </Box>
  );
};

export default memo(Graph4);