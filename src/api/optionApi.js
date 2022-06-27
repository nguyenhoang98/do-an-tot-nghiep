import axiosClient from './axiosClient';
import { apiUrl } from '../constants';

const optionApi = {
  provincesApi: () => axiosClient.get(`${apiUrl}/option/address/provinces`),
  districtsApi: province_code =>
    axiosClient.get(`${apiUrl}/option/address/districts/${province_code}`),
  wardsApi: district_code =>
    axiosClient.get(`${apiUrl}/option/address/wards/${district_code}`),
};

export default optionApi;
