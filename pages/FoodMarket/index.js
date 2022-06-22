import {
  Box,
  Typography,
  Divider,
  IconButton,
  Paper,
  InputBase,
} from '@mui/material';
import { Search, Clear } from '@mui/icons-material';
import { useEffect, useState } from 'react';
import Select from 'react-select';
import Footer from '../../src/page-components/Footer';
import ShopCard from '../../src/page-components/shop/ShopCard';
import ShopSideBoxComponent from '../../src/page-components/shop/ShopSideBoxComponent';
// import styles from '../../../styles/Shop.module.css';
import styles from '../../styles/Shop.module.css';
import shopBg from '../../public/shop-bg.svg';
import Image from 'next/image';
import CartComponent from '../../src/page-components/shop/CartComponent';
import ServiceCard from '../../src/page-components/ServiceCard';
import { ButtonSmall } from '../../src/shared-components/Button';
import Navbar from '../../src/shared-components/navbar/Navbar';
import SearchNavbar from '../../src/shared-components/navbar/SearchNavbar';
import { useRouter } from 'next/router';
import { useDispatch, useSelector } from 'react-redux';
import {
  getProductsByCategory,
  setSelectedCategory,
  getAllProducts,
  getAllCountries,
  getSearchProduct,
  setSearched,
  setInitialMetaData,
} from '../../src/redux/general/generalAction';
import Spinner from '../../components/Spinner';
import { handleDelete, setIsLoading } from '../../src/redux/cart/cartAction';
import DeleteNotification from '../../src/page-components/shop/DeleteNotification';
import ReactTypingEffect from 'react-typing-effect';
import { setUserCountry } from '../../src/redux/auth/authAction';

