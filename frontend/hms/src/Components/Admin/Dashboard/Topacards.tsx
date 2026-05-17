import { AreaChart } from '@mantine/charts';
import { ThemeIcon } from '@mantine/core';
import { IconFileReport, IconStethoscope, IconUsers } from '@tabler/icons-react';
import { data, doctorData, patientData } from '../../../data/DashboardData';

const Topcards = () => {
    const getSum= (data:any[], key:string) => {
        return data.reduce((sum,item)=>sum+item[key], 0);
    }
    const card = (name:string, id:string, color:string, bg:string, icon:React.ReactNode, data:any[]) => {
        return <div className={`${bg} rounded-xl`}>
            <div className='flex justify-between p-5 items-center gap-5'>
                <ThemeIcon className='!shadow-xl' size="xl" radius="md" color={color}>
                    {icon}
                </ThemeIcon>
                <div className='flex flex-col font-medium items-end'>
                    <div>{name}</div>
                    <div className='text-lg'>{getSum(data, id)}</div>
                </div>
            </div>
            <AreaChart
                h={100}
                data={data}
                dataKey="date"
                series={[
                    { name: id, color: color },
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
    }
    
    const cards = [
        {name: "Appointments", id:"appointments", color:"violet", bg:"bg-violet-100", icon:<IconFileReport />, data:data},
        {name: "Patients", id:"patients", color:"orange", bg:"bg-orange-100", icon:<IconUsers />, data:patientData},
        {name: "Doctors", id:"doctors", color:"green", bg:"bg-green-100", icon:<IconStethoscope />, data:doctorData},

    ]
    return (
        <div className="grid grid-cols-3 gap-5">
            {cards.map((cardData)=>card(cardData.name, cardData.id, cardData.color, cardData.bg, cardData.icon, cardData.data))}

        </div>
    )
}

export default Topcards;