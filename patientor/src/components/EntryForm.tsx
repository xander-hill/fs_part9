import { EntryWithoutId, Diagnosis, Patient } from "../types"
import React, { Dispatch, SetStateAction, useState } from "react";
import patientService from '../services/patients';

interface FormProps {
    //addEntry: (values: EntryWithoutId) => void;
    //diagnoses: Diagnosis[];
    patient: Patient;
}

const EntryForm = ({ patient }: FormProps) => {
    const [entryType, setEntryType ] = useState('HealthCheck');
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

    const entryStyle = {
        border: "1px solid #ccc",
        borderRadius: "8px",
        padding: "15px",
        marginBottom: "10px",
        backgroundColor: "#f9f9f9"
    };


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
                const newHealthCheckEntry = {
                    type: "HealthCheck",
                    description: description,
                    date: date,
                    specialist: specialist,
                    diagnosisCodes: diagnosisCodes,
                    healthCheckRating: Number(rating)
                } as EntryWithoutId;
                await patientService.update(patient.id, newHealthCheckEntry);
                window.location.reload();
                setDescription('');
                setDate('');
                setSpecialist('');
                setDiagnosisCode('');
                setDiagnosisCodes([]);
                setRating('');
                break;
            case "Hospital":
                event?.preventDefault()
                const newHospitalEntry = {
                    type: "Hospital",
                    description: description,
                    date: date,
                    specialist: specialist,
                    diagnosisCodes: diagnosisCodes,
                    discharge: date !== '' && criteria !== ''
                        ? {
                            date: dischargeDate,
                            criteria: criteria
                        }
                        : undefined
                } as EntryWithoutId;
                await patientService.update(patient.id, newHospitalEntry);
                window.location.reload();
                setDescription('');
                setDate('');
                setSpecialist('');
                setDiagnosisCode('');
                setDiagnosisCodes([]);
                setDischargeDate('');
                setCriteria('');
                break;
            case "OccupationalHealthcare":
                event?.preventDefault()
                const occupationalEntry = {
                    type: "OccupationalHealthcare",
                    description: description,
                    date: date,
                    specialist: specialist,
                    diagnosisCodes: diagnosisCodes,
                    employerName: employer,
                    sickLeave: startDate !== '' && endDate !== ''
                        ? {
                            startDate: startDate,
                            endDate: endDate
                        }
                        : undefined
                } as EntryWithoutId;
                await patientService.update(patient.id, occupationalEntry);
                window.location.reload();
                setDescription('');
                setDate('');
                setSpecialist('');
                setDiagnosisCode('');
                setDiagnosisCodes([]);
                setDischargeDate('');
                setCriteria('');
                break;
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
            case "Hospital":
                return (
                    <div>
                        <form onSubmit={addEntry}>
                            Description: <input value={description} onChange={handleDescriptionChange}/>
                            <br/>
                            Date: <input value={date} onChange={handleDateChange}/>
                            <br/>
                            Specialist: <input value={specialist} onChange={handleSpecialistChange}/>
                            <br/>
                            Discharge Date: <input value={dischargeDate} onChange={handleDischargeDateChange}/>
                            <br/>
                            Discharge Criteria: <input value={criteria} onChange={handleCriteriaChange}/>
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
            case "OccupationalHealthcare":
                return (
                    <div>
                        <form onSubmit={addEntry}>
                            Description: <input value={description} onChange={handleDescriptionChange}/>
                            <br/>
                            Date: <input value={date} onChange={handleDateChange}/>
                            <br/>
                            Specialist: <input value={specialist} onChange={handleSpecialistChange}/>
                            <br/>
                            Employer Name: <input value={employer} onChange={handleEmployerChange}/>
                            <br/>
                            Sick Leave Start: <input value={startDate} onChange={handleStartDateChange}/>
                            <br/>
                            Sick Leave End: <input value={endDate} onChange={handleEndDateChange}/>
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
        <div style={entryStyle}>
            <h3>Add Entry: </h3>
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