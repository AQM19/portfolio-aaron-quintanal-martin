'use client'

import { Avatar, AvatarGroup, Button, Checkbox, FormControl, InputLabel, ListItemText, MenuItem, OutlinedInput, Select, SelectChangeEvent, TextField } from '@mui/material';
import { Category, Project, ProjectImage as ProjectWithImage, Tag } from '@/interfaces';
import { Controller, useForm } from 'react-hook-form';
import { createUpdateProject, deleteProjectImage } from '@/actions';
import { Developer } from '../../../../../../../interfaces/developer/developer.interface';
import { IoMdCloudUpload } from 'react-icons/io';
import { Paths } from '@/config';
import { useRouter } from '@/navigation';
import ProjectImage from '@/components/projects/project-image/ProjectImage';
import React from 'react';

interface Props {
    project: Partial<Project> & { ProjectImage?: ProjectWithImage[] };
    categories: Category[];
    tags: Tag[];
    status: string[];
    developers: Developer[];
}

interface FormInputs {
    title: string;
    description?: string;
    shortDescription?: string;
    dateStart: string | Date;
    dateEnd?: string | Date;
    documentation?: string;
    link?: string;
    logo: string;
    slug: string;
    Status: string;
    Category: string;
    tags: string[];
    images?: FileList;
    developers: string[];
}


