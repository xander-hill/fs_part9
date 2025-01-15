import { Patient, Diagnosis, Entry } from "../types";
import MaleIcon from '@mui/icons-material/Male';
import FemaleIcon from '@mui/icons-material/Female';
import TransgenderIcon from '@mui/icons-material/Transgender';
import SingleEntry from "./SingleEntry";
import EntryForm from "./EntryForm";

interface Props {
    patient: Patient | undefined | null;
    diagnoses: Diagnosis[];
}


const SinglePatient = ({ patient, diagnoses } : Props) => {
    
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
            <EntryForm patient={patient}/>
            <h4>Entries:</h4>
            {patient.entries.map(entry => (
                <SingleEntry entry={entry} diagnoses={diagnoses} />
            ))}
        </div>
    );
};

export default SinglePatient;