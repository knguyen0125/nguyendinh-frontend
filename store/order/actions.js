import API from "../../utils/api";
import { push } from "connected-next-router";
import { omit } from "lodash";
import moment from "moment";

export const selectPreset = (payload) => {
  return (dispatch) => {
    dispatch({
      type: "@ORDER/SELECT_PRESET",
      payload,
    });
    dispatch(push("/order/customer-details"));
  };
};

export const clearOrder = () => {
  return {
    type: "@ORDER/CLEAR",
  };
};

export const toggleFoodItem = (payload) => {
  return {
    type: "@ORDER/TOGGLE_FOOD_ITEM",
    payload: {
      foodItem: payload.foodItem,
      enabled: payload.enabled,
    },
  };
};

export const changeOrderQuantity = (newQuantity) => {
  return {
    type: "@ORDER/CHANGE_QUANTITY",
    payload: newQuantity < 0 ? 0 : newQuantity,
  };
};

export const changeOrderDetails = (payload) => {
  return {
    type: "@ORDER/CHANGE_ORDER_DETAILS",
    payload,
  };
};

export const placeOrder = (payload) => {
  return async (dispatch, getState) => {
    dispatch(changeOrderDetails(payload));

    const state = getState();
    const orderDetails = state.order.orderDetails;

    const orderTime = moment(orderDetails.orderTime);
    const orderDate = moment(orderDetails.orderDate).set({
      hour: orderTime.get("hour"),
      minute: orderTime.get("minute"),
      second: 0,
    });

    const pl = {
      ...orderDetails,
      orderDate: orderDate.toISOString(),
      orderTime: orderDate.format("HH:mm:ss.SSS"),
      orderData: omit(state.order, ["orderDetails"]),
    };

    const response = await API.placeOrder(pl);

    dispatch({
      type: "@ORDER/SENT_ORDER_SUCCESS",
      payload: response,
    });

    // Make a call to production
    dispatch(push("/order/sent"));
    // dispatch(changeOrderDetails(payload));
  };
};
