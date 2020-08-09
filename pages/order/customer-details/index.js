/** @jsx jsx */
import React from "react";
import { Box, Button, Input, jsx, Label, Styled, Textarea } from "theme-ui";
import DefaultLayout from "../../../components/layout/DefaultLayout";
import API from "../../../utils/api";
import Card from "../../../components/ui/Card";
import { wrapper } from "../../../store";
import {
  fetchFoodCategories,
  fetchOrderMasterData,
} from "../../../store/global/actions";
import CurrentOrder from "../../../components/order/CurrentOrder";
import { Select } from "../../../components/ui/Select";
import { useDispatch, useSelector } from "react-redux";
import { changeOrderQuantity, placeOrder } from "../../../store/order/actions";
import TimePicker from "../../../components/ui/TimePicker";
import DatePicker from "../../../components/ui/DatePicker";
import { Field, Form, Formik } from "formik";
import * as Yup from "yup";
import * as moment from "moment";
import FormError from "../../../components/ui/Form/FormError";
import { useRouter } from "next/router";
import { getHref } from "../../../utils/getHref";

const SelectExtra = ({ layout }) => {
  const router = useRouter();
  const order = useSelector((state) => state.order);
  const orderQuantity = useSelector((state) => state.order?.quantity);
  const orderPlaceTypes = useSelector(
    (state) => state.global.orderMasterData.orderPlaceTypes
  );
  const orderTypes = useSelector(
    (state) => state.global.orderMasterData.orderTypes
  );
  const changeUrl = useSelector((state) => state.order.meta.url);
  const dispatch = useDispatch();

  const handleChange = () => {
    router.push(
      `${getHref(changeUrl)}?keep-order=true`,
      `${changeUrl}?keep-order=true`
    );
  };

  const handleSubmit = async (value) => {
    dispatch(
      placeOrder({
        ...value,
        orderDate: value.orderDate.format("L"),
        orderTime: value.orderTime.format("hh:mm"),
      })
    );
  };

  const handleChangeQuantity = (e) => {
    dispatch(changeOrderQuantity(e.target.value));
  };

  const validationSchema = Yup.object().shape({
    fullName: Yup.string().required("Hãy nhập họ và tên của bạn."),
    email: Yup.string()
      .email("Hãy nhập một địa chỉ email chính xác.")
      .required("Hãy nhập email của bạn."),
    phone: Yup.string()
      .min(6, "Hãy nhập một số điện thoại hợp lệ.")
      .required("Hãy nhập số điện thoại của bạn."),
    alternativePhone: Yup.string(),
    orderType: Yup.string().required(
      "Hãy lựa chọn một trong những loại hình tiệc này"
    ),
    orderPlaceType: Yup.string().required(
      "Hãy lựa chọn một trong những đặc điểm nơi tổ chức tiệc này"
    ),
    orderDate: Yup.date()
      .min(
        moment().startOf("day").toDate(),
        "Hãy chọn một ngày giao hàng sau ngày hôm nay"
      )
      .nullable()
      .required("Hãy nhập ngày giao hàng"),
    orderTime: Yup.string().nullable().required("Hãy nhập thời gian giao hàng"),
  });

  return (
    <DefaultLayout layout={layout}>
      <Box className="important:mt-6 container important:mx-auto flex">
        <Box className="w-1/3">
          <Styled.h3 className="important:mb-4">Lựa chọn của bạn</Styled.h3>
          <CurrentOrder onChange={handleChange} />
        </Box>
        <Box className="w-8" />
        <Box className="w-2/3">
          <Styled.h3 className="important:mb-4">Chi tiết giao hàng</Styled.h3>
          <Card>
            <Box className="w-full px-4 py-4">
              <Box>
                <Formik
                  onSubmit={handleSubmit}
                  validationSchema={validationSchema}
                  initialValues={{
                    title: "Ông",
                    fullName: "Kien Nguyen",
                    email: "kien.nguyen@your.rentals",
                    phone: "0904515297",
                    alternativePhone: "",
                    orderType: orderTypes[0],
                    orderPlaceType: orderTypes[0],
                    orderDate: moment(),
                    orderTime: moment(),
                    note: "Xin chao",
                  }}
                >
                  <Form>
                    <Styled.h4 className="text-red-5 important:mb-3">
                      Thông tin khách hàng
                    </Styled.h4>
                    <Box className="flex flex-wrap">
                      <Box
                        className="important:mr-3 important:mb-3"
                        sx={{ minWidth: "1/6" }}
                      >
                        <Label>&nbsp;</Label>
                        <Field as={Select} fullName="title">
                          <option value="Ông">Ông</option>
                          <option value="Bà">Bà</option>
                        </Field>
                      </Box>
                      <Box className="flex-grow important:mb-3">
                        <Label>Họ và tên</Label>
                        <Field as={Input} name="fullName" />
                        <FormError name="fullName" />
                      </Box>
                    </Box>
                    <Box className="flex flex-wrap">
                      <Box
                        className="flex-1 important:mb-3"
                        sx={{ minWidth: "full" }}
                      >
                        <Label>Email</Label>
                        <Field as={Input} type="email" name="email" />
                        <FormError name="email" />
                      </Box>
                    </Box>
                    <Box className="flex flex-wrap">
                      <Box
                        className="flex-auto important:mb-3"
                        sx={{
                          width: ["full", "full", "1/3"],
                          marginRight: [0, 0, 3],
                        }}
                      >
                        <Label>Số điện thoại</Label>
                        <Field as={Input} name="phone" />
                        <FormError name="phone" />
                      </Box>
                      <Box
                        className="flex-auto important:mb-3"
                        sx={{ width: ["full", "full", "1/3"] }}
                      >
                        <Label>Số điện thoại nhà riêng</Label>
                        <Field as={Input} name="alternativePhone" />
                        <FormError name="alternativePhone" />
                      </Box>
                    </Box>
                    <Styled.h4 className="text-red-5 important:mb-3">
                      Thông tin đặt hàng
                    </Styled.h4>
                    <Box className="flex flex-wrap important:w-full">
                      <Box
                        className="flex-auto important:mb-3"
                        sx={{
                          width: ["full", "full", "1/3"],
                          marginRight: [0, 0, 3],
                        }}
                      >
                        <Label>Số lượng mâm</Label>
                        <Input
                          type="number"
                          value={orderQuantity}
                          onChange={handleChangeQuantity}
                        />
                      </Box>
                      <Box
                        className="flex-auto important:mb-3"
                        sx={{
                          width: ["full", "full", "1/3"],
                        }}
                      >
                        <Label>Loại hình tiệc</Label>
                        <Field as={Select} name="orderType">
                          <option
                            value=""
                            selected
                            disabled
                            hidden
                            style={{ display: "none" }}
                          />
                          {orderTypes.map((orderType, index) => (
                            <option key={index}>{orderType}</option>
                          ))}
                        </Field>
                        <FormError name="orderType" />
                      </Box>
                    </Box>
                    <Box className="flex flex-wrap important:w-full">
                      <Box className="flex-grow important:w-full important:mb-3">
                        <Label>Đặc điểm nơi tổ chức tiệc</Label>
                        <Field as={Select} name="orderPlaceType">
                          <option
                            value=""
                            selected
                            disabled
                            hidden
                            style={{ display: "none" }}
                          />
                          {orderPlaceTypes.map((orderPlaceType, index) => (
                            <option key={index}>{orderPlaceType}</option>
                          ))}
                        </Field>
                        <FormError name="orderPlaceType" />
                      </Box>
                    </Box>
                    <Box className="flex flex-wrap important:w-full">
                      <Box
                        className="flex-auto important:mb-3"
                        sx={{
                          width: ["full", "full", "1/3"],
                          marginRight: [0, 0, 3],
                        }}
                      >
                        <Label>Ngày giao hàng</Label>
                        <Field name="orderDate">
                          {({
                            field: { onChange, onFocus, onBlur, name, ...rest },
                          }) => {
                            const handleChange = (val) => {
                              onChange({ target: { name: name, value: val } });
                            };
                            return (
                              <DatePicker onChange={handleChange} {...rest} />
                            );
                          }}
                        </Field>
                        <FormError name="orderDate" />
                      </Box>
                      <Box
                        className="flex-auto important:mb-3"
                        sx={{
                          width: ["full", "full", "1/3"],
                        }}
                      >
                        <Label>Thời gian giao hàng</Label>
                        <Field name="orderTime">
                          {({
                            field: { onChange, onFocus, onBlur, name, ...rest },
                          }) => {
                            const handleChange = (val) => {
                              onChange({ target: { name: name, value: val } });
                            };
                            return (
                              <TimePicker onChange={handleChange} {...rest} />
                            );
                          }}
                        </Field>
                        <FormError name="orderTime" />
                      </Box>
                    </Box>
                    <Box className="flex flex-wrap">
                      <Box className="flex-grow">
                        <Label>Ghi chú</Label>
                        <Field as={Textarea} name="note" />
                      </Box>
                    </Box>
                    <Box sx={{ marginTop: 3 }}>
                      <Button type="submit" sx={{ borderWidth: 0 }}>
                        Đặt tiệc
                      </Button>
                    </Box>
                  </Form>
                </Formik>
              </Box>
            </Box>
          </Card>
        </Box>
      </Box>
    </DefaultLayout>
  );
};

export const getStaticProps = wrapper.getStaticProps(
  async ({ store, params }) => {
    const layout = await API.getLayoutData();

    if (store.getState().global.foodCategories.length === 0) {
      await store.dispatch(fetchFoodCategories());
      await store.dispatch(fetchOrderMasterData());
    }

    return {
      props: {
        layout,
      },
      revalidate: 1,
    };
  }
);

export default SelectExtra;
