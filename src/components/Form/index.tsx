import React from 'react';
import { useFormik } from 'formik';
import * as yup from 'yup';
import Radio from '@mui/material/Radio';
import { Button, TextField } from '@mui/material';
import RadioGroup from '@mui/material/RadioGroup';
import FormControlLabel from '@mui/material/FormControlLabel';
import FormControl from '@mui/material/FormControl';
import FormLabel from '@mui/material/FormLabel';
import { EdgeConfig } from '../Flow/config';

const validationSchema = yup.object({
  email: yup
    .string()
    .email('Enter a valid email')
    .required('Email is required'),
  password: yup
    .string()
    .min(8, 'Password should be of minimum 8 characters length')
    .required('Password is required'),
});

interface Props {
  setNewEdges: (conf: EdgeConfig) => void
}

const MyForm:React.FC<Props> = ({ setNewEdges }) => {
  const formik = useFormik({
    initialValues: {
      Q1: 0,
      Q2: 1,
      Q3: 1,
      Q4: 1,
      Q5: 1,
      Q6: 1,
      Q7: 1,
      Q8: null,
      Q9: null,
      Q10: null,
      Q11_a: null,
      Q11_b: null,
      Q11_c: null,
      Q11_d: null,
      Q12: 0,
    },
    // validationSchema: validationSchema,
    onSubmit: (values) => {
      setNewEdges({
        ePatient_Q1: true,
        eQ1_PMFT: values.Q1 == 1,
        eQ1_Q2: values.Q1 == 0,
        eQ2_FakeLine: values.Q2 == 0,
        eQ2_Q3: values.Q2 == 1
      })
      alert(JSON.stringify(values, null, 2));
    },
  });

  return (
    <div>
      <form onSubmit={formik.handleSubmit}>
        <h3>For patients:</h3>

        <FormControl component="fieldset" sx={{marginBottom: '10px', width: '50%'}}>
        <FormLabel component="legend">1. Vaginal bulge symptoms?</FormLabel>
        <RadioGroup row name="Q1" onChange={formik.handleChange} value={formik.values.Q1}>
          <FormControlLabel value={1} control={<Radio />} label="Yes" />
          <FormControlLabel value={0} control={<Radio />} label="No" />
        </RadioGroup>
        </FormControl>

        <FormControl component="fieldset" sx={{marginBottom: '10px'}}>
        <FormLabel component="legend">2. Pessary?</FormLabel>
        <RadioGroup row name="Q2" onChange={formik.handleChange} value={formik.values.Q2}>
          <FormControlLabel value={1} control={<Radio />} label="Yes" />
          <FormControlLabel value={0} control={<Radio />} label="No" />
        </RadioGroup>
        </FormControl>
        

        <FormControl component="fieldset" sx={{marginBottom: '10px', width: '50%'}}>
        <FormLabel component="legend">3. Improved?</FormLabel>
        <RadioGroup row name="Q3" onChange={formik.handleChange} value={formik.values.Q3}>
          <FormControlLabel value={1} control={<Radio />} label="Yes" />
          <FormControlLabel value={0} control={<Radio />} label="No" />
        </RadioGroup>
        </FormControl>

        <FormControl component="fieldset" sx={{marginBottom: '10px' }}>
        <FormLabel component="legend">4. Cost matter?</FormLabel>
        <RadioGroup row name="Q4" onChange={formik.handleChange} value={formik.values.Q4}>
          <FormControlLabel value={1} control={<Radio />} label="Yes" />
          <FormControlLabel value={0} control={<Radio />} label="No" />
        </RadioGroup>
        </FormControl>

        <FormControl component="fieldset" sx={{marginBottom: '10px', width: '50%'}}>
        <FormLabel component="legend">5. Sexual life?</FormLabel>
        <RadioGroup row name="Q5" onChange={formik.handleChange} value={formik.values.Q5}>
          <FormControlLabel value={1} control={<Radio />} label="Yes" />
          <FormControlLabel value={0} control={<Radio />} label="No" />
        </RadioGroup>
        </FormControl>

        <FormControl component="fieldset" sx={{marginBottom: '10px'}}>
        <FormLabel component="legend">6. Vagina reserve?</FormLabel>
        <RadioGroup row name="Q6" onChange={formik.handleChange} value={formik.values.Q6}>
          <FormControlLabel value={1} control={<Radio />} label="Yes" />
          <FormControlLabel value={0} control={<Radio />} label="No" />
        </RadioGroup>
        </FormControl>

        <FormControl component="fieldset" fullWidth sx={{marginBottom: '10px'}}>
        <FormLabel component="legend">7. Mesh aversion?</FormLabel>
        <RadioGroup row name="Q7" onChange={formik.handleChange} value={formik.values.Q7}>
          <FormControlLabel value={1} control={<Radio />} label="Yes" />
          <FormControlLabel value={0} control={<Radio />} label="No" />
        </RadioGroup>
        </FormControl>

        <FormControl component="fieldset" fullWidth sx={{marginBottom: '10px'}}>
        <FormLabel component="legend">8. Age</FormLabel>
        <TextField
          name="Q8"
          type="number"
          value={formik.values.Q8}
          inputProps={{min: 0}}
          InputLabelProps={{
            shrink: true,
          }}
          variant="standard"
        />
        </FormControl>

        <FormControl component="fieldset" fullWidth sx={{marginBottom: '10px'}}>
        <FormLabel component="legend">9. Height</FormLabel>
        <TextField
          name="Q9"
          type="number"
          value={formik.values.Q9}
          inputProps={{min: 0}}
          InputLabelProps={{
            shrink: true,
          }}
          variant="standard"
        />
        </FormControl>

        <FormControl component="fieldset" fullWidth sx={{marginBottom: '10px'}}>
        <FormLabel component="legend">10. Weight</FormLabel>
        <TextField
          name="Q10"
          type="number"
          inputProps={{min: 0}}
          value={formik.values.Q10}
          InputLabelProps={{
            shrink: true,
          }}
          variant="standard"
        />
        </FormControl>
        <br />
        <br />

        <FormControl component="fieldset" fullWidth sx={{marginBottom: '10px'}}>
        <FormLabel component="legend" sx={{paddingBottom: '10px'}}>11. POP-Q:</FormLabel>
          <span style={{ position: 'absolute', left: '50px'}}>Ba</span>
          <TextField
            name="Q11_a"
            type="number"
            inputProps={{min: -3, max: 10}}
            value={formik.values.Q11_a}
            sx={{ marginLeft: 10 }}
            InputLabelProps={{
              shrink: true,
            }}
            variant="standard"
          />

          <br />
          <span style={{ position: 'absolute', left: '50px', top: '55px'}}>C</span>
          <TextField
            name="Q11_b"
            type="number"
            inputProps={{min: -10, max: 10}}
            value={formik.values.Q11_b}
            sx={{ marginLeft: 10 }}
            InputLabelProps={{
              shrink: true,
            }}
            variant="standard"
          />

          <br />
          <span style={{ position: 'absolute', left: '50px', top: '104px'}}>Bp</span>
          <TextField
            name="Q11_c"
            type="number"
            inputProps={{min: -3, max: 10}}
            value={formik.values.Q11_c}
            sx={{ marginLeft: 10 }}
            InputLabelProps={{
              shrink: true,
            }}
            variant="standard"
          />

          <br />
          <span style={{ position: 'absolute', left: '50px', top: '160px'}}>D</span>
          <TextField
            name="Q11_d"
            type="number"
            inputProps={{min: -10, max: 10}}
            value={formik.values.Q11_d}
            sx={{ marginLeft: 10 }}
            InputLabelProps={{
              shrink: true,
            }}
            variant="standard"
          />
        </FormControl>

        <h3>For physician:</h3> 
        <FormControl component="fieldset" fullWidth sx={{marginBottom: '10px'}}>
        <FormLabel component="legend">1. Operation preference?</FormLabel>
        <RadioGroup row name="Q12" onChange={formik.handleChange} value={formik.values.Q12}>
          <FormControlLabel value={1} control={<Radio />} label="Yes" />
          <FormControlLabel value={0} control={<Radio />} label="No" />
        </RadioGroup>
        </FormControl>
      
        <Button color="primary" variant="contained" fullWidth type="submit">
          Submit
        </Button>
      </form>
    </div>
  );
};

export default MyForm;