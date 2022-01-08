import styled from '@emotion/styled';
import React, { memo, FC, CSSProperties } from 'react';

import { Handle, Position, NodeProps, Connection, Edge } from 'react-flow-renderer';
import { useTranslation } from 'react-i18next';
import { DiamondBox } from '../Shapes';

const targetHandleStyle: CSSProperties = { opacity: 0 };
const sourceHandleStyleA: CSSProperties = { ...targetHandleStyle, left: -18 };
const sourceHandleStyleB: CSSProperties = { ...targetHandleStyle, right: -24 };
const sourceHandleStyleC: CSSProperties = { ...targetHandleStyle, bottom: -20};

const onConnect = (params: Connection | Edge) => console.log('handle onConnect', params);

const E1 = styled.span`
  position: absolute;
  left: 40%;
  transform: translateX(-20px);
  bottom: -70px;
`
const E2 = styled.span`
  position: absolute;
  right: -55px;
  bottom: -20px;
`

const E3 = styled.span`
  position: absolute;
  left: -75px;
  bottom: -70px;
`
const Q2: FC<NodeProps> = ({ data, isConnectable }) => {
  const { t } = useTranslation();
  return (
    <DiamondBox>
      <Handle type="target" id="Q2-Target-L" position={Position.Left} style={sourceHandleStyleA} onConnect={onConnect} />
      <div className='txt'>
        <span style={{whiteSpace: 'nowrap'}}>
          <span className='redBold'>Q2. </span>
          <span>{t('Q2')}?</span>
        </span> 
       
      </div>
      <E1>Yes</E1>
      <E3>Yes</E3>
      <E2>No</E2>
      <Handle type="source" position={Position.Right} id="Q2-Source-R" style={sourceHandleStyleB} isConnectable={isConnectable} />
      <Handle type="source" position={Position.Bottom} id="Q2-Source-B" style={sourceHandleStyleC} isConnectable={isConnectable} />
    </DiamondBox>
  );
};

export default memo(Q2);
