import { Patient, Diagnosis } from "../types";
import MaleIcon from '@mui/icons-material/Male';
import FemaleIcon from '@mui/icons-material/Female';
import TransgenderIcon from '@mui/icons-material/Transgender';

interface Props {
    patient: Patient | undefined | null;
    diagnoses: Diagnosis[];
}


const SinglePatient = ({ patient, diagnoses } : Props) => {
    const diagnosisCode = (code: string): string | undefined => diagnoses.find(d => d.code === code)?.name;
    
    if (!patient) {
        return null;
    }

    return (
        <div>
            <h2>{patient.name} {patient.gender === 'male'
                ? <MaleIcon />
                : patient.gender === 'female'
                    ? <FemaleIcon />
                    : <TransgenderIcon />
            }</h2>
            <p>ssh: {patient.ssn}</p>
            <p>occupation: {patient.occupation}</p>
            <h4>Entries:</h4>
            {patient.entries.map(entry => (
                <div>
                    {entry.date}: {entry.description}
                    <ul>
                        {entry.diagnosisCodes?.map(code => (
                            <li key={code}>{code}: {diagnosisCode(code)}</li>
                        ))}
                    </ul>
                </div>
            ))}
        </div>
    );
};

export default SinglePatient;