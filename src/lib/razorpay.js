import axios from "axios";
import {place_order, validate_payment} from './petstore_service.js';

export async function pay(token) {
  console.log("inside pay func");

  let orderCreationResult = await place_order(token);
  
  var options = {
    key: "rzp_test_fJLPcc02TCY2NS", // Enter the Key ID generated from the Dashboard
    // amount: 20000000, // Amount is in currency subunits. Default currency is INR. Hence, 50000 refers to 50000 paise
    // currency: "INR",
    name: "Petsy.INC", //your business name
    description: "Test Transaction",
    image: "/doggo.gif",
    order_id: orderCreationResult["id"], //This is a sample Order ID. Pass the `id` obtained in the response of Step 1
    callback_url: "https://localhost:4321/payment/thankyou",
    handler: async function (response) {
      console.log("payment: ", response);

      if (response.razorpay_payment_id == "undefined" || response.razorpay_payment_id < 1)
        window.location.replace("/payment/failure");
      
      else
        await validate_payment(token, response);
    },
    prefill: {
      //We recommend using the prefill parameter to auto-fill customer's contact information especially their phone number
      name: "Gaurav Kumar", //your customer's name
      email: "gaurav.kumar@example.com",
      contact: "9000090000", //Provide the customer's phone number for better conversion rates
    },
    notes: {
      address: "Petsy Corporate Office",
    },
    theme: {
      color: "#3399cc",
    },
  };

  console.log("performing checkout");

  options.order_id = orderCreationResult.id;
  console.log("options: ", JSON.stringify(options));

  var rzp1 = new Razorpay(options);
  rzp1.on("payment.failed", function (response) {
    alert(response.error.code);
    alert(response.error.description);
    alert(response.error.source);
    alert(response.error.step);
    alert(response.error.reason);
    alert(response.error.metadata.order_id);
    alert(response.error.metadata.payment_id);
  });

  rzp1.open();
}
