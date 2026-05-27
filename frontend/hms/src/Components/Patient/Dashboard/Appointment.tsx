import { ScrollArea } from '@mantine/core';
import { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { getAppointmentsByPatient } from '../../../Service/AppointmentService';
import { extractTimeIn12HourFormat, formatDate } from '../../../Utility/DateUtility';

const Appointments = () => {
    const user = useSelector((state: any) => state.user)
    const [appointments, setAppointments] = useState<any[]>([])

    useEffect(() => {
        getAppointmentsByPatient(user.profileId).then((res) => {
            setAppointments(res)
        }).catch((err) => {
            console.log(err)
        })
    }, [])

    const card = (app: any) => {
        return <div className={`p-3 mb-3 border rounded-xl justify-between border-l-4 border-blue-500 shadow-md flex bg-blue-100 items-center`}>
            <div >
                <div className='font-semibold'>{app.doctorName}</div>
                <div className='text-sm text-gray-500'>{app.reason}</div>
                {/* <div className='text-sm text-gray-500'>{app.reason}</div> */}
            </div>
            <div className='text-right'>
                <div className='text-sm text-gray-500'>{formatDate(app.appointmentTime)}</div>

                <div className='font-medium'>{extractTimeIn12HourFormat(app.appointmentTime)}</div>
            </div>
        </div>
    }


    return (
        <div className="p-3 border rounded-xl bg-blue-50 shadow-xl flex flex-col gap-3">
            <div className='text-xl font-semibold'>Today's Appointments</div>
            <div>
                <ScrollArea.Autosize mah={300} mx="auto">
                    {appointments.map((app) => card(app))}
                </ScrollArea.Autosize>
            </div>
        </div>
    )
}

export default Appointments;