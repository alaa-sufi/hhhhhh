import useSWR from 'swr'
import { userPersonalProfile, companyPersonalProfile  } from "apiHandle"
function useProfilePersonal (role) {
    const { data, error } = useSWR(role === "user" ? userPersonalProfile() : companyPersonalProfile())

    return {
      data, error
    }
    
  } 
  export{
    useProfilePersonal 
  }
