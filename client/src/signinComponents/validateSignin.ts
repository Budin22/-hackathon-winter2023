import * as yup from 'yup';

export const signin = yup.object ({
    name: yup.string().required().min(3).max(25).required(),
    email: yup.string().email().required(), 
    password: yup.string().matches(/^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.{8,})/, 
        "Requires at least one uppercase letter, one lowercase letter and one number.").min(6).max(25).required(),
    password2: yup.string().oneOf([yup.ref("password")], "Passwords do not match. ").required()
})