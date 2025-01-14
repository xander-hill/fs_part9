import axios from "axios";
import { Patient, PatientFormValues, EntryWithoutId } from "../types";

import { apiBaseUrl } from "../constants";

const getAll = async () => {
  const { data } = await axios.get<Patient[]>(
    `${apiBaseUrl}/patients`
  );

  return data;
};

const create = async (object: PatientFormValues) => {
  const { data } = await axios.post<Patient>(
    `${apiBaseUrl}/patients`,
    object
  );

  return data;
};

const update = async (id: string, entry: EntryWithoutId): Promise<Patient | { error: string }> => {
  console.log('got to service')
  try {
    const { data } = await axios.post<Patient | { error: string }>(`${apiBaseUrl}/patients/${id}/entries`, entry);
    if ('error' in data) {
      // Handle error case
      console.log(data.error);
      return data;
    }
    return data; // Success case
  } catch (error) {
    console.error("Error updating entry:", error);
    throw error;
  }
};


export default {
  getAll, create, update
};

