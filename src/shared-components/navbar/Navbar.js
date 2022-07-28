import { useState } from 'react';
import { logo } from '../../../assests/images/loginSvg';
import { Menu, ShoppingCart, Close, Clear, Search } from '@mui/icons-material';
import {
  Box,
  AppBar,
  Toolbar,
  IconButton,
  InputBase,
  Paper,
  Divider,
  Typography,
} from '@mui/material';
import { ButtonSmall as Button } from '../Button';
import styles from '../../../styles/Navbar.module.css';
import ReactTooltip from 'react-tooltip';
import style from '../../../styles/Shop.module.css';
import { ButtonSmall } from '../Button';
import Image from 'next/image';
import CardPayment from '../../../public/CardPayment.svg';
import FreeShipping from '../../../public/FreeShipping.svg';
import returnsIcon from '../../../public/returnsIcon.svg';
import OnlineSupport from '../../../public/OnlineSupport.svg';
import SearchNavbar from './SearchNavbar';
import Link from 'next/link';
import { useSelector, useDispatch } from 'react-redux';
import { login } from '../../redux/slice/auth/AuthSlice';
import { logout } from '../../redux/auth/authAction';
import { useCart } from 'react-use-cart';
import { getCart } from '../../redux/cart/cartAction';
import { useRouter } from 'next/router';
import StoresAroundYou from '../../page-components/modal/StoresAroundYou';
import StoresLocation from '../../page-components/modal/StoresLocation';
import { toggleModal } from '../../redux/stores/storesActions';
import Portal from '../../../components/Portal';
import { styled } from '@mui/material/styles';
import Tooltip, { TooltipProps, tooltipClasses } from '@mui/material/Tooltip';


