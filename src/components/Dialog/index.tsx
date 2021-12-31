import * as React from 'react';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import styled from '@emotion/styled';
import MyForm from '../Form';
import { EdgeConfig } from '../Flow/config';

let BtnBox = styled.div`
  position: absolute;
  top: 140px;
  left: 5px;
  z-index: 111;
`

interface Props {
  setNewEdges: (conf: EdgeConfig) => void
}

const AlertDialog:React.FC<Props> = ({ setNewEdges }) => {
  const [open1, setOpen1] = React.useState(false);
  const [open2, setOpen2] = React.useState(false);

  const handleClickOpen = () => {
    setOpen1(true);
  };

  const handleClose = () => {
    setOpen1(false);
  };

  return (
    <div>
      <BtnBox>
       <Button 
       onClick={handleClickOpen}
        variant='contained'
        sx={{
          background: '#169bd5',
          color: '#fff',
          textTransform: 'none'
        }}>Start</Button>
      </BtnBox>
      <Dialog
        open={open1}
        onClose={handleClose}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
        maxWidth="md"
      >
        <DialogTitle id="alert-dialog-title">
          {"Information"}
        </DialogTitle>
        <DialogContent>
          <MyForm setNewEdges={setNewEdges}/>
        </DialogContent>
        {/* <DialogActions>
          <Button onClick={handleClose}>Disagree</Button>
          <Button onClick={handleClose} autoFocus>
            Agree
          </Button>
        </DialogActions> */}
      </Dialog>
    </div>
  );
}

export default AlertDialog