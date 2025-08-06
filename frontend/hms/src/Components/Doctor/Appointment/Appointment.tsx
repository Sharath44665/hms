
import React, { useState, useEffect } from 'react';
import { FilterMatchMode, FilterOperator } from 'primereact/api';
import { DataTable, type DataTableFilterMeta } from 'primereact/datatable';
import { Column } from 'primereact/column';
import { ActionIcon, Button, LoadingOverlay, Modal, SegmentedControl, Select, Text, Textarea } from '@mantine/core';
import { Tag } from 'primereact/tag';
import { TextInput } from '@mantine/core';
import { IconEye, IconPlus, IconSearch, IconTrash } from '@tabler/icons-react';
import { useDisclosure } from '@mantine/hooks';
import { getDoctorDropdown } from '../../../Service/DoctorProfileService';
import { DateTimePicker } from '@mantine/dates';
import { useForm } from '@mantine/form';
import { appointmentReasons } from '../../../data/DropdownData';
import { useSelector } from 'react-redux';
import { cancelAppointment, getAppointmentsByDoctor, scheduleAppointment } from '../../../Service/AppointmentService';
import { errorNotification, successNotification } from '../../../Utility/NotificationUtil';
import { formatDateWithtime } from '../../../Utility/DateUtility';
import { modals } from '@mantine/modals';
import { Toolbar } from 'primereact/toolbar';
import { useNavigate } from 'react-router-dom';
// import { CustomerService } from './service/CustomerService';

interface Country {
    name: string;
    code: string;
}

interface Representative {
    name: string;
    image: string;
}

interface Customer {
    id: number;
    name: string;
    country: Country;
    company: string;
    date: string | Date;
    status: string;
    verified: boolean;
    activity: number;
    representative: Representative;
    balance: number;
}

