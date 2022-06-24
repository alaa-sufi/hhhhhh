import useSWR from 'swr'
import { userPersonalProfile, companyPersonalProfile  } from "apiHandle"
function useProfilePersonal (role) {
    const { data, error } = useSWR(role === "user" ? userPersonalProfile(process.env.userId) : companyPersonalProfile(process.env.company_id))

    return {
      data, error
    }
    
  } 
  export{
    useProfilePersonal 
  }
