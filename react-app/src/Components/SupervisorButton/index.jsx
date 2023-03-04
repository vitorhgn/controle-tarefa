import { Link } from 'react-router-dom';
import handleStorage from '../../storage/storage';

export default function SupervisorButton ({to, className, label, onClick}) {
   const storage = handleStorage();
   if(!storage.isSupervisor()){
    return <></>;
   }
   return( 
        <Link onClick={onClick} className={`btn ${className}`} to={to}>
            {label}
        </Link>
    )
}