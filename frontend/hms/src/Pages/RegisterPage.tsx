import { Button, PasswordInput, SegmentedControl, TextInput } from "@mantine/core";
import { IconHeartbeat } from "@tabler/icons-react";
import { useForm } from '@mantine/form';
import { Link, useNavigate } from "react-router-dom";
import { registerUser } from "../Service/UserService";
import { errorNotification, successNotification } from "../Utility/NotificationUtil";
import { useState } from "react";

const RegisterPage = () => {
    const navigate = useNavigate();
    const [loading, setLoading] = useState(false)
    const form = useForm({
        initialValues: {
            role:'PATIENT',
            name:"",
            email: '',
            password: '',
            confirmPassword: '',
        },

        validate: {
            name:(value) => (!value ? "Name is required":null),
            email: (value) => (/^\S+@\S+$/.test(value) ? null : 'Invalid email'),
            password: (value) => !value 
                ? "Password is required" 
                : !/^(?=.*[A-Z])(?=.*[a-z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/.test(value)
                ?"Password must be at least 8 characters long and include at least one uppercase letter, one lowercase letter, one number, and one special character (@$!%*?&)"
                : null,
             
            confirmPassword: (value, values) => (value === values.password?null:"Password dont match"),
        },
    });

    const handleSubmit = (values: typeof form.values) => {
        setLoading(true)
        registerUser(values).then((_data) => {  
            successNotification("Registered Successfully")
            navigate("/login");
        })
        .catch((error) => { 
            errorNotification(error.response.data.errorMessage)
        }).finally(()=> setLoading(false))
    };
    return (
        <div style={{ background: 'url("/bg.jpg")' }} className="h-screen w-screen !bg-cover !bg-center !bg-no-repeat flex flex-col items-center justify-center ">
            <div className="py-3 text-pink-400 flex gap-1 items-center">
                <IconHeartbeat size={45} stroke={2.5} />
                <span className="font-heading font-semibold text-4xl">Pulse</span>
            </div>

            <div className="w-[450px] backdrop-blur-md p-10 py-8 rounded-lg ">
                <form className="flex flex-col gap-5 [&_input]:!placeholder-neutral-100 [&_.mantine-Input-input]:!border-white [&_.mantine-Input-input]:!border [&_input]:!pl-2 [&_input]:!text-white" onSubmit={form.onSubmit(handleSubmit)}>
                    <div className="self-center font-medium font-heading text-white text-xl">Register</div>
                    <SegmentedControl fullWidth size="md" radius="md" color="pink"bg="none" className="[&_*]:!text-white border border-white" data={[{label:'Patient', value:"PATIENT"}, {label:'Doctor', value:"DOCTOR"}, {label:'Admin', value:"ADMIN"}]} {...form.getInputProps("role")} />
                    <TextInput
                        variant="unstyled"
                        size="md"
                        radius="md"
                        placeholder="Name"
                        key={form.key('name')}
                        {...form.getInputProps('name')}
                    />
                    <TextInput
                        variant="unstyled"
                        size="md"
                        radius="md"
                        placeholder="Email"
                        key={form.key('email')}
                        {...form.getInputProps('email')}
                    />
                    <PasswordInput
                        variant="unstyled"
                        size="md"
                        radius="md"
                        placeholder="Password"
                        key={form.key('password')}
                        {...form.getInputProps('password')}
                    />
                     <PasswordInput
                        variant="unstyled"
                        size="md"
                        radius="md"
                        placeholder="Confirm Password"
                        key={form.key('confirmPassword')}
                        {...form.getInputProps('confirmPassword')}
                    />
                    <Button loading={loading} type="submit" color="pink" radius="md" size="md">Register</Button>
                    <div className="text-neutral-100 text-sm self-center">Have an account <Link to="/login" className="underline hover:text-blue-700">Login</Link> </div>
                </form>

            </div>

        </div>
    )
}

export default RegisterPage;