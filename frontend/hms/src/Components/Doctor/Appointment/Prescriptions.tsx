import { ActionIcon, Badge, Card, Divider, Group, Modal, SegmentedControl, Stack, Text, TextInput } from "@mantine/core";
import { IconEye, IconLayoutGrid, IconMedicineSyrup, IconSearch, IconTable } from "@tabler/icons-react";
import { FilterMatchMode } from "primereact/api";
import { Column } from "primereact/column";
import { DataTable, type DataTableFilterMeta } from "primereact/datatable";
import { useEffect, useState } from "react";
import { getPrescriptionsByPatientId } from "../../../Service/AppointmentService";
import { formatDate } from "../../../Utility/DateUtility";
import { useNavigate } from "react-router-dom";
import { useDisclosure } from "@mantine/hooks";
import { Toolbar } from "primereact/toolbar";
import PresCard from "./PresCard";

const Prescriptions = ({ appointment }: any) => {
    const [view, setView] = useState("table");
    const [data, setData] = useState<any[]>([])
    const [opened, { open, close }] = useDisclosure(false)
    const [medicineData, setMedicineData] = useState<any[]>([])
    const navigate = useNavigate()
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
    useEffect(() => {
        // console.log("-----")
        // console.log(appointment)
        const fetchPrescriptions = async () => getPrescriptionsByPatientId(appointment?.patientId).then((res) => {
            console.log("Prescriptions Data: ", res)
            setData(res)
        }).catch((err) => {
            console.error("Error fetching prescriptions: ", err)
        })

        if (appointment?.patientId) {
            fetchPrescriptions();
        }
    }, [appointment?.patientId])


    const handleMedicine = (medicine: any[]) => {
        open()
        setMedicineData(medicine)
    }

    const rightToolbarTemplate = () => {
        return (
            <div className="flex flex-wrap gap-2 justify-end items-center">
                <SegmentedControl
                    value={view}
                    color='primary'
                    onChange={setView}
                    data={[
                        { label: <IconTable />, value: 'table' },
                        { label: <IconLayoutGrid />, value: 'card' },
                    ]}
                />
                <TextInput leftSection={<IconSearch />} fw={500} value={globalFilterValue} onChange={onGlobalFilterChange} placeholder="Keyword Search" />

            </div>
        );
    };

    const actionBodyTemplate = (rowData: any) => {

        return <div className='flex gap-2'>
            <ActionIcon>
                <IconEye stroke={1.4} onClick={() => navigate("/doctor/appointments/" + rowData.appointmentId)} />
            </ActionIcon>

            <ActionIcon color="blue" onClick={() => handleMedicine(rowData.medicines)}>
                <IconMedicineSyrup stroke={1.4} />
            </ActionIcon>
        </div>;
    };


    return (
        <div>
            <Toolbar className="mb-4 !p-1" end={rightToolbarTemplate}></Toolbar>
            {view == "table" ? <DataTable value={data} stripedRows size='small' paginator rows={10}
                paginatorTemplate="FirstPageLink PrevPageLink PageLinks NextPageLink LastPageLink CurrentPageReport RowsPerPageDropdown"
                rowsPerPageOptions={[10, 25, 50]} dataKey="id"

                filters={filters} filterDisplay="menu" globalFilterFields={['doctorName', 'notes']}
                emptyMessage="No customers found." currentPageReportTemplate="Showing {first} to {last} of {totalRecords} entries">
                <Column field="doctorName" header="Doctor" />
                <Column field="prescriptionDate" header="Prescription Date" sortable filterPlaceholder="Search by name" body={(rowData) => formatDate(rowData.prescriptionDate)} />
                <Column field="medicine" header="Medicines" body={(rowData) => rowData.medicines?.length ?? 0} />
                <Column field="notes" header="Notes" style={{ minWidth: '14rem' }} />
                <Column headerStyle={{ width: "5rem", textAlign: "center" }} bodyStyle={{ textAlign: "center", overflow: "visible" }} body={actionBodyTemplate} />

            </DataTable> : <div className='grid grid-cols-4 gap-5'>{
                data?.map((appointment) => (<PresCard key={appointment.id} handleMedicine={handleMedicine} {...appointment} />))
            }{
                    data.length === 0 && <div className='col-span-4 text-center text-gray-500'>No Prescriptions Found</div>
                }</div>}
            <Modal opened={opened} size="xl" onClose={close} title="Medicines" centered>
                <div className="grid grid-cols-3 gap-5">
                    {
                        medicineData?.map((medicine: any, index: number) => {
                            return (
                                <Card shadow="sm" key={medicine.id} padding="lg" radius="md" withBorder>
                                    <Card.Section withBorder inheritPadding py="xs">
                                        <Group justify="space-between">
                                            <Text fw={700} size="xl">
                                                {medicine.name}
                                            </Text>
                                            <Badge color="blue" variant="light">
                                                {medicine.type}
                                            </Badge>
                                        </Group>
                                    </Card.Section>

                                    <Stack mt="md" gap="xs">
                                        <Group justify="space-between">
                                            <Text size="sm" c="dimmed">
                                                Medicine ID
                                            </Text>
                                            <Text size="sm">{medicine.medicineId}</Text>
                                        </Group>

                                        <Group justify="space-between">
                                            <Text size="sm" c="dimmed">
                                                Dosage
                                            </Text>
                                            <Text size="sm">{medicine.dosage}</Text>
                                        </Group>

                                        <Group justify="space-between">
                                            <Text size="sm" c="dimmed">
                                                Frequency
                                            </Text>
                                            <Text size="sm">{medicine.frequency}</Text>
                                        </Group>

                                        <Group justify="space-between">
                                            <Text size="sm" c="dimmed">
                                                Duration
                                            </Text>
                                            <Text size="sm">{medicine.duration} days</Text>
                                        </Group>

                                        <Group justify="space-between">
                                            <Text size="sm" c="dimmed">
                                                Route
                                            </Text>
                                            <Text size="sm">{medicine.route}</Text>
                                        </Group>

                                        <Divider my="sm" />

                                        <Text size="sm" c="dimmed">
                                            Instructions
                                        </Text>
                                        <Text size="sm">{medicine.instructions}</Text>

                                        <Group justify="space-between">
                                            <Text size="sm" c="dimmed">
                                                Prescription ID
                                            </Text>
                                            <Text size="sm">{medicine.prescriptionId}</Text>
                                        </Group>
                                    </Stack>
                                </Card>
                            )
                        })
                    }
                </div>

                {
                    medicineData?.length === 0 && (
                        <Text size="lg" mt={"md"}>No medicine prescribed for this appointment</Text>
                    )
                }

            </Modal>
        </div>
    )
}

export default Prescriptions;