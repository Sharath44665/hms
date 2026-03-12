import { Group, Text, Image, SimpleGrid } from '@mantine/core';
import { IconUpload, IconPhoto, IconX } from '@tabler/icons-react';
import { Dropzone, type DropzoneProps, IMAGE_MIME_TYPE, type FileWithPath } from '@mantine/dropzone';
import { useState } from 'react';

export function BaseDemo(props: Partial<DropzoneProps>) {
    const [files, setFiles] = useState<FileWithPath[]>([]);

    const previews = files.map((file, index) => {
        const imageUrl = URL.createObjectURL(file);
        return <Image key={index} src={imageUrl} onLoad={() => URL.revokeObjectURL(imageUrl)} />;
    });
    return (
        <>
            <Dropzone
                onDrop={(files) => {console.log('accepted files', files);setFiles;}}
                onReject={(files) => console.log('rejected files', files)}
                maxSize={5 * 1024 ** 2}
                multiple={false}
                accept={IMAGE_MIME_TYPE}
                {...props}
            >
                <Group justify="center" gap="xl" mih={220} style={{ pointerEvents: 'none' }}>
                    <Dropzone.Accept>
                        <IconUpload size={52} color="var(--mantine-color-blue-6)" stroke={1.5} />
                    </Dropzone.Accept>
                    <Dropzone.Reject>
                        <IconX size={52} color="var(--mantine-color-red-6)" stroke={1.5} />
                    </Dropzone.Reject>
                    <Dropzone.Idle>
                        <IconPhoto size={52} color="var(--mantine-color-dimmed)" stroke={1.5} />
                    </Dropzone.Idle>

                    <div>
                        <Text size="xl" inline>
                            Upload profile picture
                        </Text>
                        <Text size="sm" c="dimmed" inline mt={7}>
                            Attach as many files as you like, each file should not exceed 5mb
                        </Text>
                    </div>
                </Group>
            </Dropzone>
            <SimpleGrid cols={{ base: 1, sm: 4 }} mt={previews.length > 0 ? 'xl' : 0}>
                {previews}
            </SimpleGrid>
        </>
    );
}