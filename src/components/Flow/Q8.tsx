import React, { memo, FC, CSSProperties } from 'react';

import { Handle, Position, NodeProps, Connection, Edge } from 'react-flow-renderer';
import { useTranslation } from 'react-i18next';
import { DiamondBox } from '../Shapes';

const targetHandleStyle: CSSProperties = { background: 'transparent' };
const sourceHandleStyleA: CSSProperties = { ...targetHandleStyle, top: 0 };
const sourceHandleStyleB: CSSProperties = { ...targetHandleStyle, bottom: 10};

const onConnect = (params: Connection | Edge) => console.log('handle onConnect', params);

const Q8: FC<NodeProps> = ({ data, isConnectable }) => {
  const { t } = useTranslation();
  return (
    <DiamondBox>
      <Handle type="target" id="Q8-Target-R" position={Position.Right} style={targetHandleStyle} onConnect={onConnect} />
      <div>
      <span className='redBold'>Q8.</span>
      <div dangerouslySetInnerHTML={{__html: t('Q12')}} />
      </div>
      <Handle type="source"  position={Position.Left} style={targetHandleStyle} onConnect={onConnect} />
    </DiamondBox>
  );
};

export default memo(Q8);
