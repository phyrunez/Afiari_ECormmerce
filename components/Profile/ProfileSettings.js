import { Email, Phone, Visibility, VisibilityOff } from '@mui/icons-material';
import { Box, Button, Typography } from '@mui/material';
import React, { useState } from 'react';
import {
  handleUserInput,
  setUserDayOfBirth,
  setUserMonthOfBirth,
  setUserYearOfBirth,
  updateProfile,
  uploadPicture,
} from '../../src/redux/auth/authAction';
import { ButtonSmall } from '../../src/shared-components/Button';
import { Input, InputSmall } from '../../src/shared-components/InputComponent';
import styles from '../../styles/Profile.module.css';
import { useSelector, useDispatch } from 'react-redux';
import { getSelectedProfileMenu } from '../../src/redux/general/generalAction';
import { toast } from 'react-toastify';

function ProfileSettings() {
  const [visible, setVisible] = useState(false);
  const [street, setStreet] = useState();
  const [picture_url, setPicture_url] = useState('');
  const [birth_day, setBirth_day] = useState('');
  const [birth_month, setBirth_month] = useState('');
  const [dialCode, setDialCode] = useState('');
  const [address, setAddress] = useState('');
  const [firstName, setFirstName] = useState('');
  const [userCountry, setUserCountry] = useState('')
  const [lastName, setLastName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [birth_year, setBirth_year] = useState('');
  const [phone_number, setPhone_number] = useState('');

  const {first_name, last_name} =
    useSelector((state) => state.auth);

  console.log(
    email,
    firstName,
    lastName,
    address,
    password,
    dialCode,
    +birth_month,
    +birth_day,
    birth_year,
    phone_number,
    picture_url,
    street
  );

  const dispatch = useDispatch();

  const onChange = (e) => {
    const reader = new FileReader();

    reader.onload = () => {
      if (reader.readyState === 2) {
        // picture_url = reader.result;
        setPicture_url(reader.result);
      }
    };

    reader.readAsDataURL(e.target.files[0]);
  };

  const onSubmit = (e) => {
    e.preventDefault();
    const data = {
      FirstName: firstName,
      LastName: lastName,
      Address: address,
      BirthDay: birth_day,
      BirthMonth: birth_month,
      BirthYear: birth_year,
      PhoneNumber: phone_number,
      ProfilePicture: picture_url,
    };

    dispatch(updateProfile(data));
    toast.success('Profile Updated');
  };

  return (
    <Box
      sx={{
        display: 'flex',
        flexDirection: 'column',
        alignItems: { xs: 'flex-start', md: 'center' },
        justifyContent: 'center',
        width: '100%',
        padding: { xs: '34px 0px', md: '25px 35px ' },
        marginLeft: { xs: '12px', sm: '35px', md: '0 ' },
        // border: '1px solid red',
      }}
      className={styles.profile__settings__wrapper}
    >
      <Box
        sx={{
          display: 'flex',
          flexDirection: 'column',
          // alignItems: 'center',
          justifyContent: 'center',
          marginTop: '30px'
          // width: '50%',
          // border: '1px solid blue',
        }}
      >
        <Typography
          variant="h2"
          className={styles.profile__header}
          sx={{
            // marginTop: '2rem',
            marginBottom: '16px',
          }}
        >
          PROFILE SETTINGS
        </Typography>

        <Box
          sx={{
            display: 'flex',
            alignItems: 'center',
            // justifyContent: 'center',
          }}
        >
          <Box
            sx={{
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
            }}
          >
            <img
              src={picture_url ? picture_url : '/user.svg'}
              alt="profile"
              className={styles.profile__image}
            />
            <Typography
              variant="p"
              sx={{
                fontStyle: 'normal',
                fontWeight: '400',
                fontSize: '16px',
                lineHeight: '22px',
                textAlign: ' center',
                letterSpacing: ' 0.04em',
                color: '#000000',
              }}
            >
              {first_name + ' ' + last_name}
            </Typography>
          </Box>
          {/* <input type="file" 
            placeholder="UPDATE PROFILE"
            className={styles.profile__image__upload__btn}
          /> */}
          <input
            type="file"
            accept="image/*"
            style={{ display: 'none' }}
            id="contained-button-file"
            className={styles.profile__image__upload__btn}
            // onChange={(e) => {
            //   dispatch(uploadPicture('picture_url', e.target.files[0]));
            // }}
            // name="picture_url"
            // value=""

            onChange={onChange}
          />
          <label htmlFor="contained-button-file" className={styles.profile__image__upload__btn__label} style={{ paddingBottom: '27px', paddingLeft: '20px'}}>
            <Button
              variant="contained"
              color="primary"
              component="span"
              className={styles.profile__image__upload__btn}
            >
              UPDATE PHOTO
            </Button>
          </label>
        </Box>

        <Box
          variant="form"
          sx={{
            display: 'flex',
            flexDirection: 'column',
            //   alignItems: 'center',
            justifyContent: 'center',
            paddingTop: '62px',
            //   width: '100%',
            // border: '1px solid red',
          }}
        >
          <InputSmall
            type="text"
            label="full name"
            placeholder={first_name + ' ' + last_name}
            className={styles.profile__settings__input_wrapper}
            onChange={(e) => {
              setFirstName(e.target.value);
            }}
            name="fullName"
            id="fullName"
            value={firstName}
          />
          <InputSmall
            type="text"
            label="address"
            placeholder="No. 45, Ojuelegba Road, Ojuelegba, Lagos"
            className={styles.profile__settings__input_wrapper}
            onChange={(e) => {
              setAddress(e.target.value);
            }}
            name="address"
            id="address"
            value={address}
          />

          <InputSmall
            type="text"
            label="Email"
            htmlFor="email"
            placeholder="somebody@mail.com"
            className={styles.profile__settings__input_wrapper}
            icon={<Email fontSize="24px" />}
            onChange={(e) => {
              // dispatch(handleUserInput('email', e.target.value));
              setEmail(e.target.value)
            }}
            name="email"
            id="email"
            value={email}
          />
                              
          <InputSmall
            label="Password"
            placeholder="************"
            type={visible ? 'text' : 'password'}
            className={styles.profile__settings__input_wrapper}
            icon={
              visible ? (
                <VisibilityOff fontSize="24px" />
              ) : (
                <Visibility fontSize="24px" />
              )
            }
            onClick={() => {
              setVisible(!visible);
            }}
            onChange={(e) => {
              // dispatch(handleUserInput('password', e.target.value));
              setPassword(e.target.value)
            }}
            name="password"
            id="password"
            value={password}
          />
          <Box
            sx={{
              display: 'grid',
              gridTemplateColumns: 'repeat(1, 1fr 2fr)',
              marginBottom: '1rem',
              width: { xs: '239.93px', md: '350px' },
              gap: 2,
            }}
          >
            <InputSmall
              className={styles.profile__settings__input__small}
              label="Dial code"
              placeholder="+234"
              type="text"
              component="input"
              onChange={(e) => {
                dispatch(handleUserInput('dialCode', e.target.value));
              }}
              name="dialCode"
              id="dialCode"
              value={dialCode}
            />

            <InputSmall
              className={styles.profile__settings__input__small__phone}
              label="Phone number"
              placeholder="08066655544"
              type="text"
              icon={<Phone fontSize="24px" />}
              // onChange={(e) => {
              //   dispatch(handleUserInput('phone_number', e.target.value));
              // }}
              onChange={(e) => {
                setPhone_number(e.target.value);
              }}
              name="phone_number"
              id="phone_number"
              value={phone_number}
            />
          </Box>

          {/* <InputSmall
            className={styles.profile__settings__input__small__phone}
            label="Phone number"
            placeholder="08066655544"
            type="text"
            icon={<Phone fontSize="24px" />}
            onChange={(e) => {
              setPhone_number(e.target.value);
            }}
            name="phone_number"
            id="phone_number"
            value={phone_number}
          /> */}

          {/*           
          <InputSmall
            label="Password"
            placeholder="************"
            type={visible ? 'text' : 'password'}
            className={styles.profile__settings__input_wrapper}
            icon={
              visible ? (
                <VisibilityOff fontSize="24px" />
              ) : (
                <Visibility fontSize="24px" />
              )
            }
            onClick={() => {
              setVisible(!visible);
            }}
            onChange={(e) => {
              dispatch(handleUserInput('password', e.target.value));
            }}
            name="password"
            id="password"
            value={password}
          /> */}

          {/* <Box
            sx={{
              display: 'grid',
              gridTemplateColumns: 'repeat(1, 1fr 2fr)',
              marginBottom: '1rem',
              width: { xs: '239.93px', md: '350px' },
              gap: 2,
            }}
          >
            <InputSmall
              className={styles.profile__settings__input__small}
              label="Dial code"
              placeholder="+234"
              type="text"
              component="input"
              onChange={(e) => {
                dispatch(handleUserInput('dialCode', e.target.value));
              }}
              name="dialCode"
              id="dialCode"
              value={dialCode}
            />

            <InputSmall
              className={styles.profile__settings__input__small__phone}
              label="Phone number"
              placeholder="08066655544"
              type="text"
              icon={<Phone fontSize="24px" />}
              onChange={(e) => {
                dispatch(handleUserInput('phone_number', e.target.value));
              }}
              name="phone_number"
              id="phone_number"
              value={phone_number}
            />
          </Box> */}
          <Box className={styles.profile__settings__input_wrapper}>
            <label
              htmlFor="country"
              style={{
                fontSize: '12px',
              }}
            >
              Country
            </label>
            <select
              placeholder="Country"
              className={styles.profile__settings__select}
              onChange={(e) => {
                setUserCountry(e.target.value)
              }}
              name="userCountry"
              id="country"
              value={userCountry}
            >
              <option value="Nigeria">Nigeria</option>
            </select>
          </Box>

          <label htmlFor="dateOfBirth" style={{ paddingTop: '10px', paddingBottom: '5px', fontWeight: '600', fontSize: '15px'}}>Date of birth</label>
          <Box
            sx={{
              display: 'grid',
              gridTemplateColumns: 'repeat(1, 1fr 1fr 1fr)',
              marginBottom: '1rem',
              width: { xs: '230px', md: '350px' },
              gap: 2,
            }}
          >
            <Box className={styles.profile__settings__input__small}>
              <label
                htmlFor="birth_day"
                style={{
                  fontSize: '12px',
                }}
              >
                Day
              </label>
              <select
                className={styles.profile__settings__select}
                onChange={(e) => {
                  setBirth_day(e.target.value);
                }}
                name="birth_day"
                id="birth_day"
                value={birth_day}
              >
                {[
                  1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18,
                  19, 20, 21, 22, 23, 24, 25, 26, 27, 28, 29, 30, 31,
                ].map((item, i) => (
                  <option key={i} value={item}>
                    {item}
                  </option>
                ))}
              </select>
            </Box>
            <Box className={styles.profile__settings__input__small}>
              <label
                htmlFor="birth_month"
                style={{
                  fontSize: '12px',
                }}
              >
                Month
              </label>
              <select
                className={styles.profile__settings__select}
                onChange={(e) => {
                  setBirth_month(e.target.value);
                }}
                name="birth_month"
                id="birth_month"
                value={birth_month}
              >
                {[1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12].map((item, i) => (
                  <option key={i} value={item}>
                    {item}
                  </option>
                ))}
              </select>
            </Box>
            {/* <Box className={styles.profile__settings__input__small}>
              <label
                htmlFor="birth_year"
                style={{
                  fontSize: '12px',
                }}
              >
                Month
              </label>
              <select
                className={styles.profile__settings__select}
                onChange={(e) => {
                  setBirth_year(e.target.value);
                }}
                name="birth_year"
                id="birth_year"
                value={birth_year}
              >
                
                {[
                  2022, 2021, 2020, 2019, 2018, 2017, 2016, 2015, 2014, 2013,
                  2012, 2011, 2010, 2009, 2008, 2007, 2006, 2005, 2004, 2003,
                  2002, 2001, 2000, 1999, 1998, 1997, 1996, 1995, 1994, 1993,
                  1992, 1991, 1990, 1989, 1988, 1987, 1986, 1985, 1984, 1983,
                  1982, 1981, 1980, 1979, 1978, 1977, 1976, 1975, 1974, 1973,
                  1972, 1971, 1970, 1969,

                  1968, 1967, 1966, 1965, 1964, 1963, 1962, 1961, 1960, 1959,
                  1958, 1957, 1956, 1955, 1954, 1953, 1952, 1951, 1950, 1949,
                  1948, 1947, 1946, 1945, 1944, 1943, 1942, 1941, 1940, 1939,
                  1938, 1937, 1936, 1935, 1934, 1933, 1932, 1931,
                ].map((item, i) => (
                  <option key={i} value={item}>
                    {item}
                  </option>
                ))}
              </select>
            </Box> */}
          </Box>
          <ButtonSmall
            text="UPDATE PROFILE"
            className={styles.profile__settings__btn}
            onClick={onSubmit}
          />
        </Box>
      </Box>
    </Box>
  );
}

export default ProfileSettings;
