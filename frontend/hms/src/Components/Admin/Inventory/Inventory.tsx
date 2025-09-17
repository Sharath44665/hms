import { ActionIcon, Badge, Button, Fieldset, Group, NumberInput, Select, TextInput, type SelectProps } from "@mantine/core";
import { medicineCategories } from "../../../data/DropdownData";
import { IconCheck, IconEdit, IconSearch } from "@tabler/icons-react";
import { useForm } from "@mantine/form";
import { errorNotification, successNotification } from "../../../Utility/NotificationUtil";
import { useEffect, useState } from "react";
import { DataTable, type DataTableFilterMeta } from "primereact/datatable";
import { Column } from "primereact/column";
import { FilterMatchMode } from "primereact/api";
import { formatDate } from "../../../Utility/DateUtility";
import { addMedicine, getAllMedicines, updateMedicine } from "../../../Service/MedicineService";
import { capitalizeFirstLetter } from "../../../Utility/OtherUtility";
import { DateInput } from "@mantine/dates";
import { addStock, getAllStocks, updateStock } from "../../../Service/InventoryService";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";



const Inventory = () => {
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
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const [data, setData] = useState<any[]>([])
    const [medicine, setMedicine] = useState<any[]>([])

    const [edit, setEdit] = useState<boolean>(false)
    const [loading, setLoading] = useState(false);
    const [medicineMap, setMedicineMap] = useState<Record<string, any>>({})

    const form = useForm({
        initialValues: {
            id: null,
            medicineId: '',
            batchNo: '',
            quantity: 0,
            expiryDate: ''

        },
        validate: {
            medicineId: (value) => (value ? null : 'Medicine is required'),
            batchNo: (value) => (value ? null : 'Batch number is required'),
            quantity: (value) => (value > 0 ? null : 'Quantity must be postitive'),
            expiryDate: (value) => (value ? null : 'Expiry date is required'),
        }
    })

    useEffect(() => {
        getAllMedicines().then((res) => {
            // console.log("Reports Data: ", res)
            setMedicine(res)
            setMedicineMap(res.reduce((acc:any, item:any)=> {
                acc[item.id]=item;
                return acc;
            },{}))
        }).catch((err) => {
            console.error("error fetching reports: ", err);
        });
        fetchData();
    }, [])

    const fetchData = () => {
        getAllStocks().then((res) => {
            // console.log("Reports Data: ", res)
            setData(res)
        }).catch((err) => {
            console.error("error fetching reports: ", err);
        })


    }

    const onEdit = (rowData: any) => {
        setEdit(true);
        form.setValues({
            ...rowData, 
            medicineId: String(rowData.medicineId),
            batchNo: rowData.batchNo,
            quantity: rowData.quantity,
            expiryDate: new Date(rowData.expiryDate)
        })
    }
    const handleSubmit = (values: typeof form.values) => {
        // console.log(values)
        let update = false;
        let method;
        if (values.id) {
            update = true;
            method = updateStock;
        } else {
            method = addStock;
        }

        setLoading(true)
        method(values).then((_res) => {
            successNotification(`Stock ${update ? 'updated' : 'added'} successfully`)
            form.reset()
            setEdit(false)
            fetchData();
        }).catch((error) => {
            errorNotification(error?.response?.data?.errorMessage || `Failed to ${update ? 'update' : 'create'} Stock`)
        }).finally(() => {
            setLoading(false)
        })
    }
    const renderHeader = () => {
        return (
            <div className="flex flex-wrap gap-2 justify-between items-center">
                {

                    <Button variant="filled" onClick={() => setEdit(true)}>Add Stock</Button>
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

    const cancel = () => {
        form.reset();
        setEdit(false);
    }
    const header = renderHeader()
    const renderSelectOption: SelectProps['renderOption'] = ({ option, checked }:any) => (
        <Group flex="1" gap="xs">
            <div className="flex gap-2 items-center">

            {option.label}
            {option?.manufacturer && <span style={{ marginLeft: 'auto', fontSize: '0.8em', color:'gray'}}>{option.manufacturer}</span>}
            </div>
            {checked && <IconCheck style={{ marginInlineStart: 'auto' }} />} 

        </Group>
    );

    const statusBody = (rowData:any) => {
        const isExpired = new  Date(rowData.expiryDate)< new Date();
        return <Badge color={isExpired? "red": "green"} >{isExpired?"Expired":"Active"} </Badge>
    }
    return (
        <div>
            {
                !edit ?
                    <DataTable header={header} value={data} stripedRows size='small' paginator rows={10}
                        paginatorTemplate="FirstPageLink PrevPageLink PageLinks NextPageLink LastPageLink CurrentPageReport RowsPerPageDropdown"
                        rowsPerPageOptions={[10, 25, 50]} dataKey="id"

                        filters={filters} filterDisplay="menu" globalFilterFields={['doctorName', 'notes']}
                        emptyMessage="No customers found." currentPageReportTemplate="Showing {first} to {last} of {totalRecords} entries">
                        <Column field="name" header="Medicine" body={(rowdata) =><span >{ medicineMap[""+rowdata.medicineId]?.name} <span className="text-xs text-gray-700">{ medicineMap[""+rowdata.medicineId]?.manufacturer}</span></span>} /> 
                        <Column field="batchNo" header="Batch No." />
                        <Column field="initialQuantity" header="Quantity"  />
                        <Column field="quantity" header="Remaining Quantity" />
                        <Column field="expiryDate" header="Expiry Date" />
                        <Column field="status" header="Status" body={statusBody}/>


                        <Column headerStyle={{ width: "5rem", textAlign: "center" }} bodyStyle={{ textAlign: "center", overflow: "visible" }} body={actionBodyTemplate} />

                    </DataTable> :
                    <form onSubmit={form.onSubmit(handleSubmit)} className="grid gap-5">
                        <Fieldset className="grid gap-4 grid-cols-2" legend={<span className="text-lg font-medium text-primary-500">Medicine information</span>} radius="md">
                            <Select renderOption={renderSelectOption} {...form.getInputProps("medicineId")} label="Medicine" placeholder="Select Medicine" data={medicine.map(item => ({...item, value: "" + item.id, label: item.name }))} />

                            <TextInput {...form.getInputProps("batchNo")} label="Batch No" placeholder="Enter Batch number" withAsterisk />
                            <NumberInput {...form.getInputProps("quantity")} min={0} clampBehavior="strict" label="Quantity" placeholder="Enter quantity" withAsterisk />
                            <DateInput {...form.getInputProps("expiryDate")} minDate={new Date()} label="Expiry Date" placeholder="Enter expiry date" withAsterisk />

                        </Fieldset>

                        <div className="flex item-center gap-5 justify-center">
                            <Button loading={loading} type="submit" className="w-full" variant="filled" color="primary">{form.values?.id ? "Update" : "Add"} Stock</Button>
                            <Button loading={loading} onClick={cancel} variant="filled" color="red">Cancel</Button>
                        </div>
                    </form >
            }


        </div>
    )
}


export default Inventory;