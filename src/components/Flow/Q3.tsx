import styled from '@emotion/styled';
import React, { memo, FC, CSSProperties } from 'react';

import { Handle, Position, NodeProps, Connection, Edge } from 'react-flow-renderer';
import { useTranslation } from 'react-i18next';
import { DiamondBox } from '../Shapes';

const targetHandleStyle: CSSProperties = { background: 'transparent', border: 'none' };
const sourceHandleStyleA: CSSProperties = { ...targetHandleStyle, top: -15 };
const sourceHandleStyleB: CSSProperties = { ...targetHandleStyle, right: -24};
const sourceHandleStyleC: CSSProperties = { ...targetHandleStyle, left: -24};

const E1 = styled.span`
  position: absolute;
  right: -55px;
  top: -20px;
`

const onConnect = (params: Connection | Edge) => console.log('handle onConnect', params);

const Q3: FC<NodeProps> = ({ data, isConnectable }) => {
  const { t } = useTranslation();
  return (
    <DiamondBox>
      <Handle type="target" id="Q3-Target-L" position={Position.Left} style={targetHandleStyle} onConnect={onConnect} />
      <div className='txt' style={{ whiteSpace: 'nowrap'}}>
      <span className='redBold'>Q3.</span> {t('Q3')}?
      </div>

      <E1>{t('No')}</E1>
      <Handle type="target" id="Q3-Target-T" position={Position.Top} style={sourceHandleStyleA} isConnectable={isConnectable} />
      <Handle type="source" id="Q3-Source-R" position={Position.Right} style={sourceHandleStyleB} isConnectable={isConnectable} />
      <Handle type="source" id="Q3-Source-L" position={Position.Left} style={sourceHandleStyleC} isConnectable={isConnectable} />
    </DiamondBox>
  );
};

export default memo(Q3);
