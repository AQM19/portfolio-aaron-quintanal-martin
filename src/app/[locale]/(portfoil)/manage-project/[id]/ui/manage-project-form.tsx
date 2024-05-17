'use client'

import { Project } from '@/interfaces';
import React from 'react'
import { Controller, useForm } from 'react-hook-form';
import notFound from '../../../project/not-found';
import { GlobalSelector } from '@/components';
import { TextField } from '@mui/material';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider/LocalizationProvider';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import dayjs from 'dayjs';

interface Props {
    project: Project;
    categories: string[];
    tags: string[];
    status: string[];
}

const ManageProjectForm = ({ project, categories, tags, status }: Props) => {

    if (!project || !categories || !tags) {
        notFound();
    }

    const { handleSubmit, control, register, formState: { isValid, errors }, reset } = useForm<Project>({
        defaultValues: {
            ...project
        }
    });

    const onSubmit = (data: Project) => {
        console.log({ data });
    };

    const handleCategorySelect = (categoryId: string) => {
        console.log(categoryId);
    };

    const handleTagSelect = (tagId: string) => {
        console.log(tagId);
    }

    return (
        <LocalizationProvider dateAdapter={AdapterDayjs}>

            <form
                className='flex flex-col gap-4'
                onSubmit={handleSubmit(onSubmit)}>

                <div className='flex flex-col md:flex-row flex-wrap gap-4'>

                    <div className='flex flex-col flex-[1_0_1rem]'>
                        <Controller
                            name="title"
                            control={control}
                            render={({ field }) => (
                                <TextField
                                    {...field}
                                    id="title"
                                    label="Titulo"
                                    variant="outlined"
                                    error={!!errors.title}
                                    helperText={errors.title ? 'Titulo requerido' : ''}
                                />
                            )}
                        />
                    </div>


                    <div className='flex flex-col flex-[1_0_1rem]'>
                        <Controller
                            name="description"
                            control={control}
                            render={({ field }) => (
                                <TextField
                                    {...field}
                                    id="description"
                                    label="Descripción"
                                    multiline
                                    maxRows={5}
                                    error={!!errors.description}
                                    helperText={errors.description ? 'Descripción requerida' : ''}
                                />
                            )}
                        />
                    </div>

                    <div className='flex flex-col flex-[1_0_1rem]'>
                        <Controller
                            name="shortDescription"
                            control={control}
                            render={({ field }) => (
                                <TextField
                                    {...field}
                                    id="shortDescription"
                                    label="Resumen"
                                    multiline
                                    maxRows={5}
                                    error={!!errors.shortDescription}
                                    helperText={errors.shortDescription ? 'Resumen requerida' : ''}
                                />
                            )}
                        />
                    </div>

                    <div className='flex flex-col flex-[1_0_1rem]'>
                        <Controller
                            name="logo"
                            control={control}
                            render={({ field }) => (
                                <TextField
                                    {...field}
                                    id="logo"
                                    label="Logo"
                                    variant="outlined"
                                    error={!!errors.logo}
                                    helperText={errors.logo ? 'Logo requerido' : ''}
                                />
                            )}
                        />
                    </div>

                    <div className='flex flex-col flex-[1_0_1rem]'>
                        <Controller
                            name="dateStart"
                            control={control}
                            render={({ field }) => (
                                <DatePicker
                                    {...field}
                                    label="Fecha de Inicio"
                                    value={dayjs(field.value)}
                                    onChange={(date) => field.onChange(date)}
                                />
                            )}
                        />
                    </div>

                    <div className='flex flex-col flex-[1_0_1rem]'>
                        <Controller
                            name="dateEnd"
                            control={control}
                            render={({ field }) => (
                                <DatePicker
                                    {...field}
                                    label="Fecha de finalización"
                                    value={dayjs(field.value)}
                                    onChange={(date) => field.onChange(date)}
                                />
                            )}
                        />
                    </div>

                    <div className='flex flex-col flex-[1_0_1rem]'>
                        <Controller
                            name="documentation"
                            control={control}
                            render={({ field }) => (
                                <TextField
                                    {...field}
                                    id="documentation"
                                    label="Documentación"
                                    variant="outlined"
                                    error={!!errors.link}
                                    helperText={errors.link ? 'Documentación requerida' : ''}
                                />
                            )}
                        />
                    </div>

                    <div className='flex flex-col flex-[1_0_1rem]'>
                        <Controller
                            name="link"
                            control={control}
                            render={({ field }) => (
                                <TextField
                                    {...field}
                                    id="link"
                                    label="Link"
                                    variant="outlined"
                                    error={!!errors.link}
                                    helperText={errors.link ? 'Link requerido' : ''}
                                />
                            )}
                        />
                    </div>

                    <div className='flex flex-col flex-[1_0_1rem]'>
                        <Controller
                            name="slug"
                            control={control}
                            render={({ field }) => (
                                <TextField
                                    {...field}
                                    id="slug"
                                    label="Slug"
                                    variant="outlined"
                                    error={!!errors.slug}
                                    helperText={errors.slug ? 'Slug requerido' : ''}
                                />
                            )}
                        />
                    </div>

                    <div className='flex flex-col flex-[1_0_1rem]'>
                        <Controller
                            name="Status"
                            control={control}
                            render={({ field }) => (
                                <GlobalSelector
                                    label={'Estados'}
                                    id={'simple-select-status-label'}
                                    values={status}
                                    value={field.value}
                                    onChange={(event, child) => field.onChange(event.target.value)}
                                />
                            )}
                        />
                    </div>

                    <div className='flex flex-col flex-[1_0_1rem]'>
                        <Controller
                            name="Category"
                            control={control}
                            render={({ field }) => (
                                <GlobalSelector
                                    label={'Categorias'}
                                    id={'simple-select-categories-label'}
                                    values={categories}
                                    value={field.value}
                                    onChange={(event, child) => field.onChange(event.target.value)}
                                />
                            )}
                        />
                    </div>

                    <button
                        type='submit'
                        className='self-end mt-5 w-min px-5 py-2 rounded-md text-[#ed4709] dark:text-[#e2b5fd] font-bold border-2 border-[#ed4709] dark:border-[#e2b5fd]'>
                        Enviar
                    </button>

                </div>
            </form>
        </LocalizationProvider>

    )
}

export default ManageProjectForm