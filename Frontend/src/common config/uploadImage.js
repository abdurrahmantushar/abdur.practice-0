import { Axios } from '../common config/axiox';
import { SummaryApi } from './summayApi';

 export const uploadImage =async (image)=>{
    try {
        const fromData = new FormData()
        fromData.append('image',image)
        const res = await Axios ({
            ...SummaryApi.uploadImage,
            data:fromData
        })
        return res
    } catch (error) {
        return error
    }
}