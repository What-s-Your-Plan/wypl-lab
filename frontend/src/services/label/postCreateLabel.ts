import { axiosWithAccessToken } from "../axios";

async function postCreateLabel(color: string, title: string) {
  try{
    const response = await axiosWithAccessToken.post('/label/v1/labels', {color, title})
    if (response.status !== 200) {
      console.log(response)
    }
  } catch(e) {
    console.log(e)
  }
}

export default postCreateLabel;