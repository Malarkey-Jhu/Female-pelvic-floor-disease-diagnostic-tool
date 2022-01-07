import React from 'react';
import { getSmoothStepPath, getMarkerEnd } from 'react-flow-renderer';

export default function CustomEdge({
  id,
  sourceX = 0,
  sourceY,
  targetX = 0,
  targetY,
  sourcePosition,
  targetPosition,
  style = {},
  data,
  arrowHeadType,
  markerEndId,
}) {
  sourceX-=30;
  // const edgePath = getSmoothStepPath({ sourceX, sourceY, sourcePosition, targetX, targetY, targetPosition });
  // const markerEnd = getMarkerEnd(arrowHeadType, markerEndId);

  return (
    <>
      <path id={id} style={style} className="react-flow__edge-path" d={
        "M 395.000017,426.999965L 387.000004,426.99996512276783Q 384.000004359654,426.99996512276783 384.000004359654,421.99996512276783L 384.000004359654,258.00001307896207Q 384.000004359654,253.00001307896207 389.000004359654,253.00001307896207L 401.999991280692,253.00001307896207"
      } />
      {/* <text>
        <textPath href={`#${id}`} style={{ fontSize: '12px' }} startOffset="50%" textAnchor="middle">
          {data.text}
        </textPath>
      </text> */}
    </>
  );
}