'use client'

import { ProjectTranslation, updateProjectDescription, updateProjectDocumentation, updateProjectShortDescription } from '@/actions';
import { Avatar, Tab, Tabs, TextField } from '@mui/material'
import React, { useState } from 'react'
import TabContext from '@mui/lab/TabContext';
import TabPanel from '@mui/lab/TabPanel';
import { UseFormReturn, useForm } from 'react-hook-form';

interface Props {
    projectId: string;
    projectTranslations: ProjectTranslation[];
}

interface FormProps {
    translation: ProjectTranslation;
    projectId: string;
    locale: string;
}

const FormComponent = ({ translation, projectId, locale }: FormProps) => {

    const form = useForm<ProjectTranslation>({
        defaultValues: {
            file: translation?.file,
            shortDescription: translation?.shortDescription,
            description: translation?.description,
        }
    });

    const handleSubmit = async (data: ProjectTranslation) => {
        const { description, file, shortDescription } = data;

        if (description) {
            await updateProjectDescription(projectId, description, locale);
        }

        if (shortDescription) {
            await updateProjectShortDescription(projectId, shortDescription, locale);
        }

        if (file) {
            await updateProjectDocumentation(projectId, file, locale);
        }
    };

    return (
        <form
            className='flex flex-col gap-4'
            onSubmit={form.handleSubmit(handleSubmit)}
        >
            <div className='flex flex-col mb-2'>
                <span>Documentación</span>
                <input
                    type="text"
                    className='p-2 border rounded-md bg-gray-200'
                    {...form.register('file', { required: false })}
                />
            </div>

            <div className='flex flex-col mb-2'>
                <span>Resumen</span>
                <textarea
                    rows={2}
                    className='p-2 border rounded-md bg-gray-200'
                    {...form.register('shortDescription', { required: false })}
                />
            </div>

            <div className='flex flex-col mb-2'>
                <span>Descripción</span>
                <textarea
                    rows={5}
                    className='p-2 border rounded-md bg-gray-200'
                    {...form.register('description', { required: false })}
                />
            </div>

            <button type="submit" className='p-2 bg-blue-500 text-white rounded-md'>
                Guardar
            </button>
        </form>
    );
};

const TabsTranslations = ({ projectTranslations, projectId }: Props) => {

    const [currentLocale, setCurrentLocale] = useState<string>(projectTranslations[0].locale);
    const handleChange = (event: React.SyntheticEvent, newValue: string) => {
        setCurrentLocale(newValue);
    };

    const handleSubmitForm = (locale: string) => {
        return async (data: ProjectTranslation) => {

            const { description, file, shortDescription } = data;

            if (description) {
                await updateProjectDescription(projectId, description, locale);
            }

            if (shortDescription) {
                await updateProjectShortDescription(projectId, shortDescription, locale);
            }

            if (file) {
                await updateProjectDocumentation(projectId, file, locale);
            }
        };
    };

    return (
        <TabContext value={currentLocale}>
            <Tabs value={currentLocale} onChange={handleChange} variant="fullWidth">
                {
                    projectTranslations.map((item, index) => (
                        <Tab key={index} value={item.locale}
                            icon={<Avatar alt="test avatar" variant="square" src={`/imgs/${item.locale}.flag.svg`} />}
                        />

                    ))
                }
            </Tabs>
            {projectTranslations.map((item, index) => (
                <TabPanel key={index} value={item.locale}>
                    <FormComponent translation={item} projectId={projectId} locale={item.locale} />
                </TabPanel>
            ))
            }


        </TabContext >
    )
}

export default TabsTranslations