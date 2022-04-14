import * as React from 'react'
import { useFormValCtx } from '@/context/FormValCtx';
import { getOutput } from '@/utils/outputFn';
import { FormVals } from '../Form';
import { TFunction, useTranslation } from 'react-i18next';


import { DataGrid, GridColDef, GridValueFormatterParams, GridValueGetterParams } from '@mui/x-data-grid';

interface Row {
  id: number
  Procedure: string
  Prior: number
  Operability:number 
  Effectiveness: number
  Safety: number
  Economy:number 
  Recommendation: number
}

function createRow(id, Procedure, Prior, Operability, Effectiveness, Safety, Economy, Recommendation): Row {
  return { id, Procedure, Prior, Operability, Effectiveness, Safety, Economy, Recommendation  };
}

 // rersult 中術式的順序對應excel
  //  0 .   1 .   2 .  3 .  4 .    5 . 
  // [ATVM, LSC, SLFF, ULS, PTVM, LEFORT]
function creatRows(formVals: FormVals, t: TFunction<"translation", undefined>): Row[] {
  const output = getOutput(formVals);
  const excelIndex = {
    ATVM: 0,
    LSC : 1,
    SLFF: 2,
    ULS: 3,
    PTVM: 4,
    LEFORT: 5
  }

  const rows: Row[] = []

  Object.entries(excelIndex).forEach(([key, idx]) => {
    rows.push(createRow(idx, t(key), output.Prior_result[idx], output.Operability_result[idx], output.CharacteristicEffectiveness_result[idx], output.Safety_result[idx], output.Economy_result[idx],output.Recommend_Result[idx]))
  })

  rows.sort((a, b) => b.Recommendation - a.Recommendation)

  return rows
}

const valueFormatter = (params:GridValueFormatterParams) => {
  return Math.round((params.value as number) * 100) + '%'
}

export default function DataTable() {

  const {t} = useTranslation()
  const { formVals } = useFormValCtx()
  const rows = creatRows(formVals, t)
  // console.log(rows, 'rows')
  const columns: GridColDef[] = [
    { field: 'Procedure', headerName: t('Procedure'), width: 200, sortable: false, renderCell: (row) => {
      return <div style={{
        whiteSpace: 'pre-wrap',
      }}>{row.value}</div>
    }, headerClassName: 'table-title'},
    { field: 'Recommendation', headerName: t('RecommendationProbability'), type: 'number', valueFormatter, cellClassName: 'recommend'},
    { field: 'Prior', headerName: t('Prior'),  type: 'number', valueFormatter},
    { field: 'Operability', headerName: t('Operability'),  type: 'number', valueFormatter },
    { field: 'Effectiveness', headerName: t('Effectiveness'), type: 'number', valueFormatter  },
    { field: 'Safety', headerName: t('Safety'), type: 'number', valueFormatter },
    { field: 'Economy', headerName: t('Economy'), type: 'number', valueFormatter },
  ];

  return (
    <div style={{ height: 450, minWidth: 800 }}>
      <DataGrid
        rows={rows}
        columns={columns}
        pageSize={6}
        hideFooterPagination
        components={{
          Footer: CustomFooter,
        }}
      />
    </div>
  );
}

function CustomFooter() {
  let {t} = useTranslation();
  return (
    <div style={{padding: 10}}>
      <div>{t('NoteSLFF')}</div>
      <div>{t('NoteULS')}</div>
    </div>
  )
}
