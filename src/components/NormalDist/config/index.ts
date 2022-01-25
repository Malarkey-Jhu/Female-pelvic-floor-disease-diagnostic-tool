import NM from "@/utils/NM";
import { forceDescriptives, Interval } from "@/utils/normalDist";

// excel sheet2 裡有 mean 跟 sd
const getNMByExcelVal = (mean: number, sd: number, category: keyof Interval) : NM => {
  const { newList } = forceDescriptives(mean, sd, category)
  const nm = new NM(newList)
  return nm
}

export const AGE_ATVM_NM = getNMByExcelVal(64.11, 5.76, "AGE");
export const AGE_LSC_NM = getNMByExcelVal(50.32, 6.21, "AGE");
export const AGE_SLFF_NM = getNMByExcelVal(62.13, 7.32, "AGE");
export const AGE_ULS_NM = getNMByExcelVal(50.85, 9.37, "AGE");
export const AGE_PTVM_NM = getNMByExcelVal(61.33, 6.21, "AGE");
export const AGE_LEFORT_NM = getNMByExcelVal(73.86, 5.06, "AGE");

export const BMI_ATVM_NM = getNMByExcelVal(24.87,2.56, "BMI");
export const BMI_LSC_NM = getNMByExcelVal(24.9,3.24, "BMI");
export const BMI_SLFF_NM = getNMByExcelVal(24.9,3.02, "BMI");
export const BMI_ULS_NM = getNMByExcelVal(24.01,2.77, "BMI");
export const BMI_PTVM_NM = getNMByExcelVal(25.55,2.72, "BMI");
export const BMI_LEFORT_NM = getNMByExcelVal(24.26,2.95, "BMI");

export const ANTERIOR_ATVM_NM = getNMByExcelVal(6.41,1.62, "ANTERIOR");
export const ANTERIOR_LSC_NM = getNMByExcelVal(5.99,2.37, "ANTERIOR");
export const ANTERIOR_SLFF_NM = getNMByExcelVal(3.28,2.16, "ANTERIOR");
export const ANTERIOR_ULS_NM = getNMByExcelVal(2.2,1.68, "ANTERIOR");
export const ANTERIOR_PTVM_NM = getNMByExcelVal(0.87,1.58, "ANTERIOR");

export const CENTRAL_ATVM_NM = getNMByExcelVal(8.52, 3.16, "CENTRAL");
export const CENTRAL_LSC_NM = getNMByExcelVal(11.73, 3.5, "CENTRAL");
export const CENTRAL_SLFF_NM = getNMByExcelVal(9.21, 2.6, "CENTRAL");
export const CENTRAL_ULS_NM = getNMByExcelVal(8.53, 2.89, "CENTRAL");
export const CENTRAL_PTVM_NM = getNMByExcelVal(2.96, 3.61, "CENTRAL");

export const POSTERIOR_ATVM_NM = getNMByExcelVal(1.62, 1.65, "POSTERIOR");
export const POSTERIOR_LSC_NM = getNMByExcelVal(9.21, 2.66, "POSTERIOR");
export const POSTERIOR_SLFF_NM = getNMByExcelVal(1.11, 1.03, "POSTERIOR");
export const POSTERIOR_ULS_NM = getNMByExcelVal(0.6, 0.72, "POSTERIOR");
export const POSTERIOR_PTVM_NM = getNMByExcelVal(5.33, 0.84, "POSTERIOR");


const allNM = {
  AGE_ATVM_NM,
  AGE_LSC_NM,
  AGE_SLFF_NM,
  AGE_ULS_NM,
  AGE_PTVM_NM,
  AGE_LEFORT_NM,
  BMI_ATVM_NM ,
  BMI_LSC_NM ,
  BMI_SLFF_NM ,
  BMI_ULS_NM ,
  BMI_PTVM_NM ,
  BMI_LEFORT_NM ,

  ANTERIOR_ATVM_NM ,
  ANTERIOR_LSC_NM ,
  ANTERIOR_SLFF_NM ,
  ANTERIOR_ULS_NM ,
  ANTERIOR_PTVM_NM ,

  CENTRAL_ATVM_NM ,
  CENTRAL_LSC_NM ,
  CENTRAL_SLFF_NM ,
  CENTRAL_ULS_NM ,
  CENTRAL_PTVM_NM ,

  POSTERIOR_ATVM_NM ,
  POSTERIOR_LSC_NM ,
  POSTERIOR_SLFF_NM ,
  POSTERIOR_ULS_NM,
  POSTERIOR_PTVM_NM ,
}

export default allNM;
