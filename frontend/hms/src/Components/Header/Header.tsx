import { ActionIcon } from "@mantine/core";
import ProfileMenu from "./ProfileMenu";
import { IconBellRinging, IconLayoutSidebarLeftCollapseFilled } from '@tabler/icons-react';

const Header = () => {
    return (
        <div className="w-full h-16 bg-light shadow-lg flex justify-between px-5 items-center">
            <ActionIcon variant="transparent" size="lg" aria-label="Settings">
                <IconLayoutSidebarLeftCollapseFilled style={{ width: '90%', height: '90%  ' }} stroke={1.5} />
            </ActionIcon>
            <div className="flex gap-5 items-center">
                <ActionIcon variant="transparent" size="md" aria-label="Settings">
                    <IconBellRinging size="md" stroke={1.5} />
                </ActionIcon>
                <ProfileMenu />
            </div>
        </div>
    )
}

export default Header;