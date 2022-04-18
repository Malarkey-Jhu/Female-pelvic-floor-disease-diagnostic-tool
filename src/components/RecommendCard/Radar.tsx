import React from 'react'
import * as echarts from 'echarts'
import { TFunction, useTranslation } from 'react-i18next';
import { Row, Procedure } from '.';

interface Props {
  data: Row[]
}


type RadarData = {
  [k in Procedure]: [
    // Recommendation
    number, 
    // Prior
    number, 
    // Operability
    number, 
    // Effectiveness
    number, 
    // Safety
    number, 
    // Economy
    number];
};

const times100 = (n: number) => {
  return Math.round(n * 100)
}

const transformData = (data: Row[]) => { 
  let res = {}
 
  data.forEach((r: Row) => {
    res[r.Procedure] = [
      times100(r.Recommendation), 
      times100(r.Prior), 
      times100(r.Operability), 
      times100(r.Effectiveness),
      times100(r.Safety),
      times100(r.Economy),
    ]
  })

  return res as RadarData
}


const getRadarOption = (t: TFunction<"translation", undefined>, d: RadarData) => { 
  return {
    legend: {
      right: 0,
      top: 20,
      orient: "vertical",
      data: [t("ATVM"), t("LEFORT"), t("LSC"), t("PTVM"), t("SLFF"), t("ULS")]
    },
    radar: {
      indicator: [
        { name: t('RecommendationProbability'), max: 100, color: 'black' },
        { name: t('Prior'), max: 100, color: 'black' },
        { name: t('Operability'), max: 100, color: 'black' },
        { name: t('Effectiveness'), max: 100, color: 'black' },
        { name: t('Safety'), max: 100, color: 'black' },
        { name: t('Economy'), max: 100, color: 'black' }
      ]
    },
    tooltip: {
      trigger: 'item'
    },
    series: [
      {
        name: '',
        type: 'radar',
        data: [
          {
            value: d.ATVM,
            name: t("ATVM"),
            
          },
          {
            value: d.LEFORT,
            name: t("LEFORT")
          }, 
          {
            value: d.LSC,
            name: t("LSC")
          }, 
          {
            value: d.PTVM,
            name: t("PTVM")
          }, 
          {
            value: d.SLFF,
            name: t("SLFF")
          }, 
          {
            value: d.ULS,
            name: t("ULS")
          }, 
        ]
      }
    ]
  };
}


const Radar: React.FC<Props> = ({ data }) => {

  const {t} = useTranslation()
  const ref = React.useRef<HTMLDivElement>()
  

  React.useEffect(() => {
  const d = transformData(data)
  const option = getRadarOption(t, d);
    let dom = ref.current
    let chart = echarts.getInstanceByDom(dom) || echarts.init(dom);
    chart.setOption(option, true)
  }, [data])

  return (
     <div style={{width: "inherit", height: "inherit", marginBottom: 15}}>
      <div ref={ref} style={{width: "100%", height: "100%", left: -40}}></div>
    </div>
  )
}

export default Radar