import nodeTypes from "./nodeTypes"
import React, { useState, useEffect, MouseEvent } from 'react';
import SideBar from "./SideBar";
import styledEmotion from '@emotion/styled';
import Drawer from "@/components/Dialog"
import Button from '@mui/material/Button';
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
import { useDrawerCtx } from "@/context/DrawerCtx";

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
  const {open, setDrawerOpen} = useDrawerCtx()
  const onConnect = (params: Connection | Edge) =>
    setElements((els) => addEdge({ ...params, animated: true}, els));

  const setNewEdges = (edgeConfig: EdgeConfig) => {
    setElements([...fixedNodes, ...getEdges(edgeConfig)]); 
  }

  useEffect(() => {
    if (formVals.isInit) {
      document.querySelector('body').classList.remove('form-submitted')
      if (isDefaultEdges) return;
      setElements(defaultElements)
      setIsDefaultEdges(true)
    } else {
      document.querySelector('body').classList.add('form-submitted')
      const Q2AndQ3No = formVals.Q2 == 0 && formVals.Q3 == 0 
      const eConfig: EdgeConfig = {
        ePatient_Q1: true,
        eQ1_PMFT: formVals.Q1 == 0,
        eQ1_Q2: formVals.Q1 == 1,
        eQ2_Q3: formVals.Q2 == 1,
        eQ3_Q2: formVals.Q3 == 1,
        eQ2_FakeLine: formVals.Q2 == 0,
        eQ3_FakeLine: formVals.Q3 == 0,
        eFakeLine_Q4: Q2AndQ3No,
        eFakeLine_Q5: Q2AndQ3No,
        eFakeLine_Q6: Q2AndQ3No,
        eFakeLine_Q7: Q2AndQ3No,
        eQ4_PmPre: formVals.Q4 == 1,
        eQ4_PmUnitVector: formVals.Q4 == 0,
        eQ5_Prior: Q2AndQ3No,
        eQ6_Prior: Q2AndQ3No,
        eQ7_Prior: Q2AndQ3No,
        eQ8_PoPre: formVals.Q12 == 1,
        eQ8_PoUnitVector: formVals.Q12 == 0, 
        ePm_Formula: true,
        ePo_Formula: true,
        ePrior_Formula: true,
        eDoctor_Q8: true,
        isInit: formVals.isInit
      }
      setNewEdges(eConfig)
      setIsDefaultEdges(false)
    }
  }, [formVals])

  return (
    <ReactFlowProvider>
    <Drawer />
    <div style={{height: '100vh', marginLeft: open ? 250 : 0}} >
    <ReactFlow
      elements={elements}
      onElementClick={onElementClick}
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
      nodesDraggable={false}
    >

      {/* <Controls /> */}
      {/* <SideBar /> */}
    </ReactFlow>
    </div>
    </ReactFlowProvider>
  );
};

export default Flow;


