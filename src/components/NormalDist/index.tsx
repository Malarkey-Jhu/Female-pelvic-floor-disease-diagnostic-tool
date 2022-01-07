import { forceDescriptives, getEchartOption } from '@/utils/normalDist';
import NM from '@/utils/NM';
import * as echarts from 'echarts';
import * as React from 'react'

interface Props {
  options?: any
}

const { newList } = forceDescriptives(64.11, 5.76, "AGE")
const nm = new NM(newList)
const defaultOptions = getEchartOption(nm)

const NormalDistGraph: React.FC<Props> = ({ options = defaultOptions }) => {
  const ref = React.useRef<HTMLDivElement>()
  
  React.useEffect(() => {
    let dom = ref.current
    let chart = echarts.getInstanceByDom(dom) || echarts.init(dom);
    chart.setOption(options, true)
  }, [options])

  return (
    <div style={{width: "inherit", height: "inherit"}}>
      <div ref={ref} style={{width: "100%", height: "100%"}}></div>
    </div>
  );
}
export default NormalDistGraph