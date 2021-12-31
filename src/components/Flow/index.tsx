import nodeTypes from "./nodeTypes"
import React, { useState, useEffect, MouseEvent } from 'react';
import SideBar from "./SideBar";
import Dialog from "@/components/Dialog"

import "./style.css"

import ReactFlow, {
  ReactFlowProvider,
  isEdge,
  removeElements,
  addEdge,
  Background,
  Controls,
  Node,
  FlowElement,
  OnLoadParams,
  Elements,
  Position,
  SnapGrid,
  Connection,
  Edge,
  ArrowHeadType,
} from 'react-flow-renderer';
import { EdgeConfig, fixedNodes, getEdges } from "./config"


const onLoad = (reactFlowInstance: OnLoadParams) => console.log('flow loaded:', reactFlowInstance);
const onNodeDragStop = (_: MouseEvent, node: Node) => console.log('drag stop', node);
const onElementClick = (_: MouseEvent, element: FlowElement) => console.log('click', element);

const connectionLineStyle = { stroke: 'none' };

const CustomNodeFlow = () => {
  const [elements, setElements] = useState<Elements>(
    [...fixedNodes, ...getEdges()]
  );

  // useEffect(() => {
  //   setElements([...fixedNodes, ...getEdges()]);
  // }, []);

  const onElementsRemove = (elementsToRemove: Elements) => setElements((els) => removeElements(elementsToRemove, els));
  const onConnect = (params: Connection | Edge) =>
    setElements((els) => addEdge({ ...params, animated: true}, els));

  const setNewEdges = (edgeConfig: EdgeConfig) => {
    console.log(edgeConfig, '==')
    setElements([...fixedNodes, ...getEdges(edgeConfig)]); 
  }

  return (
    <ReactFlowProvider>
    <ReactFlow
      elements={elements}
      onElementClick={onElementClick}
      onElementsRemove={onElementsRemove}
      onConnect={onConnect}
      onNodeDragStop={onNodeDragStop}
      onLoad={onLoad}
      nodeTypes={nodeTypes}
      connectionLineStyle={connectionLineStyle}
      defaultZoom={0.7}
      zoomOnScroll={false}
      zoomOnPinch={false}
      preventScrolling={false}
      defaultPosition={[0,-11]}
      zoomOnDoubleClick={false}
      paneMoveable={false}
    >

      {/* <Controls /> */}
      {/* <SideBar /> */}
      <Dialog setNewEdges={setNewEdges}/>
    </ReactFlow>
    </ReactFlowProvider>
  );
};

export default CustomNodeFlow;