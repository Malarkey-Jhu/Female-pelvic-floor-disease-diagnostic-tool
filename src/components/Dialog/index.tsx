import * as React from 'react';
import Button from '@mui/material/Button';
import Drawer from '@mui/material/Drawer';
import { styled } from '@mui/material/styles';

import Divider from '@mui/material/Divider';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogTitle from '@mui/material/DialogTitle';

import MyForm  from '../Form';
import RecommendCard from '../RecommendCard';
import { useTranslation } from 'react-i18next';
import { useDrawerCtx } from '@/context/DrawerCtx';

const drawerWidth = 450;

const DrawerHeader = styled('div')(({ theme }) => ({
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'flex-end',
}));

const FormDrawer:React.FC = () => {
  const {open, setDrawerOpen} = useDrawerCtx()
  const [open2, setOpenDialog] = React.useState(false);

  const handleDrawerClose = () => {
    setDrawerOpen(false)
  }

  const handleSubmitForm = () => {
    handleDrawerClose();
    setOpenDialog(true)
  }

  const handleClose2 = () => {
    setOpenDialog(false)
  }


  const {t} = useTranslation()
  return (
    <div>
      <Drawer
        anchor='left'
        open={open}
        onClose={handleDrawerClose}
        sx={{
          width: drawerWidth,
          flexShrink: 0,
          '& .MuiDrawer-paper': {
            padding: '30px',
            width: drawerWidth,
            boxSizing: 'border-box',
          },
        }}
        variant="persistent"
      >
         <DrawerHeader>
          <div style={{width: 30, height: 20, cursor: 'pointer', padding: 6}} onClick={handleDrawerClose}>
            X
          </div>
        </DrawerHeader>
        <MyForm onSubmit={handleSubmitForm} />
      </Drawer>

      <Dialog
        open={open2}
        onClose={handleClose2}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
        maxWidth="md"
      >
        <DialogTitle id="alert-dialog-title">
          {t("RecommendCardTitle")}
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

export default FormDrawer