import React from 'react'
import './Form.css'

import clsx from 'clsx';
import {makeStyles, withStyles} from '@material-ui/core/styles';
import IconButton from '@material-ui/core/IconButton';
import Input from '@material-ui/core/Input';
import InputLabel from '@material-ui/core/InputLabel';
import InputAdornment from '@material-ui/core/InputAdornment';
import FormHelperText from '@material-ui/core/FormHelperText';
import FormControl from '@material-ui/core/FormControl';
import Visibility from '@material-ui/icons/Visibility';
import VisibilityOff from '@material-ui/icons/VisibilityOff';
import {Button} from "@material-ui/core";

const AuthButton = withStyles({
    root: {
        boxShadow: 'none',
        textTransform: 'none',
        fontSize: '18',
        fontWeight: '300',
        padding: '6px 12px',
        letterSpacing: '1px',
        backgroundColor: '#8c7dd6',
        color: 'white',
        '&:hover':{
            backgroundColor: '#57488f',
        }
    }
})(Button)

const RegistrationButton = withStyles({
    root: {
        boxShadow: 'none',
        textTransform: 'none',
        color: '#8C7DD6',
        padding: '6px 12px',
    }
})(Button)

const useStyles = makeStyles((theme) => ({
    root: {
        display: 'flex',
        flexWrap: 'wrap',
    },
    margin: {
        margin: theme.spacing(1),
    },
    withoutLabel: {
        marginTop: theme.spacing(3),
    },
    textField: {
        width: '40ch',
    },
    button: {
        margin: '20px 0 10px 12px',
    },
}));

export default function Form(){
    const classes = useStyles()

    const [values, setValues] = React.useState({
        phone: '',
        password: '',
        showPassword: false
    })

    const [valid, setValid] = React.useState({
        phoneIsValid: true,
        passwordIsValid: true
    })

    const validatePhone = (input) => {
        const ref = new RegExp('^(\\s*)?(\\+)?([- _():=+]?\\d[- _():=+]?){10,14}(\\s*)?$')
        if(ref.exec(input)) {
            setValid({...valid, phoneIsValid:true})
        }
        else setValid({...valid, phoneIsValid:false})
    }

    const handleChange = (prop) => (event) => {
        if(prop==='phone'){
            validatePhone(event.target.value)
        }
        setValues({...values,[prop]:event.target.value})
    }

    const handleClickShowPassword = () => {
        setValues({...values, showPassword: !values.showPassword})
    }

    const handleMouseDownPassword = (event) => {
        event.preventDefault()
    }

    return (
        <div className={'Form '+classes.root}>
            <h1>Auth&reg</h1>
            <div>
                <FormControl className={clsx(classes.margin, classes.textField)}>
                    <InputLabel htmlFor='phone-email'>Phone/Email</InputLabel>
                    <Input
                        error={!valid.phoneIsValid}
                        id='phone-email'
                        value={values.phone}
                        onChange={handleChange('phone')}
                    />
                    <FormHelperText error={!valid.phoneIsValid}>{valid.phoneIsValid ? '':'Incorrect phone'}</FormHelperText>
                </FormControl>
            </div>
            <div>
                <FormControl className={clsx(classes.margin, classes.textField)}>
                    <InputLabel htmlFor='password'>Password</InputLabel>
                    <Input
                        id='password'
                        value={values.password}
                        type={values.showPassword? 'text':'password'}
                        onChange={handleChange('password')}
                        endAdornment={
                            <InputAdornment position='end'>
                                <IconButton
                                    aria-label='toggle password visibility'
                                    onMouseDown={handleMouseDownPassword}
                                    onClick={handleClickShowPassword}
                                >
                                    {values.showPassword ? <Visibility/> : <VisibilityOff/>}
                                </IconButton>
                            </InputAdornment>
                        }
                    />
                    <FormHelperText>Disabled</FormHelperText>
                </FormControl>
            </div>
            <div style={{margin:'20px 0 0 148px'}}>
                <RegistrationButton className={clsx( classes.button)}>
                    REGISTRATION
                </RegistrationButton>
                <AuthButton className={clsx(classes.button)}>
                    AUTH
                </AuthButton>
            </div>
        </div>
    )
}