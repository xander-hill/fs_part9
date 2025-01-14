import patients from '../../data/patientEntries';
import { v1 as uuid } from 'uuid';

import { NewEntry } from '../utils';
import { Patient, NonSensitivePatient, NewPatient, Entry } from '../types';

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

const addEntry = ( patient: Patient, entry: NewEntry ): Entry => {
    // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment, @typescript-eslint/no-unsafe-call
    const newEntry = {
        id: uuid(),
        ...entry
    };
    patient.entries.push(newEntry);
    return newEntry;
};

const findById = (id: string): Patient | undefined => {
    const patient = patients.find(p => p.id === id);
    return patient;
};

export default {
    getPatients,
    getNonSensitivePatients,
    addPatient,
    findById,
    addEntry
};