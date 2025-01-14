import { EntryWithoutId, Diagnosis, Patient } from "../types"
import React, { Dispatch, SetStateAction, useState } from "react";
import patientService from '../services/patients';

interface FormProps {
    //addEntry: (values: EntryWithoutId) => void;
    //diagnoses: Diagnosis[];
    patient: Patient;
}

const EntryForm = ({ patient }: FormProps) => {
    const [entryType, setEntryType ] = useState('');
    const [description, setDescription] = useState('');
    const [date, setDate] = useState('');
    const [specialist, setSpecialist] = useState('');
    const [diagnosisCode, setDiagnosisCode] = useState('');
    const [diagnosisCodes, setDiagnosisCodes] = useState<string[]>([]);
    const [rating, setRating] = useState<string>('');
    const [employer, setEmployer] = useState<string>('');
    const [startDate, setStartDate] = useState<string>('');
    const [endDate, setEndDate] = useState<string>('');
    const [dischargeDate, setDischargeDate] = useState<string>('');
    const [criteria, setCriteria] = useState<string>('');


    const handleEntryType = (event: React.ChangeEvent<HTMLSelectElement>) => {
        console.log("entry type: ", entryType);
        setEntryType(event.target.value);
    };

    const handleDescriptionChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        console.log("description:", description);
        setDescription(event.target.value);
    }

    const handleDateChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        console.log("date: ", date);
        setDate(event.target.value);
    }

    const handleSpecialistChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        console.log("specialist: ", specialist);
        setSpecialist(event.target.value);
    }

    const handleDiagnoisCodeChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        console.log("diagnosis code: ", diagnosisCode);
        setDiagnosisCode(event.target.value);
    }

    const addDiagnosisCode = (event: React.MouseEvent<HTMLButtonElement>) => {
        event.preventDefault();
        console.log("diagnosis codes:", diagnosisCodes);
        setDiagnosisCodes(prevCodes => [...prevCodes, diagnosisCode]);
        setDiagnosisCode('');
    }

    const handleRatingChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        console.log("rating: ", rating);
        setRating(event.target.value);
    }

    const handleEmployerChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        console.log("employer: ", employer);
        setEmployer(event.target.value);
    }

    const handleStartDateChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        console.log("start date: ", startDate);
        setStartDate(event.target.value);
    }

    const handleEndDateChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        console.log("end date: ", endDate);
        setEndDate(event.target.value);
    }

    const handleDischargeDateChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        console.log("discharge date: ", dischargeDate);
        setDischargeDate(event.target.value);
    }

    const handleCriteriaChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        console.log("criteria: ", criteria);
        setCriteria(event.target.value);
    }


    const addEntry = async () => {
        switch (entryType) {
            case "HealthCheck":
                event?.preventDefault()
                const newEntry = {
                    type: "HealthCheck",
                    description: description,
                    date: date,
                    specialist: specialist,
                    diagnosisCodes: diagnosisCodes,
                    healthCheckRating: Number(rating)
                } as EntryWithoutId;
                await patientService.update(patient.id, newEntry);
                window.location.reload();
                setDescription('');
                setDate('');
                setSpecialist('');
                setDiagnosisCode('');
                setDiagnosisCodes([]);
                setRating('');
        }
    }

    const renderInputForm = () => {
        switch (entryType) {
            case "HealthCheck":
                return (
                    <div>
                        <form onSubmit={addEntry}>
                            Description: <input value={description} onChange={handleDescriptionChange}/>
                            <br/>
                            Date: <input value={date} onChange={handleDateChange}/>
                            <br/>
                            Specialist: <input value={specialist} onChange={handleSpecialistChange}/>
                            <br/>
                            Rating: <input value={rating} onChange={handleRatingChange}/>
                            <br/>
                            Diagnosis Codes: <input value={diagnosisCode} onChange={handleDiagnoisCodeChange}/><button onClick={addDiagnosisCode}>add</button>
                            <ul>
                                {diagnosisCodes.map(code => (
                                    <li key={code}>{code}</li>
                                ))}
                            </ul>
                            <button type='submit'>add entry</button>
                        </form>
                    </div>
                )
        }
    }

    return (
        <div>
            <label htmlFor="entry">Choose entry type:</label>
            <select name="entry" id="entry" onChange={handleEntryType}>
                <option value="HealthCheck">Health Check</option>
                <option value="Hospital">Hospital</option>
                <option value="OccupationalHealthcare">Occupational Healthcare</option>
            </select>
            {renderInputForm()}
        </div>
    )
};

export default EntryForm;