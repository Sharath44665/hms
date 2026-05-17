import { ScrollArea } from '@mantine/core';
import { medicines } from '../../../data/DashboardData';
// import { Medicines } from '../../../data/DashboardData';

const Medicines = () => {

    const card = (app: any) => {
        return <div className={`p-3 mb-3 border rounded-xl justify-between border-l-4 border-orange-500 shadow-md flex bg-orange-100`}>
            <div>
                <div className='font-semibold'>{app.name}</div>
                <div className='text-sm text-gray-500'>{app.manufacturer}</div>
            </div>
            <div className='text-right'>
                <div className='font-medium'>{app.dosage}</div>
                <div className='text-sm text-gray-500'>Stock: {app.stock}</div>
            </div>
        </div>
    }


    return (
        <div className="p-3 border rounded-xl bg-orange-50 shadow-xl flex flex-col gap-3">
            <div className='text-xl font-semibold'>Medicines</div>
            <div>
                <ScrollArea.Autosize mah={300} mx="auto">
                    {medicines.map((app) => card(app))}
                </ScrollArea.Autosize>
            </div>
        </div>
    )
}

export default Medicines;