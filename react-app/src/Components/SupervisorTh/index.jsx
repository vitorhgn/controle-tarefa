import handleStorage from '../../storage/storage';

export default function SupervisorTh ({label}) {
   const storage = handleStorage();
   if(!storage.isSupervisor()){
    return <></>;
   }
   return( 
        <th>
            {label}
        </th>
    )
}