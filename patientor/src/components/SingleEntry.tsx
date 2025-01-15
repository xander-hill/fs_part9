import { Entry, Diagnosis } from "../types";
import LocalHospitalIcon from '@mui/icons-material/LocalHospital';
import VaccinesIcon from '@mui/icons-material/Vaccines';
import BusinessCenterIcon from '@mui/icons-material/BusinessCenter';

interface Props {
    entry: Entry;
    diagnoses: Diagnosis[];
}

const SingleEntry = ({ entry, diagnoses }: Props) => {

    const entryStyle = {
        border: "1px solid #ccc",
        borderRadius: "8px",
        padding: "15px",
        marginBottom: "10px",
        backgroundColor: "#f9f9f9"
    };

    const assertNever = (value: never): never => {
        throw new Error(
          `Unhandled discriminated union member: ${JSON.stringify(value)}`
        );
    };

    const diagnosisCode = (code: string): string | undefined => diagnoses.find(d => d.code === code)?.name;

    switch (entry.type) {
        case "Hospital":
            return (
                <div style={entryStyle}>
                    {entry.date} <LocalHospitalIcon/>
                    <br />
                    {entry.description}
                    <br />
                    {entry.discharge && 
                        <div>
                            Discharge {entry.discharge.date}: {entry.discharge.criteria}
                        </div>}
                    <ul>
                        {entry.diagnosisCodes?.map(code => (
                            <li key={code}>{code}: {diagnosisCode(code)}</li>
                        ))}
                    </ul>
                    diagnose by {entry.specialist}
                </div>
            );
        case "HealthCheck":
            return (
                <div style={entryStyle}>
                    {entry.date} <VaccinesIcon/>
                    <br />
                    {entry.description}
                    <br />
                    Health Rating: {entry.healthCheckRating}
                    <ul>
                        {entry.diagnosisCodes?.map(code => (
                            <li key={code}>{code}: {diagnosisCode(code)}</li>
                        ))}
                    </ul>
                    diagnose by {entry.specialist}
                </div>
            );
        case "OccupationalHealthcare":
            return (
                <div style={entryStyle}>
                    {entry.date} <BusinessCenterIcon/>
                    <br />
                    {entry.description}
                    <br />
                    Employer: {entry.employerName}
                    <br />
                    {entry.sickLeave && 
                        <div>
                            Sick Leave: {entry.sickLeave.startDate} - {entry.sickLeave.endDate}
                        </div>
                    }
                    <ul>
                        {entry.diagnosisCodes?.map(code => (
                            <li key={code}>{code}: {diagnosisCode(code)}</li>
                        ))}
                    </ul>
                    diagnose by {entry.specialist}
                </div>
            );
        default: 
            return assertNever(entry);
    }
};

export default SingleEntry;