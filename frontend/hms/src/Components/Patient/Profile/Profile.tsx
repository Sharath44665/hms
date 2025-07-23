import { Avatar, Button, Divider, Modal, NumberInput, Select, Table, TagsInput, TextInput } from "@mantine/core";
import { DateInput } from '@mantine/dates';
import { IconChecks, IconEdit } from "@tabler/icons-react";
import { useState } from "react";
import { useSelector } from "react-redux";
import { bloodGroups } from "../../../data/DropdownData";
import { useDisclosure } from "@mantine/hooks";
const patient = {
    dob: "22-jan-2001",
    phone: 88383288,
    address: "demo address, demo street, demo pin",
    aadharNo: 38383858323,
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
                                    <Table.Td className="text-xl">{patient.dob}</Table.Td>
                            }
                        </Table.Tr>
                        <Table.Tr>
                            <Table.Td className="text-xl">Phone</Table.Td>
                            {
                                editMode ?
                                    <Table.Td className="text-xl">
                                        <NumberInput maxLength={10} clampBehavior="strict" placeholder="Phone number" hideControls />
                                    </Table.Td> :
                                    <Table.Td className="text-xl">{patient.phone}</Table.Td>
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
                                    <Table.Td className="text-xl">{patient.address}</Table.Td>
                            }

                        </Table.Tr>
                        <Table.Tr>
                            <Table.Td className="text-xl">Aadhar Number</Table.Td>
                            {
                                editMode ?
                                    <Table.Td className="text-xl">
                                        <NumberInput maxLength={12} clampBehavior="strict" placeholder="Aadhar number" hideControls />
                                    </Table.Td> :
                                    <Table.Td className="text-xl">{patient.aadharNo}</Table.Td>
                            }
                        </Table.Tr>
                        <Table.Tr>
                            <Table.Td className="text-xl">Blood Group</Table.Td>
                            {
                                editMode ?
                                    <Table.Td className="text-xl">
                                        <Select placeholder="blood group" data={bloodGroups} />
                                    </Table.Td> :
                                    <Table.Td className="text-xl">{patient.bloodGroup}</Table.Td>
                            }

                        </Table.Tr>
                        <Table.Tr>
                            <Table.Td className="text-xl">Allergies</Table.Td>
                            {
                                editMode ?
                                    <Table.Td className="text-xl">
                                        <TagsInput placeholder="allergies seperated by comma" />
                                    </Table.Td> :
                                    <Table.Td className="text-xl">{patient.allergies}</Table.Td>
                            }

                        </Table.Tr>
                        <Table.Tr>
                            <Table.Td className="text-xl ">Chronic Disease</Table.Td>
                            {
                                editMode ?
                                    <Table.Td className="text-xl">
                                        <TagsInput placeholder="Chronic Disease seperated by comma" />
                                    </Table.Td> :
                                    <Table.Td className="text-xl">{patient.chronicDesease}</Table.Td>
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