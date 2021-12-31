import styled from '@emotion/styled';
import React, { memo, FC, CSSProperties } from 'react';

import { Handle, Position, NodeProps, Connection, Edge } from 'react-flow-renderer';

const sourceHandleStyle: CSSProperties = { background: 'transparent', };

const onConnect = (params: Connection | Edge) => console.log('handle onConnect', params);

const Patient: FC<NodeProps> = ({ data, isConnectable }) => {
  return (
    <div>
      <Handle type="source" position={Position.Right} style={sourceHandleStyle} isConnectable={isConnectable} />
      <img width="80px" height="80px" src={"data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHZlcnNpb249IjEiIHZpZXdCb3g9IjAgMCA0OCA0OCIgZW5hYmxlLWJhY2tncm91bmQ9Im5ldyAwIDAgNDggNDgiPiYjeGE7ICAgIDxyZWN0IHg9IjE2IiB5PSIxNSIgZmlsbD0iI0JGMzYwQyIgd2lkdGg9IjE2IiBoZWlnaHQ9IjE4Ii8+JiN4YTsgICAgPHBhdGggZmlsbD0iIzc4OTA5QyIgZD0iTTQwLDQ0SDhjMC0xMSwxMS0xMywxMS0xM2gxMEMyOSwzMSw0MCwzMyw0MCw0NHoiLz4mI3hhOyAgICA8cGF0aCBmaWxsPSIjRkY5ODAwIiBkPSJNMjQsMzdjLTIuMiwwLTUtNi01LTZ2LTZoMTB2NkMyOSwzMSwyNi4yLDM3LDI0LDM3eiIvPiYjeGE7ICAgIDxwYXRoIGZpbGw9IiNGRkI3NEQiIGQ9Ik0zMywxNGMwLTcuNi0xOC01LTE4LDBjMCwxLjEsMCw1LjksMCw3YzAsNSw0LDksOSw5czktNCw5LTlDMzMsMTkuOSwzMywxNS4xLDMzLDE0eiIvPiYjeGE7ICAgIDxwYXRoIGZpbGw9IiNGRjU3MjIiIGQ9Ik0yNCw0QzE3LjksNCw5LDcuNCw5LDI3LjNsNyw0LjdWMTlsMTItN2w0LDV2MTVsNy02YzAtNC0wLjctMjAtMTEtMjBsLTEtMkgyNHoiLz4mI3hhOyAgICA8cGF0aCBmaWxsPSIjRkZCNzREIiBkPSJNMjQsMzhjLTQuNCwwLTUtNy01LTdzMi41LDQsNSw0czUtNCw1LTRTMjguNCwzOCwyNCwzOHoiLz4mI3hhOyAgICA8Y2lyY2xlIGZpbGw9IiM3ODQ3MTkiIGN4PSIyOCIgY3k9IjIxIiByPSIxIi8+JiN4YTsgICAgPGNpcmNsZSBmaWxsPSIjNzg0NzE5IiBjeD0iMjAiIGN5PSIyMSIgcj0iMSIvPiYjeGE7PC9zdmc+"} />
    </div>
  );
};

export default memo(Patient);
