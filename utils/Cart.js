import Cookies from "js-cookie";
import { client } from "./shopify";

const addProductToCart = async (product) => {
  Cookies.remove("cart");
  let checkoutId = Cookies.get("checkoutId");
  if (checkoutId === "undefined") {
    checkoutId = await createCheckout();
  }
  Cookies.set("checkoutId", checkoutId);
  const cart = await client.checkout.addLineItems(checkoutId, product);
  await storeCart(cart);
};
const getCart = async () => {
  return JSON.parse(window.localStorage.getItem("cart"));
};
const storeCart = async ({
  lineItems,
  totalPrice,
  totalPriceV2,
  TotalTax,
  id,
  currencyCode,
  subTotalPrice,
  webUrl,
}) => {
  const cartInfo = {
    lineItems,
    totalPrice,
    totalPriceV2,
    TotalTax,
    id,
    currencyCode,
    subTotalPrice,
    webUrl,
  };
  const storage = window.localStorage;
  storage.setItem("cart", JSON.stringify(cartInfo));
  //   Object.keys(cartInfo).map((key) =>
  //     storage.setItem(key, JSON.stringify(cartInfo[key]))
  //   );
};
const createCheckout = async () => {
  const { id } = await client.checkout.create();
  return id;
};
export { addProductToCart, getCart, createCheckout, storeCart };
