import { ActionIcon, Badge, Button, Card, Divider, Fieldset, Group, LoadingOverlay, Modal, NumberInput, Select, Stack, Text, TextInput, type SelectProps } from "@mantine/core";
import { medicineCategories } from "../../../data/DropdownData";
import { IconCheck, IconEdit, IconEye, IconPlus, IconSearch, IconTrash } from "@tabler/icons-react";
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
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { addSale, getAllSaleItems, getAllSales } from "../../../Service/SalesService";
import React from "react";
import { useDisclosure } from "@mantine/hooks";

interface SaleItem {
    medicineId: string;
    quantity: number;
}

const Sales = () => {
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
    const [opened, { open, close }] = useDisclosure(false);
    const [saleItems, setSaleItems] = useState<any[]>([]);

    // as array
    const form = useForm({
        initialValues: {
            buyerName: '',
            buyerContact: '',
            saleItems: [
                { medicineId: '', quantity: 0 }
            ] as SaleItem[],
        },
        validate: {
            saleItems: {
                medicineId: (value) => (value ? null : 'Medicine is required'),
                quantity: (value) => (value > 0 ? null : 'Quantity must be postitive'),
            }

        }
    })

    useEffect(() => {
        getAllMedicines().then((res) => {
            // console.log("Reports Data: ", res)
            setMedicine(res)
            setMedicineMap(res.reduce((acc: any, item: any) => {
                acc[item.id] = item;
                return acc;
            }, {}))
        }).catch((err) => {
            console.error("error fetching reports: ", err);
        });
        fetchData();
    }, [])

    const fetchData = () => {
        getAllSales().then((res) => {
            // console.log("Reports Data: ", res)
            setData(res)
            console.log(res)
        }).catch((err) => {
            console.error("error fetching sales: ", err);
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

    const handleDetails = (rowData: any) => {
        open();
        setLoading(true)
        getAllSaleItems(rowData.id).then((res) => {
            setSaleItems(res);
            console.log(res)
        }).catch((err) => {
            console.error("Error fetching sale items: ", err)
        }).finally(() => {
            setLoading(false);
        });
    }

    const handleSubmit = (values: typeof form.values) => {
        let update = false;
        const saleItems = values.saleItems.map((x: any) => ({ ...x, unitPrice: medicineMap[x.medicineId]?.unitPrice }));
        const totalAmount = saleItems.reduce((acc: number, item: any) => acc + (item.unitPrice * item.quantity), 0)
        // console.log(values)
        // return;


        setLoading(true)
        addSale({ ...values, saleItems, totalAmount }).then((_res) => {
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

                    <Button variant="filled" onClick={() => setEdit(true)}>Sell Medicine</Button>
                }
                <TextInput leftSection={<IconSearch />} fw={500} value={globalFilterValue} onChange={onGlobalFilterChange} placeholder="Keyword Search" />

            </div>
        );
    };

    const actionBodyTemplate = (rowData: any) => {

        return <div className='flex gap-2'>
            <ActionIcon>
                <IconEye stroke={1.4} onClick={() => handleDetails(rowData)} />
            </ActionIcon>
        </div>;
    };

    const cancel = () => {
        form.reset();
        setEdit(false);
    }

    const addMore = () => {
        form.insertListItem('saleItems', { 'medicineId': '', quantity: 0 })
    }
    const header = renderHeader()
    const renderSelectOption: SelectProps['renderOption'] = ({ option, checked }: any) => (
        <Group flex="1" gap="xs">
            <div className="flex gap-2 items-center">

                {option.label}
                {option?.manufacturer && <span style={{ marginLeft: 'auto', fontSize: '0.8em', color: 'gray' }}>{option.manufacturer} - {option.dosage}</span>}
            </div>
            {checked && <IconCheck style={{ marginInlineStart: 'auto' }} />}

        </Group>
    );

    const statusBody = (rowData: any) => {
        const isExpired = new Date(rowData.expiryDate) < new Date();
        return <Badge color={isExpired ? "red" : "green"} >{isExpired ? "Expired" : "Active"} </Badge>
    }
    return (
        <div>
            {
                !edit ?
                    <DataTable header={header} removableSort value={data} stripedRows size='small' paginator rows={10}
                        paginatorTemplate="FirstPageLink PrevPageLink PageLinks NextPageLink LastPageLink CurrentPageReport RowsPerPageDropdown"
                        rowsPerPageOptions={[10, 25, 50]} dataKey="id"

                        filters={filters} filterDisplay="menu" globalFilterFields={['doctorName', 'notes']}
                        emptyMessage="No customers found." currentPageReportTemplate="Showing {first} to {last} of {totalRecords} entries">
                        <Column field="buyerName" header="Buyer" />
                        <Column field="buyerContact" header="Contact" />
                        {/* <Column field="Prescription" header="Pris" /> */}
                        <Column field="totalAmount" header="Total Amount" sortable />
                        <Column field="saleDate" header="Sale Date" sortable body={rowData => formatDate(rowData.saleDate)} />



                        <Column headerStyle={{ width: "5rem", textAlign: "center" }} bodyStyle={{ textAlign: "center", overflow: "visible" }} body={actionBodyTemplate} />

                    </DataTable> :
                    <form onSubmit={form.onSubmit(handleSubmit)} className="grid gap-5">
                        <LoadingOverlay visible={loading} />
                        <Fieldset className="grid gap-5" legend={<span className="text-lg font-medium text-primary-500">Buyer information</span>} radius="md">
                            <div className="grid grid-cols-2 gap-5">

                                <TextInput withAsterisk label="Buyer Name" placeholder="Enter your Buyer name" {...form.getInputProps('buyerName')} />
                                <NumberInput maxLength={10} label="Contact Number" placeholder="Enter contact Number" {...form.getInputProps('buyerContact')} />
                            </div>

                        </Fieldset>
                        <Fieldset className="grid gap-5" legend={<span className="text-lg font-medium text-primary-500">Medicine information</span>} radius="md">
                            <div className="grid gap-4 grid-cols-5" >
                                {
                                    form.values.saleItems.map((item, index) => (
                                        <React.Fragment key={index}>

                                            <div className="col-span-2">

                                                <Select renderOption={renderSelectOption} {...form.getInputProps(`saleItems.${index}.medicineId`)} label="Medicine" placeholder="Select Medicine" data={
                                                    medicine.filter(x => !form.values.saleItems.some((item1: any, idx) => item1.medicineId == x.id && idx != index)).map(item => ({ ...item, value: "" + item.id, label: item.name }))
                                                } />
                                            </div>
                                            <div className="col-span-2">
                                                <NumberInput rightSectionWidth={80} rightSection={<div className="text-xs flex gap-1 text-white font-medium rounded-md bg-red-400 p-1">Stock: {medicineMap[item.medicineId]?.stock} </div>} {...form.getInputProps(`saleItems.${index}.quantity`)} min={0} max={medicineMap[item.medicineId]?.stock || 0} clampBehavior="strict" label="Quantity" placeholder="Enter quantity" withAsterisk />

                                            </div>
                                            <div className="flex items-end justify-between">
                                                {
                                                    (item.quantity && item.medicineId) ?
                                                        <div>Quantity {item.quantity} X {medicineMap[item.medicineId]?.unitPrice} = {item.quantity * medicineMap[item.medicineId]?.unitPrice} </div> : <div></div>
                                                }
                                                <ActionIcon size={"lg"} color="red" onClick={() => form.removeListItem('saleItems', index)}>
                                                    <IconTrash size={16} />
                                                </ActionIcon>
                                            </div>
                                        </React.Fragment>
                                    ))
                                }


                            </div>

                            <div className="flex items-center justify-center" >
                                <Button onClick={addMore} variant="outline" leftSection={<IconPlus size={16} />} >Add more </Button>
                            </div>
                        </Fieldset>

                        <div className="flex item-center gap-5 justify-center">
                            <Button loading={loading} type="submit" className="w-full" variant="filled" color="primary">Sell Medicine</Button>
                            <Button loading={loading} onClick={cancel} variant="filled" color="red">Cancel</Button>
                        </div>
                    </form >
            }
            <Modal opened={opened} size="xl" onClose={close} title="Sold Medicines" centered>
                <div className="grid grid-cols-3 gap-5">
                    {
                        saleItems?.map((data: any, index: number) => {
                            return (
                                <Card shadow="sm" key={medicine.id} padding="lg" radius="md" withBorder>
                                    <Card.Section withBorder inheritPadding py="xs">
                                        <Group justify="space-between">
                                            <Text fw={700} size="xl">
                                                {medicineMap[data.medicineId]?.name} - {medicineMap[data.medicineId]?.dosage}
                                            </Text>
                                            <Badge color="blue" variant="light">
                                                ({medicineMap[data.medicineId]?.manufacturer})
                                            </Badge>
                                            <div className="flex justify-between gap-3"> 
                                                <Text size="xs" c="dimmed">
                                                Batch No
                                            </Text>
                                                <Text size="xs">{data.batchNo}</Text>

                                            
                                            </div>
                                            
                                        </Group>
                                    </Card.Section>

                                    <Stack mt="md" gap="xs">
                                        <Group justify="space-between">
                                            <Text size="sm" c="dimmed">
                                                Quantity
                                            </Text>
                                            <Text size="sm">{data.quantity}</Text>
                                        </Group>

                                        <Group justify="space-between">
                                            <Text size="sm" c="dimmed">
                                                Unit Price
                                            </Text>
                                            <Text size="sm">{data.unitPrice}</Text>
                                        </Group>

                                        <Group justify="space-between">
                                            <Text size="sm" c="dimmed">
                                                Total
                                            </Text>
                                            <Text size="sm">₹ {data.quantity * data.unitPrice}</Text>
                                        </Group>

                                       

                                        <Divider my="sm" />

                                        
                                    </Stack>
                                </Card>
                            )
                        })
                    }
                </div>

                {
                    saleItems?.length === 0 && (
                        <Text size="lg" mt={"md"}>No medicine prescribed for this appointment</Text>
                    )
                }

            </Modal>

        </div>
    )
}


export default Sales;