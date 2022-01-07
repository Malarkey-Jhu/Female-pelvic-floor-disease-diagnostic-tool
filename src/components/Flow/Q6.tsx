import React, { memo, FC, CSSProperties } from 'react';

import { Handle, Position, NodeProps, Connection, Edge } from 'react-flow-renderer';
import { useTranslation } from 'react-i18next';
import { DiamondBox } from '../Shapes';

const targetHandleStyle: CSSProperties = { background: 'transparent', border: 'none', left: -15 };
const sourceHandleStyle: CSSProperties = { background: 'transparent', right: -15, border: 'none' };

const onConnect = (params: Connection | Edge) => console.log('handle onConnect', params);

const Q6: FC<NodeProps> = ({ data, isConnectable }) => {
  const { t } = useTranslation();
  return (
    <DiamondBox>
      <Handle type="target" id="Q6-Target-L" position={Position.Left} style={targetHandleStyle} onConnect={onConnect} />
      <div className='txt'>
      <span className='redBold'>Q6.</span>
      <div dangerouslySetInnerHTML={{__html: t('Q6')}} />
      </div>
      <Handle type="source"  position={Position.Right} style={sourceHandleStyle} onConnect={onConnect} />
    </DiamondBox>
  );
};

export default memo(Q6);
