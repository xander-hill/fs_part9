import express, { Request, Response } from 'express';
import patientService from '../services/patientService';
import { Patient, NewPatient, Entry } from '../types';
import { newPatientSchema, EntrySchema, NewEntry } from '../utils';
import { z } from 'zod';
//import patients from '../../data/patientEntries';

// eslint-disable-next-line @typescript-eslint/no-unsafe-function-type
const errorMiddleware = (error: unknown, _req: Request, res: Response, next: Function) => { 
    console.log('reached error middleware');
    console.log(error);
    if (error instanceof z.ZodError) {
      res.status(400).send({ error: error.issues });
    } else {
      // eslint-disable-next-line @typescript-eslint/no-unsafe-call
      next(error);
    }
};

const router = express.Router();

// eslint-disable-next-line @typescript-eslint/no-unsafe-function-type
const newPatientParser = (req: Request, _res: Response, next: Function) => { 
    try {
      newPatientSchema.parse(req.body);
      // eslint-disable-next-line @typescript-eslint/no-unsafe-call
      next();
    } catch (error: unknown) {
      // eslint-disable-next-line @typescript-eslint/no-unsafe-call
      next(error);
    }
};

// eslint-disable-next-line @typescript-eslint/no-unsafe-function-type
const newEntryParser = (req: Request, _res: Response, next: Function) => {
  console.log('got here');
  console.log(req.body);
  try {
    EntrySchema.parse(req.body);
    // eslint-disable-next-line @typescript-eslint/no-unsafe-call
    next();
  } catch (error: unknown) {
    console.log('error ocurred');
    // eslint-disable-next-line @typescript-eslint/no-unsafe-call
    next(error);
  }
};

router.get('/', (_req, res) => {
    res.send(patientService.getPatients());
});

router.post('/:id/entries', newEntryParser, (req: Request<{id: string}, unknown, NewEntry>, res: Response<Entry | {error: string}>) => {
  console.log(req.body);
  const id = req.params.id;
  const patient = patientService.findById(id);
  console.log(id);
  console.log(patient);

  if (!patient) {
    return;
  }
  
  const parsedEntry = EntrySchema.parse(req.body);
  console.log(parsedEntry);
  const newEntry = patientService.addEntry(patient, parsedEntry);
  console.log(newEntry);
  res.json(newEntry);
});

router.post('/', newPatientParser, (req: Request<unknown, unknown, NewPatient>, res: Response<Patient>) => {
    const addedPatient = patientService.addPatient(req.body);
    res.json(addedPatient);
});

router.get('/:id', (req: Request, res: Response<Patient>) => {
  const patient = patientService.findById(String(req.params.id));
  if (patient) {
    res.send(patient);
  } else {
    res.sendStatus(400);
  }
});

router.use(errorMiddleware);

export default router;