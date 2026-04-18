import { Group, Text, Image, SimpleGrid, Button } from '@mantine/core';
import { IconUpload, IconPhoto, IconX } from '@tabler/icons-react';
import { Dropzone, type DropzoneProps, IMAGE_MIME_TYPE, type FileWithPath } from '@mantine/dropzone';
import { useRef, useState } from 'react';
import { uploadMedia } from '../../../Service/MediaService';

export function DropzoneButton({ close, form, id }: any) {
    const openRef = useRef<() => void>(null);
    const [file, setFile] = useState<FileWithPath | null>(null);
    const [fileId, setFileId] = useState<string | null>(null);

    const handleDrop = async (files: FileWithPath[]) => {

        setFile(files[0]);
        uploadMedia(files[0]).then((data) => {
            console.log("File uploaded succesfully", data);
            setFileId(data.id);

        }).catch((error) => {
            console.error(error);
        });
    };

    const handleSave = () => {
        form.setFieldValue('profilePictureId',fileId);
        console.log("Saving file", file);
        close();
    }
    // const previews = files.map((file, index) => {
    //     const imageUrl = URL.createObjectURL(file);
    //     return <Image key={index} src={imageUrl} onLoad={() => URL.revokeObjectURL(imageUrl)} />;
    // });
    return (
        <>{
            !file ?
                <Dropzone
                    openRef={openRef}
                    onDrop={handleDrop}
                    onReject={(files) => console.log('rejected files', files)}
                    maxSize={5 * 1024 ** 2}
                    multiple={false}
                    accept={IMAGE_MIME_TYPE}
                    // {...props}
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
                                File should not exceed 5mb
                            </Text>
                        </div>
                    </Group>
                </Dropzone>

                :
                <img src={URL.createObjectURL(file)} alt='preview' />
        }
            <Group justify="center" mt="md">
                {!file ? <Button size='md' radius='xl' onClick={() => openRef.current?.()}>Select Photo</Button> :
                    <div className='flex gap-3 mt-3'>

                        <Button size='md' radius='xl' onClick={() => openRef.current?.()} color='red'>Change Photo</Button>
                        <Button size='md' radius='xl' color='green' onClick={handleSave}>Save</Button>
                    </div>
                }
            </Group>
            {/* <SimpleGrid cols={{ base: 1, sm: 4 }} mt={previews.length > 0 ? 'xl' : 0}>
                {previews}
            </SimpleGrid> */}
        </>
    );
}