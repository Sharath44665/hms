import { ActionIcon, TextInput } from "@mantine/core";
import { IconEye, IconSearch } from "@tabler/icons-react";
import { FilterMatchMode } from "primereact/api";
import { Column } from "primereact/column";
import { DataTable, type DataTableFilterMeta } from "primereact/datatable";
import { useEffect, useState } from "react";
import { getPrescriptionsByPatientId } from "../../../Service/AppointmentService";
import { formatDate } from "../../../Utility/DateUtility";
import { useNavigate } from "react-router-dom";

const Prescriptions = ({appointment}:any) => {  
    const [data, setData]= useState<any[]>([])
    const navigate = useNavigate()
    const [filters, setFilters] = useState<DataTableFilterMeta>({
        global: { value: null, matchMode: FilterMatchMode.CONTAINS },

    });
    const [globalFilterValue, setGlobalFilterValue] = useState<string>(''); 
    
    
    useEffect(() => {
        // console.log("-----")
        // console.log(appointment)
        const fetchPrescriptions = async() => getPrescriptionsByPatientId(appointment?.patientId).then((res) => {
            console.log("Prescriptions Data: ", res)
            setData(res)
        }).catch((err) => {
            console.error("Error fetching prescriptions: ", err)
        })

        if (appointment?.patientId){
            fetchPrescriptions();
        }
    }, [appointment?.patientId]) 
    
    
    const onGlobalFilterChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const value = e.target.value;
        let _filters:any = {...filters}
        
        _filters['global'].value = value;
        
        setFilters(_filters)
        setGlobalFilterValue(value);
    };

    const renderHeader = () => {
        return (
            <div className="flex flex-wrap gap-2 justify-end items-center">
                <TextInput leftSection={<IconSearch />} fw={500} value={globalFilterValue} onChange={onGlobalFilterChange} placeholder="Keyword Search" />

            </div>
        );
    };

    const actionBodyTemplate = (rowData: any) => {
    
            return <div className='flex gap-2'>
                <ActionIcon>
                    <IconEye stroke={1.4} onClick={()=> navigate("/doctor/appointments/"+rowData.appointmentId)} />
                </ActionIcon> 
            </div>;
        };
    
    const header = renderHeader() 

    return (
        <div>
            <DataTable header={header} value={data} stripedRows size='small' paginator rows={10}
                paginatorTemplate="FirstPageLink PrevPageLink PageLinks NextPageLink LastPageLink CurrentPageReport RowsPerPageDropdown"
                rowsPerPageOptions={[10, 25, 50]} dataKey="id"

                filters={filters} filterDisplay="menu" globalFilterFields={['doctorName' , 'notes' ]}
                emptyMessage="No customers found." currentPageReportTemplate="Showing {first} to {last} of {totalRecords} entries">
                <Column field="doctorName" header="Doctor"   />
                <Column field="prescriptionDate" header="Prescription Date" sortable filterPlaceholder="Search by name"  body={(rowData) => formatDate(rowData.prescriptionDate)} />
                <Column field="medicine" header="Medicines" body={(rowData) => rowData.medicines?.length??0} />
                <Column field="notes" header="Notes" style={{ minWidth: '14rem' }} /> 
                <Column headerStyle={{width:"5rem", textAlign:"center"}} bodyStyle={{textAlign:"center", overflow:"visible"}} body={actionBodyTemplate} />

            </DataTable>
        </div>
    )
}

export default Prescriptions;