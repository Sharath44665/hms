import { Button, PasswordInput, TextInput } from "@mantine/core";
import { IconHeartbeat } from "@tabler/icons-react";
import { useForm } from '@mantine/form';
import { Link, useNavigate } from "react-router-dom";
import { loginUser } from "../Service/UserService";
import { errorNotification, successNotification } from "../Utility/NotificationUtil";
import { useState } from "react";
import { useDispatch } from "react-redux";
import { setJwt } from "../Slices/JwtSlice";
import { jwtDecode } from 'jwt-decode'
import { setUser } from "../Slices/UserSlice";

const LoginPage = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const [loading, setLoading] = useState(false)
    const form = useForm({
        initialValues: {
            email: '',
            password: '',
        },

        validate: {
            email: (value) => (/^\S+@\S+$/.test(value) ? null : 'Invalid email'),
            password: (value) => (!value ? "Password is required" : null),
        },
    });

    const handleSubmit = (values: typeof form.values) => {
        setLoading(true)
        loginUser(values).then((_data) => {
            // console.log(_data)
            // console.log(jwtDecode(_data))
            successNotification("Logged in Successfully")
            // const user:any = jwtDecode(_data)
            // console.log(user)
            // navigate(`${user?.role?.toLowerCase()}/dashboard`)
            dispatch(setJwt(_data))
            dispatch(setUser(jwtDecode(_data))) 
        }).catch((error) => {
            errorNotification(error?.response?.data?.errorMessage)

        }).finally(() => {
            setLoading(false)
        })
    };
    return (
        <div style={{ background: 'url("/bg.jpg")' }} className="h-screen w-screen !bg-cover !bg-center !bg-no-repeat flex flex-col items-center justify-center ">
            <div className="py-3 text-pink-400 flex gap-1 items-center">
                <IconHeartbeat size={45} stroke={2.5} />
                <span className="font-heading font-semibold text-4xl">Pulse</span>
            </div>

            <div className="w-[450px] backdrop-blur-md p-10 py-8 rounded-lg ">
                <form className="flex flex-col gap-5 [&_input]:!placeholder-neutral-100 [&_.mantine-Input-input]:!border-white [&_.mantine-Input-input]:!border [&_input]:!pl-2 [&_input]:!text-white" onSubmit={form.onSubmit(handleSubmit)}>
                    <div className="self-center font-medium font-heading text-white text-xl">Login</div>
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
                    <Button loading={loading} type="submit" color="pink" radius="md" size="md">Login</Button>
                    <div className="text-neutral-100 text-sm self-center">Don't have an account <Link to="/register" className="underline hover:text-blue-700">Register</Link> </div>
                </form>

            </div>

        </div>
    )
}

export default LoginPage;