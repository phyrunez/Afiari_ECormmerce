import { Email, Phone, Visibility, VisibilityOff } from '@mui/icons-material';
import { Box, Typography } from '@mui/material';
import React, { useState } from 'react';
import {
  handleUserInput,
  updateProfile,
} from '../../src/redux/auth/authAction';
import { ButtonSmall } from '../../src/shared-components/Button';
import { Input, InputSmall } from '../../src/shared-components/InputComponent';
import styles from '../../styles/Profile.module.css';
import { useSelector, useDispatch } from 'react-redux';
import { toast } from 'react-toastify';

function ProfileSettings() {
  const [visible, setVisible] = useState(false);
  const [day, setDay] = useState(0);
  const [month, setMonth] = useState('');

  const {
    email,
    firstName,
    lastName,
    dialCode,
    birth_month,
    birth_day,
    phone_number,
    picture_url,
    password,
    loading,
    address,
    country,
  } = useSelector((state) => state.auth);

  const dispatch = useDispatch();

  const onSubmit = (e) => {
    e.preventDefault();
    const data = {
      FirstName: firstName,
      LastName: lastName,
      BirthDay: day,
      BirthMonth: birth_month,
      BirthYear: birth_month,
      PhoneNumber: phone_number,
      ProfilePicture: picture_url,
    };

    dispatch(updateProfile(data));
    toast.success('Profile Updated');
    console.log('updated');
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
          // width: '50%',
          // border: '1px solid blue',
        }}
      >
        <Typography
          variant="h2"
          className={styles.profile__header}
          sx={{
            marginTop: '2rem',
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
              src="/data.svg"
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
              Michael Adewole
            </Typography>
          </Box>
          <input
            type="file"
            placeholder="UPDATE PROFILE"
            className={styles.profile__image__upload__btn}
          />
        </Box>

        <Box
          variant="form"
          sx={{
            display: 'flex',
            flexDirection: 'column',
            //   alignItems: 'center',
            justifyContent: 'center',
            //   width: '100%',
            // border: '1px solid red',
          }}
        >
          <InputSmall
            type="text"
            label="Full name"
            placeholder="Michael Adewole"
            className={styles.profile__settings__input_wrapper}
            onChange={(e) => {
              dispatch(handleUserInput('firstName', e.target.value));
            }}
            name="firstName"
            id="firstName"
            value={firstName}
          />
          <InputSmall
            type="text"
            label="Address"
            placeholder="No. 45, Ojulegba road, Ojuelegba, Lagos"
            className={styles.profile__settings__input_wrapper}
            onChange={(e) => {
              dispatch(handleUserInput('address', e.target.value));
            }}
            name="address"
            id="address"
            value={address}
          />

          <InputSmall
            type="email"
            label="Email"
            placeholder="somebody@mail.com"
            className={styles.profile__settings__input_wrapper}
            icon={<Email fontSize="24px" />}
            onChange={(e) => {
              dispatch(handleUserInput('email', e.target.value));
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
              dispatch(handleUserInput('password', e.target.value));
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
              onChange={(e) => {
                dispatch(handleUserInput('phone_number', e.target.value));
              }}
              name="phone_number"
              id="phone_number"
              value={phone_number}
            />
          </Box>
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
                dispatch(handleUserInput('country', e.target.value));
              }}
              name="country"
              id="country"
              value={country}
            >
              <option value="">Nigeria</option>
            </select>
          </Box>

          <label htmlFor="dateOfBirth">Date of birth</label>
          <Box
            sx={{
              display: 'grid',
              gridTemplateColumns: 'repeat(1, 1fr 1fr)',
              marginBottom: '1rem',
              width: { xs: '230px', md: '250px' },
              gap: 2,
            }}
          >
            <Box className={styles.profile__settings__input__small}>
              <label
                htmlFor="day"
                style={{
                  fontSize: '12px',
                }}
              >
                Day
              </label>
              <select
                className={styles.profile__settings__select}
                onChange={(e) => {
                  setDay(e.target.value);
                }}
                name="birth_day"
                id="birth_day"
                value={day}
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
                htmlFor="day"
                style={{
                  fontSize: '12px',
                }}
              >
                Month
              </label>
              <select
                className={styles.profile__settings__select}
                onChange={(e) => {
                  dispatch(handleUserInput('birth_month', e.target.value));
                }}
                name="birth_month"
                id="birth_month"
                value={birth_month}
              >
                <option value="">07</option>
              </select>
            </Box>
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
