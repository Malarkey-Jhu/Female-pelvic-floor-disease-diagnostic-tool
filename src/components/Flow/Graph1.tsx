import { useFormValCtx } from '@/context/FormValCtx';
import { MarkLineData } from '@/utils/NM';
import styled from '@emotion/styled';
import React, { memo, FC, CSSProperties } from 'react';
import { Handle, Position, NodeProps, Connection, Edge } from 'react-flow-renderer';
import NormalDistGraph from '../NormalDist';
import allNM from '../NormalDist/config';

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

  const { formVals } = useFormValCtx()

  const isInit = formVals.isInit;
  // 根據用戶輸入，算出 markline data
  // default 時傳 undefined
  const AGE_M_DATA:[MarkLineData, MarkLineData] | undefined = isInit ? undefined : [{ name: '-1', xAxis: +formVals.Q8 - 1 }, { name: '+1', xAxis: +formVals.Q8 + 1 }]
  const BMI_M_DATA:[MarkLineData, MarkLineData] | undefined = isInit ? undefined : [{ name: '-0.1', xAxis: +formVals.BMI - 0.1 }, { name: '+0.1', xAxis: +formVals.BMI + 0.1 }]

  console.log(isInit)
  console.log(AGE_M_DATA,  'AGE_M_DATA')
  
  return (
    <Box>
       <Handle type="target" position={Position.Left} style={sourceHandleStyle} onConnect={onConnect} />
       <Handle type="source" position={Position.Right} style={sourceHandleStyle} onConnect={onConnect} />
       
      <Outter>
        <Inner>
          <div>ATVM</div>
          <NormalDistGraph options={allNM.AGE_ATVM_NM.getEchartOption("AGE", AGE_M_DATA)}/>
          <NormalDistGraph options={allNM.BMI_ATVM_NM.getEchartOption("BMI", BMI_M_DATA)}/>
        </Inner>

        <Inner>
          <div>LSC</div>
          <NormalDistGraph options={allNM.AGE_LSC_NM.getEchartOption("AGE", AGE_M_DATA)}/>
          <NormalDistGraph options={allNM.BMI_LSC_NM.getEchartOption("BMI", BMI_M_DATA)}/>
        </Inner>

        <Inner>
          <div style={{ "whiteSpace": "pre" }}>SLFF/IFF/ISFF</div>
          <NormalDistGraph options={allNM.AGE_SLFF_NM.getEchartOption("AGE", AGE_M_DATA)}/>
          <NormalDistGraph options={allNM.BMI_SLFF_NM.getEchartOption("BMI", BMI_M_DATA)}/>
        </Inner>

        <Inner>
          <div>ULS</div>
          <NormalDistGraph options={allNM.AGE_ULS_NM.getEchartOption("AGE", AGE_M_DATA)}/>
          <NormalDistGraph options={allNM.BMI_ULS_NM.getEchartOption("BMI", BMI_M_DATA)}/>
        </Inner>

        <Inner>
          <div>PVTM</div>
          <NormalDistGraph options={allNM.AGE_PVTM_NM.getEchartOption("AGE", AGE_M_DATA)}/>
          <NormalDistGraph options={allNM.BMI_PVTM_NM.getEchartOption("BMI", BMI_M_DATA)}/>
        </Inner>

        <Inner>
          <div>Lefort</div>
          <NormalDistGraph options={allNM.AGE_LEFORT_NM.getEchartOption("AGE", AGE_M_DATA)}/>
          <NormalDistGraph options={allNM.BMI_LEFORT_NM.getEchartOption("BMI", BMI_M_DATA)}/>
        </Inner>

      </Outter>
    </Box>
  );
};

export default Graph1;