import { Avatar, Button, Divider, Modal, NumberInput, Select, Table, TagsInput, TextInput } from "@mantine/core";
import { DateInput } from '@mantine/dates';
import { IconChecks, IconEdit } from "@tabler/icons-react";
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { bloodGroup, bloodGroups } from "../../../data/DropdownData";
import { useDisclosure } from "@mantine/hooks";
import { getPatient, updatePatient } from "../../../Service/PatientProfileService";
import { formatDate } from "../../../Utility/DateUtility";
import { useForm } from "@mantine/form";
import { errorNotification, successNotification } from "../../../Utility/NotificationUtil";
import { arrayToCSV } from "../../../Utility/OtherUtility";
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
    const user = useSelector((state: any) => state.user)
    const [opened, { open, close }] = useDisclosure(false)
    const [editMode, setEditMode] = useState(false)
    const [profile, setProfile] = useState<any>({})
    useEffect(() => {
        // console.log(user) 
        getPatient(user.profileId).then((data) => {
            setProfile({ ...data, allergies: data.allergies ? JSON.parse(data.allergies) : null, chronicDesease: data.chronicDesease ? JSON.parse(data.chronicDesease) : null })
            // console.log(data)
        }).catch((error) => {
            console.log(error)
        })
    }, [])

    const form = useForm({
        initialValues: {
            dob: "",
            phone: "",
            address: "",
            aadharNo: "",
            bloodGroup: "",
            allergies: [],
            chronicDesease: [],
        },

        validate: {
            dob: (value) => !(value) ? "Date of Birth is required" : null,
            phone: (value) => !(value) ? "Phone No is required" : null,
            address: (value) => !(value) ? "Address is required" : null,
            aadharNo: (value) => !(value) ? "Aadhar No is required" : null,
        }

    });

    const handleEdit = () => {
        form.setValues({ ...profile, dob: profile.dob ? new Date(profile.dob) : undefined, chronicDesease: profile.chronicDesease ?? [], allergies: profile.allergies ?? [] })
        setEditMode(true)

    }
    const handleSubmit = (e: any) => {

        let values = form.getValues()
        form.validate()
        if (!form.isValid()) return;
        updatePatient({ ...profile, ...values, allergies: values.allergies ? JSON.stringify(values.allergies) : null, chronicDesease: values.chronicDesease ? JSON.stringify(values.chronicDesease) : null }).then((data) => {
            console.log(data)
            successNotification("Profile updated Successfully")
            setProfile({ ...data, ...values })
            setEditMode(false)
        }).catch((error) => {
            console.log(error)
            errorNotification(error.response.data.errorMessage)
        })
    }



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
                        <Button type="button" onClick={handleEdit} variant="filled" size="lg" leftSection={<IconEdit />}>Edit</Button> :
                        <Button onClick={handleSubmit} type="submit" variant="filled" size="lg" leftSection={<IconChecks />}>Save or Submit</Button>

                }
            </div>
            <Divider my={"xl"} />
            <div>
                <div className="text-2xl font-medium text-neutral-900 mb-5">Personal Information</div>
                <Table striped stripedColor="primary.1" withRowBorders={false}  >

                    <Table.Tbody className="[&>tr]: !mb-3 [&_td]:!w-1/2 ">
                        <Table.Tr>
                            <Table.Td className="text-xl">Date of Birth</Table.Td>
                            {
                                editMode ?
                                    <Table.Td className="text-xl">
                                        <DateInput {...form.getInputProps("dob")}
                                            placeholder="Date of Birth"
                                        />
                                    </Table.Td> :
                                    <Table.Td className="text-xl">{formatDate(profile.dob) ?? "-"}</Table.Td>
                            }
                        </Table.Tr>
                        <Table.Tr>
                            <Table.Td className="text-xl">Phone</Table.Td>
                            {
                                editMode ?
                                    <Table.Td className="text-xl">
                                        <NumberInput {...form.getInputProps("phone")} maxLength={10} clampBehavior="strict" placeholder="Phone number" hideControls />
                                    </Table.Td> :
                                    <Table.Td className="text-xl">{profile.phone ?? "-"}</Table.Td>
                            }
                        </Table.Tr>
                        <Table.Tr>
                            <Table.Td className="text-xl">Address</Table.Td>
                            {
                                editMode ?
                                    <Table.Td className="text-xl">
                                        <TextInput {...form.getInputProps("address")}
                                            placeholder="Address" />
                                    </Table.Td> :
                                    <Table.Td className="text-xl">{profile.address ?? "-"}</Table.Td>
                            }

                        </Table.Tr>
                        <Table.Tr>
                            <Table.Td className="text-xl">Aadhar Number</Table.Td>
                            {
                                editMode ?
                                    <Table.Td className="text-xl">
                                        <NumberInput {...form.getInputProps("aadharNo")} maxLength={12} clampBehavior="strict" placeholder="Aadhar number" hideControls />
                                    </Table.Td> :
                                    <Table.Td className="text-xl">{profile.aadharNo ?? "-"}</Table.Td>
                            }
                        </Table.Tr>
                        <Table.Tr>
                            <Table.Td className="text-xl">Blood Group</Table.Td>
                            {
                                editMode ?
                                    <Table.Td className="text-xl">
                                        <Select {...form.getInputProps("bloodGroup")} placeholder="blood group" data={bloodGroups} />
                                    </Table.Td> :
                                    <Table.Td className="text-xl">{bloodGroup[profile.bloodGroup] ?? "-"}</Table.Td>
                            }

                        </Table.Tr>
                        <Table.Tr>
                            <Table.Td className="text-xl">Allergies</Table.Td>
                            {
                                editMode ?
                                    <Table.Td className="text-xl">
                                        <TagsInput {...form.getInputProps("allergies")} placeholder="allergies seperated by comma" />
                                    </Table.Td> :
                                    <Table.Td className="text-xl">{arrayToCSV(profile.allergies) ?? "-"}</Table.Td>
                            }

                        </Table.Tr>
                        <Table.Tr>
                            <Table.Td className="text-xl ">Chronic Disease</Table.Td>
                            {
                                editMode ?
                                    <Table.Td className="text-xl">
                                        <TagsInput  {...form.getInputProps("chronicDesease")} placeholder="Chronic Disease seperated by comma" />
                                    </Table.Td> :
                                    <Table.Td className="text-xl">{arrayToCSV(profile.chronicDesease) ?? "-"}</Table.Td>
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