import * as React from 'react';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogTitle from '@mui/material/DialogTitle';
import styled from '@emotion/styled';
import MyForm  from '../Form';
import { EdgeConfig } from '../Flow/config';
import RecommendCard from '../RecommendCard';
import { useFormValCtx } from '@/context/FormValCtx';

let BtnBox = styled.div`
  position: absolute;
  top: 140px;
  left: 5px;
  z-index: 111;


  button {
    display: block;
    margin: 5px;
  }
`

interface Props {
  setNewEdges: (conf: EdgeConfig) => void
}

const AlertDialog:React.FC<Props> = ({ setNewEdges }) => {
  const [open1, setOpen1] = React.useState(false);
  const [open2, setOpen2] = React.useState(false);
  const {handleReset} = useFormValCtx()

  const handleClickOpen = () => {
    setOpen1(true);
  };

  const handleClose2 = () => {
    setOpen2(false);
  };

  const handleClose1 = () => {
    setOpen1(false);
  };

  const handleSubmit = () => {
    setOpen1(false)
    setOpen2(true)
  }

  const handleClickReset = () => {
    handleReset();
  }

  return (
    <div>
      <BtnBox>
       <Button 
       onClick={handleClickOpen}
        variant='contained'
        sx={{
          background: '#169bd5',
          color: '#fff',
          textTransform: 'none',
          width: '70px'
        }}>Start</Button>

       <Button 
       onClick={handleClickReset}
        variant='contained'
        sx={{
          background: '#169bd5',
          color: '#fff',
          textTransform: 'none',
          width: '70px'
        }}>Reset</Button>
      </BtnBox>

      <Dialog
        open={open1}
        onClose={handleClose1}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
        maxWidth="md"
      >
        <DialogTitle id="alert-dialog-title">
          {"Information"}
        </DialogTitle>
        <DialogContent>
          <MyForm onSubmit={handleSubmit} />
        </DialogContent>
        <div style={{position: 'absolute', top: 20, right: 20, cursor: 'pointer', fontSize: 24}}
          onClick={handleClose1}
        >X</div>
      </Dialog>

      <Dialog
        open={open2}
        onClose={handleClose2}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
        maxWidth="md"
      >
        <DialogTitle id="alert-dialog-title">
          {"Surgery recommendation"}
        </DialogTitle>
        <DialogContent>
          <RecommendCard />
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose2}>Close</Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}

export default AlertDialog