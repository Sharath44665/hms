import { Avatar, Button, Divider, Modal, NumberInput, Select, Table, TagsInput, TextInput } from "@mantine/core";
import { DateInput } from '@mantine/dates';
import { IconChecks, IconEdit } from "@tabler/icons-react";
import { useState } from "react";
import { useSelector } from "react-redux";
import { bloodGroups, doctorDepartments, doctorSpecializations } from "../../../data/DropdownData";
import { useDisclosure } from "@mantine/hooks";
const doctor = {
    dob: "22-jan-2001",
    phone: 88383288,
    address: "demo address, demo street, demo pin",
    licenseNo: 38383858323,
    totalExp: 12,
    specialization: "Cardiologist",
    department: "Cardiology",
    bloodGroup: "o+",
    allergies: "demo1 allergy",

    chronicDesease: "demo disease1, demo disease2"
}
const Profile = () => {
    const user = useSelector((state:any) => state.user)
    const [opened, { open, close }] = useDisclosure(false)
    const [editMode, setEditMode] = useState(false)
    return (
        <div className="p-10">
            <div className="flex justify-between items-center">
                <div className="flex gap-5 items-center">
                    <div className="flex flex-col items-center gap-3">
                        <Avatar src="/avatar.png" variant='filled' alt="it's me" size={150} />
                        {
                            editMode &&
                            <Button onClick={open} variant="filled" size="sm" >Upload</Button>
                        }
                    </div>
                    <div className="flex flex-col gap-2">
                        <div className="text-3xl font-medium text-neutral-900">{user.name} </div>
                        <div className="text-xl text-neutral-700">{user.email} </div>
                    </div>
                </div>
                {
                    !editMode ?
                        <Button onClick={() => setEditMode(true)} variant="filled" size="lg" leftSection={<IconEdit />}>Edit</Button> :
                        <Button onClick={() => setEditMode(false)} variant="filled" size="lg" leftSection={<IconChecks />}>Save or Submit</Button>

                }
            </div>
            <Divider my={"xl"} />
            <div>
                <div className="text-2xl font-medium text-neutral-900 mb-5">Personal Information</div>
                <Table striped stripedColor="primary.1" withRowBorders={false}  >

                    <Table.Tbody>
                        <Table.Tr>
                            <Table.Td className="text-xl">Date of Birth</Table.Td>
                            {
                                editMode ?
                                    <Table.Td className="text-xl">
                                        <DateInput
                                            placeholder="Date of Birth"
                                        />
                                    </Table.Td> :
                                    <Table.Td className="text-xl">{doctor.dob}</Table.Td>
                            }
                        </Table.Tr>
                        <Table.Tr>
                            <Table.Td className="text-xl">Phone</Table.Td>
                            {
                                editMode ?
                                    <Table.Td className="text-xl">
                                        <NumberInput maxLength={10} clampBehavior="strict" placeholder="Phone number" hideControls />
                                    </Table.Td> :
                                    <Table.Td className="text-xl">{doctor.phone}</Table.Td>
                            }
                        </Table.Tr>
                        <Table.Tr>
                            <Table.Td className="text-xl">Address</Table.Td>
                            {
                                editMode ?
                                    <Table.Td className="text-xl">
                                        <TextInput
                                            placeholder="Address" />
                                    </Table.Td> :
                                    <Table.Td className="text-xl">{doctor.address}</Table.Td>
                            }

                        </Table.Tr>
                        <Table.Tr>
                            <Table.Td className="text-xl">Licesne Number</Table.Td>
                            {
                                editMode ?
                                    <Table.Td className="text-xl">
                                        <NumberInput maxLength={12} clampBehavior="strict" placeholder="Licesne number" hideControls />
                                    </Table.Td> :
                                    <Table.Td className="text-xl">{doctor.licenseNo}</Table.Td>
                            }
                        </Table.Tr>
                        <Table.Tr>
                            <Table.Td className="text-xl">Specializations</Table.Td>
                            {
                                editMode ?
                                    <Table.Td className="text-xl">
                                        <Select placeholder="specializations" data={doctorSpecializations} />
                                    </Table.Td> :
                                    <Table.Td className="text-xl">{doctor.specialization}</Table.Td>
                            }

                        </Table.Tr>
                        <Table.Tr>
                            <Table.Td className="text-xl">Department</Table.Td>
                            {
                                editMode ?
                                    <Table.Td className="text-xl">
                                        <Select placeholder="department" data={doctorDepartments} />
                                    </Table.Td> :
                                    <Table.Td className="text-xl">{doctor.department}</Table.Td>
                            }

                        </Table.Tr>
                        <Table.Tr>
                            <Table.Td className="text-xl">Total Experience</Table.Td>
                            {
                                editMode ?
                                    <Table.Td className="text-xl">
                                        <NumberInput maxLength={2} max={50} clampBehavior="strict" placeholder="total experience" hideControls />
                                    </Table.Td> :
                                    <Table.Td className="text-xl">{doctor.totalExp} years</Table.Td>
                            }
                        </Table.Tr> 
                    </Table.Tbody>
                </Table>
            </div>
            <Modal centered opened={opened} onClose={close} title={<span className="text-xl font-medium">Upload Picture</span>}>
                {/* Modal content */}
            </Modal>
        </div>
    )
}

export default Profile;