import styled from '@emotion/styled';
import React, { memo, FC, CSSProperties } from 'react';

import { Handle, Position, NodeProps, Connection, Edge } from 'react-flow-renderer';
import { useTranslation } from 'react-i18next';

const sourceHandleStyle: CSSProperties = { background: 'transparent', };

const Box = styled.div`
  background: #FFE6CC;
  border: solid 1px #D79B00;
  margin: 5px;
  width: 90px;
  height: 44px;
  padding: 20px;
  display: flex;
  justify-content: center;
  align-items: center;
  text-align: center;
`

const onConnect = (params: Connection | Edge) => console.log('handle onConnect', params);

const MedialRecords: FC<NodeProps> = ({ data, isConnectable }) => {
  const {t} = useTranslation();
  return (
    <Box>
      {t('MedicalRecords')}
      <Handle type="source" position={Position.Right} style={sourceHandleStyle} isConnectable={isConnectable} />
    </Box>
  );
};

export default memo(MedialRecords);
