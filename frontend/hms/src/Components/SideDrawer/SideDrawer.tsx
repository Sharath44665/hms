import { ActionIcon, Button, Drawer } from "@mantine/core";
import { useDisclosure } from "@mantine/hooks";
import { IconMenu2 } from "@tabler/icons-react";
import Sidebar from "../Patient/Sidebar/Sidebar";
import { useSelector } from "react-redux";
import DoctorSidebar from "../Doctor/Sidebar/Sidebar";
import AdminSidebar from "../Admin/Sidebar/Sidebar";

const SideDrawer = () => {
    const [opened, { open, close }] = useDisclosure(false);
    const user = useSelector((state: any) => state.user);

    return (
        <>
            <Drawer
                opened={opened}
                onClose={close}
                padding={0}
                size="auto"
                withCloseButton={false}
                overlayProps={{ backgroundOpacity: 0.5, blur: 4 }}
            >
                {user.role == "PATIENT" ? <Sidebar /> : user.role == "DOCTOR" ? <DoctorSidebar /> : <AdminSidebar />}
            </Drawer>

            <ActionIcon onClick={open} variant="filled" size="lg" aria-label="Menu">
                <IconMenu2 style={{ width: '90%', height: '90%  ' }} stroke={1.5} />
            </ActionIcon>
        </>
    );
}


export default SideDrawer;