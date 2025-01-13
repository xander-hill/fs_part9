import express, { Request, Response } from 'express';
import patientService from '../services/patientService';
import { Patient, NewPatient } from '../types';
import { newPatientSchema } from '../utils';
import { z } from 'zod';
//import patients from '../../data/patientEntries';

// eslint-disable-next-line @typescript-eslint/no-unsafe-function-type
const errorMiddleware = (error: unknown, _req: Request, res: Response, next: Function) => { 
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

router.get('/', (_req, res) => {
    res.send(patientService.getPatients());
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