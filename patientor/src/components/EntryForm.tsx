import { EntryWithoutId, Diagnosis, Patient } from "../types"
import React, { Dispatch, SetStateAction, useState } from "react";
import patientService from '../services/patients';
import Select, { SelectChangeEvent } from '@mui/material/Select';
import MenuItem from '@mui/material/MenuItem';
import OutlinedInput from '@mui/material/OutlinedInput';

interface FormProps {
    //addEntry: (values: EntryWithoutId) => void;
    diagnoses: Diagnosis[];
    patient: Patient;
}

const EntryForm = ({ patient, diagnoses }: FormProps) => {
    const [entryType, setEntryType ] = useState('HealthCheck');
    const [description, setDescription] = useState('');
    const [date, setDate] = useState('');
    const [specialist, setSpecialist] = useState('');
    //const [diagnosisCode, setDiagnosisCode] = useState('');
    const [diagnosisCodes, setDiagnosisCodes] = useState<string[]>([]);
    const [rating, setRating] = useState<string>('');
    const [employer, setEmployer] = useState<string>('');
    const [startDate, setStartDate] = useState<string>('');
    const [endDate, setEndDate] = useState<string>('');
    const [dischargeDate, setDischargeDate] = useState<string>('');
    const [criteria, setCriteria] = useState<string>('');

    const ratings = ['0', '1', '2', '3'];

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

    // const handleDiagnoisCodeChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    //     console.log("diagnosis code: ", diagnosisCode);
    //     setDiagnosisCode(event.target.value);
    // }

    const handleDiagnosisCodesChange = (event: SelectChangeEvent<typeof diagnosisCodes>) => {
        event.preventDefault();
        console.log("diagnosis codes:", diagnosisCodes);
        const {
            target: { value },
          } = event;
        setDiagnosisCodes(typeof value === 'string' ? value.split(',') : value,);
    }

    const handleRatingChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
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
                            Date: <input value={date} type='date' onChange={handleDateChange}/>
                            <br/>
                            Specialist: <input value={specialist} onChange={handleSpecialistChange}/>
                            <br/>
                            Rating: <select name="rating" id="rating" onChange={handleRatingChange}>
                                        <option value="0">Healthy</option>
                                        <option value="1">Low Risk</option>
                                        <option value="2">High Risk</option>
                                        <option value="3">Critical Risk</option>
                                    </select>
                            <br/>
                            Diagnosis Codes: <Select
                                                labelId="diagnosisCodeHC"
                                                id="diagnosisCodeHC"
                                                multiple
                                                value={diagnosisCodes}
                                                onChange={handleDiagnosisCodesChange}
                                                input={<OutlinedInput label="Name" />}
                                                >
                                                {diagnoses.map((name) => (
                                                    <MenuItem
                                                    key={name.code}
                                                    value={name.code}
                                                    >
                                                    {name.code}
                                                    </MenuItem>
                                                ))}
                                             </Select>
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
                            Date: <input value={date} type='date' onChange={handleDateChange}/>
                            <br/>
                            Specialist: <input value={specialist} onChange={handleSpecialistChange}/>
                            <br/>
                            Discharge Date: <input value={dischargeDate} type='date' onChange={handleDischargeDateChange}/>
                            <br/>
                            Discharge Criteria: <input value={criteria} onChange={handleCriteriaChange}/>
                            <br/>
                            Diagnosis Codes: <Select
                                                labelId="demo-multiple-name-label"
                                                id="demo-multiple-name"
                                                multiple
                                                value={diagnosisCodes}
                                                onChange={handleDiagnosisCodesChange}
                                                input={<OutlinedInput label="Name" />}
                                                >
                                                {diagnoses.map((name) => (
                                                    <MenuItem
                                                    key={name.code}
                                                    value={name.code}
                                                    >
                                                    {name.code}
                                                    </MenuItem>
                                                ))}
                                             </Select>
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
                            Date: <input value={date} type='date' onChange={handleDateChange}/>
                            <br/>
                            Specialist: <input value={specialist} onChange={handleSpecialistChange}/>
                            <br/>
                            Employer Name: <input value={employer} onChange={handleEmployerChange}/>
                            <br/>
                            Sick Leave Start: <input value={startDate} type='date' onChange={handleStartDateChange}/>
                            <br/>
                            Sick Leave End: <input value={endDate} type='date' onChange={handleEndDateChange}/>
                            <br/>
                            Diagnosis Codes: <Select
                                                labelId="demo-multiple-name-label"
                                                id="demo-multiple-name"
                                                multiple
                                                value={diagnosisCodes}
                                                onChange={handleDiagnosisCodesChange}
                                                input={<OutlinedInput label="Name" />}
                                                >
                                                {diagnoses.map((name) => (
                                                    <MenuItem
                                                    key={name.code}
                                                    value={name.code}
                                                    >
                                                    {name.code}
                                                    </MenuItem>
                                                ))}
                                             </Select>
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