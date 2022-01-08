import React, { memo, FC, CSSProperties } from 'react';
import styled from "@emotion/styled"
import { Handle, Position, NodeProps, Connection, Edge } from 'react-flow-renderer';
import { useTranslation } from 'react-i18next';

const InnerBox = styled.div`
  border: solid 1px;
  flex: 1;
  margin: 5px;
  width: 90px;
  padding: 15px 10px;
  text-align: center;
`

const EdgeTxt = styled.div`
  position: absolute;
  left: -58px;
  top: 8px;
`
const targetHandleStyle: CSSProperties = { background: 'transparent', border: 'none', top: 30 }
const onConnect = (params: Connection | Edge) => console.log('handle onConnect', params);

const UnitVector: FC<NodeProps> = ({ data, isConnectable }) => {
  const {t} = useTranslation()
  return (
      <InnerBox>
        <EdgeTxt>No</EdgeTxt>
        {t('UnitVector')}
        <Handle type="target" position={Position.Left} style={targetHandleStyle} id="Pm-UnitVector" onConnect={onConnect} />
      </InnerBox>
  );
};

export default memo(UnitVector);
