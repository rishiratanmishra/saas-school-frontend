
import { serverCallApi } from '@/lib/serverCallApi';
import { API_BASE_URL } from '..';
import { IOrganisationZS } from '@/zod/src/features/organisation/organisation.zod';

const ORGANISATION_BASE_URL = `${API_BASE_URL}/organisation`;

// Get Organisation List (Server-side)
export const getOrganisationListServer = async (payload: any) => {
  return serverCallApi<{ data: IOrganisationZS[]; pagination: any }>(
    (axiosInstance) =>
      axiosInstance.post(`${ORGANISATION_BASE_URL}/list`, payload)
  );
};

// Get Organisation Detail (Server-side)
export const getOrganisationDetailServer = async (payload: { _id: string }) => {
  return serverCallApi<IOrganisationZS>((axiosInstance) => {
    return axiosInstance.post(`${ORGANISATION_BASE_URL}/details`, payload);
  });
};
