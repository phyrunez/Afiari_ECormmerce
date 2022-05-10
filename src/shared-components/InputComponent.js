import { Typography, Box, Button, Hidden, IconButton } from '@mui/material';
import styles from '../../styles/Input.module.css';
import facebookIcon from '../../public/facebookIcon.svg';
import googleIcon from '../../public/google-symbol 1.png';
import Image from 'next/image';
import { LoginWithButton } from './Button';

export const Input = ({
  label,
  placeholder,
  icon,
  htmlFor,
  type,
  onChange,
  name,
  id,
  value,
  onClick,
}) => {
  return (
    <Box
      className={styles.input__wrapper}
      sx={{
        width: { lg: ' 360px', sm: '360px', xs: '100%', md: '360px' },
      }}
      onClick={onClick}
    >
      <label htmlFor={htmlFor} className={styles.label}>
        {label}
      </label>
      <Box className={styles.input_icon_div}>
        <Box
          component="input"
          type={type}
          placeholder={placeholder}
          className={styles.input}
          onChange={onChange}
          id={id}
          name={name}
          value={value}
          required
        />

        <Box
          sx={{
            height: '10px',
            marginTop: '-.8rem',
          }}
        >
          {icon}
        </Box>
      </Box>
    </Box>
  );
};

export const LoginBtnComponent = ({ text, text2 }) => {
  return (
    <>
      <Box
        className="login__options"
        sx={{
          position: 'relative',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          width: { lg: ' 360px', sm: '360px', xs: '100%', md: '360px' },
          borderTop: '0.609842px solid #000000',
          marginTop: '30px',
        }}
      >
        <Typography
          sx={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            position: 'absolute',
            top: '-1rem',
            padding: '0 10px',
            // width: "100px",
            height: '28.66px',
            fontStyle: 'normal',
            fontWeight: '400',
            fontSize: '17.6436px',
            lineHeight: '24px',
            color: '#3A3A33',
            background: '#fff',
          }}
        >
          Or
        </Typography>

        <LoginWithButton
          text={text}
          color="#3A3A3A"
          backgroundColor="#FFFFFF"
          src={googleIcon}
        />

        <LoginWithButton
          text={text2}
          color="#3A3A3A"
          backgroundColor="#FFFFFF"
          src={facebookIcon}
        />
      </Box>
    </>
  );
};
//  text email
