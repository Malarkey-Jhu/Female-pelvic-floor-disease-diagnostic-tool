import React, { useEffect } from 'react';
import { useFormik } from 'formik';
import * as yup from 'yup';
import Radio from '@mui/material/Radio';
import Snackbar from '@mui/material/Snackbar';
import MuiAlert, { AlertProps } from '@mui/material/Alert';
import { Button, FormHelperText, TextField } from '@mui/material';
import RadioGroup from '@mui/material/RadioGroup';
import FormControlLabel from '@mui/material/FormControlLabel';
import FormControl from '@mui/material/FormControl';
import FormLabel from '@mui/material/FormLabel';
import { useFormValCtx } from '@/context/FormValCtx';
import { Trans } from 'react-i18next';


export interface FormVals {
  isInit: boolean
  Q1: string
  Q2: string
  Q3: string
  Q4: string
  Q5: string
  Q6: string
  Q7: string
  Q8: number | ""
  Q9: number | ""
  Q10: number | ""
  Q11_a: number | ""
  Q11_b: number | ""
  Q11_c: number | ""
  Q11_d: number | ""
  Q12: string,
  BMI: number | "",
  earlyOver: boolean /* 如問題一No 或問題二，三皆No，提早結束不需渲染 */
}

export const defaultFormVals:FormVals = {
  isInit: true,
  Q1: "",
  Q2: "1",
  Q3: "",
  Q4: "0",
  Q5: "0",
  Q6: "0",
  Q7: "0",
  Q8: "",
  Q9: "",
  Q10: "",
  Q11_a: "",
  Q11_b: "",
  Q11_c: "",
  Q11_d: "",
  Q12: "0",
  BMI: "",
  earlyOver: false
}

const requireValidationByQ1Q2Q3 = yup
.number()
.when(['Q1', 'Q2', 'Q3'], {
  is: (Q1, Q2, Q3) => Q1 == "1" && !(Q2 == "1" && Q3 == "1"),
  then: () => yup.number().required('required'),
})

const validationSchema = yup.object().shape({
  Q1: yup.string().required('required'),
  Q3: yup.string()
    .when('Q1', {
      is: '1',
      then: () => yup.string().required('required')
    }),
  Q8: requireValidationByQ1Q2Q3,
  Q11_a: requireValidationByQ1Q2Q3,
  Q11_b: requireValidationByQ1Q2Q3,
  Q11_c: requireValidationByQ1Q2Q3,
  Q11_d: requireValidationByQ1Q2Q3,
  BMI: requireValidationByQ1Q2Q3,
});

interface Props {
  onSubmit: (isEarlyOver: boolean) => void;
}