const Navbar = () => {
  const [showNav, setShowNav] = useState(false);
  const [menuIcon, setMenuIcon] = useState(false);
  const [show, setShow] = useState(false);
  const { totalItems, emptyCart } = useCart();
  const [val, setVal] = useState('');
  const [query, setQuery] = useState('');

  const { isLogged_in } = useSelector((state) => state.auth);
  const { cart } = useSelector((state) => state.cart);
  const [active, setActive] = useState(false);
  const [activePage, setActivePage] = useState('');
  const [searchField, setSearchField] = useState(false);

  const navList = [
    {
      id: 1,
      value: 'Home',
      route: '/',
    },
    {
      id: 2,
      value: 'Food Market',
      route: '/FoodMarket',
    },
    {
      id: 3,
      value: 'Stores around you',
      // route: '/StoresModal',
    },
  ];

  const dispatch = useDispatch();

  const router = useRouter();

  const handleMenu = () => {
    setShowNav(true);
    setMenuIcon(true);
  };

  const handleClose = () => {
    setShowNav(false);
    setMenuIcon(false);
  };

  const changeLogo = () => {
    setSearchField(true);
  };

  const clearSearchField = () => {
    setVal('');
  };

  const searchNewStore = () => {
    setShowNav(current => !current)
  }

  const storesAround = () => {
    setShowNav(current => !current)
  }

  const LightTooltip = styled(({ className, ...props }) => (
    <Tooltip {...props} classes={{ popper: className }} />
  ))(({ theme }) => ({
    [`& .${tooltipClasses.tooltip}`]: {
      backgroundColor: theme.palette.common.white,
      color: 'rgba(0, 0, 0, 0.87)',
      boxShadow: theme.shadows[1],
      width: '200px',
      fontWeight: 'bold',
      fontSize: 11,
    },
  }));


  return (
    <AppBar
      elevation={0}
      sx={{
        position: 'relative',
      }}
    >
      {/* /////// for large screens //////////////////////////// */}

      <Toolbar
        sx={{
          display: { xs: 'none', md: 'flex' },
          justifyContent: 'space-between',
          background: '#FFFFFF',
          height: '90px',
          // border: ' 0.259542px solid #B9B9B9',
        }}
      >
        <Box
          sx={{
            // border: '1px solid red',
            width: '30%',
            padding: '1rem 1rem',
            cursor: 'pointer',
          }}
          onClick={() => {
            router.push('/');
          }}
        >
          {/* <Link href="/"> */}
          <Box>{logo}</Box>
          {/* </Link> */}
        </Box>

        <Toolbar
          sx={{
            display: 'flex',
            width: '100%',
            justifyContent: 'center',
            alignItems: 'center',
            // border: '1px solid red',
          }}
        >
          <Box
            component="ul"
            className={styles.nav}
            sx={{
              width: { xs: '283px', md: '100%', lg: '50%' },
              // border: '1px solid red',
            }}
          >
              {navList?.map((list) => {
                if (list.value === 'Stores around you')
                  return (
                    <LightTooltip
                      title="Allow Afiari Help you locate and shop from Stores close to your location" 
                      placement='bottom-start'
                    >
                      <li
                        key={list.id}
                        className={styles.nav__list}
                        style={{
                          fontWeight: list?.value === activePage ? '600' : '400',

                          color: list?.value === activePage ? '#000000' : '3a3a3a',
                        }}
                        onClick={() => {
                          dispatch(toggleModal());
                          // setActivePage(list?.value);
                          // setActive(true);
                        }}
                      >
                        {list?.value}
                      </li>
                    </LightTooltip>
                  );
                return (
                  <Link href={list.route} key={list.id} passHref>
                    <li
                      className={styles.nav__list}
                      style={{
                        fontWeight: list?.value === activePage ? '600' : '400',

                        color: list?.value === activePage ? '#000000' : '3a3a3a',
                      }}
                      onClick={() => {
                        setActivePage(list?.value);
                        setActive(true);
                      }}
                    >
                      {list?.value}
                    </li>
                  </Link>
                );
              })}
           
          </Box>
        </Toolbar>
        <Box
          sx={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'flex-end',
            width: '30%',
            padding: '1rem 1rem',
            // border: '1px solid red',
          }}
        >
          <Link href="/cart" passHref>
            <Box
              sx={{
                position: 'relative',
              }}
            >
              <ShoppingCart
                sx={{
                  color: '#000',
                  marginRight: '11px',
                  cursor: 'pointer',
                }}
              />

              <Box
                sx={{
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  position: 'absolute',
                  top: '0',
                  width: '10px',
                  height: '10px',
                  borderRadius: '100%',
                  background: 'red',
                  fontSize: '12px',
                  padding: '.5rem',
                  cursor: 'pointer',
                }}
              >
                {/* {totalItems} */}
                {!isLogged_in
                  ? totalItems
                  : cart?.cart?.[0]?.cart_items?.length
                  ? cart?.cart?.[0]?.cart_items?.length
                  : 0}
              </Box>
            </Box>
          </Link>
          {isLogged_in ? (
            <Box
              sx={{
                position: 'relative',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'space-evenly',
                width: '50px',
                cursor: 'pointer',
              }}
            >
              <Link href="/profile" passHref>
                <Image
                  src="/profile.svg"
                  width={24}
                  height={24}
                  alt="profile"
                />
              </Link>
              {show === false ? (
                <Image
                  src="/arrowDown.svg"
                  width={12}
                  height={6}
                  alt="arrow down"
                  onClick={() => setShow(!show)}
                />
              ) : (
                <Image
                  src="/arrowUp.svg"
                  width={12}
                  height={6}
                  alt="arrow up"
                  onClick={() => setShow(!show)}
                />
              )}

              {show === true && (
                <Box
                  component="div"
                  sx={{
                    position: 'absolute',
                    width: '78px',
                    height: '64px',
                    left: '-1.5rem',
                    top: '1.5rem',
                    background: '#FFFFFF',
                    border: '1px solid rgba(0, 0, 0, 0.3)',
                    borderRadius: ' 10px',
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'center',
                    justifyContent: 'center',
                  }}
                >
                  <Link href="/profile" passHref>
                    <Typography
                      variant="p"
                      sx={{
                        fontWeight: '400',
                        fontSize: '12px',
                        lineHeight: '18px',
                        color: '#000000',
                        marginBottom: '8px',
                      }}
                    >
                      My profile
                    </Typography>
                  </Link>
                  <Typography
                    variant="p"
                    sx={{
                      fontWeight: '400',
                      fontSize: '12px',
                      lineHeight: '18px',
                      color: '#000000',
                    }}
                    onClick={() => {
                      dispatch(logout());
                      emptyCart();
                    }}
                  >
                    Log Out
                  </Typography>
                </Box>
              )}
            </Box>
          ) : (
            <Box
              component="div"
              sx={{
                width: '150px',
                display: 'flex',
                justifyContent: 'space-between',
              }}
            >
              <Button
                text="LOG IN"
                color="#0A503D"
                width="36px"
                fontSize="10px"
                borderRadius="12.9771px"
                backgroundColor="#fff"
                fontWeight="600"
                lineHeight="8px"
                height="30px"
                border=" 1px solid #0A503D"
                onClick={() => {
                  router.push('/login');
                }}
              />

              <Button
                text="SIGN UP"
                color="#fff"
                width="36px"
                fontSize="10px"
                borderRadius="12.9771px"
                backgroundColor="#0A503D"
                fontWeight="600"
                lineHeight="8px"
                height="30px"
                href="/sign-up"
              />
            </Box>
          )}
        </Box>
      </Toolbar>

      {/* ////// end of large screens  /////////////// */}

      {/*///////////////////// For side view on menu ////////////////////////////////// */}
      <Toolbar
        sx={{
          display: { xs: 'flex', md: 'none' },
          justifyContent: 'space-between',
          background: '#FFFFFF',
          height: '45px',
          padding: '0',
          border: ' 0.259542px solid #B9B9B9',
        }}
      >
        {/* <Link href="/"> */}
        <Box
          sx={{
            marginLeft: '1rem',
          }}
          onClick={() => {
            router.push('/');
          }}
        >
          {logo}
        </Box>
        {/* </Link> */}

        <Box
          sx={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-evenly',
          }}
        >
          <Link href="/cart" passHref>
            <Box
              sx={{
                position: 'relative',
              }}
            >
              <ShoppingCart
                sx={{
                  color: '#000',
                  marginRight: '11px',
                  width: '20px',
                  height: '30px',
                }}
              />
              <Box
                sx={{
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  position: 'absolute',
                  top: '0',
                  width: '10px',
                  height: '10px',
                  borderRadius: '100%',
                  background: 'red',
                  fontSize: '12px',
                  padding: '.5rem',
                  cursor: 'pointer',
                }}
              >
                {!isLogged_in
                  ? totalItems
                  : cart?.cart?.[0]?.cart_items?.length
                  ? cart?.cart?.[0]?.cart_items?.length
                  : 0}
                {/* {isLogged_in
                    ? cart?.cart?.[0]?.cart_items?.length
                    : cartItems?.length} */}
              </Box>
            </Box>
          </Link>
          {/* <Box
            sx={{
              display: { md: 'flex', xs: 'none' },
              flexDirection: 'row',
              alignItems: 'center',
              justifyContent: 'flex-start',
              width: '100%',
            }}
          > */}
          {/* ////////////////////////// SEARCH TEXTAREA ////////////////// */}
          {/* {
              searchField ? <SearchNavbar /> : <Search />
            } */}

          {/* </Box> */}

          <Search
            className={styles.searchField}
            sx={{
              color: '#000',
              marginRight: '11px',
              width: '18px',
              height: '20px',
            }}
          />
          {!menuIcon && (
            <IconButton onClick={handleMenu}>
              <Menu
                sx={{
                  cursor: 'pointer',
                }}
              />
            </IconButton>
          )}
        </Box>

        {showNav && (
          <>
            <div className={styles.backdrop} onClick={handleClose}></div>
            <Toolbar
              className={styles.nav}
              sx={{
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'flex-start',
                alignItems: 'flex-start !important',
                position: 'absolute',
                top: '0',
                right: '0',
                width: { xs: '283px', md: '100%' },
                height: '345px',
                background: '#fff',
                zIndex: '5',
                transition: 'width 1s ease',
              }}
            >
              <IconButton
                sx={{
                  position: 'absolute',
                  top: '.5rem',
                  right: '1rem',
                }}
                onClick={handleClose}
              >
                <Close
                  sx={{
                    color: '#3a3a3a',
                  }}
                />
              </IconButton>
              <ul className={styles.nav__link}>
                <li className={styles.nav__links} onClick={handleClose}>
                  <Link href="/"> Home </Link>
                </li>

                <li className={styles.nav__links} onClick={handleClose}>
                  <Link href="/FoodMarket"> Food Market </Link>
                </li>

                <Tooltip title="Hello Stores" placement="bottom-start">
                  <li className={styles.nav__links}>
                    <span
                      onClick={() => {
                        dispatch(toggleModal());
                      }}
                    >
                      Stores around you{' '}
                    </span>
                  </li>
                </Tooltip>
              </ul>

              <Box
                sx={{
                  display: 'flex',
                  alignItems: 'center',
                  //   border: "1px solid red",
                }}
              >
                {isLogged_in ? (
                  <Box
                    onClick={() => setShow(!show)}
                    sx={{
                      position: 'relative',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'space-evenly',
                      width: '50px',
                      cursor: 'pointer',
                    }}
                  >
                    <Image
                      src="/profile.svg"
                      width={24}
                      height={24}
                      alt="profile"
                      onClick={() => {
                        router.push('/profile');
                      }}
                    />
                    {show === false ? (
                      <Image
                        src="/arrowDown.svg"
                        width={12}
                        height={6}
                        alt="arrow down"
                      />
                    ) : (
                      <Image
                        src="/arrowUp.svg"
                        width={12}
                        height={6}
                        alt="arrow up"
                      />
                    )}

                    {show === true && (
                      <Box
                        component="div"
                        sx={{
                          position: 'absolute',
                          width: '78px',
                          height: '64px',
                          left: '-1.5rem',
                          top: '1.5rem',
                          background: '#FFFFFF',
                          border: '1px solid rgba(0, 0, 0, 0.3)',
                          borderRadius: ' 10px',
                          display: 'flex',
                          flexDirection: 'column',
                          alignItems: 'center',
                          justifyContent: 'center',
                          zIndex: '2000000000000',
                        }}
                      >
                        <Link href="/profile" passHref>
                          <Typography
                            variant="p"
                            sx={{
                              fontWeight: '400',
                              fontSize: '12px',
                              lineHeight: '18px',
                              color: '#000000',
                              marginBottom: '8px',
                            }}
                          >
                            My profile
                          </Typography>
                        </Link>

                        <Typography
                          variant="p"
                          sx={{
                            fontWeight: '400',
                            fontSize: '12px',
                            lineHeight: '18px',
                            color: '#000000',
                          }}
                          onClick={() => {
                            dispatch(logout());
                            emptyCart();
                          }}
                        >
                          Log Out
                        </Typography>
                      </Box>
                    )}
                  </Box>
                ) : (
                  <Box
                    component="div"
                    sx={{
                      width: '150px',
                      display: 'flex',
                      justifyContent: 'space-between',
                    }}
                  >
                    <Button
                      text="LOG IN"
                      color="#0A503D"
                      width="36px"
                      fontSize="10px"
                      borderRadius="12.9771px"
                      backgroundColor="#fff"
                      fontWeight="600"
                      lineHeight="8px"
                      height="30px"
                      border=" 1px solid #0A503D"
                      onClick={() => {
                        router.push('/login');
                      }}
                    />

                    <Button
                      text="SIGN UP"
                      color="#fff"
                      width="36px"
                      fontSize="10px"
                      borderRadius="12.9771px"
                      backgroundColor="#0A503D"
                      fontWeight="600"
                      lineHeight="8px"
                      height="30px"
                      href="/sign-up"
                    />
                  </Box>
                )}
              </Box>

              <Divider
                orientation="horizontal"
                flexItem
                sx={{
                  display: { xs: 'flex', md: 'none' },
                  margin: { md: '16px 0px 0px 29px', xs: '1rem 0' },
                  border: '1px solid #E6E6E',
                }}
              ></Divider>

              <Box
                sx={{
                  display: 'grid',
                  gridTemplateColumns: 'repeat(2, 1fr)',
                  gap: '1',
                  flexWrap: 'wrap',
                  width: '100%',
                  justifyContent: 'flex-start',
                }}
              >
                <li className={styles.nav__service__link}>
                  <Image
                    src={FreeShipping}
                    alt="Free Shipping"
                    width={15}
                    height={15}
                  />
                  Free Shipping
                </li>
                <li className={styles.nav__service__link}>
                  <Image
                    src={returnsIcon}
                    alt="Easy Returns"
                    width={15}
                    height={15}
                  />
                  Easy Returns
                </li>
                <li className={styles.nav__service__link}>
                  <Image
                    src={CardPayment}
                    alt="Card Payment"
                    width={15}
                    height={15}
                  />
                  Secure Payment
                </li>
                <li className={styles.nav__service__link}>
                  <Image
                    src={OnlineSupport}
                    alt="Online Support"
                    width={15}
                    height={15}
                  />
                  Support 24/7
                </li>
              </Box>
            </Toolbar>
          </>
        )}
      </Toolbar>

      {/* ///////////////////////////////////// end of side view for mobile ///////////////////////////////////////////////////////////////////////// */}

      {/*///////////////////// service for large screens ////////////////////////////////*/}

      <Portal elemId="modal">
        {showNav ?  (<StoresLocation storesAround={storesAround} />) : (<StoresAroundYou newStore={searchNewStore} />)}
      </Portal>
    </AppBar>
  );
};

export default Navbar;
