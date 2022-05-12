import { Box, Divider, Typography } from '@mui/material';
import React from 'react';
import { ButtonSmall } from '../../src/shared-components/Button';
import styles from '../../styles/Profile.module.css';

function ShoppingHistory() {
  return (
    <Box
      sx={{
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        padding: '100px 5rem',
        width: '100%',
        // flex: '4',
        height: '100%',
      }}
    >
      <Typography variant="h3" className={styles.profile__header}>
        SHOPPING HISTORY
      </Typography>
      <Box>
        {[1, 2, 3, 4, 5].map((item, i) => (
          <Box
            key={i}
            sx={{
              display: 'flex',
              flexDirection: 'column',
              width: { xs: '100%', md: '636px' },
              height: '332px',
              background: ' #FFFFFF',
              boxShadow: '0px 4px 5px rgba(0, 0, 0, 0.15)',
              borderRadius: '25px',
              padding: '62px',
              marginBottom: '24px',
            }}
          >
            <Box
              sx={{
                display: 'flex',
                justifyContent: 'space-evenly',
                width: '100%',
              }}
            >
              <Box
                sx={{
                  marginRight: '24px',
                  marginBottom: '42px',
                }}
              >
                <img src="/data.svg" alt="item" width={120} height={120} />
              </Box>
              <Box
                sx={{
                  display: 'flex',
                }}
              >
                <Box className={styles.profile__card__address}>
                  <Typography
                    variant="p"
                    className={styles.profile__card__address__para}
                  >
                    Total Purchase
                  </Typography>
                  <Typography
                    variant="p"
                    sx={{
                      marginBottom: '42px',
                    }}
                  >
                    Delivery Address
                  </Typography>
                  <Typography
                    variant="p"
                    className={styles.profile__card__address__para}
                  >
                    Delivery date
                  </Typography>
                </Box>
                <Divider
                  sx={{
                    border: '1px solid rgba(0, 0, 0, 0.3)',
                    margin: ' 0 1rem',
                    marginBottom: '42px',
                  }}
                />
                <Box className={styles.profile__card__address}>
                  <Typography
                    variant="p"
                    className={styles.profile__card__address__para}
                  >
                    NGN 15,700
                  </Typography>
                  <Typography
                    variant="p"
                    className={styles.profile__card__address__para}
                  >
                    No. 45, Ojulegba road, Ojuelegba, Lagos
                  </Typography>
                  <Typography
                    variant="p"
                    className={styles.profile__card__address__para}
                  >
                    24th November, 2021
                  </Typography>
                </Box>
              </Box>
            </Box>
            <Box
              sx={{
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                width: '100%',
              }}
            >
              <ButtonSmall
                text="MORE DETAILS"
                color="#fff"
                backgroundColor="#0A503D"
                width="172px"
                height="47px"
                borderRadius="50px"
                fontSize="16px"
              />
            </Box>
          </Box>
        ))}
      </Box>
    </Box>
  );
}

export default ShoppingHistory;
