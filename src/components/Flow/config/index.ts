import { ArrowHeadType } from "react-flow-renderer"

const fixedNodes = [
  {
    id: 'Patient',
    type: 'Patient',
    position: { x: 14, y: 121 },
  },
  {
    id: 'Q1',
    type: 'Q1',
    position: { x: 124, y: 131 },
  },
  {
    id: 'PFMT',
    type: 'PFMT',
    position: { x: 230, y: 14 },
  },
  {
    id: 'Q2',
    type: 'Q2',
    position: { x: 419, y: 232 },
  },
  {
    id: 'Q3',
    type: 'Q3',
    position: { x: 410, y: 406 },
  },
  
  {
    id: 'FakeLine',
    type: 'FakeLine',
    position: { x: 556, y: 332 },
  },

  /** Q4 - Q7 **/
  {
    id: 'Q4',
    type: 'Q4',
    position: { x: 636 ,y: 84 },
  },
  {
    id: 'Q5',
    type: 'Q5',
    position: { x: 636, y: 210 },
  },
  {
    id: 'Q6',
    type: 'Q6',
    position: { x: 636, y: 338 },
  },
  {
    id: 'Q7',
    type: 'Q7',
    position: { x: 636, y: 466 },
  },
  {
    id: 'Q8',
    type: 'Q8',
    position: { x: 1479, y: 85 },
  },

  /** Pm boxes **/
  {
    id: 'Pm',
    type: 'Pm',
    position: { x: 969, y: 46 },
  },
  {
    id: 'PmPre',
    type: 'PmPre',
    position: { x: 985, y: 79 },
  },
  {
    id: 'PmUnitVector',
    type: 'PmUnitVector',
    position: { x: 986, y: 117 },
  },

  /**  Po boxes **/
  {
    id: 'Po',
    type: 'Po',
    position: { x: 1174, y: 45 },
  },
  {
    id: 'PoPre',
    type: 'PoPre',
    position: { x: 1188, y: 85 },
  },
  {
    id: 'PoUnitVector',
    type: 'PoUnitVector',
    position: { x: 1190, y: 122 },
  },

  /** Prior **/
  {
    id: 'Prior',
    type: 'Prior',
    position: { x: 902, y: 461 },
  }, 

  /** Formula **/
  {
    id: 'Formula',
    type: 'Formula',
    position: { x: 1456, y: 439 },
  }, 
  {
    id: 'Recommend',
    type: 'Recommend',
    position: { x: 1680, y: 451 },
  }, 


  /** Doctor **/
  {
    id: 'Doctor',
    type: 'Doctor',
    position: { x: 1691, y: 73 },
  },

  /** Medial Records **/
  {
    id: 'MedialRecords',
    type: 'MedialRecords',
    position: { x: 21, y: 740 },
  },

  /** R1, R2 **/
  {
    id: 'R1',
    type: 'R1',
    position: { x: 253, y: 751 },
  },
  {
    id: 'R2',
    type: 'R2',
    position: { x: 254, y: 1081 },
  },

  /** Graphs **/
  {
    id: 'Graph1',
    type: 'Graph1',
    position: { x: 435, y: 659 },
  },
  {
    id: 'Graph2',
    type: 'Graph2',
    position: { x: 483, y: 923 },
  },
  {
    id: 'Graph3',
    type: 'Graph3',
    position: { x: 476, y: 1032 },
  },
  {
    id: 'Graph4',
    type: 'Graph4',
    position: { x: 481, y: 1144 },
  },

  /** Px **/
  {
    id: 'Px',
    type: 'Px',
    position: { x: 1400, y: 749 },
  },
  {
    id: 'Pe',
    type: 'Pe',
    position: { x: 1461, y: 1085 },
  },
  {
    id: 'Pd',
    type: 'Pd',
    position: { x: 1549, y: 749 },
  },
  {
    id: 'SafeRelated',
    type: 'SafeRelated',
    position: { x: 1692, y: 716 },
  }
]

export interface EdgeConfig {
  ePatient_Q1?: boolean
  eQ1_PMFT?: boolean
  eQ1_Q2?: boolean
  eQ2_Q3?: boolean
  eQ2_FakeLine?: boolean
  eQ3_FakeLine?: boolean
}

const defaultEdgeConfig = {
  ePatient_Q1: false,
  eQ1_PMFT: false,
  eQ1_Q2: false,
  eQ2_Q3: false,
  eQ2_FakeLine: false,
  eQ3_FakeLine: false
}

