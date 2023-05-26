import React, { createContext, useState } from 'react';
import Snackbar from '@mui/material/Snackbar';
import MuiAlert from '@mui/material/Alert';

export const SnackbarContext = createContext();

function Alert(props) {
  return <MuiAlert elevation={6} variant="filled" {...props} />;
}

function SnackbarProvider({ children }) {
  const [isOpen, setIsOpen] = useState(false);
  const [message, setMessage] = useState();

  const handleOpenSnackbar = (message) => {
    setMessage(message);
    setIsOpen(true);
  };

  const handleCloseSnackbar = () => {
    setIsOpen(false);
  };

  return (
    <SnackbarContext.Provider value={{ openSnackbar: handleOpenSnackbar }}>
      {children}
      <Snackbar open={isOpen} autoHideDuration={3000} onClose={handleCloseSnackbar} severity="success"><div>
        <Alert onClose={handleCloseSnackbar} severity="success">
          Success!
        </Alert>
      </div>
      </Snackbar>
    </SnackbarContext.Provider>
  );
}

export default SnackbarProvider;
