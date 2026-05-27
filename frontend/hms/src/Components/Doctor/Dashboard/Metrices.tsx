import { AreaChart } from '@mantine/charts';
import { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { countAppointmentsByDoctor } from '../../../Service/AppointmentService';
import { addZeroMonths } from '../../../Utility/OtherUtility';

const Metrices = () => {
    const [appointments, setAppointments] = useState<any[]>([])
    const user = useSelector((state:any)=> state.user)

    useEffect(()=>{
        countAppointmentsByDoctor(user.profileId).then((res)=>{
            console.log(res)
            setAppointments(addZeroMonths(res, "month", "count"));
        }).catch((err) => {
            console.log(err)
        })
    },[])
    const data = [
        { date: '2025-01-05', appointments: 12 },
        { date: '2025-02-14', appointments: 27 },
        { date: '2025-03-22', appointments: 19 },
        { date: '2025-04-09', appointments: 34 },
        { date: '2025-05-16', appointments: 21 },
        { date: '2025-06-30', appointments: 29 },
        { date: '2025-07-11', appointments: 15 }
    ];
    const getSum = (data:any[], key:string) =>{
        return data.reduce((sum, item) => sum+item[key], 0)
    }
    return (
        <div className='bg-violet-50 rounded-xl border'>
            <div className='flex justify-between p-5 items-center'>
                <div>
                    <div className='font-semibold'>Appointments</div>
                    <div className='text-xs text-gray-500'>Last 7 days</div>
                </div>
                <div className='text-2xl font-bold text-violet-500'>{getSum(appointments, "count")} </div>
            </div>
            <AreaChart
                h={100}
                data={appointments}
                dataKey="month"
                series={[
                    { name: "count", color: "violet" },
                    // { name: 'Oranges', color: 'blue.6' },
                    // { name: 'Tomatoes', color: 'teal.6' },
                ]}
                strokeWidth={5}
                withGradient
                fillOpacity={0.70}
                curveType="bump"
                tickLine="none"
                gridAxis="none"
                withXAxis={false}
                withYAxis={false}
            />
        </div>
    )
}

export default Metrices;