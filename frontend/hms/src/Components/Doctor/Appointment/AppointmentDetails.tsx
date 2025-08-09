import { Badge, Breadcrumbs, Card, Divider, Group, Tabs, Text, Title } from "@mantine/core";
import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import { getAppointmentDetails } from "../../../Service/AppointmentService";
import { formatDateWithtime } from "../../../Utility/DateUtility";
import { IconClipboardHeart, IconStethoscope, IconVaccine } from "@tabler/icons-react";
import ApReport from "./ApReport";
import Prescriptions from "./Prescriptions";

const AppointmentDetails = () => {
    const { id } = useParams();
    const [appointment, setAppointment] = useState<any>({})
    useEffect(() => {
        getAppointmentDetails(id).then((res) => {
            // console.log("appointment details: ", res)
            setAppointment(res)
        }).catch((err) => {
            console.error("error fetching appointment: ", err);
        })
    }, [id])


    return (
        <div>
            <Breadcrumbs mb={"md"}>
                <Link className="text-primary-400 hover:underline" to={"/doctor/dashboard"}>Dashboard</Link>
                <Link className="text-primary-400 hover:underline" to={"/doctor/appointments"}>Appointments</Link>
                <Text className="text-primary-400 ">Details</Text>
            </Breadcrumbs>
            <div>
                <Card shadow="sm" padding="lg" radius="md" withBorder >
                    <Group justify="space-between" mb="xs">
                        <Title order={2}>{appointment.patientName}</Title>
                        <Badge color={appointment.status === 'CANCELLED' ? 'red' : 'blue'} variant="light">
                            {appointment.status}
                        </Badge>
                    </Group>

                    <div className="grid grid-cols-2 gap-5 mb-2">

                        <Text size="sm" mb={4}>
                            <strong>Email:</strong> {appointment.patientEmail}
                        </Text>
                        <Text size="sm" mb={4}>
                            <strong>Phone:</strong> {appointment.patientPhone}
                        </Text>
                    </div>
                    <div className="grid grid-cols-2 gap-5">
                        <Text size="sm" mb={4}>
                            <strong>Reason:</strong> {appointment.reason}
                        </Text>
                        <Text size="sm" mb={4}>
                            <strong>Time:</strong> {formatDateWithtime(appointment.appointmentTime)}
                        </Text>
                    </div>
                    <Text size="sm" mt={4} mb={4}>
                        <strong>Doctor:</strong> {appointment.doctorName}
                    </Text>
                    <Text size="sm" mt={4}>
                        <strong>Notes:</strong> {appointment.notes || 'None'}
                    </Text>
                </Card>
                <Tabs variant="pills" my={"md"} radius="md" defaultValue="medical">
                    <Tabs.List>
                        <Tabs.Tab value="medical" leftSection={<IconStethoscope size={20} />}>
                            Medical History
                        </Tabs.Tab>
                        <Tabs.Tab value="prescriptions" leftSection={<IconVaccine size={20} />}>
                            Prescriptions
                        </Tabs.Tab>
                        <Tabs.Tab value="reports" leftSection={<IconClipboardHeart size={20} />}>
                            Report
                        </Tabs.Tab>
                    </Tabs.List>
                    
                    <Divider my={"md"} />
                    <Tabs.Panel value="medical">
                        Gallery tab content
                    </Tabs.Panel>

                    <Tabs.Panel value="prescriptions">
                        <Prescriptions appointment={appointment} />
                    </Tabs.Panel>

                    <Tabs.Panel value="reports">
                        <ApReport appointment={appointment} />
                    </Tabs.Panel>
                </Tabs>
            </div>
        </div>
    )
}


export default AppointmentDetails;