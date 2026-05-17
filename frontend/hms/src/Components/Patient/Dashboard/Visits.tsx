import { AreaChart } from '@mantine/charts';

const Visits = () => {
    const data = [
        { date: 'January', visits: 5 },
        { date: 'February', visits: 8 },
        { date: 'March', visits: 12 },
        { date: 'April', visits: 7 },
        { date: 'May', visits: 14 },
        { date: 'June', visits: 9 },
        { date: 'July', visits: 11 },
        { date: 'August', visits: 6 },
        { date: 'September', visits: 10 },
        { date: 'October', visits: 13 },
        { date: 'November', visits: 4 },
        { date: 'December', visits: 15 }
    ];

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
                <div className='text-2xl font-bold text-violet-500'>{getSum(data, "visits")} </div>
            </div>
            <AreaChart
                h={150}
                data={data}
                dataKey="date"
                series={[
                    { name: "visits", color: "violet" },
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