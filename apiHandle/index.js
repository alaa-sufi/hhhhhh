import axios from "axios";
const host = "https://www.hululmfx.com/api";
import toast from "react-hot-toast";
const sendRequest =(url , values , success , error , t)=>{
    axios.post(url, values)
    .then(function (response) {
        console.log("response", response)
        toast.success("success");
        success();
    })
    .catch(function (err) {
        if(err.response){
            error(err);
        }else{
            toast.error(t("errToast:sorry_a_problem_occurred"))
        }
    })
}
const getRequest =(url  , success , error )=>{
    axios.get(url)
    .then(function (response) {
        success(response);
    })
    .catch(function (err) {
        if(err.response){
            error();
        }else{
            toast.error(t("errToast:sorry_a_problem_occurred"))
        }
    })
}
 const register =({ values, success, error ,t })=> {
    sendRequest(`${host}/register` , values, success, (err)=>{
        if(err.response.status === 401){
            toast.error(t("errToast:sorry_email_previously_used"));
        }
        error();
    }, t)
 }
 function login ({ values, success, error , t }) {
    sendRequest(`${host}/login` , values, success, (err)=>{
        if(err.response.status === 401){
            toast.error(t("errToast:sorry_the_email_is_not_true"));
        }
        if(err.response.status === 402){
            toast.error(t("errToast:sorry_the_wrong_password"));
        }
        error();
    }, t)
 }
 function forgetPasswordByEmail ({ values, success, error , t }) {
    sendRequest(`${host}/password/forgot-password` , values,
     ()=>{
         success();
         toast.success(t("errToast:we_have_emailed_your_password_reset_link"));
        }, (err)=>{
        if(err.response.status === 402){
            toast.error(t("errToast:sorry_the_e_mail_is_not_used"));
        }
        error(err);
    }, t)
 }
 function forgetPasswordByPhone ({ values, success, error , t }) {
    sendRequest(`${host}/password/forgot-password` , values,
     ()=>{
         success();
         toast.success(t("errToast:we_have_emailed_your_password_reset_link"));
        }, (err)=>{
        if(err.response.status === 401){
            toast.error(t("errToast:sorry_the_e_mail_is_not_used"));
        }
        error();
    }, t)
 }
 function returnPassword ({ values, success, error , t }) {
    sendRequest(`${host}/password/reset` , values,
     ()=>{success();toast.success(t("errToast:the_word_has_been_successfully_changed"));},
      (err)=>{
          if(err.response.status === 401){toast.error(t("errToast:sorry_the_e_mail_is_not_used"));}
          if(err.response.status === 500){toast.error(t("errToast:sorry_please_re_appoint_the_password_setd_set"));}
        error();
    }, t)
 }
 function enterCodeNumber ({ values, success, error , t }) {
    sendRequest(`${host}/password/reset` , values,
     ()=>{success();toast.success(t("errToast:the_word_has_been_successfully_changed"));},
      (err)=>{
          if(err.response.status === 401){toast.error(t("errToast:sorry_the_e_mail_is_not_used"));}
          if(err.response.status === 500){toast.error(t("errToast:sorry_please_re_appoint_the_password_setd_set"));}
        error();
    }, t)
 }
 function getCurrentCountry ({  success, error  }) {
    getRequest(`${host}/Get-current-country` ,success, error)
 }
 function getPhoneCode ({  success, error , phone  }) {
    getRequest(`${host}/verifyPhone?phone_number=${phone}` ,success, error)
 }
export { register , login , forgetPasswordByEmail ,forgetPasswordByPhone ,returnPassword, getCurrentCountry ,enterCodeNumber,getPhoneCode}