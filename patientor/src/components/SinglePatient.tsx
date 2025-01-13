import { Patient } from "../types";
import MaleIcon from '@mui/icons-material/Male';
import FemaleIcon from '@mui/icons-material/Female';
import TransgenderIcon from '@mui/icons-material/Transgender';

interface Props {
    patient: Patient | undefined | null
}

const SinglePatient = ({ patient } : Props) => {
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
        </div>
    );
};

export default SinglePatient;