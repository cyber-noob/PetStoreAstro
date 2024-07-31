import { get_uri } from "./api_manager.js";
import { post, get } from "./request_maker.js";
import {local_get_slots, local_get_product_details} from "./local_petstore_service.js";
import axios from "axios";

const local_mode = import.meta.env.LOCAL_DEV;

/*-------------------------------------- PDP Module ----------------------------------------*/
export async function get_product_details(product_id) {
  if (local_mode === "true") return local_get_product_details();

  const uri = get_uri({
    service: "petstore_service",
    module: "products",
    endpoint: "fetch",
  });

  let productDetails = await get({
    uri: uri,
    query_params: {
      id: product_id,
    },
  });

  if (productDetails["response"] != null) return productDetails["response"];
  else console.log("[PDP] error: ", productDetails["error"]);
}

/*-------------------------------------- Order Module ----------------------------------------*/
export async function place_order(customer_token) {
  const uri = get_uri({
    service: "petstore_service",
    module: "order",
    endpoint: "place_order",
  });

  let orderCreationResult = await post({
    uri: uri,
    headers: {
      Authorization: "Bearer " + customer_token,
    },
  });

  //TODO: Add error redirection

  if (orderCreationResult["response"] != null)
    orderCreationResult = orderCreationResult["response"];

  return orderCreationResult;
}

export async function validate_payment(customer_token, response) {
  const uri = get_uri({
    service: "petstore_service",
    module: "order",
    endpoint: "validate_payment",
  });

  let payment_response = await post({
    uri: uri,
    headers: {
      Authorization: "Bearer " + customer_token,
    },
    body: {
      order_id: response["razorpay_order_id"],
      payment_id: response["razorpay_payment_id"],
      signature: response["razorpay_signature"],
    },
  });

  if (payment_response["response"] !== null)
    window.location.replace("/payment/thankyou");
  else window.location.replace("/payment/failure");
}

/*-------------------------------------- Address Module ----------------------------------------*/
export async function get_address(customer_token) {
  if (local_mode === "true") return local_get_address();

  const uri = get_uri({
    service: "petstore_service",
    module: "address",
    endpoint: "fetch",
  });

  let addressList = await get({
    uri: uri,
    headers: {
      Authorization: "Bearer " + customer_token,
    },
  });

  if (addressList["response"] != null) return addressList["response"];
  else console.log("[ADDRESS] error: ", addressList["error"]);
}

/*-------------------------------------- Cart Module ----------------------------------------*/
export async function get_cart(customer_token) {
  if (local_mode === "true") return local_get_cart();

  const uri = get_uri({
    service: "petstore_service",
    module: "cart",
    endpoint: "fetch",
  });

  let cartItems = await get({
    uri: uri,
    headers: {
      Authorization: "Bearer " + customer_token,
    },
  });

  if (cartItems["response"] != null) return cartItems["response"];
  else console.log("[CART] error: ", cartItems["error"]);
}

/*-------------------------------------- Wishlist Module ----------------------------------------*/
export async function get_wishlist(customer_token) {
  if (local_mode === "true") return local_get_wishlist();

  const uri = get_uri({
    service: "petstore_service",
    module: "wishlist",
    endpoint: "fetch",
  });

  let wishlistItems = await get({
    uri: uri,
    headers: {
      Authorization: "Bearer " + customer_token,
    },
  });

  if (wishlistItems["response"] != null) return wishlistItems["response"];
  else console.log("[WISHLIST] error: ", wishlistItems["error"]);
}

/*-------------------------------------- Appointments Scheduler Module ----------------------------------------*/
export async function get_slots(seller_id, date) {
  if (local_mode === "true") return local_get_slots();

  const uri = get_uri({
    service: "petstore_service",
    module: "slots",
    endpoint: "fetch",
  });

  let slots = await get({
    uri: uri,
    query_params: {
      seller_id: seller_id,
      date: date
    },
  });

  if (slots["response"] != null) return slots["response"];
  else console.log("[SLOTS] error: ", slots["error"]);
}
