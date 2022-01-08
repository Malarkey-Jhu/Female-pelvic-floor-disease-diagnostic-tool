import React, { useEffect } from 'react';
import { useFormik } from 'formik';
import * as yup from 'yup';
import Radio from '@mui/material/Radio';
import { Button, TextField } from '@mui/material';
import RadioGroup from '@mui/material/RadioGroup';
import FormControlLabel from '@mui/material/FormControlLabel';
import FormControl from '@mui/material/FormControl';
import FormLabel from '@mui/material/FormLabel';
import { useFormValCtx } from '@/context/FormValCtx';
import { Trans } from 'react-i18next';

type TrueFalseNum = 1 | 0
export interface FormVals {
  isInit: boolean
  Q1: TrueFalseNum
  Q2: TrueFalseNum
  Q3: TrueFalseNum
  Q4: TrueFalseNum
  Q5: TrueFalseNum
  Q6: TrueFalseNum
  Q7: TrueFalseNum
  Q8: number | null
  Q9: number | null
  Q10: number | null
  Q11_a: number | null
  Q11_b: number | null
  Q11_c: number | null
  Q11_d: number | null
  Q12: TrueFalseNum,
  BMI: number | null
}

export const defaultFormVals:FormVals = {
  isInit: true,
  Q1: 0,
  Q2: 1,
  Q3: 1,
  Q4: 1,
  Q5: 1,
  Q6: 1,
  Q7: 1,
  Q8: undefined,
  Q9: undefined,
  Q10: undefined,
  Q11_a: undefined,
  Q11_b: undefined,
  Q11_c: undefined,
  Q11_d: undefined,
  Q12: 0,
  BMI: 0,
}

const validationSchema = yup.object().shape({
  Q8: yup
    .number()
    .required('Age is required'),
  Q9: yup
    .number()
    .required('Height is required'),
  Q10: yup
    .number()
    .required('Weight is required'),
  Q11_a: yup
    .number()
    .required('Ba is required'),
  Q11_b: yup
    .number()
    .required('C is required'),
  Q11_c: yup
    .number()
    .required('Bp is required'),
});

interface Props {
  onSubmit: () => void;
}

