import { AreaChart } from '@mantine/charts';
import { useEffect, useState } from 'react';
import { countAppointmentsByPatient } from '../../../Service/AppointmentService';
import { useSelector } from 'react-redux';
import { addZeroMonths } from '../../../Utility/OtherUtility';

const Visits = () => {
    const [appointments, setAppointments] = useState<any[]>([])
    const user = useSelector((state:any)=> state.user)
        
            useEffect(()=>{
                countAppointmentsByPatient(user.profileId).then((res) => {
                    setAppointments(addZeroMonths(res, "month", "count"))
                    // console.log(res)
                }).catch((err) => {
                    console.log(err)
                })
            },[])

    const getSum = (data: any[], key: string) => {
        return data.reduce((sum, item) => sum + item[key], 0)
    }
    return (
        <div className='bg-violet-50 rounded-xl border'>
            <div className='flex justify-between p-5 items-center'>
                <div>
                    <div className='font-semibold'>Visits</div>
                    <div className='text-xs text-gray-500'>{new Date().getFullYear()} </div>
                </div>
                <div className='text-2xl font-bold text-violet-500'>{getSum(appointments, "count")} </div>
            </div>
            <AreaChart
                h={150}
                data={appointments}
                dataKey="month"
                series={[
                    { name: "count", color: "violet" },
                    // { name: 'Violets', color: 'blue.6' },
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

export default Visits;