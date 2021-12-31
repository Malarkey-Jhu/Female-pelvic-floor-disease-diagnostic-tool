import React, { memo, FC, CSSProperties } from 'react';

import { Handle, Position, NodeProps, Connection, Edge } from 'react-flow-renderer';
import { DiamondBox } from '../Shapes';

const targetHandleStyle: CSSProperties = { opacity: 0 };
const sourceHandleStyleA: CSSProperties = { ...targetHandleStyle, left: -10 };
const sourceHandleStyleB: CSSProperties = { ...targetHandleStyle, right: -10 };
const sourceHandleStyleC: CSSProperties = { ...targetHandleStyle, bottom: -28};

const onConnect = (params: Connection | Edge) => console.log('handle onConnect', params);

const Q2: FC<NodeProps> = ({ data, isConnectable }) => {
  return (
    <DiamondBox>
      <Handle type="target" id="Q2-Target-L" position={Position.Left} style={sourceHandleStyleA} onConnect={onConnect} />
      <div>
        Q2. Pessary
      </div>
      <Handle type="source" position={Position.Right} id="Q2-Source-R" style={sourceHandleStyleB} isConnectable={isConnectable} />
      <Handle type="source" position={Position.Bottom} id="Q2-Source-B" style={sourceHandleStyleC} isConnectable={isConnectable} />
    </DiamondBox>
  );
};

export default memo(Q2);
