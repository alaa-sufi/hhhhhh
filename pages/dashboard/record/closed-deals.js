import React, { useState } from 'react'
import useTranslation from 'next-translate/useTranslation'
import { Refresh2, SearchNormal1, ImportCurve, Calendar } from 'iconsax-react';
import { RecordCard, CustomDateRangePicker, ButtonTheme, Error, Loading } from "@/ui"
import { InputIcon, Input } from "@/form"
import { Formik } from "formik";
import * as Yup from "yup";
import { Table } from 'rsuite';
import useSWR from 'swr'
import { recordClosedDeals } from "apiHandle"
import {ExportCSV} from "./excel"
// import fakeData from "/data.json"
// const data = fakeData.filter((v, i) => i < 8);


export default function ClosedDeals() {
  const { t, lang } = useTranslation("record")
  const [loadingButton, setLoadingButton] = useState(false)

  const [sortColumn, setSortColumn] = useState();
  const [sortType, setSortType] = useState();
  const [loading, setLoading] = useState(false);
  const { data, error } = useSWR(recordClosedDeals("101474"))
  if (error) return <Error />
  if (!data) return <Loading />
  // const getData = () => {
  //   if (sortColumn && sortType) {
  //     return data.trades.sort((a, b) => {
  //       let x = a[sortColumn];
  //       let y = b[sortColumn];
  //       if (typeof x === 'string') {
  //         x = x.charCodeAt();
  //       }
  //       if (typeof y === 'string') {
  //         y = y.charCodeAt();
  //       }
  //       if (sortType === 'asc') {
  //         return x - y;
  //       } else {
  //         return y - x;
  //       }
  //     });
  //   }
  //   return data;
  // };

  const handleSortColumn = (sortColumn, sortType) => {
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
      setSortColumn(sortColumn);
      setSortType(sortType);
    }, 500);
  };
  const cards = [
    { title: t("trading"), number: "$10,725", class: "bg-primary text-white border border-primary" },
    { title: t("the_total_profit"), number: "$10,725", class: "bg-[#4FB853] text-white border border-[#4FB853]" },
    { title: t("the_total_loss"), number: "$10,725", class: "bg-[#B84F4F] text-white border border-[#B84F4F]" },
    { title: t("net_profit_and_loss"), number: "$10,725", class: "bg-white dark:bg-dark-white text-primary border border-primary" }
  ];
  const dayOptions = [
    { value: "day", label: t("the_today") },
    { value: "week", label: t("the_week") },
    { value: "month", label: t("the_month") },
    { value: "year", label: t("the_year") },
  ]
  const onSubmit = (values) => {
    // setLoadingButton1(true);

    // forgetPasswordByEmail({
    //   values: values,
    //   success: () => { setLoadingButton1(false); router.push(`/auth/enter-email-code?email=${values.email}`) },
    //   error: () => { setLoadingButton1(false); toast.error(t("errToast:sorry_a_problem_occurred")) }
    // })
  }
  return (
    <div className="p-8 bg-white dark:bg-dark-white rounded-lg md:rounded-xl">
      <div className="flex items-center justify-between h-full">
        <div className="flex items-center h-full gap-2 mb-8 ">
          <div className=" icon-container">
            <Refresh2 size="25" className="text-primary" />
          </div>
          <h1 className="block text-3xl font-bold text-black dark:text-white">{t("record")}</h1>
        </div>

      </div>
      {/* start top cards */}
      <div className="flex justify-between gap-6 mb-8">
        {cards.map((card, index) => (
          <RecordCard key={index} card={card} />
        ))}
      </div>
      {/* end top cards */}
      <div>

        <Formik initialValues={{ search: "" }} onSubmit={onSubmit} validationSchema={() => Yup.object().shape({
          search: Yup.string().email().required(t('please_enter_the_search')),
        })}>
          {(props) => (
            <form onSubmit={props.handleSubmit}>
              <div className="flex items-center gap-4">
                <div className="rtl:pl-28 ltr:pr-28 grow ">
                  <div className="w-[320px] ">
                    <InputIcon icon={<SearchNormal1 className="text-gray-400 rounded-lg " />}>
                      <Input name="search" type="search" placeholder={t('search')} noMarginBottom />
                    </InputIcon>
                  </div>
                </div>
                {/* <ButtonTheme color="primary" as="button" type="submit" block className="my-4 text-center xs:my-2" loading={loadingButton}>
                {t('send_the_password_recovery_link')}
              </ButtonTheme> */}
              <div className="w-[265px] px-[10px] py-[5px] bg-secondary dark:bg-dark-secondary  rounded-xl">
                <Input name="date" component="select" className="w-[250px]" noMarginBottom >
                  {dayOptions.map((option, index) => (
                    <option key={index} value={option.value}>{option.label}</option>
                  ))}
                </Input>
                
              </div>
                <CustomDateRangePicker />
               
                <ExportCSV/>
              </div>

            </form>

          )}
        </Formik>

      </div>
      {/* start search */}
      <Table
        height={500}
        locale={{loading:t("loading") , emptyMessage:t("there_are_no_data")}}
        data={data.trades}
        sortColumn={sortColumn}
        sortType={sortType}
        onSortColumn={handleSortColumn}
        loading={loading}
        onScroll={() => console.log("Scroll")}
        rowClassName="rounded-xl py-4"
        rowHeight={100}
        hover={false}
        onRowClick={data => {
          console.log(data);
        }}
      >

        <Table.Column width={150} align="center" sortable>
          <Table.HeaderCell>{t("the_account")}</Table.HeaderCell>
          <AccountCell dataKey="Login" />
        </Table.Column>

        <Table.Column width={120} sortable >
          <Table.HeaderCell>{t("operation_number")}</Table.HeaderCell>
          <OperationNumberCell className="text-primary" dataKey="Order" />
        </Table.Column>

        <Table.Column width={100} sortable >
          <Table.HeaderCell>{t("the_operation")}</Table.HeaderCell>
          <TypeCell className="text-primary" dataKey="Type" />
        </Table.Column>

        <Table.Column width={120} sortable >
          <Table.HeaderCell>{t('currency_type')}</Table.HeaderCell>
          <CustomCell dataKey="Symbol" />
        </Table.Column>

        <Table.Column width={200} sortable >
          <Table.HeaderCell>{t("the_opening_price")}</Table.HeaderCell>
          <PriceCell dataKey="PriceOrder" />
        </Table.Column>

        <Table.Column width={200} sortable >
          <Table.HeaderCell>{t("the_closure_price")}</Table.HeaderCell>
          <PriceCell dataKey="PriceCurrent" />
        </Table.Column>

        <Table.Column width={200} sortable >
          <Table.HeaderCell>{t("profit")}</Table.HeaderCell>
          <ProfitCell dataKey="Reason" />
        </Table.Column>
      </Table>

    </div >
  )
}

