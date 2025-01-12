import diagnoses from '../../data/entries';

import { Diagnosis } from '../types';

const getDiagnoses = (): Diagnosis[] => {
    return diagnoses;
};

const addDiagnosis = () => {
    return null;
};

export default {
    getDiagnoses,
    addDiagnosis
};