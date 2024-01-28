export default async function name(amount, button) {
    console.log('inside pay func')
    let orderCreationResult = {
      id: "",
    };

    const body = {
      amount: amount,
      currency: "INR",
      receipt: "qwsaq1",
      partial_payment: true,
      first_payment_min_amount: 230,
    };

    async function createRazorPay(data) {
      try {
        const response = await fetch("https://api.razorpay.com/v1/orders", {
          method: "POST",
          headers: {
            "Content-Type": "application/x-www-form-urlencoded",
            Authorization:
              "Basic " +
              btoa(
                "rzp_test_fJLPcc02TCY2NS" + ":" + "E73rH6RLSA5GO1Uto1N1tGpb"
              ),
          },
          body: JSON.stringify(data),
        });

        orderCreationResult = await response.json();
        console.log("Success:", orderCreationResult);
      } catch (error) {
        console.error("Error:", error);
      }
    }

    var options = {
      key: "rzp_test_fJLPcc02TCY2NS", // Enter the Key ID generated from the Dashboard
      amount: body.amount * 100, // Amount is in currency subunits. Default currency is INR. Hence, 50000 refers to 50000 paise
      currency: "INR",
      name: "Acme Corp", //your business name
      description: "Test Transaction",
      image: "https://example.com/your_logo",
      order_id: "", //This is a sample Order ID. Pass the `id` obtained in the response of Step 1
      callback_url: "https://localhost:4321/payment/thankyou",
      handler: function (response) {
        if (
          response.razorpay_payment_id == "undefined" ||
          response.razorpay_payment_id < 1
        ) {
          window.location.replace("/payment/failure");
        } else {
          window.location.replace("/payment/thankyou");
        }
      },
      prefill: {
        //We recommend using the prefill parameter to auto-fill customer's contact information especially their phone number
        name: "Gaurav Kumar", //your customer's name
        email: "gaurav.kumar@example.com",
        contact: "9000090000", //Provide the customer's phone number for better conversion rates
      },
      notes: {
        address: "Razorpay Corporate Office",
      },
      theme: {
        color: "#3399cc",
      },
    };

    button.addEventListener("click", async (e) => {
        e.preventDefault();
      console.log("performing checkout");
      await createRazorPay(body);

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
    });
}

export async function pay(amount) {
  console.log('inside pay func')
    let orderCreationResult = {
      id: "",
    };

    const body = {
      amount: amount,
      currency: "INR",
      receipt: "qwsaq1",
      partial_payment: true,
      first_payment_min_amount: 230,
    };

    async function createRazorPay(data) {
      try {
        const response = await fetch("https://api.razorpay.com/v1/orders", {
          method: "POST",
          headers: {
            "Content-Type": "application/x-www-form-urlencoded",
            Authorization:
              "Basic " +
              btoa(
                "rzp_test_fJLPcc02TCY2NS" + ":" + "E73rH6RLSA5GO1Uto1N1tGpb"
              ),
          },
          body: JSON.stringify(data),
        });

        orderCreationResult = await response.json();
        console.log("Success:", orderCreationResult);
      } catch (error) {
        console.error("Error:", error);
      }
    }

    var options = {
      key: "rzp_test_fJLPcc02TCY2NS", // Enter the Key ID generated from the Dashboard
      amount: body.amount * 100, // Amount is in currency subunits. Default currency is INR. Hence, 50000 refers to 50000 paise
      currency: "INR",
      name: "Acme Corp", //your business name
      description: "Test Transaction",
      image: "https://example.com/your_logo",
      order_id: "", //This is a sample Order ID. Pass the `id` obtained in the response of Step 1
      callback_url: "https://localhost:4321/payment/thankyou",
      handler: function (response) {
        if (
          response.razorpay_payment_id == "undefined" ||
          response.razorpay_payment_id < 1
        ) {
          window.location.replace("/payment/failure");
        } else {
          window.location.replace("/payment/thankyou");
        }
      },
      prefill: {
        //We recommend using the prefill parameter to auto-fill customer's contact information especially their phone number
        name: "Gaurav Kumar", //your customer's name
        email: "gaurav.kumar@example.com",
        contact: "9000090000", //Provide the customer's phone number for better conversion rates
      },
      notes: {
        address: "Razorpay Corporate Office",
      },
      theme: {
        color: "#3399cc",
      },
    };

    console.log("performing checkout");
      await createRazorPay(body);

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