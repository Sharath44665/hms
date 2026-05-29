import { useEffect, useState } from "react";
import { getAllPatients } from "../../../Service/PatientProfileService";
import PatientCard from "./PatientCard";

const Patient = () => {

    const [patients, setPatients] = useState<any[]>([])

    useEffect(()=>{
        getAllPatients().then((data) =>{
            console.log(data)
            setPatients(data)
        }).catch((error) =>{
            console.log(error)
        })
    },[])
    return (
        <div>

            <div className="text-xl text-primary-500 font-semibold mb-5">Patients</div>
                <div className="grid grid-cols-4 gap-5 ">
                    {
                        patients.map((patient) => (
                            <PatientCard key={patient.id} {...patient} />
                        ))
                    }
                </div>
          
            
        </div>
    )
}

export default Patient;