import React, { memo, FC, CSSProperties } from 'react';

import { Handle, Position, NodeProps, Connection, Edge } from 'react-flow-renderer';
import { DiamondBox } from '../Shapes';

const targetHandleStyle: CSSProperties = { background: 'transparent' };
const sourceHandleStyleA: CSSProperties = { ...targetHandleStyle, top: 0 };
const sourceHandleStyleB: CSSProperties = { ...targetHandleStyle, bottom: 10};

const onConnect = (params: Connection | Edge) => console.log('handle onConnect', params);

const Q3: FC<NodeProps> = ({ data, isConnectable }) => {
  return (
    <DiamondBox>
      <Handle type="target" id="Q3-Target-L" position={Position.Left} style={targetHandleStyle} onConnect={onConnect} />
      <div>
        Q3. Improved?
      </div>

      <Handle type="target" id="Q3-Target-T" position={Position.Top} style={sourceHandleStyleB} isConnectable={isConnectable} />
      <Handle type="source" id="Q3-Source-R" position={Position.Right} style={sourceHandleStyleB} isConnectable={isConnectable} />
    </DiamondBox>
  );
};

export default memo(Q3);
