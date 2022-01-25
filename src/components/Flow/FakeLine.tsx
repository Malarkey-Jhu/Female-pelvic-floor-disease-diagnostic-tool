import React, { memo, FC, CSSProperties } from 'react';
import styled from "@emotion/styled"
import { Handle, Position, NodeProps, Connection, Edge } from 'react-flow-renderer';
import { useFormValCtx } from '@/context/FormValCtx';

const targetHandleStyle: CSSProperties = { opacity: 0 };
const sourceHandleStyleB: CSSProperties = { ...targetHandleStyle };

const onConnect = (params: Connection | Edge) => console.log('handle onConnect', params);

const Box = styled.div<{highLight: boolean}>`
  background:  ${props => props.highLight ? 'red' : '#000'};
  border-bottom: solid 0.5px ${props => props.highLight ? 'red' : '#000'};
  width: 50px;
  text-align: center;
`

const FakeLine: FC<NodeProps> = ({ data, isConnectable }) => {
  const { formVals } = useFormValCtx()
  const shouldHighLight = !formVals.isInit && !formVals.earlyOver
  return (
    <Box highLight={shouldHighLight}>
      <Handle type="target" position={Position.Left} style={targetHandleStyle} onConnect={onConnect} />
      <Handle type="source" position={Position.Right} style={sourceHandleStyleB} isConnectable={isConnectable} />
    </Box>
  );
};

export default memo(FakeLine);
