import { ActionIcon, Button, Fieldset, MultiSelect, NumberInput, Select, Textarea, TextInput } from "@mantine/core";
import { dosageFrequencies, medicalTests, medicineCategories, medicineTypes, symptoms } from "../../../data/DropdownData";
import { IconEdit, IconEye, IconSearch, IconTrash } from "@tabler/icons-react";
import { useForm } from "@mantine/form";
import { createAppointmentReport, getReportsByPatientId, isReportExists } from "../../../Service/AppointmentService";
import { errorNotification, successNotification } from "../../../Utility/NotificationUtil";
import { useDispatch } from "react-redux";
import { useEffect, useState } from "react";
import { DataTable, type DataTableFilterMeta } from "primereact/datatable";
import { Column } from "primereact/column";
import { FilterMatchMode } from "primereact/api";
import { useNavigate } from "react-router-dom";
import { formatDate } from "../../../Utility/DateUtility";
import { addMedicine, getAllMedicines, updateMedicine } from "../../../Service/MedicineService";
import { capitalizeFirstLetter } from "../../../Utility/OtherUtility";

type Medicine = {
    name: string,
    medicineId?: number,
    dosage: string,
    frequency: string,
    duration: number, // in days
    route: string, // ex: oral, intravenous
    type: string, // ex: tablet, syrup, injection
    instructions: string,
    prescriptionId?: number
}

const Medicine = () => {
    const [filters, setFilters] = useState<DataTableFilterMeta>({
        global: { value: null, matchMode: FilterMatchMode.CONTAINS },

    });
    const [globalFilterValue, setGlobalFilterValue] = useState<string>('');

    const onGlobalFilterChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const value = e.target.value;
        let _filters: any = { ...filters }

        _filters['global'].value = value;

        setFilters(_filters)
        setGlobalFilterValue(value);
    };
    const [data, setData] = useState<any[]>([]) 
    const [edit, setEdit] = useState<boolean>(false)
    const [loading, setLoading] = useState(false);
    const form = useForm({
        initialValues: {
            id:null,
            name: '',
            dosage: '',
            category: "",
            type: "",
            manufacturer: "",
            unitPrice: "",

        },
        validate: {
            name: (value) => (value ? null : "Name is required"),
            dosage: (value) => (value ? null : "Dosage is required"),
            category: (value) => (value ? null : "Category is required"),
            type: (value) => (value ? null : "Type is required"),
            manufacturer: (value) => (value ? null : "Manufacturer is required"),
            unitPrice: (value) => (value ? null : "Unit Price is required"),

        }
    }) 

    useEffect(() => {
        fetchData();
    }, [])

    const fetchData = () => {
        getAllMedicines().then((res) => {
            // console.log("Reports Data: ", res)
            setData(res);
        }).catch((err) => {
            console.error("error fetching reports: ", err);
        })

        
    }

    const onEdit = (rowData:any) =>{
        setEdit(true);
        form.setValues({
            ...rowData,
            name:rowData.name,
            dosage: rowData.dosage,
            category: rowData.category,
            type:rowData.type,
            manufacturer:rowData.manufacturer,
            unitPrice: rowData.unitPrice
        })
    }
    const handleSubmit = (values: typeof form.values) => {
        // console.log(values)
        let update = false;
        let method;
        if(values.id){
            update = true;
            method= updateMedicine
        }else{
            method= addMedicine;
        }
          
        setLoading(true)
        method(values).then((_res) => {
            successNotification(`Medicine ${update?'updated':'added'} successfully`)
            form.reset()
            setEdit(false) 
            fetchData();
        }).catch((error) => {
            errorNotification(error?.response?.data?.errorMessage || `Failed to ${update?'update':'create'} Medicine`)
        }).finally(() => {
            setLoading(false)
        })
    }
    const renderHeader = () => {
        return (
            <div className="flex flex-wrap gap-2 justify-between items-center">
                {
                    
                    <Button variant="filled" onClick={() => setEdit(true)}>Add Medicine</Button>
                }
                <TextInput leftSection={<IconSearch />} fw={500} value={globalFilterValue} onChange={onGlobalFilterChange} placeholder="Keyword Search" />

            </div>
        );
    };

    const actionBodyTemplate = (rowData: any) => {

        return <div className='flex gap-2'>
            <ActionIcon>
                <IconEdit stroke={1.4} onClick={() => onEdit(rowData)} />
            </ActionIcon>
        </div>;
    };

    const cancel = () =>{
        form.reset();
        setEdit(false);
    }
    const header = renderHeader()
    return (
        <div>
            {
                !edit ?
                    <DataTable header={header} value={data} stripedRows size='small' paginator rows={10}
                        paginatorTemplate="FirstPageLink PrevPageLink PageLinks NextPageLink LastPageLink CurrentPageReport RowsPerPageDropdown"
                        rowsPerPageOptions={[10, 25, 50]} dataKey="id"

                        filters={filters} filterDisplay="menu" globalFilterFields={['doctorName', 'notes']}
                        emptyMessage="No customers found." currentPageReportTemplate="Showing {first} to {last} of {totalRecords} entries">
                        <Column field="name" header="Name" /> 
                        <Column field="reportDate" header="Report Date" sortable filterPlaceholder="Search by name" body={(rowData) => formatDate(rowData.createdAt)} />
                        <Column field="dosage" header="Dosage" />
                        <Column field="stock" header="Stock" />
                        <Column field="category" header="Category"  body={rowData => capitalizeFirstLetter(rowData.category)} />
                        <Column field="type" header="Type" body={rowData => capitalizeFirstLetter(rowData.type)} />
                        <Column field="manufacturer" header="Manufacturer" />
                        <Column field="unitPrice" header="Unit Price ₹" sortable />
                        <Column headerStyle={{ width: "5rem", textAlign: "center" }} bodyStyle={{ textAlign: "center", overflow: "visible" }} body={actionBodyTemplate} />

                    </DataTable> :
                    <form onSubmit={form.onSubmit(handleSubmit)} className="grid gap-5">
                        <Fieldset className="grid gap-4 grid-cols-2" legend={<span className="text-lg font-medium text-primary-500">Medicine information</span>} radius="md">
                           
                            <TextInput {...form.getInputProps("name")} label="Medicine" placeholder="Enter Medicine name" withAsterisk />
                            <TextInput {...form.getInputProps("dosage")} label="Dosage" placeholder="Enter Dosage [50mg, 100mg etc]" />
                            <Select {...form.getInputProps("category") } label="Category" placeholder="Select Category" data={medicineCategories} />
                            <Select {...form.getInputProps("type") } label="Type" placeholder="Select Type" data={medicineTypes} />
                            <TextInput {...form.getInputProps("manufacturer")} label="Manufacturer" placeholder="Enter Manufacturer" withAsterisk />
                            <NumberInput {...form.getInputProps("unitPrice")} min={0} clampBehavior="strict" label="Unit Price" placeholder="Enter Unit Price" withAsterisk />
                            
                        </Fieldset> 

                        <div className="flex item-center gap-5 justify-center">
                            <Button loading={loading} type="submit" className="w-full" variant="filled" color="primary">{form.values?.id?"Update":"Add"} Medicine</Button>
                            <Button loading={loading} onClick={cancel} variant="filled" color="red">Cancel</Button>
                        </div>
                    </form >
            }


        </div>
    )
}


export default Medicine;