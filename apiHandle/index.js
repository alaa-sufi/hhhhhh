import axios from "axios";
import toast from "react-hot-toast";
import Trans from 'next-translate/Trans'
var userId;
if (typeof window !== "undefined") {
    userId = localStorage.userId
}
function newValues(values){
    values.user_id = userId;
    return values
}

const sendRequest = (url, values, success, error) => {
    axios.post(url, values)
        .then(function (response) {
            console.log("response", response)
            toast.success("success");
            success(response);
        })
        .catch(function (err) {
            if (err.response) {
                error(err);
            } else {
                toast.error(
                    <Trans i18nKey="errToast:sorry_a_problem_occurred" />
                )
            }
        })
}
const putRequest = (url, success, error) => {
    axios.put(url)
        .then(function (response) {
            console.log("response", response)
            toast.success("success");
            success(response);
        })
        .catch(function (err) {
            if (err.response) {
                error(err);
            } else {
                toast.error(
                    <Trans i18nKey="errToast:sorry_a_problem_occurred" />
                )
            }
        })
}
const getRequest = (url, success, error) => {
    axios.get(url)
        .then(function (response) {
            success(response);
        })
        .catch(function (err) {
            if (err.response) {
                error();
            } else {
                toast.error(
                    <Trans i18nKey="errToast:sorry_a_problem_occurred" />
                )
            }
        })
}
const deleteRequest = (url, success, error) => {
    axios.delete(url)
        .then(function (response) {
            success(response);
        })
        .catch(function (err) {
            if (err.response) {
                error();
            } else {
                toast.error(
                    <Trans i18nKey="errToast:sorry_a_problem_occurred" />
                )
            }
        })
}
// /////////////////////////////////////////////
// post 
const register = ({ values, success, error }) => {
    sendRequest(`/register`, values, success, (err) => {
        if (err.response.status === 401) {
            toast.error(
                <Trans i18nKey="errToast:sorry_email_previously_used" />
            )
        }
        error();
    })
}
function login({ values, success, error }) {
    sendRequest(`/login`, values,(response)=> success(response), (err) => {
        if (err.response.status === 401) {
            toast.error(
                <Trans i18nKey="errToast:sorry_the_email_is_not_true" />
            )
        }
        if (err.response.status === 402) {
            toast.error(
                <Trans i18nKey="errToast:sorry_the_wrong_password" />
            )
        }
        error();
    })
}
function forgetPasswordByEmail({ values, success, error }) {
    sendRequest(`/password/forgot-password`, values,
        () => {
            success();
            toast.success(
                <Trans i18nKey="errToast:we_have_emailed_your_password_reset_link" />
            )
        }, (err) => {
            if (err.response.status === 402) {
                toast.error(
                    <Trans i18nKey="errToast:sorry_the_e_mail_is_not_used" />
                )
            }
            error(err);
        })
}
function forgetPasswordByPhone({ success, error, phone }) {
    getRequest(`/send-phone-code?phone_number=${phone}`,
        () => {
            success();
        }, (err) => {
            if (err.response.status === 401) {
                toast.error(
                    <Trans i18nKey="errToast:please_enter_the_correct_phone_number" />
                )
            }
            error();
        })
}
function returnPassword({ values, success, error }) {
    sendRequest(`/password/reset`, values,
        () => { success(); toast.success(<Trans i18nKey="errToast:the_word_has_been_successfully_changed" />) },
        (err) => {
            if (err.response.status === 401) { toast.error(<Trans i18nKey="errToast:sorry_the_e_mail_is_not_used" />); }
            if (err.response.status === 500) { toast.error(<Trans i18nKey="errToast:sorry_please_re_appoint_the_password_setd_set" />); }
            error();
        })
}
function enterCodeNumber({ values, success, error }) {
    sendRequest(`/phoneVerifyCode`, values,
        (response) => { success(response); toast.success(<Trans i18nKey="errToast:the_word_has_been_successfully_changed" />) },
        (err) => {
            if (err.response.status === 401) { toast.error(<Trans i18nKey="errToast:sorry_the_code_is_wrong" />) }
            error();
        })
}
function createDemoAccount({ values, success, error }) {
    sendRequest(`/create-demo`, newValues(values),
        (response) => { success(response); toast.success(<Trans i18nKey="errToast:account_successfully_created" />) },
        (err) => {
            error();
        })
}
function profilePersonalProfileUserPersonly({ values, success, error }) {
    sendRequest(`/store-user-Personal-Profile-Info`, newValues(values),
        () => { success(); toast.success(<Trans i18nKey="errToast:the_data_has_been_successfully_saved" />) },
        (err) => {
            error();
        })
}
function profilePersonalProfileCompanyPersonly({ values, success, error }) {
    sendRequest(`/store-company-Personal-Profile-Info`, newValues(values),
        () => { success(); toast.success(<Trans i18nKey="errToast:the_data_has_been_successfully_saved" />) },
        (err) => {
            error();
        })
}
function profilePersonalUserContactInformation({ values, success, error }) {
    sendRequest(`/store-user-store-Contact-Information`, newValues(values),
        () => { success(); toast.success(<Trans i18nKey="errToast:the_data_has_been_successfully_saved" />) },
        (err) => {
            if (err.response.status === 401) {
                toast.error(
                    <Trans i18nKey="errToast:sorry_email_previously_used" />
                )
            }
            error();

        })
}
function profilePersonalCompanyContactInformation({ values, success, error }) {
    sendRequest(`/store-company-store-Contact-Information`, newValues(values),
        () => { success(); toast.success(<Trans i18nKey="errToast:the_data_has_been_successfully_saved" />) },
        (err) => {
            if (err.response.status === 401) {
                toast.error(
                    <Trans i18nKey="errToast:sorry_email_previously_used" />
                )
            }
            error();
        })
}
function profilePersonalProfileUserHeadLines({ values, success, error }) {
    sendRequest(`/store-user-store-Addresses-Information`, newValues(values),
        () => { success(); toast.success(<Trans i18nKey="errToast:the_data_has_been_successfully_saved" />) },
        (err) => {
            error();
        })
}
function profilePersonalProfileCompanyHeadLines({ values, success, error }) {
    sendRequest(`/store-company-store-Addresses-Information`, newValues(values),
        () => { success(); toast.success(<Trans i18nKey="errToast:the_data_has_been_successfully_saved" />) },
        (err) => {
            error();
        })
}
function profilePersonalProfileChangePass({ values, success, error }) {
    sendRequest(`/change-user-password`, newValues(values),
        () => { success(); toast.success(<Trans i18nKey="errToast:the_data_has_been_successfully_saved" />) },
        (err) => {
            console.log(err.response.data.error)
            if (err.response.data.error === "Your current password does not matches with the password.") {
                toast.error(
                    <Trans i18nKey="errToast:sorry_the_wrong_password" />
                )
            }
            if (err.response.data.error === "New Password cannot be same as your current password.") {
                toast.error(
                    <Trans i18nKey="errToast:new_password_cannot_be_same_as_your_current_password" />
                )
            }
            error();
        })
}
function profilePersonalIdentificationConfirmation({ values, success, error }) {
    sendRequest(`/store-Documents`, newValues(values),
        () => { success(); },
        (err) => { error(); })
}
function profilePersonalFinancialInformation({ values, success, error }) {
    sendRequest(`/store-user-financial-profile-info`, newValues(values),
        () => { success(); },
        (err) => {
            if (err.response.status === 401) {
                toast.error(
                    <Trans i18nKey="errToast:sorry_you_cant_fill_your_financial_profile_info_more_than_one_time" />
                )
            }
            error();
        })
}
function profileBankAccount({ values, success, error }) {
    sendRequest(`/store-Bank-account-details`, newValues(values),
        () => { success(); toast.success(<Trans i18nKey="errToast:the_data_has_been_successfully_saved" />) },
        (err) => {

            error();
        })
}
function changeRealAccountSetting({ values, success, error }) {
    sendRequest(`/Edit-Real-account`, newValues(values),
        (res) => { success(res); toast.success(<Trans i18nKey="errToast:the_data_has_been_successfully_saved" />) },
        (err) => {

            error();
        })
}
function changeDemoAccountSetting({ values, success, error }) {
    sendRequest(`/Edit-account`, newValues(values),
        () => { success(); toast.success(<Trans i18nKey="errToast:the_data_has_been_successfully_saved" />) },
        (err) => {
            if (err.response.status === 401) {
                toast.error(
                    <Trans i18nKey="errToast:sorry_the_account_is_not_present" />
                )
            }
            error();
        })
}
function createRealAccount({ values, success, error }) {
    sendRequest(`/Api-store-real-account`, newValues(values),
        () => { success(); toast.success(<Trans i18nKey="errToast:the_data_has_been_successfully_saved" />) },
        (err) => {

            error();
        })
}
function convertAccountToFixed({ id, success, error }) {
    getRequest(`/ChangeFixedStatus?account_id=${id}`,
        () => { success() },
        (err) => { error(); })
}



