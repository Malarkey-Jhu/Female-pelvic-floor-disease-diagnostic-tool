// const n = 10000;
// const step = 1;
// const max = 100;
// const min = 0;
// const data = {};

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

let NormalDistData = generateNormalDistData(0, 100, 50)

// console.log(NormalDistData, 'NormalDistData')
function forceDescriptives(mean: number, sd: number) {
  // transfom a list to have an exact mean and sd
  let list = NormalDistData;

  var oldDescriptives = descriptives(list),
     oldMean = oldDescriptives.mean,
     oldSD = oldDescriptives.sd,
     newList: string[] = [],
     len = list.length,
     i: number;

  for (i = 0; i < len; i++) {
    newList[i] = (sd * (list[i] - oldMean) / oldSD + mean).toFixed(1);
  }
  // console.log(newList)
  return {
    newList,
    mean, 
    sd
  }
}


export { forceDescriptives, NM }

interface cleanDataType {
  [x:string]: number;
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
  }

  init() {
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

  // 数据整理。原数据整理为：{数据值 : 数据频率}
  dataAfterClean() {
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

  dataAfterCleanX() {
    return Object.keys(this.cleanData).sort((a, b) => +a - +b).map(t => parseFloat(t)
        .toFixed(1)) // 保留 1 位小数
  }

  dataAfterCleanY() {
    let r = []
    for (let i = 0; i < this.cleanDataX.length; i++) {
        r.push(this.cleanData[this.cleanDataX[i]].toString())
    }
    return r
  }

  normalDistribution() {
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

  standarDevRange = (mean: number, sd: number, sdCount: number) => {
    return {
        low: mean - sdCount * sd,
        up: mean + sdCount * sd
    }
  }

  
  get standarDevRangeOfOne() {
    return this.standarDevRange(this.mean, this.sd, 1)
  }

  get standarDevRangeOfTwo() {
    return this.standarDevRange(this.mean, this.sd, 2)
  }

  get standarDevRangeOfThree() {
    return this.standarDevRange(this.mean, this.sd, 3)
  }
}