import { Avatar, Text } from "@mantine/core";
import { IconCalendarCheck, IconHeartbeat, IconLayoutGrid, IconMoodHeart, IconStethoscope, IconVaccine } from "@tabler/icons-react";
import { useSelector } from "react-redux";
import { NavLink } from "react-router-dom";

const links = [
    {
        name: "Dashboard", url: "/doctor/dashboard", icon: <IconLayoutGrid stroke={1.5} />
    }, 
    {
        name: "Profile", url: "/doctor/profile", icon: <IconLayoutGrid stroke={1.5} />
    }, 
    {
        name: "Patients", url: "/doctor/patients", icon: <IconMoodHeart stroke={1.5} />
    },
    {
        name: "Appointments", url: "/doctor/appointments", icon: <IconCalendarCheck stroke={1.5} />
    },
    {
        name: "Pharmacy", url: "/doctor/pharmacy", icon: <IconVaccine stroke={1.5} />
    }
]

const Sidebar = () => {
    const user = useSelector((state: any) => state.user)
    return (
        <div className="flex">

            <div className="w-64">

            </div>
            <div className="bg-dark w-64 fixed h-screen overflow-y-auto hide-scrollbar flex flex-col gap-7 items-center">
                <div className="fixed z-[500] bg-dark py-3 text-primary-400 flex gap-1 items-center">
                    <IconHeartbeat size={40} stroke={2.5} />
                    <span className="font-heading font-semibold text-3xl">Pulse</span>
                </div>
                <div className="flex mt-20 flex-col gap-5">
                    <div className="flex flex-col gap-1 items-center">
                        <div className="p-1 bg-white rounded-full shadow-lg">
                            <Avatar src="/avatar.png" variant='filled' alt="it's me" size="xl" />
                        </div>
                        <span className="font-medium text-light">{user.name}</span>
                        <Text c="dimmed" size="xs" className="text-light">{user.role}</Text>
                    </div>
                    <div className="flex flex-col gap-1">
                        {
                            links.map((link) => {
                                return (
                                    <NavLink to={link.url} key={link.url} className={({ isActive }) => `flex items-center gap-3 w-full font-medium text-light px-4 py-5 rounded-lg ${isActive ? "bg-primary-400 text-dark" : "hover:bg-gray-500"} `}>
                                        {link.icon}
                                        <span>{link.name} </span>
                                    </NavLink>
                                )
                            })
                        }
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Sidebar;