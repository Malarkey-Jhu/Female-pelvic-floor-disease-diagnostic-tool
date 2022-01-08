import React, { memo, FC, CSSProperties } from 'react';
import styled from "@emotion/styled"
import { Handle, Position, NodeProps, Connection, Edge } from 'react-flow-renderer';
import { useTranslation } from 'react-i18next';

const targetHandleStyle: CSSProperties = { background: 'transparent', };
const sourceHandleStyleA: CSSProperties = { ...targetHandleStyle };
const sourceHandleStyleB: CSSProperties = { ...targetHandleStyle };

const onConnect = (params: Connection | Edge) => console.log('handle onConnect', params);

const Box = styled.div`
  background: #F8CECC;
  border: solid 1px #B85450;
  margin: 5px;
  width: 115px;
  height: 44px;
  padding: 20px;
  text-align: center;
  display: flex;
  justify-content: center;
  align-items: center;
`

const Recomend: FC<NodeProps> = ({ data, isConnectable }) => {
  const { t } = useTranslation()
  return (
    <Box>
      <Handle type="target" position={Position.Left} style={targetHandleStyle} onConnect={onConnect} />
      <div dangerouslySetInnerHTML={{__html: t('SurgeryRecommendation')}} />
    </Box>
  );
};

export default memo(Recomend);
