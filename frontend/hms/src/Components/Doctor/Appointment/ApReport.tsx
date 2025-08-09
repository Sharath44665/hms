import { ActionIcon, Button, Fieldset, MultiSelect, NumberInput, Select, Textarea, TextInput } from "@mantine/core";
import { dosageFrequencies, medicalTests, symptoms } from "../../../data/DropdownData";
import { IconEye, IconSearch, IconTrash } from "@tabler/icons-react";
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

const ApReport = ({ appointment }: any) => {
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
    const [allowAdd, setAllowAdd] = useState<boolean>(false)
    const [edit, setEdit] = useState<boolean>(false)
    const [loading, setLoading] = useState(false);
    const form = useForm({
        initialValues: {
            symptoms: [],
            tests: [],
            diagnosis: "",
            referral: "",
            notes: "",
            prescription: {
                medicines: [] as Medicine[],
            }
        },
        validate: {
            symptoms: (value) => (value.length > 0 ? null : "please select atleast one symptom"),
            diagnosis: (value) => (value?.trim() ? null : "Diagnosis is required"),
            prescription: {
                medicines: {
                    name: value => (value?.trim() ? null : "Medicine is required"),
                    dosage: value => (value?.trim() ? null : "Dosage is required"),
                    frequency: value => (value ? null : "Frequency is required"),
                    duration: value => (value > 0 ? null : "Duration must be greater than zero"),
                    route: value => (value ? null : "Route is required"),
                    type: value => (value ? null : "Type is required"),
                    instructions: value => (value?.trim() ? null : "Instructions are required"),
                }
            }
        }
    })

    const insertMedicine = () => {
        form.insertListItem("prescription.medicines", { name: "", dosage: "", frequency: "", duration: "", route: "", type: "", instructions: "" })
    }

    const removeMedicine = (index: number) => {
        form.removeListItem("prescription.medicines", index)
    }

    useEffect(() => {
        fetchData();
    }, [appointment?.patientId, appointment?.id])

    const fetchData = () => {
        getReportsByPatientId(appointment?.patientId).then((res) => {
            // console.log("Reports Data: ", res)
            setData(res);
        }).catch((err) => {
            console.error("error fetching reports: ", err);
        })

        isReportExists(appointment?.id).then((res) => {
            setAllowAdd(!res)
            // console.log("report existence check: ", res)

        }).catch((err) => {
            console.error("error on reporting existence: ", err)
            setAllowAdd(true)
        })
    }
    const handleSubmit = (values: typeof form.values) => {
        let data = {
            ...values,
            doctorId: appointment.doctorId,
            patientId: appointment.patientId,
            appointmentId: appointment.id,
            prescription: {
                ...values.prescription,
                doctorId: appointment.doctorId,
                patientId: appointment.patientId,
                appointmentId: appointment.id,
            }
        }
        // console.log("form submitted with values: ", data)
        setLoading(true)
        createAppointmentReport(data).then((res) => {
            successNotification("Report created successfully")
            form.reset()
            setEdit(false)
            setAllowAdd(false)
            fetchData();
        }).catch((error) => {
            errorNotification(error?.response?.data?.errorMessage || "Failed to create report")
        }).finally(() => {
            setLoading(false)
        })
    }
    const renderHeader = () => {
        return (
            <div className="flex flex-wrap gap-2 justify-between items-center">
                {
                    allowAdd &&
                    <Button variant="filled" onClick={() => setEdit(true)}>Add Report</Button>
                }
                <TextInput leftSection={<IconSearch />} fw={500} value={globalFilterValue} onChange={onGlobalFilterChange} placeholder="Keyword Search" />

            </div>
        );
    };

    const actionBodyTemplate = (rowData: any) => {

        return <div className='flex gap-2'>
            {/* <ActionIcon>
                <IconEye stroke={1.4} onClick={() => navigate("/doctor/appointments/" + rowData.appointmentId)} />
            </ActionIcon> */}
        </div>;
    };

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
                        <Column field="doctorName" header="Doctor" />
                        <Column field="diagnosis" header="Diagnosis" />
                        <Column field="reportDate" header="Report Date" sortable filterPlaceholder="Search by name" body={(rowData) => formatDate(rowData.createdAt)} />

                        <Column field="notes" header="Notes" />
                        <Column headerStyle={{ width: "5rem", textAlign: "center" }} bodyStyle={{ textAlign: "center", overflow: "visible" }} body={actionBodyTemplate} />

                    </DataTable> :
                    <form onSubmit={form.onSubmit(handleSubmit)} className="grid gap-5">
                        <Fieldset className="grid gap-4 grid-cols-2" legend={<span className="text-lg font-medium text-primary-500">Personal information</span>} radius="md">
                            <MultiSelect {...form.getInputProps("symptoms")} className="col-span-2" withAsterisk
                                label="Symptoms"
                                placeholder="Pick symptoms"
                                data={symptoms}
                            />

                            <MultiSelect {...form.getInputProps("tests")} className="col-span-2"
                                label="Medical Tests"
                                placeholder="Pick tests"
                                data={medicalTests}
                            />
                            <TextInput {...form.getInputProps("diagnosis")} label="Diagnosis" placeholder="Enter Diagnosis" withAsterisk />
                            <TextInput {...form.getInputProps("referral")} label="Referral" placeholder="Enter Referral Details" />
                            <Textarea {...form.getInputProps("notes")} className="col-span-2" label="Notes" placeholder="Enter any additional notes" />
                        </Fieldset>

                        <Fieldset className="grid gap-5" legend={<span className="text-lg font-medium text-primary-500">Prescription</span>} radius="md">

                            {
                                form.values.prescription.medicines.map((_medicine: Medicine, index: number) => (
                                    < Fieldset className="grid col-span-2 gap-4 grid-cols-2">
                                        <div className="flex col-span-2 items-center justify-between">
                                            <h1 className="text-lg font-medium">Medicine {index + 1} </h1>
                                            <ActionIcon onClick={() => removeMedicine(index)} variant="filled" color="red" size={'lg'} className="mb-2">
                                                <IconTrash />

                                            </ActionIcon>
                                        </div>
                                        <TextInput {...form.getInputProps(`prescription.medicines.${index}.name`)} label="Medicine" placeholder="Enter Medicine name" withAsterisk />
                                        <TextInput {...form.getInputProps(`prescription.medicines.${index}.dosage`)} label="Dosage" placeholder="Enter dosage" withAsterisk />
                                        <Select {...form.getInputProps(`prescription.medicines.${index}.frequency`)} label="Frequency" placeholder="Select frequency" withAsterisk data={dosageFrequencies} />
                                        <NumberInput {...form.getInputProps(`prescription.medicines.${index}.duration`)} label="Duration (days)" placeholder="Enter the duration in days" withAsterisk />
                                        <Select {...form.getInputProps(`prescription.medicines.${index}.route`)} label="Route" placeholder="Select Route" withAsterisk data={["oral", "Intravenous", "Topical", "Inhalataion"]} />
                                        <Select {...form.getInputProps(`prescription.medicines.${index}.type`)} label="Type" placeholder="Select Type" withAsterisk data={["Tablet", "Syrup", "Injection", "Capsule", "Ointment"]} />

                                        <TextInput {...form.getInputProps(`prescription.medicines.${index}.instructions`)} label="Instructions" placeholder="Enter Instructions" withAsterisk />

                                    </Fieldset>
                                ))
                            }
                            <div className="flex items-start col-span-2 justify-center">

                                <Button onClick={insertMedicine} variant="outline" color="primary"> Add medicine</Button>
                            </div>
                        </Fieldset >
                        <div className="flex item-center gap-5 justify-center">
                            <Button loading={loading} type="submit" className="w-full" variant="filled" color="primary">Submit Report</Button>
                            <Button loading={loading} variant="filled" color="red">Cancel</Button>
                        </div>
                    </form >
            }


        </div>
    )
}


export default ApReport;