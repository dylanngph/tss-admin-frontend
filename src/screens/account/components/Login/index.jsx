import React , {useState} from 'react';
import styled from '@emotion/styled'
import {
    Box,
    Link,
    Button,
    TextField,
    InputAdornment,
    IconButton
} from '@mui/material'
import Visibility from '@mui/icons-material/Visibility'
import VisibilityOff from '@mui/icons-material/VisibilityOff'
import {ReactComponent as LogoFullIcon} from 'icon/tss-logo-full.svg'


function LoginAccount({handleLogin , error}) {
    const [values, setValues] = useState({
        email: '',
        password: '',
        showPassword: false,
      })
    

    const handleChange = (prop) => (event) => {
    setValues({ ...values, [prop]: event.target.value });
    }

    const handleClickShowPassword = () => {
        setValues({
          ...values,
          showPassword: !values.showPassword,
        })
      }
    const handleMouseDownPassword = (event) => {
    event.preventDefault();
    }

    

    return (
        <Wrapper>
           <LoginBox>
               <LogoFullIcon style={{marginBottom: '40px'}} />
               <FieldBox>
                    <Label>
                        Địa chỉ e-mail
                    </Label>
                    <TextField
                        fullWidth
                        value={values.email}
                        onChange={handleChange('email')}
                        placeholder="your-email@gmail.com"
                        variant="outlined"
                    />
               </FieldBox>
               <FieldBox>
                    <Label>
                        Mật khẩu
                    </Label>
                    <TextField
                        fullWidth
                        type={values.showPassword ? 'text' : 'password'}
                        value={values.password}
                        onChange={handleChange('password')}
                        placeholder="******"
                        variant="outlined"
                        InputProps={{
                            endAdornment: 
                                <InputAdornment position="end">
                                    <IconButton
                                        onClick={handleClickShowPassword}
                                        onMouseDown={handleMouseDownPassword}
                                        edge="end"
                                        style={{color: '#A6B0C3'}}
                                    >
                                        {values.showPassword ?  <Visibility /> : <VisibilityOff />}
                                    </IconButton>
                                </InputAdornment>
                          }}
                    />
               </FieldBox>
               
               <Box sx={{
                   width: '100%',
                   textAlign: 'right'
               }}>
                    <LinkText
                        href=""
                    >
                        Quên mật khẩu?
                    </LinkText>
               </Box>

               {
                error ? <Box
                    sx={{
                        color: 'red',
                        textAlign: 'center'
                    }}
                    >
                        E-mail hoặc mật khẩu không đúng!
                    </Box>
                : null
               }
               <LoginButton 
                variant="contained"
                onClick={() => handleLogin(values)}
               >
                   Đăng nhập
                </LoginButton>
                <Box sx={{
                   width: '100%',
                   textAlign: 'center'
               }}>
                    <LinkText
                        href=""
                    >
                        Tạo tài khoản mới
                    </LinkText>
               </Box>
           </LoginBox>
        </Wrapper>
    );
}

const Wrapper = styled(Box)`
    background: #0C1136;
    display: flex;
    flex-direction: column;
    width: 100%;
    min-height: 100vh;
    align-items: center;
    justify-content: center;
`
const LoginBox = styled(Box)`
    background: #fff;
    min-height: 500px;
    width: 540px;
    border-radius: 12px;
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 20px;
    padding: 80px;
    .MuiOutlinedInput-root {
        background-color: #EFF2F5
    }
`
const FieldBox = styled(Box)`
    display: flex;
    flex-direction: column;
    gap: 5px;
    width: 100%;
`
const Label = styled(Box)`
    color: #58667E;
    font-weight: 500;
`
const LoginButton = styled(Button)`
    background-color: rgba(68,109,255, 1);
    box-shadow: none;
    width: 100%;
    padding: 8px 40px;
    &:hover {
        background-color: rgba(68,109,255, .8);
        box-shadow: none;
    }
`
const LinkText = styled(Link)`
    color: rgba(68,109,255, 1);
    text-decoration: none;
    font-weight: 700;
`

export default LoginAccount;