const Appointment = () => {
    const navigate = useNavigate();
    const [opened, { open, close }] = useDisclosure(false);
    const [loading, setLoading] = useState(false)
    const [tab, setTab] = useState<string>("Today")
    const [doctors, setDoctors] = useState<any[]>([])
    const user = useSelector((state: any) => state.user)
    const [appointments, setAppointments] = useState<any[]>([])
    const [selectedCustomers, setSelectedCustomers] = useState<Customer[]>([]);
    const [filters, setFilters] = useState<DataTableFilterMeta>({
        global: { value: null, matchMode: FilterMatchMode.CONTAINS },
        patientName: { operator: FilterOperator.AND, constraints: [{ value: null, matchMode: FilterMatchMode.STARTS_WITH }] },
        reason: { operator: FilterOperator.AND, constraints: [{ value: null, matchMode: FilterMatchMode.STARTS_WITH }] },
        notes: { operator: FilterOperator.AND, constraints: [{ value: null, matchMode: FilterMatchMode.DATE_IS }] },
        status: { value: null, matchMode: FilterMatchMode.IN },

    });
    const [globalFilterValue, setGlobalFilterValue] = useState<string>('');
    const [representatives] = useState<Representative[]>([
        { name: 'Amy Elsner', image: 'amyelsner.png' },
        { name: 'Anna Fali', image: 'annafali.png' },
        { name: 'Asiya Javayant', image: 'asiyajavayant.png' },
        { name: 'Bernardo Dominic', image: 'bernardodominic.png' },
        { name: 'Elwin Sharvill', image: 'elwinsharvill.png' },
        { name: 'Ioni Bowcher', image: 'ionibowcher.png' },
        { name: 'Ivan Magalhaes', image: 'ivanmagalhaes.png' },
        { name: 'Onyama Limba', image: 'onyamalimba.png' },
        { name: 'Stephen Shaw', image: 'stephenshaw.png' },
        { name: 'XuXue Feng', image: 'xuxuefeng.png' }
    ]);
    const [statuses] = useState<string[]>(['unqualified', 'qualified', 'new', 'negotiation', 'renewal']);

    const getSeverity = (status: string) => {
        switch (status) {
            case 'CANCELLED':
                return 'danger';

            case 'COMPLETED':
                return 'success';

            case 'SCHEDULED':
                return 'info';

            case 'negotiation':
                return 'warning';

            default:
                return null;
        }
    };

    useEffect(() => {

        fetchData()
        getDoctorDropdown().then((data) => {
            // console.log(data);
            setDoctors(data.map((doctor: any) => ({
                value: "" + doctor.id,
                label: doctor.name,
            })))
        }).catch((err) => {
            console.error("error fetching doctors:", err)
        })
    }, []); // eslint-disable-line react-hooks/exhaustive-deps

    const fetchData = () => {
        getAppointmentsByDoctor(user.profileId).then((data) => {
            setAppointments(getCustomers(data))
        }).catch((error) => {
            console.error("Error fetching appointments: ", error)
        })
    }

    const getCustomers = (data: Customer[]) => {
        return [...(data || [])].map((d) => {
            d.date = new Date(d.date);

            return d;
        });
    };



    const onGlobalFilterChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const value = e.target.value;
        let _filters: any = { ...filters };

        _filters['global'].value = value;

        setFilters(_filters);
        setGlobalFilterValue(value);
    };

    const form = useForm({
        initialValues: {
            doctorId: "",
            patientId: user.profileId,
            appointmentTime: new Date(),
            reason: "",
            notes: ""
        },

        validate: {
            doctorId: (value) => !value ? "Doctor is required" : undefined,
            appointmentTime: (value) => !value ? "Appointment time is required" : undefined,
            reason: (value) => !value ? "reason for appointment  is required" : undefined,
        },
    });

    const renderHeader = () => {
        return (
            <div className="flex flex-wrap gap-2 justify-between items-center">
                <Button leftSection={<IconPlus />} onClick={open} variant="filled">Schedule Appointment</Button>
                <TextInput leftSection={<IconSearch />} fw={500} value={globalFilterValue} onChange={onGlobalFilterChange} placeholder="Keyword Search" />

            </div>
        );
    };

    const statusBodyTemplate = (rowData: Customer) => {
        return <Tag value={rowData.status} severity={getSeverity(rowData.status)} />;
    };

    const openDeleteModal = (rowData: any) =>
        modals.openConfirmModal({
            title: 'Are you Sure ?',
            centered: true,
            children: (
                <Text size="sm">
                    You want to delete this appointment? this action cannot be undone !
                </Text>
            ),
            labels: { confirm: 'Delete Appointment', cancel: "No don't delete it" },
            confirmProps: { color: 'red' },
            onCancel: () => console.log('Cancel'),
            onConfirm: () => {
                cancelAppointment(rowData.id).then(() => {
                    successNotification("Appointment cancelled successfully")
                    setAppointments(appointments.map((appointment) => appointment.id === rowData.id ? { ...appointment, status: "CANCELLED" } : appointment))
                }).catch((error) => {
                    errorNotification(error.response?.data?.errorMessage || "Failed to cancel appointment")
                })
            },
        });



    const actionBodyTemplate = (rowData: any) => {

        return <div className='flex gap-2'>
            <ActionIcon>
                <IconEye stroke={1.4} onClick={()=> navigate(""+rowData.id)} />
            </ActionIcon>
            <ActionIcon color='red' onClick={() => openDeleteModal(rowData)}>
                <IconTrash stroke={1.4} />
            </ActionIcon>
        </div>;
    };

    const header = renderHeader();
    const handleSubmit = (values: any) => {
        console.log("Appointment scheduled values: ", values)
        form.validate() // no need of these two lines, because, form.onSubmit will check these
        if (!form.isValid()) return; // no need of these two lines, because, form.onSubmit will check these
        setLoading(true)
        scheduleAppointment(values).then(() => {
            close();
            form.reset()
            fetchData();
            successNotification("Appointment scheduled successfully")
        }).catch((error) => {
            // setLoading(false)
            errorNotification(error.response?.data?.errorMessage || "Failed to schedule appointment")
        }).finally(() => {
            setLoading(false)
        })
    }

    const timeTemplate = (rowData: any) => {
        return <span>{formatDateWithtime(rowData.appointmentTime)}</span>
    }

    const leftToolbarTemplate = () => {
        return (
            <Button leftSection={<IconPlus />} onClick={open} variant="filled">Schedule Appointment</Button>
        );
    };

    const rightToolbarTemplate = () => {
        return <TextInput leftSection={<IconSearch />} fw={500} value={globalFilterValue} onChange={onGlobalFilterChange} placeholder="Keyword Search" />
    };

    const centerToolbarTemplate = () => {
        return <SegmentedControl
            value={tab}
            onChange={setTab}
            variant='filled'
            color={tab === "Today" ? "blue" : tab === "Upcoming" ? "green" : "red"}
            data={[
                "Today",
                "Upcoming",
                "Past"
            ]}
        />
    }

    const filteredAppointments = appointments.filter((appointment) => {
        const appointmentDate = new Date(appointment.appointmentTime)
        const today = new Date()
        today.setHours(0,0, 0, 0)
        const appointmentDay = new Date(appointmentDate);
        appointmentDay.setHours(0,0,0,0)
        if (tab === "Today") {
            return appointmentDay.getTime() === today.getTime();
        } else if (tab === "Upcoming") {
            return appointmentDay.getTime() > today.getTime();
        } else if (tab === "Past") {
            return appointmentDay.getTime() < today.getTime();
        }
        return true;
    })
    return (
        <div className="card">
            <Toolbar className="mb-4"  start={centerToolbarTemplate} end={rightToolbarTemplate}></Toolbar>
            <DataTable value={filteredAppointments} stripedRows size='small' paginator rows={10}
                paginatorTemplate="FirstPageLink PrevPageLink PageLinks NextPageLink LastPageLink CurrentPageReport RowsPerPageDropdown"
                rowsPerPageOptions={[10, 25, 50]} dataKey="id"

                filters={filters} filterDisplay="menu" globalFilterFields={['patientName', 'reason', 'notes', 'status']}
                emptyMessage="No customers found." currentPageReportTemplate="Showing {first} to {last} of {totalRecords} entries">
                <Column field="patientName" header="Patient" sortable filter filterPlaceholder="Search by name" style={{ minWidth: '14rem' }} />
                <Column field="patientPhone" header="Phone" sortable filter filterPlaceholder="Search by name" style={{ minWidth: '14rem' }} />
                <Column field="appointmentTime" header="Appointment Time" sortable filterPlaceholder="Search by name" style={{ minWidth: '14rem' }} body={timeTemplate} />
                <Column field="reason" header="Reason" sortable filter filterPlaceholder="Search by name" style={{ minWidth: '14rem' }} />
                <Column field="notes" header="Notes" sortable filter filterPlaceholder="Search by name" style={{ minWidth: '14rem' }} />
                <Column field="status" header="Status" sortable filterMenuStyle={{ width: '14rem' }} style={{ minWidth: '12rem' }} body={statusBodyTemplate} filter />

                <Column headerStyle={{ width: '5rem', textAlign: 'center' }} bodyStyle={{ textAlign: 'center', overflow: 'visible' }} body={actionBodyTemplate} />
            </DataTable>

            <Modal opened={opened} size={"lg"} onClose={close} title={<div className='text-xl font-semibold text-primary-700'>Schedule Appointment</div>} centered>
                <LoadingOverlay visible={loading} zIndex={1000} overlayProps={{ radius: "sm", blur: 2 }} />
                {
                    <form onSubmit={form.onSubmit(handleSubmit)} className='grid grid-cols-1 gap-5'>
                        <Select {...form.getInputProps("doctorId")} withAsterisk data={doctors} label="Doctor" placeholder='Select Doctor' />
                        <DateTimePicker minDate={new Date()} {...form.getInputProps("appointmentTime")} withAsterisk label="Appointment Time" placeholder="Pick date and time" />
                        <Select {...form.getInputProps("reason")} data={appointmentReasons} withAsterisk label="Reason for appointment" placeholder='Enter the reason for Appointment' />
                        <Textarea {...form.getInputProps("notes")} label="additional notes" placeholder='Enter any additional notes' />
                        <Button type='submit' variant='filled' fullWidth >Submit</Button>
                    </form>
                }
            </Modal>
        </div>
    );
}



export default Appointment;