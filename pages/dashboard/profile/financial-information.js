import React, { useState, useEffect } from 'react'
import useTranslation from 'next-translate/useTranslation'
import { ProfileContainer } from "@/container"
import { CustumnCheckbox, InputIcon, InputCity, SelectWIthHead, Input } from "@/form"
import { ArrowLeft, ArrowRight, Sms, Lock, Eye, EyeSlash, Flag, Call, Verify } from 'iconsax-react';
import { Formik, Form, Field, useField } from "formik";
import { ButtonTheme, Error, Loading } from "@/ui"
import { profilePersonalFinancialInformation, profileFinancialInformation } from "apiHandle"
import { Checkbox } from 'rsuite';
import { useRouter } from 'next/router'
import toast from "react-hot-toast";
import useSWR from 'swr'
import Head from 'next/head'

export default function FinancialInformation() {
  const { t, lang } = useTranslation("profile")
  const router = useRouter();
  const [loadingButton, setLoadingButton] = useState(false);
  const [currentStep, setCurrentStep] = useState(0);
  const { data, error } = useSWR(profileFinancialInformation())
  const [done, setDone] = useState(false);

  useEffect(() => {
    data && setDone(data.status)
  }, [data])
  const optionsStudy = [
    {
      "value": "",
      value: "",
      "label": t(""),
    },
    {
      "value": "accounting",
      value: "accounting",
      "label": t("profile:accounting"),
    },

    {
      "value": "supervisor_secretariat",
      value: "supervisor_secretariat",
      "label": t("profile:supervisor_secretariat"),
    },
    {
      "value": "farming",
      value: "farming",
      "label": t("profile:farming"),
    },
    {
      "value": "provide_food_hospitality",
      value: "provide_food_hospitality",
      "label": t("profile:provide_food_hospitality"),
    },
    {
      "value": "companies_services",
      value: "companies_services",
      "label": t("profile:companies_services"),
    },
    {
      "value": "creative_designer_media",
      value: "creative_designer_media",
      "label": t("profile:creative_designer_media"),
    },
    {
      "value": "defense_military",
      value: "defense_military",
      "label": t("profile:defense_military"),
    },
    {
      "value": "education",
      value: "education",
      "label": t("profile:education"),
    },
    {
      "value": "emergency_services",
      value: "emergency_services",
      "label": t("profile:emergency_services"),
    },
    {
      "value": "energy",
      value: "energy",
      "label": t("profile:energy"),
    },
    {
      "value": "engineering",
      value: "engineering",
      "label": t("profile:engineering"),
    },
    {
      "value": "import_and_export",
      value: "import_and_export",
      "label": t("profile:import_and_export"),
    },
    {
      "value": "bank_banks_and_investments_services",
      value: "bank_banks_and_investments_services",
      "label": t("profile:bank_banks_and_investments_services"),
    },
    {
      "value": "financial_services_financial_currency_exchange",
      value: "financial_services_financial_currency_exchange",
      "label": t("profile:financial_services_financial_currency_exchange"),
    },
    {
      "value": "financial_services_insurance",
      value: "financial_services_insurance",
      "label": t("profile:financial_services_insurance"),
    },
    {
      "value": "other_financial_services",
      value: "other_financial_services",
      "label": t("profile:other_financial_services"),
    },
    {
      "value": "government_employee_public_sector",
      value: "government_employee_public_sector",
      "label": t("profile:government_employee_public_sector"),
    },
    {
      "value": "lawyer_legal",
      value: "lawyer_legal",
      "label": t("profile:lawyer_legal"),
    },
    {
      "value": "entertainment_comfort",
      value: "entertainment_comfort",
      "label": t("profile:entertainment_comfort"),
    },
    {
      "value": "manufacturing",
      value: "manufacturing",
      "label": t("profile:manufacturing"),
    },
    {
      "value": "marketing_public_relations_ads",
      value: "marketing_public_relations_ads",
      "label": t("profile:marketing_public_relations_ads"),
    },
    {
      "value": "non_governmental_organization",
      value: "non_governmental_organization",
      "label": t("profile:non_governmental_organization"),
    },
    {
      "value": "a_charitable_non_profit_organization",
      value: "a_charitable_non_profit_organization",
      "label": t("profile:a_charitable_non_profit_organization"),
    },
    {
      "value": "pharmacy",
      value: "pharmacy",
      "label": t("profile:pharmacy"),
    },
    {
      "value": "real_estate_building_trade",
      value: "real_estate_building_trade",
      "label": t("profile:real_estate_building_trade"),
    },
    {
      "value": "selling_by_pieces",
      value: "selling_by_pieces",
      "label": t("profile:selling_by_pieces"),
    },
    {
      "value": "technology",
      value: "technology",
      "label": t("profile:technology"),
    },
    {
      "value": "transport_and_logistics_services",
      value: "transport_and_logistics_services",
      "label": t("profile:transport_and_logistics_services"),
    },
    {
      "value": "medicine_health_care_nurse",
      value: "medicine_health_care_nurse",
      "label": t("profile:medicine_health_care_nurse"),
    },
    {
      "value": "social_services",
      value: "social_services",
      "label": t("profile:social_services"),
    },



  ]
  const qustions = [
    {
      title: t("are_you_an_american_resident_for_tax_purposes"),
      name: "Q1_residentAmerican",
      options: [
        { text: t("yes"), value: "yes" },
        { text: t("no"), value: "no" }],
      type: "options"
    },
    {
      title: t("are_you_a_political_open_person_pep"),
      name: "Q2_PEP",
      options: [
        { text: t("yes"), value: "yes" },
        { text: t("no"), value: "no" }
      ],
      type: "options"
    },
    {
      title: t("what_is_the_purpose_of_opening_the_trading_account_with_solutions_company_name", { companyName: process.env.companyName }),
      name: "Q3_purpose_of_open", options: [
        { text: t("speculation"), value: "speculation" },
        { text: t("hedge"), value: "hedge" },
        { text: t("investing_the_stable_of_the_term"), value: "investing-the-stable-of-the-term" },
        { text: t("daily_trading"), value: "daily_trading" },
        { text: t("keep_the_capital"), value: "keep-the-capital" }
      ],
      type: "options"
    },
    {
      title: t("how_much_money_can_you_use_to_trade_cf_ds_cfds_and_can_you_bear_its_loss"),
      name: "Q4_money_amount", options: [
        { text: t("high_risk_accept_the_risk_of_investment"), value: "high-risk-accept-the-risk-of-investment" },
        { text: t("moderate"), value: "moderate" },
        { text: t("risk"), value: "risk" },
        { text: t("without_risk_i_do_not_want_to_risk_my_investment"), value: "without-risk-i-do-not-want-to-risk-my-investment" }
      ],
      type: "options",
      longAnswer: true
    },
    {
      title: t("in_the_us_dollar_choose_the_value_of_your_savings_and_investments"),
      name: "Q5_Income_Investments", options: [
        { text: t("between_and_doller", { one: 0, two: '5,000' }), value: "0-5000" },
        { text: t("between_and", { one: '5,001', two: '10,000' }), value: "5001-10000" },
        { text: t("between_and", { one: '10,001', two: '50,000' }), value: "10001-50000" },
        { text: t("between_and", { one: '50,001', two: '100,000' }), value: "50001-100000" },
        { text: t("between_and", { one: '100,001', two: '250,000' }), value: "100001-250000" },
        { text: t("between_and", { one: '250,001', two: '500,000' }), value: "250001-500000" },
        { text: t("between_and", { one: '500,001', two: '1,000,000' }), value: "500001-1000000" },
        { text: t("more_than", { one: '1,000,000' }), value: "+1000000" },
      ],
      type: "options"
    },
    {
      title: t("us_dollars_choose_your_annual_annual_income"),
      name: "Q6_annual_income", options: [
        { text: t("between_and_doller", { one: 0, two: '5,000' }), value: "0-5000" },
        { text: t("between_and", { one: '5,001', two: '10,000' }), value: "5001-10000" },
        { text: t("between_and", { one: '10,001', two: '50,000' }), value: "10001-50000" },
        { text: t("between_and", { one: '50,001', two: '100,000' }), value: "50001-100000" },
        { text: t("between_and", { one: '100,001', two: '250,000' }), value: "100001-250000" },
        { text: t("between_and", { one: '250,001', two: '500,000' }), value: "250001-500000" },
        { text: t("between_and", { one: '500,001', two: '1,000,000' }), value: "500001-1000000" },
        { text: t("more_than", { one: '1,000,000' }), value: "+1000000" },
      ],
      type: "options"
    },
    {
      title: t("choose_the_estimated_amount_available_for_trading_in_the_next_12_months"),
      name: "Q7_Available_Amount", options: [
        { text: t("between_and_doller", { one: 0, two: '5,000' }), value: "0-5000" },
        { text: t("between_and", { one: '5,001', two: '10,000' }), value: "5001-10000" },
        { text: t("between_and", { one: '10,001', two: '50,000' }), value: "10001-50000" },
        { text: t("between_and", { one: '50,001', two: '100,000' }), value: "50001-100000" },
        { text: t("between_and", { one: '100,001', two: '250,000' }), value: "100001-250000" },
        { text: t("between_and", { one: '250,001', two: '500,000' }), value: "250001-500000" },
        { text: t("more_than", { one: '500,000' }), value: "+500000" },
      ],
      type: "options"
    },
    {
      title: t("what_is_the_main_financing_manager_you_will_use_to_finance_your_account"),
      name: "Q8_funding_source", options: [
        { text: t("employment_salary_work_revenues"), value: "employment-salary-work-revenues" },
        { text: t("pension"), value: "pension" },
        { text: t("family_partner"), value: "family-partner" },
        { text: t("al_wafrat_investments"), value: "al-wafrat-investments" },
        { text: t("banking"), value: "banking" },
        { text: t("heritage_gift"), value: "heritage-gift" },
        { text: t("selling_property"), value: "selling-property" },
        { text: t("government_subsidy"), value: "government-subsidy" },
      ],
      type: "options-input"
    },
    {
      title: t("from_any_country_the_expected_source_of_funds"),
      name: "Q9_country_source_funds",
      type: "select-city",
      longAnswer: true

    },
    {
      title: t("choose_your_work_condition"),
      name: "Q10_status", options: [
        { text: t("student"), value: "student" },
        { text: t("private_job"), value: "private_job" },
        { text: t("convinced"), value: "convinced" },
        { text: t("sugged"), value: "sugged" },
        { text: t("unemployed"), value: "unemployed" },
      ],
      type: "options",
    },
    {
      title: t("choose_the_field_of_study"),
      name: "Q11_field_of_study",
      type: "select-study",
      options: optionsStudy,
      longAnswer: true

    },
    {
      title: t("choose_the_educational_level"),
      name: "Q12_Educational_level",
      type: "select-study-level",
      longAnswer: true
    },


    {
      title: t("choose_the_field_of_work"),
      name: "Q11_Employment",
      type: "select-study",
      options: optionsStudy,
      longAnswer: true

    },

    {
      title: t("choose_the_job_position"),
      name: "Q12_job_position",
      type: "representative_position",
    },

    {
      title: t("choose_the_educational_level"),
      name: "Q13_Educational_level",
      type: "select-study-level",
      longAnswer: true

    },
    {
      title: t("please_provide_details_about_your_experience_in_forex_and_contracts_for_the_differences_only_if_you_decide_to_trade"),
      name: "Q14_Experience_Trading",
      options: [
        { text: t("between_and", { one: t("year_count", { count: 1 }), two: t("year_count", { count: 3 }) }), value: "1year-3year" },
        { text: t("more_than", { one: t("year_count", { count: 3 }) }), value: "+3year" },
        { text: t("between_and", { one: t("month_count", { count: 1 }), two: t("month_count", { count: 6 }) }), value: "1month-6month" },
        { text: t("between_and", { one: t("month_count", { count: 6 }), two: t("year_count", { count: 1 }) }), value: "6month-1year" },
        { text: t("no_experience"), value: "0" },
      ],
      type: "options",
    },
    {
      title: t("i_attended_a_course_or_a_seminar_on_foreign_exchange_or_contracts_for_the_differences_or_other_financial_tools"),
      name: "Q15_Attend_course",
      options: [
        { text: t("yes"), value: "yes" },
        { text: t("no"), value: "no" }
      ],
      type: "options",

    },
    {
      title: t("i_trained_on_demo_accounts"),
      name: "Q16_trained_demo_accounts",

      options: [
        {
          value: `less-10`,
          text: t("profile:yes_the_average_quarterly_trading_volume_on_regular_contracts_during_the_past_year_was_less_than_10_decades"),
        },
        {
          text: t("profile:yes_the_average_quarterly_trading_volume_on_regular_contracts_during_the_past_year_was_between_10_and_100_contracts"),
          value: `10-100dec`,
        },
        {
          text: t("profile:yes_the_average_quarterly_trading_volume_on_regular_contracts_during_the_past_year_was_more_than_100_contracts"),
          value: `+100dec`,
        },
      ],
      type: "options",
      longAnswer: true

    },
    {
      title: t("arrows_and_bonds"),
      name: "Q17_Stocks_Bonds",
      options: [
        { text: t("more_than", { one: t("year_count", { count: 3 }) }), value: "+3year" },
        { text: t("between_and", { one: t("year_count", { count: 1 }), two: t("year_count", { count: 3 }) }), value: "1year-6year" },
        { text: t("between_and", { one: t("month_count", { count: 6 }), two: t("year_count", { count: 1 }) }), value: "6month-1year" },
        { text: t("between_and", { one: t("month_count", { count: 1 }), two: t("month_count", { count: 6 }) }), value: "1month-6month" },
        { text: t("there_is_no"), value: "0" },
      ],
      type: "options",

    },
    {
      title: t("derivative_contracts_circulating_guarantees_convertible_options_and_future_contracts"),
      name: "Q18_Traded_Derivative_Contracts",
      options: [
        { text: t("more_than", { one: t("year_count", { count: 3 }) }), value: "+3year" },
        { text: t("between_and", { one: t("year_count", { count: 1 }), two: t("year_count", { count: 3 }) }), value: "1year-6year" },
        { text: t("between_and", { one: t("month_count", { count: 6 }), two: t("year_count", { count: 1 }) }), value: "6month-1year" },
        { text: t("between_and", { one: t("month_count", { count: 1 }), two: t("month_count", { count: 6 }) }), value: "1month-6month" },
        { text: t("there_is_no"), value: "0" },
      ],
      type: "options",
    },
    {
      title: t("it_has_opened_a_purchase_on_gold_on_the_same_day_the_price_decreased_gold_what_will_be_the_result_of_your_deal"),
      name: "Q19_Gold",
      options: [
        { text: t("your_deal_in_a_floating_loss_state"), value: "your_deal_in_a_floating_loss_state" },
        { text: t("your_deal_in_a_floating_profit_state"), value: "your_deal_in_a_floating_profit_state" },
        { text: t("your_deal_will_not_be_affected"), value: "your_deal_will_not_be_affected" }
      ],
      type: "options",
    },
    {
      title: t("currency_products_and_goods_rates_may_be_affected_by_the_following"),
      name: "Q20_Exchange_Rates",
      options: [
        { text: t("liquidity"), value: "liquidity" },
        { text: t("the_basic_currency_of_the_primary_product"), value: "the_basic_currency_of_the_primary_product" },
        { text: t("economic_data"), value: "economic_data" },
        { text: t("all_of_the_aforementioned"), value: "all_of_the_aforementioned" }
      ],
      type: "options",
    },
    {
      title: t("the_leverage_of_your_trading_account_is_11001_and_you_want_to_open_a_100000_deal_how_much_money_is_needed_to_open_this_deal_this_amount_is_also_known_as_margin_requirements"),
      name: "Q21_Trading_account_leverage",
      options: [
        { text: '1000 EURO', value: "1000 EURO" },
        { text: '10.000 EURO', value: "10.000 EURO" },
        { text: t("i_dont_know"), value: "i_dont_know" },

      ],
      type: "options",
    },
    {
      title: t("keeping_an_open_deal_during_the_night_may_increase_the_risk_of_losses_and_trading_costs_because_the_financing_fee_tiber_wages_may_increase_and_accumulate_over_time"),
      name: "Q22_Open_deal_at_night",
      options: [

        { text: t("true"), value: "true" },
        { text: t("error"), value: "error" },

      ],
      type: "options",
    },
    {
      title: t("stop_occurs_when"),
      name: "Q23_Stop",
      options: [

        { text: t("the_current_account_balance_has_decreased_from_the_required_margin_levels_and_your_deal_has_been_closed"), value: "the_current_account_balance_has_decreased_from_the_required_margin_levels_and_your_deal_has_been_closed" },
        { text: t("you_give_instructions_to_close_the_request"), value: "you_give_instructions_to_close_the_request" },
        { text: t("your_suspended_request_has_been_implemented"), value: "your_suspended_request_has_been_implemented" },

      ],
      type: "options",
      longAnswer: true
    },

  ]
  const [dataForm, setData] = useState({
    user_id: process.env.userId,
    Q1_residentAmerican: "",
    Q2_PEP: "",
    Q3_purpose_of_open: "",
    Q4_money_amount: "",
    Q5_Income_Investments: "",
    Q6_annual_income: "",
    Q7_Available_Amount: "",
    Q8_funding_source: "",
    Q9_country_source_funds: "",
    Q10_status: "",
    Q11_Employment: "",
    Q12_job_position: "",
    Q12_Educational_level: "",
    Q13_Educational_level: "",
    Q14_Experience_Trading: "",
    Q15_Attend_course: "",
    Q16_trained_demo_accounts: "",
    Q17_Stocks_Bonds: "",
    Q18_Traded_Derivative_Contracts: "",
    Q19_Gold: "",
    Q20_Exchange_Rates: "",
    Q21_Trading_account_leverage: "",
    Q22_Open_deal_at_night: "",
    Q23_Stop: "",
  });

  const handleNextStep = (newData, step = 1, final = false) => {
    setData((prev) => ({ ...prev, ...newData }));
    if (final) {
      setLoadingButton(true);
      profilePersonalFinancialInformation({
        values: newData,
        success: () => { setLoadingButton(false); setDone(true) },
        error: () => setLoadingButton(false)
      })
      return;
    }
    setCurrentStep((prev) => prev + step);
  };
  const handlePrevStep = (newData, step = 1) => {
    setData((prev) => ({ ...prev, ...newData }));
    setCurrentStep((prev) => prev - step);
  };

  // useEffect(() => {
  //   toast.error("في حال قمت بالخروج او تغيير الصفحة ستخصر معلوماتك الحالية")
  // }, [router.asPath]);
  const steps = [
    ...Array(Number.parseInt(+qustions.length)).fill(
      <Step next={handleNextStep} prev={handlePrevStep} data={dataForm} currentStep={currentStep} last={qustions.length} qustions={qustions} />,
    ),
    <LastStep next={handleNextStep} prev={handlePrevStep} data={dataForm} key={1} currentStep={currentStep} last={qustions.length} qustions={qustions} loadingButton={loadingButton} />
  ];
  if (error) return <Error />
  if (!data) return <Loading />
  return (
    <>
     <Head>
        <title>{t("financial_information")} | {t("common:website_name")}</title>
      </Head>
    <ProfileContainer >
      {!done ?
        <div className="pt-4">
          {steps[currentStep]}
        </div>
        : <div>
          <Verify size="170" className="mx-auto mb-10 text-success more-linear" />
          <p className='text-center mb-8 text-lg font-bold w-[380px] mx-auto'>{t("fabulous_the_files_will_be_reviewed_by_our_team_and_we_inform_you_in_the_event_of_approval_or_re_upload_a_document")}</p>
        </div>
      }
    </ProfileContainer>
    </>
  )
}
const Step = (props) => {
  const { t, lang } = useTranslation("profile")
  const [last, setLast] = useState(22)
  const [currentQustion, setCurrentQustion] = useState(props.currentStep)
  const { title, name, type, options, longAnswer } = props.qustions[props.currentStep];


  const handleSubmit = (values) => {

    setCurrentQustion(currentQustion + 1)
    console.log(values);
    if (name === "Q10_status" && values['Q10_status'] != "student") {
      props.next(values, 3);
      setLast(23)
    } else if (name === "Q12_Educational_level" && values['Q10_status'] === "student") {
      props.next(values, 4);
    } else {
      props.next(values);
    }
  };
  const handlePrevStep = (values) => {
    setCurrentQustion(currentQustion - 1)
    if (name === "Q14_Experience_Trading" && values['Q10_status'] == "student") {
      props.prev(values, 4);
    } else if (name === "Q11_Employment" && values['Q10_status'] != "student") {
      props.prev(values, 3);
    } else {
      props.prev(values)

    }
  };

  return (
    <Formik
      initialValues={props.data}
      onSubmit={handleSubmit}
    >
      {({ values, dirty }) => (
        <Form>
          <p className="text-center font-bold mb-8 text-xl">{title}</p>
          <div className="min-h-[250px] ">
            <div className="grid grid-cols-2 gap-4 mb-4 w-[700px] mx-auto max-w-full">
              {(type === "options" || type === "options-input") && options.map((option, index) => (
                <CustumnCheckbox name={name} text={option.text} value={option.value} type="radio" key={index} className={`h-4/5 ${longAnswer && "col-span-2"}`} />
              ))}

              {type === "select-city" &&
                <InputIcon icon={<Flag className="text-primary" />} className={` ${longAnswer && "col-span-2"}`}>
                  <InputCity name={name} type="text" placeholder={t("choose_the_city")} />
                </InputIcon>
              }
              {(type === "select-study" || type === "select-study-level" || type === "representative_position") &&
                <SelectWIthHead name={name} options={type} searchable={true} className="col-span-2" defaultValue={values[name]} optionsOutside={options} />
              }
              {(type === "options-input" || type === "select-study") &&
                <InputOther name={name} defaultValue={options.map(option => option = option.value).indexOf(values[name]) == -1 ? values[name] : ""} className={`${longAnswer && "col-span-2"}`} />
              }

            </div>
          </div>
          <span className="text-xs text-gray-500 block text-center mb-4 mt-8">{t("question_one_from_all", { one: currentQustion + 1, all: last })}</span>
          <div className="w-[700px] mx-auto max-w-full pb-8">
            <Buttons {...props} values={values} dirty={values[name]} handlePrevStep={() => handlePrevStep(values)} last={last} currentQustion={currentQustion} />
          </div>
        </Form>
      )}
    </Formik>
  );
};
const LastStep = (props) => {
  const { t, lang } = useTranslation("profile")
  const [check, setCheck] = useState(false)
  const handleSubmit = (values) => {
    props.next(values, 1, true)

  };
  const handlePrevStep = (values) => {
    props.prev(values)
  };
  return (
    <>

      <Formik
        initialValues={props.data}
        onSubmit={handleSubmit}
      >
        {({ values, dirty }) => (
          <Form>
            <div className="w-[700px] mx-auto max-w-full pb-8">
              <ul>
                <li className="mx-2 mb-8 relative before:w-4 before:h-4 before:rounded-full  before:absolute before:top-0 rtl:before:right-0 ltr:before:left-0  rtl:pr-6 ltr:pl-6 before:bg-primary ">
                  {t("i_realize_that_my_transactions_with_hululfx_are_the_purchase_and_sale_of_products_with_differences_only_in_various_basic_assets")}
                </li>
                <li className="mx-2 mb-8 relative before:w-4 before:h-4 before:rounded-full  before:absolute before:top-0 rtl:before:right-0 ltr:before:left-0  rtl:pr-6 ltr:pl-6 before:bg-primary ">
                  {t("i_realize_that_the_products_provided_by_hullf_x_are_contracts_for_the_difference_that_operate_with_a_financial_lever_and_involve_a_high_degree_of_risk_and_i_can_lose_every_hululf_x_capital_i_also_admitted_that_i_have_read_the_document_of_disclosure_on_the_risks_available_on_the_internet")}
                </li>
                <li className="mb-8 ">
                  <Checkbox onChange={(value, checked) => setCheck(checked)}> {t("by_clicking_this_selection_box_i_agree_on_all_the_statements_mentioned_above_and_that_my_answers_are_guaranteed_to_be_accurate")}</Checkbox>

                </li>
              </ul>
              <Buttons {...props} values={values} dirty={check} handlePrevStep={() => handlePrevStep(values)} lastStep loadingButton={props.loadingButton} />
            </div>
          </Form>
        )}
      </Formik>
    </>
  )
}

