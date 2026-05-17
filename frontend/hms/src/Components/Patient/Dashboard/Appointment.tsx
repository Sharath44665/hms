import { ScrollArea } from '@mantine/core';
import { appointments } from '../../../data/DashboardData';

const Appointments = () => {

    const card = (app: any) => {
        return <div className={`p-3 mb-3 border rounded-xl justify-between border-l-4 border-blue-500 shadow-md flex bg-blue-100 items-center`}>
            <div >
                <div className='font-semibold'>{app.doctor}</div>
                <div className='text-sm text-gray-500'>{app.reason}</div>
                {/* <div className='text-sm text-gray-500'>{app.reason}</div> */}
            </div>
            <div className='text-right'>
                <div className='text-sm text-gray-500'>{new Date().toISOString().slice(0,10)}</div>

                <div className='font-medium'>{app.time}</div>
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