const ManageProjectForm = ({ project, categories, tags, status, developers }: Props) => {

    const router = useRouter();

    const [selectedTags, setTagSelected] = React.useState<string[]>(project.tags?.map(tag => tag.id) || []);
    const [selectedDevelopers, setDeveloperSelected] = React.useState<string[]>(project.developers?.map(dev => dev.id) || []);

    const handleTagChange = (event: SelectChangeEvent<typeof selectedTags>) => {
        const { target: { value }, } = event;
        const selectedTagsArray = typeof value === 'string' ? value.split(',') : value;
        setTagSelected(selectedTagsArray);
        setValue('tags', selectedTagsArray); // Actualizamos el valor en react-hook-form
    };

    const handleDeveloperChange = (event: SelectChangeEvent<typeof selectedDevelopers>) => {
        const { target: { value }, } = event;
        const selectedDevelopersArray = typeof value === 'string' ? value.split(',') : value;
        setDeveloperSelected(selectedDevelopersArray);
        setValue('developers', selectedDevelopersArray);
    }

    const {
        control,
        handleSubmit,
        register,
        formState: { isValid },
        getValues,
        setValue,
        watch,
    } = useForm<FormInputs>({
        defaultValues: {
            ...project,
            tags: [],
            developers: [],
            dateStart: project.dateStart ? new Date(project.dateStart).toISOString().split('T')[0] : '',
            dateEnd: project.dateEnd ? new Date(project.dateEnd).toISOString().split('T')[0] : undefined,
            description: project.description ?? undefined,
            shortDescription: project.shortDescription ?? undefined,
            link: project.link ?? undefined,
            images: undefined
        }
    });

    const onSubmit = async (data: FormInputs) => {
        const formData = new FormData();

        const { images, ...projectToSave } = data;

        if (project.id) {
            formData.append('id', project.id ?? '');
        }
        formData.append('title', projectToSave.title);
        formData.append('slug', projectToSave.slug);
        formData.append('category', projectToSave.Category);
        formData.append('status', projectToSave.Status);
        formData.append('dateStart', projectToSave.dateStart.toLocaleString());
        formData.append('logo', projectToSave.logo);

        if (projectToSave.link) {
            formData.append('link', projectToSave.link);
        }

        if (projectToSave.description) {
            formData.append('description', projectToSave.description!);
        }

        if (projectToSave.shortDescription) {
            formData.append('shortDescription', projectToSave.shortDescription!);
        }

        if (projectToSave.documentation) {
            formData.append('documentation', projectToSave.documentation!);
        }

        if (projectToSave.dateEnd) {
            formData.append('dateEnd', projectToSave.dateEnd!.toLocaleString());
        }

        if (projectToSave.tags) {

            const currentProjectTagIds = project.tags?.map(tag => tag.id) ?? [];
            // const tagsToCreate = projectToSave.tags.filter(tagId => !currentProjectTagIds?.includes(tagId));

            if (currentProjectTagIds.length > 0) {
                for (let i = 0; i < currentProjectTagIds.length; i++) {
                    const tagId = currentProjectTagIds[i];
                    formData.append('deleteTags', tagId);
                }
            }

            if (projectToSave.tags.length > 0) {
                projectToSave.tags.map(tag => tag.toString())
                for (let i = 0; i < projectToSave.tags.length; i++) {
                    const tagId = projectToSave.tags[i];
                    formData.append('createTags', tagId);
                }
            }
        }

        if (projectToSave.developers) {

            const currentProjectDevelopersIds = project.developers?.map(dev => dev.id) ?? [];

            if (currentProjectDevelopersIds.length > 0) {
                for (let i = 0; i < currentProjectDevelopersIds.length; i++) {
                    const devId = currentProjectDevelopersIds[i];
                    formData.append('deleteDevelopers', devId);
                }
            }

            if (projectToSave.developers.length > 0) {
                projectToSave.developers.map(dev => dev.toString())
                for (let i = 0; i < projectToSave.developers.length; i++) {
                    const devId = projectToSave.developers[i];
                    formData.append('createDevs', devId);
                }
            }

        }

        if (images) {
            for (let i = 0; i < images.length; i++) {
                formData.append('images', images[i]);
            }
        }

        const { ok, project: prismaProduct } = await createUpdateProject(formData);

        if (!ok) {
            alert('Proyecto no se pudo actualizar');
            return;
        }

        router.replace(`${Paths.PROJECT}/${prismaProduct?.slug}`)

    }

    return (
        <form onSubmit={handleSubmit(onSubmit)}>

            <div className="flex flex-col px-5 mb-16 sm:px-56  gap-3">

                <div className='w-full col-span-2'>
                    <TextField
                        id="title-txtfield"
                        label="Titulo"
                        variant="outlined"
                        className='w-full bg-neutral-50 '
                        tabIndex={0}
                        {...register('title', { required: true })}
                    />
                </div>

                <div className='grid grid-cols-1 sm:grid-cols-2 gap-3'>
                    <div className='w-full flex flex-col gap-3'>

                        <TextField
                            id="link-txtfield"
                            label="Link"
                            variant="outlined"
                            className='w-full bg-neutral-50 '
                            tabIndex={1}
                            {...register('link', { required: false })}
                        />

                        <TextField
                            id="doc-txtfield"
                            label="Documentación"
                            variant="outlined"
                            className='w-full bg-neutral-50 '
                            tabIndex={2}
                            {...register('documentation', { required: false })}
                        />

                        <FormControl fullWidth>
                            <InputLabel id="status-select-label">Estado</InputLabel>
                            <Controller
                                name="Status"
                                control={control}
                                render={({ field }) => (
                                    <Select
                                        labelId="status-select-label"
                                        id="status-select"
                                        {...field}
                                        label="Estado"
                                        className='w-full bg-neutral-50 '
                                        tabIndex={3}
                                    >
                                        <MenuItem value={''}>[Seleccione]</MenuItem>
                                        {
                                            status.map((state) => (
                                                <MenuItem key={state} value={state}>{state}</MenuItem>
                                            ))
                                        }
                                    </Select>
                                )}
                            />
                        </FormControl>

                        <TextField
                            id="doc-txtfield"
                            label="Fecha de inicio"
                            variant="outlined"
                            className='w-full bg-neutral-50 '
                            type='date'
                            tabIndex={4}
                            {...register('dateStart', { required: true })}
                        />

                    </div>

                    <div className='w-full flex flex-col gap-3'>

                        <TextField
                            id="doc-txtfield"
                            label="Slug"
                            variant="outlined"
                            className='w-full bg-neutral-50 '
                            tabIndex={5}
                            {...register('slug', { required: true })}
                        />

                        <FormControl fullWidth>
                            <InputLabel id="category-select-label">Categoría</InputLabel>
                            <Controller
                                name="Category"
                                control={control}
                                render={({ field }) => (
                                    <Select
                                        labelId="category-select-label"
                                        id="category-select"
                                        {...field}
                                        label="Category"
                                        className='w-full bg-neutral-50 '
                                        tabIndex={6}
                                    >
                                        <MenuItem value={''}>[Seleccione]</MenuItem>
                                        {
                                            categories.map(category => (
                                                <MenuItem key={category.id} value={category.nemonic}>{category.nemonic}</MenuItem>
                                            ))
                                        }
                                    </Select>
                                )}
                            />
                        </FormControl>

                        <FormControl fullWidth>
                            <InputLabel id="category-select-label">Tags</InputLabel>
                            <Select
                                className='w-full bg-neutral-50 '
                                labelId="demo-multiple-checkbox-label"
                                id="demo-multiple-checkbox"
                                multiple
                                value={selectedTags}
                                onChange={handleTagChange}
                                input={<OutlinedInput label="Tag" />}
                                tabIndex={7}
                                renderValue={(selected) => selected.map(tagId => tags.find(tag => tag.id === tagId)?.nemonic).join(', ')}
                            >
                                {tags.map((tag) => (
                                    <MenuItem key={tag.id} value={tag.id}>
                                        <Checkbox checked={selectedTags.indexOf(tag.id) > -1} />
                                        <ListItemText primary={tag.nemonic} />
                                    </MenuItem>
                                ))}
                            </Select>
                        </FormControl>

                        <TextField
                            id="doc-txtfield"
                            label="Fecha de finalización"
                            variant="outlined"
                            className='w-full bg-neutral-50 '
                            type='date'
                            tabIndex={8}
                            {...register('dateEnd', { required: false })}
                        />

                    </div>
                </div>

                <div className='w-full flex flex-col gap-3'>

                    <TextField
                        id="title-txtfield"
                        label="Resumen"
                        variant="outlined"
                        className='w-full bg-neutral-50 '
                        multiline
                        rows={2}
                        tabIndex={9}
                        {...register('shortDescription', { required: true })}
                    />

                    <TextField
                        id="title-txtfield"
                        label="Descripción"
                        variant="outlined"
                        className='w-full bg-neutral-50 '
                        multiline
                        rows={4}
                        tabIndex={10}
                        {...register('description', { required: true })}
                    />

                    <Button
                        component="label"
                        variant="contained"
                        startIcon={<IoMdCloudUpload />}
                        tabIndex={11}
                        className='lg:self-end px-5 py-2 rounded-md text-[#fff6ed] dark:text-[#030637] bg-[#ed4709] dark:bg-[#e2b5fd] font-bold border-2 border-[#ed4709] dark:border-[#e2b5fd]'
                    >
                        Upload file
                        <input
                            type="file"
                            {...register('images')}
                            hidden
                            multiple
                            accept="image/png, image/jpeg, image/avif"
                        />
                    </Button>


                    <div className="grid grid-cols-1 sm:grid-cols-6 gap-3">

                        {
                            project.images?.map(image => (

                                <div key={image.id}>
                                    <ProjectImage
                                        src={image.url}
                                        alt={project.title ?? ''}
                                        width={210}
                                        height={150}
                                        className="rounded-t shadow-md"
                                    />
                                    <button
                                        type="button"
                                        onClick={() => deleteProjectImage(image.id, image.url)}
                                        className="bg-red-500 rounded-b-xl w-full ">
                                        Eliminar
                                    </button>
                                </div>

                            ))
                        }

                    </div>
                </div>

                <div className='w-full grid grid-cols-1 sm:grid-cols-2 grid-rows-1 gap-3 items-center'>

                    <FormControl fullWidth>
                        <InputLabel id="category-select-label">Developer</InputLabel>
                        <Select
                            className='w-full bg-neutral-50 '
                            labelId="demo-multiple-checkbox-label"
                            id="demo-multiple-checkbox"
                            multiple
                            value={selectedDevelopers}
                            onChange={handleDeveloperChange}
                            input={<OutlinedInput label="Developer" />}
                            renderValue={(selected) => selected.map(devId => developers.find(dev => dev.id === devId)?.name).join(', ')}
                        >
                            {developers.map((dev) => (
                                <MenuItem key={dev.id} value={dev.id}>
                                    <Checkbox checked={selectedDevelopers.indexOf(dev.id) > -1} />
                                    <ListItemText primary={dev.name} />
                                </MenuItem>
                            ))}
                        </Select>
                    </FormControl>

                    <AvatarGroup
                        total={project.developers?.length}
                    >
                        {
                            project.developers && project.developers.slice(0, 4).map(developer => (

                                <Avatar key={developer.id} alt={developer.name + developer.surname} src={developer.avatar ?? ''}
                                    sx={{ width: 100, height: 100, fontSize: 34 }}
                                />
                            ))
                        }
                    </AvatarGroup>

                </div>

                <button
                    className="btn-primary">
                    Guardar
                </button>

            </div>

        </form>
    )
}

export default ManageProjectForm