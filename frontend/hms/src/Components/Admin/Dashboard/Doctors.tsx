import { ScrollArea } from '@mantine/core';
import { useEffect, useState } from 'react'; 
import { getAllDoctors } from '../../../Service/DoctorProfileService';

const Doctors = () => {
    const [doctors, setDoctors] = useState<any[]>([])
    
        useEffect(()=>{
            getAllDoctors().then((data) =>{
                console.log(data)
                setDoctors(data)
            }).catch((error) =>{
                console.log(error)
            })
        },[])

    const card = (app: any) => {
        return <div className={`p-3 mb-3 border rounded-xl justify-between border-l-4 border-violet-500 shadow-md flex bg-violet-100`}>
            <div>
                <div className='font-semibold'>{app.name}</div>
                <div className='text-sm text-gray-500'>{app.email}</div>
            </div>
            <div className='text-right'>
                <div className='text-sm text-gray-500'>{app.address}</div>
                <div className='text-sm text-gray-500'>{app.department}</div>
            </div>
        </div>
    }


    return (
        <div className="p-3 border rounded-xl bg-violet-50 shadow-xl flex flex-col gap-3">
            <div className='text-xl font-semibold'>Doctors</div>
            <div>
                <ScrollArea.Autosize mah={300} mx="auto">
                    {doctors.map((app) => card(app))}
                </ScrollArea.Autosize>
            </div>
        </div>
    )
}

export default Doctors;