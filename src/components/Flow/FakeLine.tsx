import React, { memo, FC, CSSProperties } from 'react';
import styled from "@emotion/styled"
import { Handle, Position, NodeProps, Connection, Edge } from 'react-flow-renderer';
import { useFormValCtx } from '@/context/FormValCtx';
import { useTranslation } from 'react-i18next';

const targetHandleStyle: CSSProperties = { opacity: 0, borderRadius: 0};
const sourceHandleStyleB: CSSProperties = { ...targetHandleStyle };

const onConnect = (params: Connection | Edge) => console.log('handle onConnect', params);

const Box = styled.div<{highLight: boolean}>`
  background:  ${props => props.highLight ? 'red' : '#000'};
  border-bottom: solid 0.6px ${props => props.highLight ? 'red' : '#000'};
  width: 10px;
  text-align: center;
  position: relative;
`

const FakeLine: FC<NodeProps> = ({ data, isConnectable }) => {
  const { formVals } = useFormValCtx()
  const { t } = useTranslation();
  const shouldHighLight = !formVals.isInit && !formVals.earlyOver
  return (
    <>
      <Handle type="target" position={Position.Left} style={{...targetHandleStyle}} onConnect={onConnect} />
    {t('No')}
    <Handle type="source" position={Position.Right} style={{...sourceHandleStyleB}} isConnectable={isConnectable} />
    </>
  );
};

export default memo(FakeLine);
