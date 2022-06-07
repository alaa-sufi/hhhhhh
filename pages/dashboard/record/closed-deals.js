import React, { useState } from 'react'
import useTranslation from 'next-translate/useTranslation'
import { Refresh2, SearchNormal1, ImportCurve, Calendar } from 'iconsax-react';
import { RecordCard, CustomDateRangePicker } from "@/ui"
import { InputIcon, Input } from "@/form"
import ButtonTheme from "@/ui/ButtonTheme"
import { Formik } from "formik";
import * as Yup from "yup";
import { Table } from 'rsuite';
import fakeData from "/data.json"
const data = fakeData.filter((v, i) => i < 8);

export default function ClosedDeals() {
  const { t, lang } = useTranslation("dashboard")
  const [loadingButton, setLoadingButton] = useState(false)
  
  const [sortColumn, setSortColumn] = useState();
  const [sortType, setSortType] = useState();
  const [loading, setLoading] = useState(false);

  const getData = () => {
    if (sortColumn && sortType) {
      return data.sort((a, b) => {
        let x = a[sortColumn];
        let y = b[sortColumn];
        if (typeof x === 'string') {
          x = x.charCodeAt();
        }
        if (typeof y === 'string') {
          y = y.charCodeAt();
        }
        if (sortType === 'asc') {
          return x - y;
        } else {
          return y - x;
        }
      });
    }
    return data;
  };

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
    { title: t("net_profit_and_loss"), number: "$10,725", class: "bg-white text-primary border border-primary" }
  ];
  const dayOptions = [
    { value: "day", lable: t("the_today") },
    { value: "week", lable: t("the_week") },
    { value: "month", lable: t("the_month") },
    { value: "year", lable: t("the_year") },
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
    <div className="p-8 bg-white rounded-lg md:rounded-xl">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2 mb-8 ">
          <div className=" icon-container">
            <Refresh2 size="25" className="text-primary" />
          </div>
          <h1 className="block text-3xl font-bold text-black">{t("record")}</h1>
        </div>

      </div>
      {/* start top cards */}
      <div className="flex justify-between gap-6 mb-8">
        {cards.map((card, index) => (
          <RecordCard key={index} card={card} />
        ))}
      </div>
      {/* end top cards */}
      <div className="flex items-start justify-between">

        <Formik initialValues={{ search: "" }} onSubmit={onSubmit} validationSchema={() => Yup.object().shape({
          search: Yup.string().email().required(t('please_enter_the_search')),
        })}>
          {(props) => (
            <form onSubmit={props.handleSubmit}>
              <div className="flex gap-4 ">
                <InputIcon icon={<SearchNormal1 className="text-gray-400" />}>
                  <Input name="search" type="search" placeholder={t('search')} />
                </InputIcon>
                {/* <ButtonTheme color="primary" as="button" type="submit" block className="my-4 text-center xs:my-2" loading={loadingButton}>
                {t('send_the_password_recovery_link')}
              </ButtonTheme> */}
                <Input name="date" component="select" >
                  {dayOptions.map((option, index) => (
                    <option key={index} value={option.value}>{option.lable}</option>
                  ))}
                </Input>
              </div>

            </form>

          )}
        </Formik>
        <CustomDateRangePicker />
        <ButtonTheme color="primary" outline as="button" size="xs" className="" >
          <ImportCurve className="text-inherit" size="30" />
        </ButtonTheme>

      </div>
      {/* start search */}
      <Table
        height={420}
        data={getData()}
      sortColumn={sortColumn}
      sortType={sortType}
      onSortColumn={handleSortColumn}
      loading={loading}
      onRowClick={data => {
        console.log(data);
      }}
    >
      
      <Table.Column width={150} align="center"  sortable>
        <Table.HeaderCell>{t("the_account")}</Table.HeaderCell>
        <Table.Cell dataKey="the_account" />
      </Table.Column>

      <Table.Column width={100}  sortable>
        <Table.HeaderCell>{t("register")}</Table.HeaderCell>
        <Table.Cell dataKey="register" />
      </Table.Column>

      <Table.Column width={100} sortable>
        <Table.HeaderCell>{t("the_operation")}</Table.HeaderCell>
        <Table.Cell dataKey="the_operation" />
      </Table.Column>

      <Table.Column width={100} sortable>
        <Table.HeaderCell>{t('type')}</Table.HeaderCell>
        <Table.Cell dataKey="type" />
      </Table.Column>

      <Table.Column width={200} sortable>
        <Table.HeaderCell>{t("the_opening_price")}</Table.HeaderCell>
        <Table.Cell dataKey="the_opening_price" />
      </Table.Column>

      <Table.Column width={200} sortable>
        <Table.HeaderCell>{t("the_closure_price")}</Table.HeaderCell>
        <Table.Cell dataKey="the_closure_price" />
      </Table.Column>

      <Table.Column width={200} sortable>
        <Table.HeaderCell>{t("profit")}</Table.HeaderCell>
        <Table.Cell dataKey="profit" />
      </Table.Column>
    </Table>

    </div >
  )
}
