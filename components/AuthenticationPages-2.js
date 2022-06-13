import Image from 'next/image';
import { Typography, Box, Hidden } from '@mui/material';
import { ButtonBig as Button } from '../src/shared-components/Button';
import styles from '../styles/Input.module.css';
import Link from 'next/link';

const AuthenticationPages = ({
  heading,
  subHeading,
  question,
  questionValue,
  src,
  confirmation,
  inputType,
  marginTop,
  marginBottom,
  paddingxs,
  paddinglg,
  btnText,
  onClick,
}) => {
  return (
    <>
      <Box
        sx={{
          display: 'flex',
          justifyContent: 'space-between',
          padding: { lg: { paddinglg }, xs: { paddingxs } },
          width: '100%',
          //   padding: { lg: "30px 0  0 204px", xs: "24px" },
        }}
      >
        <Box
          className={styles.form__wrapper}
          sx={{
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'center',
            alignItems: 'center',
            width: '100%',
          }}
        >  
          <Typography
            variant="h4"
            sx={{
              width: '279px',
              height: '53px',
              fontStyle: 'normal',
              fontWeight: 'bold',
              fontSize: '20px',
              lineHeight: '53px',
              textAlign: 'center',
              letterSpacing: '0.04em',
              color: '#3A3A33',
              marginTop: '40px',
              marginBottom: '14px',
            }}
          >
            {heading}
          </Typography>
          <Typography
            variant="p"
            sx={{
              fontStyle: 'normal',
              fontWeight: '400',
              fontSize: '16px',
              lineHeight: '22px',
              textAlign: 'center',
              width: '500px',
              letterSpacing: ' 0.01em',
              color: '#3A3A33',
              marginBottom: '32px',
            }}
          >
            {subHeading}
          </Typography>

          {confirmation && (
            <Typography
              sx={{
                display: 'flex',
                justifyContent: 'flex-start',
                width: { lg: '100%', xs: '100%', md: '483.68px' },
                fontWeight: '400',
                fontSize: ' 14.1149px',
                lineHeight: ' 19px',
                color: ' #0A503D',
              }}
            >
              {inputType && <input type={inputType} name="" id="" />}
              {confirmation}
            </Typography>
          )}

          {btnText && (
            <Button
              text={btnText}
              color="#fff"
              backgroundColor="#0A503D"
              onClick={onClick}
            />
          )}

          <Typography
            sx={{
              marginBottom: { marginBottom },
              fontStyle: 'normal',
              fontWeight: '400',
              fontSize: '16px',
              lineHeight: '22px',
              marginTop: '16px',
              color: ' #3A3A33',
            }}
          >
            {question}
            <Box
              component="span"
              sx={{
                color: ' #0A503D',
                cursor: 'pointer'
              }}
            >
              {questionValue}
            </Box>
          </Typography>
        </Box>
        {src && (
          <Box
            xs={Hidden}
            sx={{
              marginTop: { marginTop },
              display: { xs: 'none', lg: 'flex' },
              width: '500px',
              marginLeft: '20px',
            }}
          >
            <Image src={src} alt="illustration" />
          </Box>
        )}
      </Box>
    </>
  );
};

export default AuthenticationPages;
