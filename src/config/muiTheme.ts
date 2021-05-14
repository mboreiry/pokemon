import { createMuiTheme } from '@material-ui/core';

const muiTheme = createMuiTheme({
    overrides: {
        MuiToolbar: {
            root: {
                fontSize: '0.9em',
                with: '100%',
                display: 'inline-flex',
                textAlign: 'center'
            },
        },
        MuiLinearProgress: {
            root: {
                height: '1vw',
                borderRadius: 24,
            }
        },
        MuiChip: {
            root: {
                marginRight: 5,
                marginBottom: 5,
            }
        }
    }
});

export default muiTheme;
