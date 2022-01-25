import { FormVals } from "@/components/Form"
import allNM  from "@/components/NormalDist/config"

                 // ATVN, LSC, SLFF, HUS, PTVM, LEFORT
// type CalColums = [number, number, number, number,number, number]

const ifGreaterThanOne = (formFieldVal: number, curveArea: number) => {
  if (formFieldVal > 1) {
    return curveArea
  }
  return 1
}

// 對應 Excel Sheet2 Calculation Table
// 每個cell有不同的轉換規則

const getCalculation = (formVals: FormVals) => {
  const {
    Q4,
    Q5,
    Q6,
    Q7,
    Q8,
    Q11_a,
    Q11_b,
    Q11_c,
    Q12,
    BMI
  } = formVals

  const [tA, tC, tP] = [-1, -4, -1]

  const Anterior_ATVM = ifGreaterThanOne(+Q11_a, allNM.ANTERIOR_ATVM_NM.getBellCurveArea(+Q11_a-tA))
  const Central_ATVM = ifGreaterThanOne(+Q11_b, allNM.CENTRAL_ATVM_NM.getBellCurveArea(+Q11_b-tC))
  const Posterior_ATVM = ifGreaterThanOne(+Q11_c, allNM.POSTERIOR_ATVM_NM.getBellCurveArea(+Q11_c-tP))

  const Anterior_LSC = ifGreaterThanOne(+Q11_a, allNM.ANTERIOR_LSC_NM.getBellCurveArea(+Q11_a-tA))
  const Central_LSC = ifGreaterThanOne(+Q11_b, allNM.CENTRAL_LSC_NM.getBellCurveArea(+Q11_b-tC))
  const Posterior_LSC = ifGreaterThanOne(+Q11_c, allNM.POSTERIOR_LSC_NM.getBellCurveArea(+Q11_c-tP))

  const Anterior_SLFF = ifGreaterThanOne(+Q11_a, allNM.ANTERIOR_SLFF_NM.getBellCurveArea(+Q11_a-tA))
  const Central_SLFF = ifGreaterThanOne(+Q11_b, allNM.CENTRAL_SLFF_NM.getBellCurveArea(+Q11_b-tC))
  const Posterior_SLFF = ifGreaterThanOne(+Q11_c, allNM.POSTERIOR_SLFF_NM.getBellCurveArea(+Q11_c-tP))

  const Anterior_ULS = ifGreaterThanOne(+Q11_a, allNM.ANTERIOR_ULS_NM.getBellCurveArea(+Q11_a-tA))
  const Central_ULS = ifGreaterThanOne(+Q11_b, allNM.CENTRAL_ULS_NM.getBellCurveArea(+Q11_b-tC))
  const Posterior_ULS = ifGreaterThanOne(+Q11_c, allNM.POSTERIOR_ULS_NM.getBellCurveArea(+Q11_c-tP))

  const Anterior_PTVM = ifGreaterThanOne(+Q11_a, allNM.ANTERIOR_PTVM_NM.getBellCurveArea(+Q11_a-tA))
  const Central_PTVM = ifGreaterThanOne(+Q11_b, allNM.CENTRAL_PTVM_NM.getBellCurveArea(+Q11_b-tC))
  const Posterior_PTVM = ifGreaterThanOne(+Q11_c, allNM.POSTERIOR_PTVM_NM.getBellCurveArea(+Q11_c-tP))

  const Anterior_LEFORT = 1
  const Central_LEFORT = 1
  const Posterior_LEFORT = 1

  const  Prior = 
    [Q7 == "1" ? 0.1 : 0.9, 
      1, 
      1, 
      1, 
      Q7 == "1" ? 0.1 : 0.9, 
      Q5 == "1" || Q6 == "1" ? 0.1 : 0.9]

  const OperationComplexity = 
    [Q12 == "1" ? 0.98 : 1,
      1,
      Q12 == "1" ? 0.9 : 1,
      Q12 == "1" ? 0.9 : 1,
      Q12 == "1" ? 0.98 : 1,
      Q12 == "1" ? 0.9 : 1,
    ]

  const AGE_ROW = 
  [
    allNM.AGE_ATVM_NM.getBellCurveArea(Q8 as number),
    allNM.AGE_LSC_NM.getBellCurveArea(Q8 as number),
    allNM.AGE_SLFF_NM.getBellCurveArea(Q8 as number),
    allNM.AGE_ULS_NM.getBellCurveArea(Q8 as number),
    allNM.AGE_PTVM_NM.getBellCurveArea(Q8 as number),
    allNM.AGE_LEFORT_NM.getBellCurveArea(Q8 as number),
  ]

  const BMI_ROW = 
  [
    allNM.BMI_ATVM_NM.getBellCurveArea(BMI as number),
    allNM.BMI_LSC_NM.getBellCurveArea(BMI as number),
    allNM.BMI_SLFF_NM.getBellCurveArea(BMI as number),
    allNM.BMI_ULS_NM.getBellCurveArea(BMI as number),
    allNM.BMI_PTVM_NM.getBellCurveArea(BMI as number),
    allNM.BMI_LEFORT_NM.getBellCurveArea(BMI as number),
  ]

  const CharacteristicTotal = 
  [
    AGE_ROW[0] * BMI_ROW[0], 
    AGE_ROW[1] * BMI_ROW[1], 
    AGE_ROW[2] * BMI_ROW[2], 
    AGE_ROW[3] * BMI_ROW[3], 
    AGE_ROW[4] * BMI_ROW[4], 
    AGE_ROW[5] * BMI_ROW[5], 
  ]

  const EffectivenessTotal = 
  [
    Anterior_ATVM * Central_ATVM * Posterior_ATVM,
    Anterior_LSC * Central_LSC * Posterior_LSC,
    Anterior_SLFF * Central_SLFF * Posterior_SLFF,
    Anterior_ULS * Central_ULS * Posterior_ULS,
    Anterior_PTVM * Central_PTVM * Posterior_PTVM,
    Anterior_LEFORT * Central_LEFORT * Posterior_LEFORT,
  ]

  const CharacteristicEffectiveness = 
  [
    CharacteristicTotal[0] * EffectivenessTotal[0],
    CharacteristicTotal[1] * EffectivenessTotal[1],
    CharacteristicTotal[2] * EffectivenessTotal[2],
    CharacteristicTotal[3] * EffectivenessTotal[3],
    CharacteristicTotal[4] * EffectivenessTotal[4],
    CharacteristicTotal[5] * EffectivenessTotal[5],
  ]

  const  Safety =
  [0.142, 0.124, 0.11, 0.11, 0.142, 0.114]

  const Cost = 
  [
    Q4 == "1" ? -27644 : 1,
    Q4 == "1" ? -27242 : 1,
    Q4 == "1" ? -11553 : 1,
    Q4 == "1" ? -11699 : 1,
    Q4 == "1" ? -22447 : 1,
    Q4 == "1" ? -11250 : 1,
  ]
 
  return {
    Prior, OperationComplexity, CharacteristicTotal, EffectivenessTotal, CharacteristicEffectiveness, Safety, Cost
  }
}