const Buttons = (props) => {

  const { t, lang } = useTranslation("profile")
  return (
    <div className="flex">
      {(props.currentQustion > 0 || props.lastStep) && <ButtonTheme
        color="primary"
        as="span"
        onClick={props.handlePrevStep}
        size="md" block
        outline
        className="rtl:-ml-4 ltr:-mr-4 text-center "
      >
        <div className="flex gap-2 justify-center items-center text-xl">
          {lang === "ar" ? <ArrowRight size="25" className="text-inherit " /> : <ArrowLeft size="25" className="text-inherit " />}
          {t("back")}
        </div>
      </ButtonTheme>}
      <ButtonTheme color="primary" as="button" type="submit" size="md" block className={`text-center ${props.currentStep > 0 && 'w-[170%]'} `} disabled={!props.dirty ? true : false} loading={props.loadingButton || false} >
        <div className="flex gap-2 justify-center items-center text-xl">
          {props.currentQustion ? t("next") : t("send")}
          {lang === "ar" ? <ArrowLeft size="25" className="text-inherit " /> : <ArrowRight size="25" className="text-inherit " />}
        </div>
      </ButtonTheme>
    </div>
  )
}
const InputOther = ({ name, defaultValue, ...props }) => {
  const { t, lang } = useTranslation("profile")
  const [field, meta, helpers] = useField(name);
  const [input, setInput] = useState(defaultValue)
  const [check, setCheck] = useState()
  const handleChange = (e) => {
    console.log(e.target.value)
    helpers.setValue(e.target.value);
    setInput(e.target.value)
    setCheck("")

  }
  const handleChangeCheck = (e) => {
    setInput("")
    setCheck(e.target.value)
    helpers.setValue(e.target.value);
  }
  return (
    <input className={`${props.className} block w-full text-center px-4 py-4  rounded-md bg-secondary dark:bg-dark-secondary  ${(defaultValue && defaultValue.length) && "border-2 border-primary "}`} placeholder={t("other")} name={name} onChange={handleChange} value={input} onClick={handleChange} />
  )
}