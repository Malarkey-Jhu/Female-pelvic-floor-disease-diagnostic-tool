import styled from '@emotion/styled';
import React, { memo, FC, CSSProperties } from 'react';

import { Handle, Position, NodeProps, Connection, Edge } from 'react-flow-renderer';
import { useTranslation } from 'react-i18next';

const targetHandleStyle: CSSProperties = { background: 'transparent', };
const sourceHandleStyleA: CSSProperties = { ...targetHandleStyle, top: 0 };
const sourceHandleStyleB: CSSProperties = { ...targetHandleStyle, bottom: 10};

const Box = styled.div`
  background: #FFE6CC;
  border: solid 1px #D79B00;
  margin: 5px;
  width: 90px;
  padding: 20px;
  text-align: center;

  .redBold {
    color: #CC0000;
    font-weight: 500;
  }
`

const onConnect = (params: Connection | Edge) => console.log('handle onConnect', params);

const R1: FC<NodeProps> = ({ data, isConnectable }) => {

  const {t} = useTranslation();
  return (
    <Box>
      <Handle type="target" position={Position.Left} style={targetHandleStyle} onConnect={onConnect} />
      <div style={{whiteSpace: 'nowrap'}}>
        <span className='redBold'>R1.</span><span style={{whiteSpace: 'nowrap'}}>{t('R1')}</span>
      </div>
      <Handle type="source" position={Position.Right} style={sourceHandleStyleB} isConnectable={isConnectable} />
    </Box>
  );
};

export default memo(R1);