const calSum = (a: number[]) => {
  return a.reduce((i, j) => i + j, 0)
}

const normalize = (a: number[]) => {
  let sum = calSum(a)
  return a.map(item => item / sum)
}

const normalizeWithParams = (a: number[], param: "alpha" | "beta" | "gamma") => {
  const params = {
    beta: 0.5,
    alpha: 3.4,
    gamma: 3
  }
  return normalize(normalize(a)
    .map(v => 1 / Math.pow(v, params[param])))
}


// 對應 Excel Sheet2 Output Table
const getOutput = (formVals: FormVals) => {
  const { Prior, OperationComplexity, CharacteristicEffectiveness, Safety, Cost } = getCalculation(formVals)


  const Prior_result =  normalize(Prior)
  const Operability_result = normalizeWithParams(OperationComplexity, "gamma")
  const CharacteristicEffectiveness_result =  normalize(CharacteristicEffectiveness)
  const Safety_result =  normalizeWithParams(Safety, "alpha")
  const Economy_result =  normalizeWithParams(Cost, "beta")

  const Weight = Prior_result.map((pr, idx) => {
    return pr * Operability_result[idx] * CharacteristicEffectiveness_result[idx] * Safety_result[idx] * Economy_result[idx]
  })

  const Recommend_Result = normalize(Weight)

  return {
    Prior_result,
    Operability_result,
    CharacteristicEffectiveness_result,
    Safety_result,
    Economy_result,
    Recommend_Result
  }
}

export { getOutput }