const AccountCell = ({ rowData, dataKey, ...props }) => (
  <Table.Cell {...props}>
    <div className="flex items-center h-full ">
      <div className="p-3 px-6 text-white rounded-md bg-primary w-max">
        {rowData[dataKey]}
      </div>
    </div>
  </Table.Cell>
);
function ProfitCell({ rowData, dataKey, ...props }) {
  const { t, lang } = useTranslation("common")
  return (
    <Table.Cell {...props}>
      <bdi className={`${rowData[dataKey] > 0 ? "text-success" : "text-danger"} flex items-center h-full `}>
        <div className={`${lang === "ar" ? "text-right" : "text-left"} w-full`}>{rowData[dataKey] > "0" ? " + " : rowData[dataKey] === "0" ? "" : " - "}{rowData[dataKey]}</div>
      </bdi>
    </Table.Cell>
  )
}
const CustomCell = ({ rowData, dataKey, ...props }) => (
  <Table.Cell {...props}>
    <bdi className={`${props.className} flex items-center h-full`}>
      {rowData[dataKey]}
    </bdi>
  </Table.Cell>
);
const OperationNumberCell = ({ rowData, dataKey, ...props }) => (
  <Table.Cell {...props}>
    <bdi className={`${props.className} flex items-center h-full`}>
      #{rowData[dataKey]}
    </bdi>
  </Table.Cell>
);
function TypeCell({ rowData, dataKey, ...props }) {
  const { t, lang } = useTranslation("record")

  return (
    <Table.Cell {...props}>
      <bdi className={`${props.className} flex items-center h-full`}>
        {rowData[dataKey] === 0 ? t("sale") : t("buy")}
      </bdi>
    </Table.Cell>
  )
}
function PriceCell({ rowData, dataKey, ...props }) {
  const { t, lang } = useTranslation("record")
  return (
    <Table.Cell {...props}>
      <bdi className={`${props.className} flex  h-full  justify-center flex-col	`}>
        <div className={`mb-1 text-right font-bold ${lang === "ar" ? "text-right" : "text-left"}`}>{rowData[dataKey]}</div>
        <div className={`text-gray-400 text-md ${lang === "ar" ? "text-right" : "text-left"}`}>2018/2/2 - 12:50am</div>
      </bdi>
    </Table.Cell>
  )
}

const IconSax=({iconName})=>{
  <>{iconName}</>
}