// const n = 10000;
// const step = 1;
// const max = 100;
// const min = 0;
// const data = {};

import NM from "./NM";

const randn_bm = (min: number, max: number, skew: number) => {
    var u = 0, v = 0;
    while(u === 0) u = Math.random(); //Converting [0,1) to (0,1)
    while(v === 0) v = Math.random();
    let num = Math.sqrt( -2.0 * Math.log( u ) ) * Math.cos( 2.0 * Math.PI * v );

    num = num / 10.0 + 0.5; // Translate to 0 -> 1
    if (num > 1 || num < 0) num = randn_bm(min, max, skew); // resample between 0 and 1 if out of range
    num = Math.pow(num, skew); // Skew
    num *= max - min; // Stretch to fill range
    num += min; // offset to min
    return num;
}

const round_to_precision = (x: number, precision: number) => {
    var y = +x + (precision === undefined ? 0.5 : precision/2);
    return y - (y % (precision === undefined ? 1 : +precision));
}

const generateNormalDistData = (min: number, max: number, dataSize: number, step: number = 1) => {
  let res:number[] = []
  for (let i = 0; i < dataSize; i++) {
    let rand_num = randn_bm(min, max, 1);
    let rounded = round_to_precision(rand_num, step)
    res.push(rounded)
  }
  res.sort()
  return res
}

function descriptives(list: number[]) {
  // compute mean, sd and the interval range: [min, max]
  var mean: number,
     sd: number,
     i: number,
     len = list.length,
     sum: number,
     a = Infinity,
     b = -a;
  for (sum = i = 0; i < len; i++) {
     sum += list[i];
     a = Math.min(a, list[i]);
     b = Math.max(b, list[i]);
  }
  mean = sum / len;
  for (sum = i = 0; i < len; i++) {
     sum += (list[i] - mean) * (list[i] - mean);
  }
  sd = Math.sqrt(sum / (len - 1));

  return {
     mean: mean,
     sd: sd,
     range: [a, b]
  };
}

// BMI 0-50
// AGE 0-100

export type MINMAX = [number, number]

export type Interval = {
  BMI: MINMAX
  AGE: MINMAX
  ANTERIOR: MINMAX
  CENTRAL: MINMAX
  POSTERIOR: MINMAX
}

const interval: Interval = {
  BMI: [0, 50],
  AGE: [0, 100],
  ANTERIOR: [-13, 13],
  CENTRAL: [-20, 20],
  POSTERIOR: [-13, 13]
}

const DATA_SIZE = 1000;
function forceDescriptives(mean: number, sd: number, category: keyof Interval) {
  // transfom a list to have an exact mean and sd
  const [min, max] = interval[category]
  const list = generateNormalDistData(min, max, DATA_SIZE)
  // console.log(list, 'list--')
  var oldDescriptives = descriptives(list),
     oldMean = oldDescriptives.mean,
     oldSD = oldDescriptives.sd,
     newList: string[] = [],
     len = list.length,
     i: number;

  for (i = 0; i < len; i++) {
    newList[i] = (sd * (list[i] - oldMean) / oldSD + mean).toFixed(1);
  }
  // console.log(newList, 'newList', mean, 'mean', sd, 'sd')
  return {
    newList,
    mean, 
    sd
  }
}



const getEchartOption = (nm: NM) => {
  return {
    // Echarts ??? -- ??????
    tooltip: {
      formatter: '{b}:{c}',
    },
    // Echarts ??? -- ??????
    legend: {},
    xAxis: {
      type: 'value',
      name: '??????',
      min: Math.ceil(nm.MIN)-1,
      max: Math.ceil(nm.MAX)+1,
    },
    // Echarts ??? -- y ???????????????
    yAxis: {
        // show: false,
        splitNumber: 1,
        min: 0,
        max: 0.09,
        type: 'value',
        // name: '??????',
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
    // Echarts ??? -- y ?????????
    series: [
    {
        // name: '????????????', // y ?????????
        type: 'line', // y ?????????
        smooth: true, //true ???????????????
        data: nm.normDistData, // y ????????? -- ????????????
        symbol: 'none',
        areaStyle: {},
        markLine: {
          symbol: ['none'],
          label: { show: false },
          data: [
            { name: '??????', xAxis: nm.MEAN, formatter: '{b}: {c}'
          },
            { name: '??????2', xAxis: 70, formatter: '{b}: {c}' },
          ]
        },
    }],
    visualMap: {
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
      range: [nm.MEAN, 70]
    },
  }
}
export { forceDescriptives, descriptives, getEchartOption }
