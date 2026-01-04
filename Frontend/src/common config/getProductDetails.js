import { Axios } from '../common config/axiox';
import { SummaryApi } from '../common config/summayApi';

export const GetProductsDetails = async () => {
  try {
    const res = await Axios({
      ...SummaryApi.userDetails,
      headers: { "Cache-Control": "no-cache" } 
    });
    if(res.data?.success){

      return res.data.data || null;  
    }

  } catch (error) {
    console.error("GetUserDetails error:", error);
    return null;
  }
};
