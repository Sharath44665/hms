import { ScrollArea } from '@mantine/core';
// import { patients } from '../../../data/DashboardData'; 
import { useEffect, useState } from 'react';
import { getAllPatients } from '../../../Service/PatientProfileService';
import { bloodGroupMap } from '../../../data/DropdownData';

const Patients = () => {
    const [patients, setPatients] = useState<any[]>([])
    
        useEffect(()=>{
            getAllPatients().then((data) =>{
                // console.log(data)
                setPatients(data)
            }).catch((error) =>{
                console.log(error)
            })
        },[])

    const card = (app: any) => {
        return <div className={`p-3 mb-3 border rounded-xl justify-between border-l-4 border-orange-500 shadow-md flex bg-orange-100`}>
            <div>
                <div className='font-semibold'>{app.name}</div>
                <div className='text-sm text-gray-500'>{app.email}</div>
            </div>
            <div className='text-right'>
                <div className='text-sm text-gray-500'>{app.address}</div>
                <div className='text-sm text-gray-500'>Blood Group: {bloodGroupMap[app.bloodGroup]}</div>
            </div>
        </div>
    }


    return (
        <div className="p-3 border rounded-xl bg-orange-50 shadow-xl flex flex-col gap-3">
            <div className='text-xl font-semibold'>Patients</div>
            <div>
                <ScrollArea.Autosize mah={300} mx="auto">
                    {patients.map((app) => card(app))}
                </ScrollArea.Autosize>
            </div>
        </div>
    )
}

export default Patients;