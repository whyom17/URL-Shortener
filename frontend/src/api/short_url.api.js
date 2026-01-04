import axiosInstance from "../utils/axiosInstance";

export const createShortUrl = async ({url, slug= null}) => {
  const {response} = await axiosInstance.post('/api/create', { url, slug });
  return response.shortUrl;
}