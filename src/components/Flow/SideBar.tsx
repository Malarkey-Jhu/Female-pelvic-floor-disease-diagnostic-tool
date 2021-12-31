import React from 'react';
import { useStoreState, useStoreActions } from 'react-flow-renderer';

export default () => {
  const transform = useStoreState((store) => store.transform);
  const nodes = useStoreState((store) => store.nodes);
  return (
    <aside>
      <div className="title">Zoom & pan transform</div>
      <div className="transform">
        [{transform[0].toFixed(2)}, {transform[1].toFixed(2)}, {transform[2].toFixed(2)}]
      </div>
      <div className="title">Nodes</div>
      {nodes.map((node) => (
        <div key={node.id}>
          Node {node.id} - x: {node.__rf.position.x.toFixed(2)}, y: {node.__rf.position.y.toFixed(2)}
        </div>
      ))}
    </aside>
  );
};