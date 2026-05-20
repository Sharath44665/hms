import { DonutChart } from '@mantine/charts';
import { diseaseData } from '../../../data/DashboardData';
import { useEffect, useState } from 'react';
import { countAllReasons } from '../../../Service/AppointmentService';
import { convertReasonChartData } from '../../../Utility/OtherUtility';

const DiseaseChart = () => {
    const [data, setData] = useState<any[]>(diseaseData)
    useEffect(() => {
        countAllReasons().then((res) => {
            setData(convertReasonChartData(res))
        }).catch((err) => {
            console.log(err)
        })
    }, [])
    return (
        <div className="p-4 border rounded-xl bg-green-50 shadow-xl flex flex-col gap-3">
            <div className='text-xl font-semibold'>Reason Distribution</div>
            <div className='flex  justify-center'>
                <DonutChart thickness={25} size={200} paddingAngle={10} withLabelsLine labelsType="percent" withLabels data={data} chartLabel="Disease" />
            </div>
        </div>
    )
}


export default DiseaseChart;