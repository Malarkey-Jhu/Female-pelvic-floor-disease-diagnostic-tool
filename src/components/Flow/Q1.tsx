import styled from '@emotion/styled';
import React, { memo, FC, CSSProperties } from 'react';
import { Handle, Position, NodeProps, Connection, Edge } from 'react-flow-renderer';
import { useTranslation } from 'react-i18next';
import { DiamondBox } from '../Shapes';

const targetHandleStyle: CSSProperties = { background: 'transparent', border: 'none' };
const sourceHandleStyleA: CSSProperties = { ...targetHandleStyle, top: 0 };
const sourceHandleStyleB: CSSProperties = { ...targetHandleStyle, bottom: 10};

const onConnect = (params: Connection | Edge) => console.log('handle onConnect', params);

const E1 = styled.span`
  position: absolute;
  right: -60px;
  top: 0px;
`
const E2 = styled.span`
  position: absolute;
  right: -110px;
  bottom: -50%;
`

const Q1: FC<NodeProps> = ({ data, isConnectable }) => {
  const { t } = useTranslation();
  return (
    <DiamondBox>
      <Handle type="target" position={Position.Left} style={targetHandleStyle} onConnect={onConnect} />
      <div>
        <span className='redBold'>Q1.</span> 
        
        <div style={{width: '133px', height: '44px'}} dangerouslySetInnerHTML={{__html: t('Q1')}} />
        {/* Vaginal 
        <br />
        bulge symptoms? */}
      </div>

      <E1>Severe</E1>
      <E2>Yes</E2>
      <Handle type="source" position={Position.Right} id="Q1-Source-R" style={sourceHandleStyleB} isConnectable={isConnectable} />
    </DiamondBox>
  );
};

export default memo(Q1);
