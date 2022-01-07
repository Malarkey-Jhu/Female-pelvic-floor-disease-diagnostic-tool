import nodeTypes from "./nodeTypes"
import React, { useState, useEffect, MouseEvent } from 'react';
import SideBar from "./SideBar";
import Dialog from "@/components/Dialog"
import "./style.css"

import ReactFlow, {
  ReactFlowProvider,
  removeElements,
  addEdge,
  Background,
  Controls,
  Node,
  FlowElement,
  OnLoadParams,
  Elements,
  Position,
  Connection,
  Edge,
} from 'react-flow-renderer';
import { EdgeConfig, fixedNodes, getEdges } from "./config"
import CustomEdge from "./CustomEdge";
import { useFormValCtx } from "@/context/FormValCtx";


const edgeTypes = {
  custom: CustomEdge,
};

const onLoad = (reactFlowInstance: OnLoadParams) => console.log('flow loaded:', reactFlowInstance);
const onNodeDragStop = (_: MouseEvent, node: Node) => console.log('drag stop', node);
const onElementClick = (_: MouseEvent, element: FlowElement) => console.log('click', element);

const connectionLineStyle = { stroke: 'none' };

const defaultElements = [...fixedNodes, ...getEdges()];

const Flow = () => {
  const { formVals } = useFormValCtx()
  const [elements, setElements] = useState<Elements>(defaultElements);
  const [isDefaultEdges, setIsDefaultEdges] = useState(true);

  const onElementsRemove = (elementsToRemove: Elements) => setElements((els) => removeElements(elementsToRemove, els));
  const onConnect = (params: Connection | Edge) =>
    setElements((els) => addEdge({ ...params, animated: true}, els));

  const setNewEdges = (edgeConfig: EdgeConfig) => {
    setElements([...fixedNodes, ...getEdges(edgeConfig)]); 
  }

  useEffect(() => {
    if (formVals.isInit) {
      if (isDefaultEdges) return;
      setElements(defaultElements)
      setIsDefaultEdges(true)
    } else {
      const eConfig: EdgeConfig = {
        ePatient_Q1: true,
        eQ1_PMFT: formVals.Q1 == 1,
        eQ1_Q2: formVals.Q1 == 0,
        eQ2_FakeLine: formVals.Q2 == 0,
        eQ2_Q3: formVals.Q2 == 1,
      }
      setNewEdges(eConfig)
      setIsDefaultEdges(false)
    }
  }, [formVals])

  return (
    
    <ReactFlowProvider>
    <ReactFlow
      elements={elements}
      onElementClick={onElementClick}
      onElementsRemove={onElementsRemove}
      onConnect={onConnect}
      onNodeDragStop={onNodeDragStop}
      onLoad={onLoad}
      edgeTypes={edgeTypes}
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

export default Flow;


