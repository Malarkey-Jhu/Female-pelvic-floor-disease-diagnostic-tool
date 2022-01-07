import * as React from 'react'
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import { useFormValCtx } from '@/context/FormValCtx';
import { getOutput } from '@/utils/outputFn';
import { FormVals } from '../Form';

interface Row<T> {
  Procedure: string
  Prior: T
  Operability:T 
  Effectiveness: T 
  Satety:T 
  Economy:T 
  Recommendation: T 
}

function createData<T>(Procedure, Prior, Operability, Effectiveness, Satety, Economy, Recommendation): Row<T> {
  return { Procedure, Prior, Operability, Effectiveness, Satety, Economy, Recommendation  };
}

 // rersult 中術式的順序對應excel
  //  0 .   1 .   2 .  3 .  4 .    5 . 
  // [ATVM, LSC, SLFF, ULS, PVTM, LEFORT]
function creatRows(formVals: FormVals): Row<string>[] {
  const output = getOutput(formVals);
  console.log(output)
  const excelIndex = {
    ATVM: 0,
    LSC : 1,
    SLFF: 2,
    ULS: 3,
    PVTM: 4,
    LEFORT: 5
  }

  const toFixVal = (a: Row<number>) => {

    const res: Row<string> = {
      Procedure: '',
      Prior: undefined,
      Operability: undefined,
      Effectiveness: undefined,
      Satety: undefined,
      Economy: undefined,
      Recommendation: undefined
    }

    Object.keys(a).forEach(k => {
      if (typeof a[k] == 'number') {
        res[k] = a[k].toFixed(2)
      } else {
        res[k] = a[k]
      }
    })

    return res as Row<string>
  }

  const rows: Row<number>[] = []

  Object.entries(excelIndex).forEach(([key, idx]) => {
    rows.push(createData<number>(key, output.Prior_result[idx], output.Operability_result[idx], output.CharacteristicEffectiveness_result[idx], output.Safety_result[idx], output.Economy_result[idx],output.Recommend_Result[idx]))
  })

  rows.sort((a, b) => b.Recommendation - a.Recommendation)

  return rows.map(r => toFixVal(r))
}

export default function RecommendCard() {

  const { formVals } = useFormValCtx()
  const rows = creatRows(formVals)

  return (
    <div>
        <p>
          阴道前壁膨出II度，子宫/阴道穹窿脱垂III度，阴道后壁膨出II度
          不在意花费，无性生活，要求保留阴道，无网片顾虑
          根据您的病情与意愿，为您推荐手术方式及排序如下：
        </p>
        <TableContainer component={Paper}>
        <Table sx={{ minWidth: 650 }} aria-label="simple table">
          <TableHead>
            <TableRow>
              <TableCell>排序</TableCell>
              <TableCell align="right">术式</TableCell>
              <TableCell align="right">意愿</TableCell>
              <TableCell align="right">手术难度</TableCell>
              <TableCell align="right">有效性</TableCell>
              <TableCell align="right">安全性</TableCell>
              <TableCell align="right">花费</TableCell>
              <TableCell align="right">推荐度</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {rows.map((row, idx) => (
              <TableRow
                key={row.Procedure}
                sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
              >
                <TableCell component="th" scope="row">
                  {idx}
                </TableCell>
                <TableCell align="right">{row.Procedure}</TableCell>
                <TableCell align="right">{row.Prior}</TableCell>
                <TableCell align="right">{row.Operability}</TableCell>
                <TableCell align="right">{row.Effectiveness}</TableCell>
                <TableCell align="right">{row.Satety}</TableCell>
                <TableCell align="right">{row.Economy}</TableCell>
                <TableCell align="right">{row.Recommendation}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </div>
  );
}