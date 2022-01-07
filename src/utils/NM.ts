import { descriptives } from "./normalDist"
import { TooltipComponentOption,  
} from 'echarts/components'
import { LineSeriesOption } from "echarts"
import { erf } from "mathjs"

export type ECOption = echarts.ComposeOption<TooltipComponentOption | LineSeriesOption>

export type ChartType = "AGE" | "BMI" | "ANTERIOR" | "CENTRAL" | "POSTERIOR" | "DEFAULT"

const ProbMinMax = {
  "DEFAULT": [0, .1],
  "AGE": [0, .1],
  "BMI": [0, .15],
  "ANTERIOR": [0, .4],
  "CENTRAL": [0, .3],
  "POSTERIOR": [0, .6],
}

interface cleanDataType {
  [x:string]: number;
}

export interface MarkLineData {
  name: string;
  xAxis: number;
}

class NM {

  private data: number[]
  private cleanData : cleanDataType
  private cleanDataX :string[]
  private cleanDataY :string[]
  private normDistList: string[]
  private min: number;
  private max: number;
  private sd: number
  private mean: number

  constructor(data: string[]) {
    this.data = data.map(t => parseFloat(t))
    const newDescriptives = descriptives(this.data)
    this.sd = newDescriptives.sd
    this.mean = newDescriptives.mean
    this.init();
  }

  private init() {
    this.cleanData = this.dataAfterClean();
    this.cleanDataX = this.dataAfterCleanX();
    this.cleanDataY = this.dataAfterCleanY();
    this.normDistList = this.normalDistribution();
    this.min = Math.min.apply(null, this.data);
    this.max = Math.max.apply(null, this.data);
  }

  get MEAN () {
    return this.mean;
  }

  get MIN() {
    return this.min;
  }

  get MAX() {
    return this.max;
  }

  get xData() {
    return this.cleanDataX;
  }

  get yData() {
    return this.cleanDataY;
  }

  get normDistData() {
    return this.normDistList;
  }

  // 求鐘型曲線面積cdf
  // https://stackoverflow.com/questions/5259421/cumulative-distribution-function-in-javascript/41638885#41638885
  private cdfNormal (x: number): number {
    return (1 - erf((this.mean - x ) / (Math.sqrt(2) * this.sd))) / 2
  }

  // 数据整理。原数据整理为：{数据值 : 数据频率}
  private dataAfterClean() {
    let res: cleanDataType = {}
    for (let i = 0; i < this.data.length; i++) {
        let key = this.data[i].toFixed(1)
        if (key !== "NaN" && parseFloat(key) === 0)
            key = "0.0" //这个判断用来处理保留小数位后 -0.0 和 0.0 判定为不同 key 的 bug
        if (res[key])
            res[key] += 1
        else
            res[key] = 1
    }
    return res
  }

  private dataAfterCleanX() {
    return Object.keys(this.cleanData).sort((a, b) => +a - +b).map(t => parseFloat(t)
        .toFixed(1)) // 保留 1 位小数
  }

  private dataAfterCleanY() {
    let r = []
    for (let i = 0; i < this.cleanDataX.length; i++) {
        r.push(this.cleanData[this.cleanDataX[i]].toString())
    }
    return r
  }

  private normalDistribution() {
    // 计算公式： `f(x) = (1 / (\sqrt {2\pi} \sigma)) e^(-(x-\mu)^2/(2\sigma^2))`
    // return (1 / Math.sqrt(2 * Math.PI) * a) * (Math.exp(-1 * ((x - u) * (x - u)) / (2 * a * a)))
    let res = []
    for (let i = 0; i < this.cleanDataX.length; i++) {
        const x = this.cleanDataX[i]
        const a = this.sd
        const u = this.mean
        const y = (1 / (Math.sqrt(2 * Math.PI) * a)) * (Math.exp(-1 * ((+x - u) * (+x - u)) / (2 * a * a)))
        res.push([x, y])
    }
    return res
  }

  // BellCurve Cache
  private BellCurveCache = new Map<number, number>()
  public getBellCurveArea(start: number, end?: number): number {
    let res: number;
    if (this.BellCurveCache.get(start) !== undefined) {
      return this.BellCurveCache.get(start)
    }
    if (end == undefined) {
      res = 1 - this.cdfNormal(start);
    } else {
      res = this.cdfNormal(end) - this.cdfNormal(start);
    }
    this.BellCurveCache.set(start, res)
    return res
  }

  public getEchartOption (type: ChartType, markLineData?: [MarkLineData] | [MarkLineData, MarkLineData]): ECOption {
    const defaultOption: ECOption = {
      // Echarts 图 -- 工具
      tooltip: {
        formatter: '{b}:{c}',
      },
      // Echarts 图 -- 图例
      // legend: {},
      xAxis: {
        type: 'value',
        // name: '年齡 | BMI | ',
        min: Math.ceil(this.MIN)-1,
        max: Math.ceil(this.MAX)+1,
      },
      // Echarts 图 -- y 坐标轴刻度
      yAxis: {
          // show: false,
          splitNumber: 1,
          min: ProbMinMax[type][0],
          max: ProbMinMax[type][1],
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
          data: this.normDistData, // y 轴数据 -- 正态分布
          symbol: 'none',
          areaStyle: {},
      }],
    }

    if (markLineData == undefined) {
      return defaultOption
    }

    defaultOption.series[0].markLine = {
      symbol: ['none'],
      label: { show: false },
      data: markLineData.map(item => ({ ...item, formatter: '{b}: {c}' }))
    }

    //@ts-ignore
    defaultOption.visualMap = {
      type: 'continuous',
      show: false,
      dimension: 0,
      inRange: {
        color: 'rgba(255,255,10,1)'
      },
      outOfRange: {
        opacity: 1
      },
      backgroundColor: 'rgba(100,233,1,1)',
      range: markLineData.length == 1 ? [markLineData[0].xAxis, this.MAX] : [markLineData[0].xAxis, markLineData[1].xAxis]
    }

    return defaultOption;
  }
}

export default NM;