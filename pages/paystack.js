import { Component } from 'react';
import { BASE_URL, API_ROUTES } from '../constants/config';
import $ from 'jquery';
import swal from 'sweetalert';

class Jquery extends Component {
  constructor(props) {
    super(props);
  }

  componentDidMount = () => {
    let token;
    if (typeof window !== 'undefined') {
      token = localStorage.getItem('Afiari_access');
    }

    const BASEURL = BASE_URL;
    const Auth_Header = {
      Authorization: 'Bearer ' + token,
    };

    //add to index.html
    //<script src="https://js.paystack.co/v1/inline.js"></script>
    //

    const PaystackScript = (callback) => {
      //STEP 1: Initiate the transaction
      let initiateUrlPath = API_ROUTES.initializePayment.route;
      let orderNumber = getParameterByName('orderNumber');
      let payload = JSON.stringify({
        orderNumber: orderNumber,
      });
      $.ajax({
        method: 'POST',
        url: `${BASEURL}/${initiateUrlPath}`,
        data: payload,
        contentType: 'application/json',
        dataType: 'json',
        headers: Auth_Header,
        success: function (data) {
          //$('#result').html(data);
          callback(data);
        },
        error: function (resp) {},
      });
    };

    const PaystackCallback = (resp) => {
      let transaction_ref;
      if (resp?.status) {
        transaction_ref = resp?.result[0]?.reference;
        let userEmail = getParameterByName('userEmail');
        let totalCost = getParameterByName('totalAmount');
        //get paystack public key
        $.ajax({
          method: 'GET',
          url: `${BASEURL}/${API_ROUTES.getPublicKey.route}`,
          success: function (key_resp) {
            //STEP 2: paystack process payment
            var handler = PaystackPop.setup({
              key: `${key_resp?.result[0]?.public_key}`,
              email: userEmail,
              amount: totalCost,
              ref: transaction_ref,

              callback: function (response) {
                console.log('paystack response => ', response);
                //VERIFY PAYMENT
                let VerifyUrlPath = API_ROUTES.verifyPayment.route;
                $.ajax({
                  method: 'GET',
                  url: `${BASEURL}/${VerifyUrlPath}${transaction_ref}`,
                  contentType: 'application/json',
                  dataType: 'json',
                  headers: Auth_Header,
                  success: function (resp) {
                    if (resp?.status) {
                      SuccessCallback(resp);
                      return;
                    }
                    swal({
                      title: 'Snap!',
                      text: resp,
                      icon: 'warning',
                      button: 'Ok',
                    });
                  },
                  error: function (resp) {
                    console.log('Error', resp);
                  },
                });
              },

              onClose: function () {
                ///CANCEL TRANSACTION
                let cancelUrlPath = API_ROUTES.cancelPayment.route;
                $.ajax({
                  method: 'GET',
                  url: `${BASEURL}/${cancelUrlPath}${transaction_ref}`,
                  contentType: 'application/json',
                  dataType: 'json',
                  headers: Auth_Header,
                  success: function (resp) {
                    //$('#result').html(resp)
                    console.log('User cancelled transaction', resp);
                    CancelCallback(resp);
                  },
                  error: function (resp) {
                    console.log('Error occured on close ', resp);
                  },
                });
              },
            });

            handler.openIframe();
          },
        });
      }
    };

    const SuccessCallback = (resp) => {
      if (resp?.status) {
        //verification successful
        swal({
          title: 'Good job!',
          text: 'Transaction Successful and Payment Recieved',
          icon: 'success',
          button: 'Ok',
        });
        //proceed to place order
        let payment = getParameterByName('paymentType');
        let shipping = getParameterByName('shippingAddress');
        let master = getParameterByName('masterRecordId');

        PlaceOrder(payment, shipping, master);
      }
    };

    const CancelCallback = (resp) => {
      if (resp?.status) {
        swal({
          title: 'Opps!',
          text: 'You just cancelled the transaction, would you want to try again?',
          icon: 'warning',
          button: 'Ok',
        });

        //return back to checkout page
        location.replace('/checkout');
      }
    };

    const PlaceOrder = (paymentType, shippingAddress, masterRecord) => {
      let placeOrderPath = API_ROUTES.placeOrder.route;

      let payload = {
        paymentType: paymentType,
        shippingAddress: shippingAddress,
        masterRecordId: masterRecord,
      };

      $.ajax({
        method: 'POST',
        url: `${BASEURL}/${placeOrderPath}`,
        contentType: 'application/json',
        dataType: 'json',
        data: JSON.stringify(payload),
        headers: Auth_Header,
        success: function (resp) {
          //$('#result').html(resp)
          PlaceOrderCallback(resp);
        },
        error: function (resp) {
          console.log('Error occured on close ', resp);
        },
      });
    };

    const PlaceOrderCallback = (resp) => {
      if (resp?.status) {
        //sweet alert

        //redirect to thank you shopping with us
        location.replace('/payment-complete');
        return;
      }

      //sweet alert
    };

    let hrefUrl;
    if (typeof window !== 'undefined') {
      hrefUrl = window.location.href;
    }

    function getParameterByName(name, url = hrefUrl) {
      name = name.replace(/[\[\]]/g, '\\$&');
      var regex = new RegExp('[?&]' + name + '(=([^&#]*)|&|#|$)'),
        results = regex.exec(url);
      if (!results) return null;
      if (!results[2]) return '';
      return decodeURIComponent(results[2].replace(/\+/g, ' '));
    }
    PaystackScript(PaystackCallback); //start
  };
  render() {
    return <div className=""></div>;
  }
}

export default Jquery;
// PaystackScript(PaystackCallback); //start