const MyForm: React.FC<Props> = ({ onSubmit }) => {

  const [alertOpenQ1, setAlertOpenQ1] = React.useState(false);
  const [alertOpenQ2Q3, setAlertOpenQ2Q3] = React.useState(false);

  const {formVals, setFormVals, resetCounter} = useFormValCtx()

  const formik = useFormik({
    initialValues: formVals,
    validationSchema,
    onSubmit: (values) => {
      setEarlyOver(values)
      setFormVals({...values, isInit: false })
      onSubmit(values.earlyOver);
    },
  });


  useEffect(() => {
    formik.resetForm();
  }, [resetCounter])

  const calBMI = (height: number | null, weight: number | null) => {
    if (!height || !weight) return 0;
    return weight / Math.pow(height / 100, 2);
  };

  const setEarlyOver = (formVals: FormVals) => {
    if (formVals.Q1 == "0" || (formVals.Q2 == "1" && formVals.Q3 == "1") ) {
      formVals.earlyOver = true
    }
  }

  useEffect(() => {
    if (formik.values.Q1 == "0") {
      formik.setValues({ ...defaultFormVals, Q1: "0"}) 
      setAlertOpenQ1(true)
    }
  }, [formik.values.Q1])

  useEffect(() => {
    if (formik.values.Q2 == "1" && formik.values.Q3 == "1") {
      formik.setValues({ ...defaultFormVals, Q1: "1", Q2: "1", Q3: "1"}) 
      setAlertOpenQ2Q3(true)
    }
  }, [formik.values.Q2, formik.values.Q3])

  return (
    <div>
      <form onSubmit={formik.handleSubmit}>
        <h3><Trans i18nKey="ForPatient" /></h3>
        <FormControl
          component="fieldset"
          sx={{ marginBottom: '10px', width: '50%' }}
          error={formik.touched.Q1 && !!formik.errors.Q1}
        >
          <FormHelperText 
            error={formik.touched.Q1 && !!formik.errors.Q1}
          >
            {formik.errors.Q1}
          </FormHelperText>
          <FormLabel component="legend">1. <Trans i18nKey="Q1" values={{hasBr: ""}} />?</FormLabel>
          <RadioGroup
            row
            name="Q1"
            onChange={formik.handleChange}
            value={formik.values.Q1}
          >
            <FormControlLabel value={"1"} control={<Radio />} label={<Trans i18nKey="Yes" />} />
            <FormControlLabel value={"0"} control={<Radio />} label={<Trans i18nKey="No" />} />
          </RadioGroup>
        </FormControl>

        <FormControl component="fieldset" sx={{ 
          marginBottom: '10px',
          display: formik.values.Q1 == "1" ? 'inline-flex' : 'none',
        }}>
          <FormLabel component="legend">2. <Trans i18nKey="Q2" />?</FormLabel>
          <RadioGroup
            row
            name="Q2"
            onChange={formik.handleChange}
            value={formik.values.Q2}
          >
            <FormControlLabel value={"1"} control={<Radio />} label={<Trans i18nKey="Yes" />} />
            <FormControlLabel value={"0"} control={<Radio />} label={<Trans i18nKey="No" />} />
          </RadioGroup>
        </FormControl>

        <FormControl
          component="fieldset"
          sx={{ marginBottom: '10px', width: '50%',
          display: formik.values.Q1 == "1" ? 'inline-flex' : 'none',
         }}
         error={formik.touched.Q3 && !!formik.errors.Q3}
        >
          <FormLabel component="legend">3. <Trans i18nKey="Q3" />?</FormLabel>
          <FormHelperText 
            error={formik.touched.Q3 && !!formik.errors.Q3}
          >
            {formik.touched.Q3 && formik.errors.Q3}
          </FormHelperText>
          <RadioGroup
            row
            name="Q3"
            onChange={formik.handleChange}
            value={formik.values.Q3}
          >
            <FormControlLabel value={"1"} control={<Radio />} label={<Trans i18nKey="Yes" />} />
            <FormControlLabel value={"0"} control={<Radio />} label={<Trans i18nKey="No" />} />
          </RadioGroup>
        </FormControl>
        
       
        <FormControl component="fieldset" sx={{ marginBottom: '10px',
          display: formik.values.Q2 == "0" || (formik.values.Q3 == "0" && formik.values.Q2 == "1")  ? 'inline-flex' : 'none',
      }}>
          <FormLabel component="legend">4.<Trans i18nKey="Q4" values={{hasBr: ""}} />?</FormLabel>
          <RadioGroup
            row
            name="Q4"
            onChange={formik.handleChange}
            value={formik.values.Q4}
          >
            <FormControlLabel value={"1"} control={<Radio />} label={<Trans i18nKey="Yes" />} />
            <FormControlLabel value={"0"} control={<Radio />} label={<Trans i18nKey="No" />} />
          </RadioGroup>
        </FormControl>
        
        <div style={{ display: formik.values.Q2 == "0" || (formik.values.Q3 == "0" && formik.values.Q2 == "1")  ? 'block' : 'none', }}> 
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
            <FormControlLabel value={"1"} control={<Radio />} label={<Trans i18nKey="Yes" />} />
            <FormControlLabel value={"0"} control={<Radio />} label={<Trans i18nKey="No" />} />
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
            <FormControlLabel value={"1"} control={<Radio />} label={<Trans i18nKey="Yes" />} />
            <FormControlLabel value={"0"} control={<Radio />} label={<Trans i18nKey="No" />} />
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
            <FormControlLabel value={"1"} control={<Radio />} label={<Trans i18nKey="Yes" />} />
            <FormControlLabel value={"0"} control={<Radio />} label={<Trans i18nKey="No" />} />
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
              formik.setFieldValue('BMI', calBMI(+e.target.value, +formik.values.Q10).toFixed(2))
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
              formik.setFieldValue('BMI', calBMI(+formik.values.Q9, +e.target.value).toFixed(2))
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
            type="number"
            onChange={e => {
              formik.setFieldValue("Q9", "")
              formik.setFieldValue("Q10", "")
              formik.handleChange(e)
            }}
            error={formik.touched.BMI && !!formik.errors.BMI}
            helperText={formik.touched.BMI && formik.errors.BMI}
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
            error={formik.touched.Q11_d && !!formik.errors.Q11_d}
            helperText={formik.touched.Q11_d && formik.errors.Q11_d}
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
            <FormControlLabel value={"1"} control={<Radio />} label={<Trans i18nKey="Yes" />} />
            <FormControlLabel value={"0"} control={<Radio />} label={<Trans i18nKey="No" />} />
          </RadioGroup>
        </FormControl>
        </div>
        <Button color="primary" variant="contained" fullWidth type="submit">
          <Trans i18nKey="Submit" />
        </Button>
      </form>

      <Snackbar open={alertOpenQ1} autoHideDuration={3000} onClose={() => setAlertOpenQ1(false)} >
        <MuiAlert elevation={6} variant="filled" sx={{ width: '350px' }}>
         <Trans i18nKey="recommendMsg1"/>
        </MuiAlert>
      </Snackbar>
      <Snackbar open={alertOpenQ2Q3} autoHideDuration={3000} onClose={() => setAlertOpenQ2Q3(false)}>
        <MuiAlert elevation={6} variant="filled" sx={{ width: '350px' }}>
          <Trans i18nKey="recommendMsg2"/>
        </MuiAlert>
      </Snackbar>
    </div>
  );
};

export default MyForm;
