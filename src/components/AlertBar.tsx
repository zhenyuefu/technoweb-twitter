import React from 'react';
import {Alert, Snackbar} from "@mui/material";


interface IAlertBarProps {
   open: boolean;
   message: string;
   severity: 'success' | 'info' | 'warning' | 'error';
   onClose: () => void;
   vertical: 'top' | 'bottom';
   horizontal: 'left' | 'center' | 'right';
}

function AlertBar( props: IAlertBarProps ) {
    return (
        <Snackbar
            anchorOrigin={{ vertical: props.vertical, horizontal: props.horizontal }}
            open={props.open}
            onClose={props.onClose}
            key={props.vertical + props.horizontal}
        >
            <Alert
                onClose={props.onClose}
                severity={props.severity}
                sx={{ width: "100%" }}
            >
                {props.message}
            </Alert>
        </Snackbar>
    );

}

export default AlertBar;