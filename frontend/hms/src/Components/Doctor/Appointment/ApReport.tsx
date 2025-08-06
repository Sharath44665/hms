import { Fieldset, MultiSelect, Textarea, TextInput } from "@mantine/core";
import { medicalTests, symptoms } from "../../../data/DropdownData";

const ApReport = () => {
    return (
        <div>
            <Fieldset className="grid gap-4 grid-cols-2" legend={<span className="text-lg font-medium text-primary-500">Personal information</span>} radius="md">
                <MultiSelect className="col-span-2" withAsterisk
                    label="Symptoms"
                    placeholder="Pick symptoms"
                    data={symptoms}
                />

                <MultiSelect className="col-span-2" withAsterisk
                    label="Medical Tests"
                    placeholder="Pick tests"
                    data={medicalTests}
                />
                <TextInput label="Diagnosis" placeholder="Enter Diagnosis" withAsterisk />
                <TextInput label="Referral" placeholder="Enter Referral Details" withAsterisk />
                <Textarea className="col-span-2" label="Notes" placeholder="Enter any additional notes" withAsterisk />
            </Fieldset>
        </div>
    )
}


export default ApReport;