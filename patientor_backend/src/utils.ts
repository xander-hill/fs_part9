import { NewPatient, Gender } from "./types";
import { z } from 'zod';

export const newPatientSchema = z.object({
    gender: z.nativeEnum(Gender),
    name: z.string(),
    dateOfBirth: z.string().date(),
    occupation: z.string(),
    ssn: z.string()
});

const toNewPatient = (object: unknown): NewPatient => {
    return newPatientSchema.parse(object);
};

export default toNewPatient;

