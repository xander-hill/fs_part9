import { NewPatient, Gender, HealthCheckRating } from "./types";
import { z } from 'zod';

export const newPatientSchema = z.object({
    gender: z.nativeEnum(Gender),
    name: z.string(),
    dateOfBirth: z.string().date(),
    occupation: z.string(),
    ssn: z.string()
});

export const toNewPatient = (object: unknown): NewPatient => {
    return newPatientSchema.parse(object);
};

const BaseEntrySchema = z.object({
    description: z.string(),
    date: z.string().date(),
    specialist: z.string(),
    diagnosisCodes: z.array(z.string()).optional(),
});

const HealthCheckEntrySchema = BaseEntrySchema.extend({
    type: z.literal("HealthCheck"),
    healthCheckRating: z.nativeEnum(HealthCheckRating)
});

const HospitalEntrySchema = BaseEntrySchema.extend({
    type: z.literal("Hospital"),
    discharge: z.object({
        date: z.string().date(),
        criteria: z.string(),
    }).optional(),
});

const OccupationalHealthcareEntrySchema = BaseEntrySchema.extend({
    type: z.literal("OccupationalHealthcare"),
    employerName: z.string(),
    sickLeave: z.object({
        startDate: z.string().date(),
        endDate: z.string().date(),
    }).optional(),
});

export const EntrySchema = z.union([
    HealthCheckEntrySchema,
    HospitalEntrySchema,
    OccupationalHealthcareEntrySchema,
]);

export type NewEntry = z.infer<typeof EntrySchema>;

