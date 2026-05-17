import { AreaChart } from '@mantine/charts';

const PatientMetrics = () => {
    const data = [
        { date: 'January', patients: 5 },
        { date: 'February', patients: 8 },
        { date: 'March', patients: 12 },
        { date: 'April', patients: 7 },
        { date: 'May', patients: 14 },
        { date: 'June', patients: 9 },
        { date: 'July', patients: 11 },
        { date: 'August', patients: 6 },
        { date: 'September', patients: 10 },
        { date: 'October', patients: 13 },
        { date: 'November', patients: 4 },
        { date: 'December', patients: 15 }
    ];

    const getSum = (data: any[], key: string) => {
        return data.reduce((sum, item) => sum + item[key], 0)
    }
    return (
        <div className='bg-orange-50 rounded-xl border'>
            <div className='flex justify-between p-5 items-center'>
                <div>
                    <div className='font-semibold'>Patients</div>
                    <div className='text-xs text-gray-500'>{new Date().getFullYear()} </div>
                </div>
                <div className='text-2xl font-bold text-orange-500'>{getSum(data, "patients")} </div>
            </div>
            <AreaChart
                h={280}
                data={data}
                dataKey="date"
                series={[
                    { name: "patients", color: "orange" },
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

export default PatientMetrics;