import { DonutChart } from '@mantine/charts';
import { diseaseData } from '../../../data/DashboardData';

const DiseaseChart = () => {
    return (
        <div className="p-4 border rounded-xl bg-green-50 shadow-xl flex flex-col gap-3">
            <div className='text-xl font-semibold'>Disease Distribution</div>
            <div className='flex  justify-center'>
                <DonutChart thickness={25} size={200} paddingAngle={10} withLabelsLine labelsType="percent" withLabels data={diseaseData} chartLabel="Disease" />
            </div>
            
        </div>
    )
}


export default DiseaseChart;