const MyForm: React.FC<Props> = ({ onSubmit }) => {
  const {formVals, setFormVals} = useFormValCtx()
  const formik = useFormik({
    initialValues: formVals,
    validationSchema,
    onSubmit: (values) => {
      console.log(values, 'formVals-from from')
      setFormVals({...values, isInit: false })
      onSubmit();
    },
  });

  const calBMI = (height: number | null, weight: number | null) => {
    if (!height || !weight) return 0;

    return weight / Math.pow(height / 100, 2);
  };

  return (
    <div>
      <form onSubmit={formik.handleSubmit}>
        <h3><Trans i18nKey="ForPatient" /></h3>
        <FormControl
          component="fieldset"
          sx={{ marginBottom: '10px', width: '50%' }}
        >
          <FormLabel component="legend">1. <Trans i18nKey="Q1" values={{hasBr: ""}} />?</FormLabel>
          <RadioGroup
            row
            name="Q1"
            onChange={formik.handleChange}
            value={formik.values.Q1}
          >
            <FormControlLabel value={1} control={<Radio />} label={<Trans i18nKey="Yes" />} />
            <FormControlLabel value={0} control={<Radio />} label={<Trans i18nKey="No" />} />
          </RadioGroup>
        </FormControl>

        <FormControl component="fieldset" sx={{ 
          marginBottom: '10px',
          display: formik.values.Q1 == 1 ? 'inline-flex' : 'none',
        }}>
          <FormLabel component="legend">2. <Trans i18nKey="Q2" />?</FormLabel>
          <RadioGroup
            row
            name="Q2"
            onChange={formik.handleChange}
            value={formik.values.Q2}
          >
            <FormControlLabel value={1} control={<Radio />} label={<Trans i18nKey="Yes" />} />
            <FormControlLabel value={0} control={<Radio />} label={<Trans i18nKey="No" />} />
          </RadioGroup>
        </FormControl>

        <FormControl
          component="fieldset"
          sx={{ marginBottom: '10px', width: '50%',
          display: formik.values.Q1 == 1 ? 'inline-flex' : 'none',
         }}
        >
          <FormLabel component="legend">3. <Trans i18nKey="Q3" />?</FormLabel>
          <RadioGroup
            row
            name="Q3"
            onChange={formik.handleChange}
            value={formik.values.Q3}
          >
            <FormControlLabel value={1} control={<Radio />} label={<Trans i18nKey="Yes" />} />
            <FormControlLabel value={0} control={<Radio />} label={<Trans i18nKey="No" />} />
          </RadioGroup>
        </FormControl>
        
       
        <FormControl component="fieldset" sx={{ marginBottom: '10px',
          display: formik.values.Q2 == 0 && formik.values.Q3 == 0  ? 'inline-flex' : 'none',
      }}>
          <FormLabel component="legend">4.<Trans i18nKey="Q4" values={{hasBr: ""}} />?</FormLabel>
          <RadioGroup
            row
            name="Q4"
            onChange={formik.handleChange}
            value={formik.values.Q4}
          >
            <FormControlLabel value={1} control={<Radio />} label={<Trans i18nKey="Yes" />} />
            <FormControlLabel value={0} control={<Radio />} label={<Trans i18nKey="No" />} />
          </RadioGroup>
        </FormControl>
        
        <div style={{ display: formik.values.Q2 == 0 && formik.values.Q3 == 0  ? 'block' : 'none', }}> 
        <FormControl
          component="fieldset"
          sx={{ marginBottom: '10px', width: '50%' }}
        >
          <FormLabel component="legend">5.  <Trans i18nKey="Q5" values={{hasBr: "<br />"}} />?</FormLabel>
          <RadioGroup
            row
            name="Q5"
            onChange={formik.handleChange}
            value={formik.values.Q5}
          >
            <FormControlLabel value={1} control={<Radio />} label={<Trans i18nKey="Yes" />} />
            <FormControlLabel value={0} control={<Radio />} label={<Trans i18nKey="No" />} />
          </RadioGroup>
        </FormControl>

        <FormControl component="fieldset" sx={{ marginBottom: '10px' }}>
          <FormLabel component="legend">6.  <Trans i18nKey="Q6" values={{hasBr: "<br />"}} /></FormLabel>
          <RadioGroup
            row
            name="Q6"
            onChange={formik.handleChange}
            value={formik.values.Q6}
          >
            <FormControlLabel value={1} control={<Radio />} label={<Trans i18nKey="Yes" />} />
            <FormControlLabel value={0} control={<Radio />} label={<Trans i18nKey="No" />} />
          </RadioGroup>
        </FormControl>

        <FormControl
          component="fieldset"
          fullWidth
          sx={{ marginBottom: '10px' }}
        >
          <FormLabel component="legend">7.  <Trans i18nKey="Q7" values={{hasBr: "<br />"}} />?</FormLabel>
          <RadioGroup
            row
            name="Q7"
            onChange={formik.handleChange}
            value={formik.values.Q7}
          >
            <FormControlLabel value={1} control={<Radio />} label={<Trans i18nKey="Yes" />} />
            <FormControlLabel value={0} control={<Radio />} label={<Trans i18nKey="No" />} />
          </RadioGroup>
        </FormControl>

        <FormControl
          component="fieldset"
          fullWidth
          sx={{ marginBottom: '10px' }}
        >
          <FormLabel component="legend">8.  <Trans i18nKey="Q8"/></FormLabel>
          <TextField
            name="Q8"
            type="number"
            value={formik.values.Q8}
            inputProps={{ min: 0 }}
            InputLabelProps={{
              shrink: true,
            }}
            onChange={formik.handleChange}
            variant="standard"
            error={formik.touched.Q8 && !!formik.errors.Q8}
            helperText={formik.touched.Q8 && formik.errors.Q8}
          />
        </FormControl>

        <FormControl
          component="fieldset"
          fullWidth
          sx={{ marginBottom: '10px' }}
        >
          <FormLabel component="legend">9. <Trans i18nKey="Q9"/> (CM)</FormLabel>
          <TextField
            name="Q9"
            type="number"
            value={formik.values.Q9}
            inputProps={{ min: 0 }}
            onChange={e => {
              formik.handleChange(e)
              formik.setFieldValue('BMI', calBMI(e.target.value, formik.values.Q10).toFixed(2))
            }}
            InputLabelProps={{
              shrink: true,
            }}
            variant="standard"
            error={formik.touched.Q9 && !!formik.errors.Q9}
            helperText={formik.touched.Q9 && formik.errors.Q9}
          />
        </FormControl>

        <FormControl
          component="fieldset"
          fullWidth
          sx={{ marginBottom: '10px' }}
        >
          <FormLabel component="legend">10. <Trans i18nKey="Q10"/> (KG)</FormLabel>
          <TextField
            name="Q10"
            type="number"
            inputProps={{ min: 0 }}
            value={formik.values.Q10}
            onChange={e => {
              formik.handleChange(e)
              formik.setFieldValue('BMI', calBMI(formik.values.Q9, e.target.value).toFixed(2))
            }}
            InputLabelProps={{
              shrink: true,
            }}
            variant="standard"
            error={formik.touched.Q10 && !!formik.errors.Q10}
            helperText={formik.touched.Q10 && formik.errors.Q10}
          />
        </FormControl>

        <FormControl
          component="fieldset"
          fullWidth
          sx={{ marginBottom: '10px' }}
        >
          <FormLabel component="legend">BMI</FormLabel>
          <TextField
            name="BMI"
            value={formik.values.BMI}
            variant="standard"
          />
        </FormControl>
        <br />
        <br />

        <FormControl
          component="fieldset"
          fullWidth
          sx={{ marginBottom: '10px' }}
        >
          <FormLabel component="legend" sx={{ paddingBottom: '10px' }}>
            11. POP-Q:
          </FormLabel>
          {/* <span style={{ position: 'absolute', left: '50px' }}>Ba</span> */}
          <TextField
            name="Q11_a"
            type="number"
            label="Ba"
            inputProps={{ min: -3, max: 10 }}
            value={formik.values.Q11_a}
            sx={{ marginLeft: 10 }}
            onChange={formik.handleChange}
            InputLabelProps={{
              shrink: true,
            }}
            variant="standard"
            error={formik.touched.Q11_a && !!formik.errors.Q11_a}
            helperText={formik.touched.Q11_a && formik.errors.Q11_a}
          />

          <br />
          {/* <span style={{ position: 'absolute', left: '50px', top: '55px' }}>
            C
          </span> */}
          <TextField
            name="Q11_b"
            label="C"
            type="number"
            inputProps={{ min: -10, max: 10 }}
            value={formik.values.Q11_b}
            sx={{ marginLeft: 10 }}
            onChange={formik.handleChange}
            InputLabelProps={{
              shrink: true,
            }}
            variant="standard"
            error={formik.touched.Q11_b && !!formik.errors.Q11_b}
            helperText={formik.touched.Q11_b && formik.errors.Q11_b}
          />

          <br />
          {/* <span style={{ position: 'absolute', left: '50px', top: '104px' }}>
            Bp
          </span> */}
          <TextField
            name="Q11_c"
            type="number"
            label="Bp"
            inputProps={{ min: -3, max: 10 }}
            value={formik.values.Q11_c}
            sx={{ marginLeft: 10 }}
            onChange={formik.handleChange}
            InputLabelProps={{
              shrink: true,
            }}
            variant="standard"
            error={formik.touched.Q11_c && !!formik.errors.Q11_c}
            helperText={formik.touched.Q11_c && formik.errors.Q11_c}
          />

          <br />
          {/* <span style={{ position: 'absolute', left: '50px', top: '160px' }}>
            D
          </span> */}
          <TextField
            name="Q11_d"
            type="number"
            label="D"
            inputProps={{ min: -10, max: 10 }}
            value={formik.values.Q11_d}
            sx={{ marginLeft: 10 }}
            onChange={formik.handleChange}
            InputLabelProps={{
              shrink: true,
            }}
            variant="standard"
          />
        </FormControl>

        <h3><Trans i18nKey="ForPhysician" />:</h3>
        <FormControl
          component="fieldset"
          fullWidth
          sx={{ marginBottom: '10px' }}
        >
          <FormLabel component="legend">1. <Trans i18nKey="Q12"/>?</FormLabel>
          <RadioGroup
            row
            name="Q12"
            onChange={formik.handleChange}
            value={formik.values.Q12}
          >
            <FormControlLabel value={1} control={<Radio />} label={<Trans i18nKey="Yes" />} />
            <FormControlLabel value={0} control={<Radio />} label={<Trans i18nKey="No" />} />
          </RadioGroup>
        </FormControl>

        <Button color="primary" variant="contained" fullWidth type="submit">
          <Trans i18nKey="Submit" />
        </Button>
        </div>
      </form>
    </div>
  );
};

export default MyForm;
