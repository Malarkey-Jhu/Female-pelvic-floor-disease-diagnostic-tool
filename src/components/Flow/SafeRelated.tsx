import styled from '@emotion/styled';
import React, { memo, FC, CSSProperties } from 'react';

import { Handle, Position, NodeProps, Connection, Edge } from 'react-flow-renderer';
import { useTranslation } from 'react-i18next';

const sourceHandleStyle: CSSProperties = { background: 'transparent', };

const Box = styled.div`
  background: #F5F5F5;
  border: solid 1px #666;
  margin: 5px;
  width: 115px;
  height: 66px;
  padding: 20px;
  text-align: center;
  display: flex;
  justify-content: center;
  align-items: center;
`

const onConnect = (params: Connection | Edge) => console.log('handle onConnect', params);

const SafeReview: FC<NodeProps> = ({ data, isConnectable }) => {
  const { t } = useTranslation()
  return (
    <Box>
      <Handle type="source" position={Position.Left} style={sourceHandleStyle} isConnectable={isConnectable} />
      <div dangerouslySetInnerHTML={{__html: t('SafetyRelated')}} />
    </Box>
  );
};

export default memo(SafeReview);
