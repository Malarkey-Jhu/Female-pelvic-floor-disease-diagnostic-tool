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
  padding: 0px 40px;
  text-align: center;
  /* border: solid 1px; */
  `

const Outter = styled.div`
display: flex;
position: relative;
`

const Inner = styled.div`
  width: 150px;
  height: 180px;
  position: relative;
  .sub-title {
    position: absolute;
    left: 50%;
    top: 28px;
    transform: translateX(-50%);
  }
`

const EdgeTxt = styled.div`
  position: absolute;
  left: 50%;
  transform: translateX(-50%);
  top: 140px;
`

const onConnect = (params: Connection | Edge) => console.log('handle onConnect', params);

const tA = -1

// R2.Ba>1
const Graph2: FC<NodeProps> = ({ data, isConnectable }) => {

  const { formVals } = useFormValCtx()

  const { isInit, earlyOver }  = formVals;
  // 根據用戶輸入，算出 markline data
  // default 時傳 undefined
  const ANTERIOR_M_DATA:[MarkLineData] | undefined = 
    (isInit || formVals.Q11_a == undefined || earlyOver || formVals.Q11_a <= 1) ? 
    undefined : 
    [{ name: 'Ba-tA', xAxis: +formVals.Q11_a - tA }]

  return (
    <Box>
       
       <Handle type="target" position={Position.Left} style={sourceHandleStyle} onConnect={onConnect} />
       <Handle type="source" position={Position.Right} style={sourceHandleStyle} onConnect={onConnect} />
      <Outter>
         <EdgeTxt>
          <Trans i18nKey="EstimatedImprovement" values={{type: 'Ba'}}></Trans>
         </EdgeTxt>
        <Inner>
          <div className='sub-title'>ATVM</div>
          <NormalDistGraph options={allNM.ANTERIOR_ATVM_NM.getEchartOption("ANTERIOR", 
          ANTERIOR_M_DATA)}/>
        </Inner>
        <Inner>
        <div className='sub-title'>LSC</div>
          <NormalDistGraph options={allNM.ANTERIOR_LSC_NM.getEchartOption("ANTERIOR", ANTERIOR_M_DATA)} />
        </Inner>
        <Inner>
        <div className='sub-title'>SSLF/IFF/ISFF</div>
          <NormalDistGraph options={allNM.ANTERIOR_SLFF_NM.getEchartOption("ANTERIOR", ANTERIOR_M_DATA)} />
        </Inner>
        <Inner>
        <div className='sub-title'>ULS</div>
          <NormalDistGraph options={allNM.ANTERIOR_ULS_NM.getEchartOption("ANTERIOR", ANTERIOR_M_DATA)} />
        </Inner>
        <Inner>
        <div className='sub-title'>PTVM</div>
          <NormalDistGraph options={allNM.ANTERIOR_PTVM_NM.getEchartOption("ANTERIOR", ANTERIOR_M_DATA)} />
        </Inner>
      </Outter>
    </Box>
  );
};

export default memo(Graph2);