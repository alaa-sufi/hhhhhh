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
            toast.error(t("errToast:sorry_one_of_the_fields_is_incorrect"));
        }
        error();
    }, t)
 }
 function forgetPassword ({ values, success, error , t }) {
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
     ()=>{
         success();
        //  toast.success(t("errToast:تم تغيير كلمة "));
        }, (err)=>{
        if(err.response.status === 401){
            toast.error(t("errToast:sorry_the_e_mail_is_not_used"));
        }
        error();
    }, t)
 }
 function getCurrentCountry ({  success, error  }) {
    getRequest(`${host}/Get-current-country` ,success, error)
 }
export { register , login , forgetPassword ,returnPassword, getCurrentCountry}