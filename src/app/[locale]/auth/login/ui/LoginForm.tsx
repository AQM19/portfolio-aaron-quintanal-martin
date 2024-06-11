'use client';

import { useEffect } from "react";
import { useFormState, useFormStatus } from "react-dom";

import { authenticate } from "@/actions";
import { IoInformationOutline } from "react-icons/io5";
import clsx from "clsx";
import { Paths } from "@/interfaces/paths/paths.enum";

export const LoginForm = () => {

    const [state, dispatch] = useFormState(authenticate, undefined);

    useEffect(() => {
        if (state === 'Success') {
            window.location.replace(Paths.INDEX);
        }
    }, [state])

    return (
        <form action={dispatch} className="flex flex-col">

            <label htmlFor="email">Correo electrónico</label>
            <input
                className="px-5 py-2 border bg-gray-200 rounded mb-5"
                type="email"
                name="email" />


            <label htmlFor="email">Contraseña</label>
            <input
                className="px-5 py-2 border bg-gray-200 rounded mb-5"
                type="password"
                name="password" />

            <div
                className="flex h-8 items-end space-x-1"
                aria-live="polite"
                aria-atomic="true"
            >
                {state === "CredentialsSignin" && (
                    <div className="mb-2 flex flex-row">
                        <IoInformationOutline className="h-5 w-5 text-red-500" />
                        <p className="text-sm text-rose-500">Credenciales no son correctas</p>
                    </div>
                )}
            </div>

            <LoginButton />

        </form>
    );
};

function LoginButton() {
    const { pending } = useFormStatus();

    return (
        <button
            type="submit"
            className={clsx({
                "btn-primary": !pending,
                "btn-disabled": pending
            })}
            disabled={pending}
        >
            Ingresar
        </button>

    )
}