function Shop() {
  const {
    categories,
    countries,
    meta_data: metaData,
    product, 
    productCategory,
    searched
  } = useSelector((state) => state.general);

  const { country, loading } = useSelector((state) => state.auth);

  const [selectedOption, setSelectedOption] = useState(null);

  const [show, setShow] = useState(false);
  const [itemID, setItemID] = useState('');
  const [query, setQuery] = useState('');
  const [val, setVal] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [pageload, setPageload] = useState(false);
  const [searchFieldLoaded, setSearchFieldLoaded] = useState(false);

  const { page_size, number_of_pages, page_index, total_count } = metaData;

  const dispatch = useDispatch();

  const categoriesOptions = () => {
    const newData = categories.map((category) => category);
    return newData;
  };

  const items = categoriesOptions().map((category) => ({
    value: category.item_value,
    id: category.id,
  }));

  const finalItems = items.map((item) => ({
    value: item.value,
    label: item.value,
    id: item.id,
  }));

  const ALL_PRODUCT_ID = 'all';
  let options = finalItems;
  options = [
    {
      value: 'All products',
      label: 'All products',
      id: ALL_PRODUCT_ID,
    },
    ...options,
  ];

  // /////////////// SETTING UP THE STYLE FOR THE REACT SELECT ////////////////////////////

  //1. FOR THE CATEGORIES
  const selectStyle = {
    container: (provided, state) => ({
      ...provided,
      width: '135px',
    }),

    control: (base, state) => ({
      ...base,
      border: 0,
      boxShadow: 'none',
      border: state.isFocused ? 0 : 0,
      boxShadow: state.isFocused ? 0 : 0,
      '&:hover': {
        border: state.isFocused ? 0 : 0,
      },
    }),

    dropdownIndicator: (provided, state) => ({
      ...provided,
      color: '#000',
    }),

    indicatorSeparator: (provided, state) => ({
      ...provided,
      display: 'none',
    }),
  };

  //2.FOR THE FILTER SELECT
  const filterSelectStyle = {
    container: (provided, state) => ({
      ...provided,
      width: '79px',
    }),

    control: (base, state) => ({
      ...base,
      //   border: 0,
      boxShadow: 'none',
      borderRadius: '50px',
      backgroundColor: ' #0A503D',
      border: state.isFocused ? 0 : 0,
      // This line disable the blue border
      boxShadow: state.isFocused ? 0 : 0,
      '&:hover': {
        border: state.isFocused ? 0 : 0,
      },
    }),

    dropdownIndicator: (provided, state) => ({
      ...provided,
      color: '#fff',
    }),

    indicatorSeparator: (provided, state) => ({
      ...provided,
      display: 'none',
    }),
  };

  // /////////////// END OF SETTING UP THE STYLE FOR THE REACT SELECT ////////////////////////////

  const router = useRouter();

  const setId = (id) => {
    setItemID(id);
  };

  const handleModal = (id) => {
    setShow(!show);
    dispatch(handleDelete(id));
  };

  const handleCancel = (id) => {
    setShow(!show);
  };

  const onChange = (selectedOption) => {  
    setIsLoading(true)
    const countryId = JSON.parse(localStorage.getItem('selectedCountry'));
    setSelectedOption(selectedOption);
    if(selectedOption.id === ALL_PRODUCT_ID){
      dispatch(setSelectedCategory(''));
      dispatch(setSearched(false));
      dispatch(getAllProducts(country, 1));
    } else {
      dispatch(
        getProductsByCategory(
          country ? country : countryId?.id,
          selectedOption.id
        )
      );
      dispatch(setSelectedCategory(selectedOption.value));
    }
  };

  // CLEAR SEARCH FIELD ON BUTTON CLICKED
  const clearSearchField = () => {
    setVal('')
  };

  // SEARCH
  const search = () => {
    if(val.trim() === "") return
     const pageNumber = 1;
    setIsLoading(true);
    dispatch(getSearchProduct(query, country, pageNumber))
  }

  useEffect(() => {
    const countryId = JSON.parse(localStorage.getItem('selectedCountry'));
    const pageNumber = 1;
    dispatch(getAllProducts(countryId?.id, pageNumber));
    dispatch(setUserCountry(countryId?.id));
<<<<<<< HEAD
=======
    console.log(loading);
    // dispatch(getSearchProduct('', country, page_index));
    // dispatch(getProductCategory(item));
>>>>>>> dev_03
  }, [dispatch]);

  useEffect(() => {
    if (val.trim() !== '') {
      setSearchFieldLoaded(true);
    } else {
      setSearchFieldLoaded(false);
      dispatch(setSearched(false));
      const pageNumber = 1;
      dispatch(getAllProducts(country, pageNumber));
    }
  }, [val]);

   useEffect(() => {
     setIsLoading(false)
   }, [product, searched, productCategory]);

  return (
    <Box
      sx={{
        position: 'relative',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        width: '100%',
        // border: '1px solid red',
      }}
    >
      <SearchNavbar setIsLoading={setIsLoading} />
      {show && (
        <DeleteNotification
          id={itemID}
          handleCancel={handleCancel}
          handleModal={handleModal}
        />
      )}
      {pageload && <Spinner />}
      <Box
        className={styles.shop__header}
        sx={{
          display: 'flex',
          flexDirection: 'row',
          alignItems: 'center',
          justifyContent: { xs: 'center', md: 'space-evenly' },
          width: '100%',
          height: { xs: '229px', md: '402px' },
          backgroundImage: { xs: 'url("/shop-bg.svg")', md: 'none' },
          background: { md: '#E8FFF9' },
          backgroundRepeat: 'no-repeat',
          backgroundSize: 'contain',
          backgroundPosition: 'center',
          marginBottom: '25px',
        }}
      >
        <Box
          sx={{
            display: 'flex',
            flexDirection: 'column',
            justifyContent: { xs: 'center', md: 'space-evenly' },
            width: { xs: '100%', md: '50%' },
            height: '100%',
          }}
        >
          {/* <ReactTypingEffect text={['Hello.', 'World!']} /> */}

          <ReactTypingEffect
            text={[
              '    Want to buy foodstuff needed in the kitchen?',
              'Send us. We buy, package and deliver to you the next day!!!',
            ]}
            cursorRenderer={(cursor) => <h1>{cursor}</h1>}
            className={styles.typing_text}
            speed={50}
            eraseSpeed={50}
            eraseDelay={1200}
            typingDelay={500}
            displayTextRenderer={(text, i) => {
              return (
                <Typography
                  variant="h1"
                  sx={{
                    fontWeight: '600',
                    fontSize: { xs: '20px', md: '38px' },
                    lineHeight: { xs: '37px', md: '45px' },
                    textAlign: { xs: 'center', md: 'justify' },
                    color: ' #FFFFFF',

                    alignItems: { xs: 'center', md: 'flex-start' },
                    justifyContent: 'center',
                    width: { xs: '100%', md: '445px', lg: '632px' },
                    height: { xs: '100%', md: 'auto' },
                    // background: { xs: ' rgba(0, 34, 25, 0.824)', md: 'none' },
                    padding: { xs: '2rem', md: '0rem' },
                  }}
                >
                  {text.split('').map((char, i) => {
                    const key = `${i}`;
                    return (
                      <span
                        key={key}
                        // style={i % 2 === 0 ? { color: 'magenta' } : {}}
                      >
                        {char}
                      </span>
                    );
                  })}
                </Typography>
              );
            }}
          />
          <Typography
            //   className={styles.shop__header__text}
            variant="h1"
            sx={{
              fontWeight: '600',
              fontSize: { xs: '20px', md: '38px' },
              lineHeight: { xs: '37px', md: '45px' },
              textAlign: { xs: 'center', md: 'justify' },
              color: { xs: ' #FFFFFF', md: '#3a3a3a' },
              display: { xs: 'none', md: 'flex' },
              flexDirection: 'column',
              alignItems: { xs: 'center', md: 'flex-start' },
              justifyContent: 'center',
              width: { xs: '100%', md: '445px', lg: '632px' },
              height: { xs: '100%', md: 'auto' },
              background: { xs: ' rgba(0, 34, 25, 0.824)', md: 'none' },
              padding: { xs: '2rem', md: '0rem' },
            }}
          >
            Want to buy foodstuff needed in the kitchen?
          </Typography>
          <Typography
            variant="p"
            sx={{
              fontWeight: '400',
              fontSize: { xs: '16px', md: '24px' },
              lineHeight: { xs: '33px' },
              textAlign: { xs: 'center', md: 'justify' },
              color: { xs: ' #FFFFFF', md: '#3a3a3a' },
              display: { xs: 'none', md: 'flex' },
              flexDirection: 'column',
              alignItems: { xs: 'center', md: 'flex-start' },
              justifyContent: 'center',
              width: { xs: '100%', md: '445px', lg: '632px' },
              height: { xs: '100%', md: 'auto' },
              background: { xs: ' rgba(0, 34, 25, 0.824)', md: 'none' },
              padding: { xs: '2rem', md: '0rem' },
            }}
          >
            {' '}
            Send us. We buy, package and deliver to you the next day
          </Typography>

          <Box
            className={styles.mobileSearchView}
            sx={{
              display: { md: 'flex', xs: 'none' },
              flexDirection: 'row',
              alignItems: 'center',
              justifyContent: 'flex-start',
              width: '100%',
            }}
          >
            {/* ////////////////////////// SEARCH TEXTAREA ////////////////// */}
            <Paper
              component="form"
              sx={{
                p: '2px 4px',
                display: 'flex',
                alignItems: 'center',
                width: '100%',
                border: '1.53151px solid rgba(0, 0, 0, 0.3)',
                borderRadius: '20.6713px',
                marginRight: '1rem',
              }}
            >
              <InputBase
                sx={{ ml: 1, flex: 1 }}
                placeholder="Search for food item"
                inputProps={{ 'aria-label': 'Search for food item' }}
                onChange={(e) => {
                  setVal(e.target.value);
                  setQuery(e.target.value);
                }}
                value={val}
              />
              <IconButton
                type="button"
                sx={{ p: '10px' }}
                aria-label="search"
                onClick={() => clearSearchField()}>
                {
                  searchFieldLoaded ? <Clear /> : <Search />
                }
              </IconButton>
            </Paper>

            {/* ////////////////////////// END OF SEARCH TEXTAREA ////////////////// */}

            <ButtonSmall
              width="100px"
              height="50px"
              borderRadius="50px"
              fontSize="12px"
              backgroundColor=" #0A503D"
              text="SEARCH"
              color="#fff"
              onClick={() => search()}
            />
          </Box>
        </Box>

        <Box
          sx={{
            display: { md: 'flex', xs: 'none' },
          }}
        >
          <Image src={shopBg} alt="product" width={400} height={300} />
        </Box>
      </Box>
      <Box
        component="div"
        sx={{
          display: 'flex',
          justifyContent: { md: 'space-between', xs: 'center' },
          width: '100%',
          marginBottom: '3rem',
        }}
      >
        <ShopSideBoxComponent setIsLoading={setIsLoading} />

        {/* //////////////////////////////////////////////// the filter and categories that only appear on mobile //////////////////////////////////////////////// */}
        <Box
          sx={{
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            justifyContent: 'center',
            width: '100%',
          }}
        >
          <Box
            sx={{
              display: { xs: 'flex', lg: 'none' },
              alignItems: 'center',
              justifyContent: 'space-around',
              // padding: '22px 0',
              width: '100%',
              marginBottom: '1rem',
            }}
          >
            <Select
              styles={selectStyle}
              value={selectedOption}
              onChange={onChange}
              options={options}
              placeholder={
                <div
                  style={{
                    fontSize: '11px',
                    width: '140px',
                    color: '#000000',
                  }}
                >
                  Product Category
                </div>
              }
            />

            <Select
              styles={filterSelectStyle}
              options={options}
              classNamePrefix="gooo__input"
              placeholder={
                <div
                  style={{
                    fontSize: '10px',
                    color: '#fff',
                  }}
                >
                  FILTER
                </div>
              }
            />
          </Box>

          {/* //////////////////////////////////////////////// end of the filter and categories that only appear on mobile //////////////////////////////////////////////// */}

          <Divider
            orientation="horizontal"
            flexItem
            sx={{
              display: { xs: 'flex', md: 'none' },
              // margin: { md: '16px 0px 0px 29px', xs: '1rem 0' },
              border: '1px solid #E6E6E',
            }}
         ></Divider>

          <ShopCard isLoading={isLoading} query={query} setIsLoading={setIsLoading} />

          {/* //////////////////////////////////////////////// the next and prev arrows //////////////////////////////////////////////// */}

          {/* //////////////////////////////////////////////// end of the next and prev arrows //////////////////////////////////////////////// */}
        </Box>

        <CartComponent setId={setId} handleCancel={handleCancel} />
      </Box>
      <Box
        sx={{
          display: { xs: 'none', md: 'flex' },
          width: '100%',
          height: '2px',
          background: '#F6F4F4',
          marginTop: '6px',
          marginBottom: '36px',
        }}
      ></Box>

      <ServiceCard />

      <Footer />
    </Box>
  );
}

export default Shop;
