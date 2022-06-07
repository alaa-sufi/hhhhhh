import axios from "axios";
const host = "https://www.hululmfx.com/api";
import toast from "react-hot-toast";
import Trans from 'next-translate/Trans'

const sendRequest = (url, values, success, error) => {
    axios.post(url, values)
        .then(function (response) {
            console.log("response", response)
            toast.success("success");
            success();
        })
        .catch(function (err) {
            if (err.response) {
                error(err);
            } else {
            }
            toast.error(
                <Trans i18nKey="errToast:sorry_a_problem_occurred" />
            )
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
const register = ({ values, success, error }) => {
    sendRequest(`${host}/register`, values, success, (err) => {
        if (err.response.status === 401) {
            toast.error(
                <Trans i18nKey="errToast:sorry_email_previously_used" />
            )
        }
        error();
    })
}
function login({ values, success, error }) {
    sendRequest(`${host}/login`, values, success, (err) => {
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
    sendRequest(`${host}/password/forgot-password`, values,
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
function forgetPasswordByPhone({  success, error ,phone}) {
    getRequest(`${host}/send-phone-code?phone_number=${phone}`,
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
    sendRequest(`${host}/password/reset`, values,
        () => { success(); toast.success(<Trans i18nKey="errToast:the_word_has_been_successfully_changed" />) },
        (err) => {
            if (err.response.status === 401) { toast.error(<Trans i18nKey="errToast:sorry_the_e_mail_is_not_used" />); }
            if (err.response.status === 500) { toast.error(<Trans i18nKey="errToast:sorry_please_re_appoint_the_password_setd_set" />); }
            error();
        })
}
function enterCodeNumber({ values, success, error }) {
    sendRequest(`${host}/phoneVerifyCode`, values,
        () => { success(); toast.success(<Trans i18nKey="errToast:the_word_has_been_successfully_changed" />) },
        (err) => {
            if (err.response.status === 401) { toast.error(<Trans i18nKey="errToast:sorry_the_code_is_wrong" />) }
            error();
        })
}
function createDemoAccount({ values, success, error }) {
    sendRequest(`${host}/create-demo`, values,
        () => { success(); toast.success(<Trans i18nKey="errToast:account_successfully_created" />) },
        (err) => {
            error();
        })
}



//get
function getCurrentCountry({ success, error }) {
    getRequest(`${host}/Get-current-country`, success, error)
}
function getPhoneCode({ success, error, phone }) {
    getRequest(`${host}/verifyPhone?phone_number=${phone}`, success, error)
}
export { register, login, forgetPasswordByEmail, forgetPasswordByPhone, returnPassword, getCurrentCountry, enterCodeNumber, getPhoneCode ,createDemoAccount}