const getEdges = (eConfig: EdgeConfig = defaultEdgeConfig) => ([
  /** Edges **/
  { id: 'ePatient-Q1', source: 'Patient', target: 'Q1', 
    arrowHeadType: ArrowHeadType.Arrow, style: eConfig.ePatient_Q1 ? { stroke: "red" } : {} },

  { id: 'eQ1-PMFT', source: 'Q1', sourceHandle: 'Q1-Source-R', target: 'PFMT', type: 'smoothstep',
    style: eConfig.eQ1_PMFT ? { stroke: "red" } : {}
  },

  { id: 'eQ1-Q2', source: 'Q1', sourceHandle: 'Q1-Source-R', target: 'Q2',targetHandle: 'Q2-Target-L', type: 'smoothstep', label: 'No',
    style: eConfig.eQ1_Q2 ? { stroke: "red" } : {}
  },

  { id: 'eQ2-Q3', source: 'Q2', sourceHandle: 'Q2-Source-B', target: 'Q3',targetHandle: 'Q3-Target-T', type: 'smoothstep', label: 'Yes',
    style: eConfig.eQ2_Q3 ? { stroke: "red" } : {}
  },

  { id: 'eQ2-FakeLine', source: 'Q2', sourceHandle: 'Q2-Source-R', target: 'FakeLine', type: 'smoothstep', label: 'No',
    style: eConfig.eQ2_FakeLine ? { stroke: "red" } : {} 
  },

  { id: 'eQ3-FakeLine', source: 'Q3', sourceHandle: 'Q3-Source-R', target: 'FakeLine', type: 'smoothstep', label: 'No',
    style: eConfig.eQ3_FakeLine ? { stroke: "red" } : {} 
  },

  { id: 'eFakeLine-Q4', source: 'FakeLine', target: 'Q4', targetHandle: 'Q4-Target-L', type: 'smoothstep'},
  { id: 'eFakeLine-Q5', source: 'FakeLine', target: 'Q5', targetHandle: 'Q5-Target-L', type: 'smoothstep'},
  { id: 'eFakeLine-Q6', source: 'FakeLine', target: 'Q6', targetHandle: 'Q6-Target-L', type: 'smoothstep'},
  { id: 'eFakeLine-Q7', source: 'FakeLine', target: 'Q7', targetHandle: 'Q7-Target-L', type: 'smoothstep'},

  { id: 'eQ4-PmPre', source: 'Q4', target: 'PmPre', type: 'smoothstep'},
  { id: 'eQ4-PmUnitVector', source: 'Q4', target: 'PmUnitVector', type: 'smoothstep' },

  { id: 'eQ5-Prior', source: 'Q5', target: 'Prior', type: 'smoothstep' },
  { id: 'eQ6-Prior', source: 'Q6', target: 'Prior', type: 'smoothstep' },
  { id: 'eQ7-Prior', source: 'Q7', target: 'Prior', type: 'smoothstep' },

  { id: 'eQ8-PoPre', source: 'Q8', target: 'PoPre', type: 'smoothstep'},
  { id: 'eQ8-PoUnitVector', source: 'Q8', target: 'PoUnitVector', type: 'smoothstep' },


  { id: 'ePm-Formula', source: 'Pm', target: 'Formula', targetHandle: 'Formula-Target-T', type: 'smoothstep' },
  { id: 'ePo-Formula', source: 'Po', target: 'Formula',  targetHandle: 'Formula-Target-T', type: 'smoothstep' },
  { id: 'ePrior-Formula', source: 'Prior', target: 'Formula', targetHandle: 'Formula-Target-L', type: 'smoothstep' },
  { id: 'eDoctor-Q8', source: 'Doctor', target: 'Q8', type: 'smoothstep' },

  { id: 'eMedial-R1', source: 'MedialRecords', target: 'R1', type: 'straight' },
  { id: 'eMedial-R2', source: 'MedialRecords', target: 'R2', type: 'smoothstep' },

  { id: 'eR1-Graph1', source: 'R1', target: 'Graph1', type: 'straight' },

  { id: 'eGraph1-Px', source: 'Graph1', target: 'Px', type: 'straight' },
  
  { id: 'eR2-Graph2', source: 'R2', target: 'Graph2', type: 'smoothstep' },
  { id: 'eR2-Graph3', source: 'R2', target: 'Graph3', type: 'smoothstep' },
  { id: 'eR2-Graph4', source: 'R2', target: 'Graph4', type: 'smoothstep' },
  
  { id: 'eGraph2-Pe', source: 'Graph2', target: 'Pe', type: 'smoothstep' },
  { id: 'eGraph3-Pe', source: 'Graph3', target: 'Pe', type: 'smoothstep' },
  { id: 'eGraph4-Pe', source: 'Graph4', target: 'Pe', type: 'smoothstep' },
  
  
  { id: 'ePx-Formula', source: 'Px', target: 'Formula', targetHandle: 'Formula-Target-B', type: 'smoothstep' },
  { id: 'ePe-Formula', source: 'Pe', target: 'Formula', targetHandle: 'Formula-Target-B', type: 'straight' },

  { id: 'ePd-Formula', source: 'Pd', target: 'Formula', targetHandle: 'Formula-Target-B', type: 'smoothstep' },
  { id: 'eFormula-Recommend', source: 'Formula', target: 'Recommend', type: 'straight' },
  { id: 'eSafeRelated-Pd', source: 'SafeRelated', target: 'Pd', type: 'straight' },
  ]
)


export { fixedNodes, getEdges }