/////////////////////////////////
// get
////////////////////////////////
function getCurrentCountry({ success, error }) {
    putRequest(`/Get-current-country`, success, error)
}
function getPhoneCode({ success, error, phone }) {
    putRequest(`/verifyPhone?phone_number=${phone}`, success, error)
}


// ///////////////////////////////////
//  swr
const userPersonalProfile = () => `/get-user-basic-information?user_id=${userId}`
const companyPersonalProfile = () => `/get-company-basic-information?company_id=${userId}`
const profileIdentCheck = () => `/check-identityConfirmation-documents?user_id=${userId}`
const profileAddressCheck = () => `/check-AddressConfirmation-documents?user_id=${userId}`
const profileFinancialInformation = () => `/check-user-financial-profile-info?user_id=${userId}`
const recordClosedDeals = (login) => `/get-record-for-all-Deals?login=${login}&user_id=${userId}`
const userDemoAccount = ({ perPage, page }) => `/getUserDemoAccounts-WithPagination?user_id=${userId}&perPage=${perPage}&page=${page}`
const userDemoAccountWithoutPagination = () => `/getUserDemoAccounts-WithOutPagination?user_id=${userId}`
const userRealAccount = ({ perPage, page }) => `/getUserRealAccounts?user_id=${userId}&perPage=${perPage}&page=${page}`
const userRealAccountWithoutPagination = () => `/getUserRealAccounts-WithOutPagination?user_id=${userId}`
const allAccountsTypes = () => `/getAllAccountsTypes`
// / /////////////////////////////

// delete 
function deleteDemoAccount({ login, success, error }) {
    deleteRequest(`/delete-account/${login}`,
        () => { success(); },
        (err) => { error(); })
}

export {
    register, login, forgetPasswordByEmail, forgetPasswordByPhone, returnPassword, getCurrentCountry, enterCodeNumber, getPhoneCode, createDemoAccount, profilePersonalProfileUserPersonly, profilePersonalProfileCompanyPersonly, userPersonalProfile, companyPersonalProfile,
    profilePersonalCompanyContactInformation, profilePersonalUserContactInformation,
    profilePersonalProfileUserHeadLines, profileBankAccount, profilePersonalProfileCompanyHeadLines, profilePersonalProfileChangePass,
    profilePersonalIdentificationConfirmation, profileIdentCheck, profileAddressCheck, profileFinancialInformation, profilePersonalFinancialInformation, recordClosedDeals, userDemoAccount, userDemoAccountWithoutPagination, userRealAccount, allAccountsTypes, deleteDemoAccount,
    changeRealAccountSetting, changeDemoAccountSetting, createRealAccount, convertAccountToFixed, userRealAccountWithoutPagination
}