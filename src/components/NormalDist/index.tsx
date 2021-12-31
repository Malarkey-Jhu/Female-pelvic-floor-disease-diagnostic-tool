import { forceDescriptives, NM } from '@/utils/normalDist';
import * as echarts from 'echarts';
import * as React from 'react'

interface Props {

}

const { newList } = forceDescriptives(64.11, 5.76)
const nm = new NM(newList)

nm.init();
let options = {
  // Echarts 图 -- 工具
  tooltip: {},
  // Echarts 图 -- 图例
  legend: {},
  xAxis: {
    type: 'value',
    name: '年齡',
    min: Math.ceil(nm.MIN)-1,
    max: Math.ceil(nm.MAX)+1,
  },
  // Echarts 图 -- y 坐标轴刻度
  yAxis: {
      // show: false,
      splitNumber: 1,
      min: 0,
      max: 0.09,
      type: 'value',
      // name: '概率',
      splitLine: {
          show: false
      },
      axisLine: {
          lineStyle: {
              color: 'black'
          }
      },
      axisLabel: {
          formatter: '{value}'
      }
  },
  // Echarts 图 -- y 轴数据
  series: [
  {
      // name: '正态分布', // y 轴名称
      type: 'line', // y 轴类型
      smooth: true, //true 为平滑曲线
      data: nm.normDistData, // y 轴数据 -- 正态分布
      symbol: 'none',
      markLine: {
        symbol: ['none'],
        label: { show: false },
        data: [
          { name: '平均', xAxis: nm.MEAN, label: { show: true } },
        ]
      },
  }]
}

const NormalDistGraph: React.FC<Props> = () => {
  const ref = React.useRef<HTMLDivElement>()
  
  React.useEffect(() => {
    let dom = ref.current
    let chart = echarts.init(dom)
    chart.setOption(options)
  }, [])

  return (
    <div style={{width: "inherit", height: "inherit"}}>
      <div ref={ref} style={{width: "100%", height: "100%"}}></div>
    </div>
  );
}
export default NormalDistGraph