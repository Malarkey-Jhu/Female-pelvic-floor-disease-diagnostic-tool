import React, { memo, FC, CSSProperties } from 'react';

import { Handle, Position, NodeProps, Connection, Edge } from 'react-flow-renderer';
import { DiamondBox } from '../Shapes';

const targetHandleStyle: CSSProperties = { background: 'transparent' };
const sourceHandleStyleA: CSSProperties = { ...targetHandleStyle, top: 0 };
const sourceHandleStyleB: CSSProperties = { ...targetHandleStyle, bottom: 10};

const onConnect = (params: Connection | Edge) => console.log('handle onConnect', params);

const Q6: FC<NodeProps> = ({ data, isConnectable }) => {
  return (
    <DiamondBox>
      <Handle type="target" id="Q6-Target-L" position={Position.Left} style={targetHandleStyle} onConnect={onConnect} />
      <div>
        Q6. Vagina<br />reserve?
      </div>
      <Handle type="source"  position={Position.Right} style={targetHandleStyle} onConnect={onConnect} />
    </DiamondBox>
  );
};

export default memo(Q6);
