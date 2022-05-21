import axios from "axios";
const host = "https://www.hululmfx.com/api";
import toast from "react-hot-toast";
// import useTranslation from 'next-translate/useTranslation'
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
            toast.error(t("auth:sorry_a_problem_occurred"))
        }else{
            toast.error(t("auth:sorry_a_problem_occurred"))
        }
    })
}
 const register =({ values, success, error ,t })=> {
    sendRequest(`${host}/register` , values, success, (err)=>{
        if(err.response.status === 302){
            toast.error(t("auth:sorry_email_previously_used"));
        }
        error();
    }, t)
 }
 function login ({ values, success, error , t }) {
    sendRequest(`${host}/login` , values, success, (err)=>{
        if(err.response.status === 302){
            toast.error(t("auth:sorry_email_previously_used"));
        }
        error();
    }, t)
 }
export { register , login}