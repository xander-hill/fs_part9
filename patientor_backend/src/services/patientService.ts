import patients from '../../data/patientEntries';
import { v1 as uuid } from 'uuid';

import { Patient, NonSensitivePatient, NewPatient } from '../types';

const getPatients = (): Patient[] => {
    return patients;
};

const getNonSensitivePatients = ():NonSensitivePatient[] => {
    return patients.map(({ id, name, dateOfBirth, gender, occupation }) => ({
        id,
        name,
        dateOfBirth,
        gender,
        occupation,
    }));
};

const addPatient = ( patient: NewPatient ): Patient => {
    const newPatient = {
        // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment, @typescript-eslint/no-unsafe-call
        id: uuid(),
        entries: [],
        ...patient
    };

    patients.push(newPatient);
    return newPatient;
};

const findById = (id: string): Patient | undefined => {
    const patient = patients.find(p => p.id === id);
    return patient;
};

export default {
    getPatients,
    getNonSensitivePatients,
    addPatient,
    findById
};