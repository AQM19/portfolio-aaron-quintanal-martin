'use client'

import { createUpdateProject, deleteProjectImage } from '@/actions';
import ProjectImage from '@/components/projects/project-image/ProjectImage';
import { Category, Project, ProjectImage as ProjectWithImage, Tag } from '@/interfaces';
import { useRouter } from '@/navigation';
import { Avatar, AvatarGroup, Button, Checkbox, ListItemText, MenuItem, OutlinedInput, Select, SelectChangeEvent } from '@mui/material';
import React from 'react';
import { useForm } from 'react-hook-form';
import { Developer } from '../../../../../../../interfaces/developer/developer.interface';
import { Paths } from '@/interfaces/paths/paths.enum';

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
    link: string;
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
            description: project.description ?? '',
            shortDescription: project.shortDescription ?? '',
            link: project.link ?? '',
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
        formData.append('link', projectToSave.link);
        formData.append('category', projectToSave.Category);
        formData.append('status', projectToSave.Status);
        formData.append('dateStart', projectToSave.dateStart.toLocaleString());
        formData.append('logo', projectToSave.logo);

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

            <div className="grid px-5 mb-16 grid-cols-1 sm:px-56 sm:grid-cols-2 gap-3">

                <div className='w-full'>

                    <div className='flex flex-col mb-2'>
                        <span>Titulo</span>
                        <input type="text" className='p-2 border rounded-md bg-gray-200' {...register('title', { required: true })} />
                    </div>


                    <div className="flex flex-col mb-2">
                        <span>Link</span>
                        <input type="text" className="p-2 border rounded-md bg-gray-200" {...register('link', { required: false })} />
                    </div>

                    <div className="flex flex-col mb-2">
                        <span>Documentación</span>
                        <input type="text" className="p-2 border rounded-md bg-gray-200" {...register('documentation', { required: false })} />
                    </div>

                    <div className="flex flex-col mb-2">
                        <span>Estado</span>
                        <select className="p-2 border rounded-md bg-gray-200" {...register('Status', { required: true })} defaultValue={''}>
                            <option value="">[Seleccione]</option>
                            {
                                status.map(state => (
                                    <option key={state} value={state}>{state}</option>
                                ))
                            }
                        </select>
                    </div>


                    <div className="flex flex-col mb-2">
                        <span>Fecha de inicio</span>
                        <input type="date" className="p-2 border rounded-md bg-gray-200" {...register('dateStart', { required: true })} />
                    </div>

                </div>

                <div className='w-full'>

                    <div className="flex flex-col mb-2">
                        <span>Slug</span>
                        <input type="text" className="p-2 border rounded-md bg-gray-200" {...register('slug', { required: true })} />
                    </div>

                    <div className="flex flex-col mb-2">
                        <span>Categoría</span>
                        <select className="p-2 border rounded-md bg-gray-200" {...register('Category', { required: true })} defaultValue={''}>
                            <option value={''}>[Seleccione]</option>
                            {
                                categories.map(category => (
                                    <option key={category.id} value={category.nemonic}>{category.nemonic}</option>
                                ))
                            }
                        </select>
                    </div>

                    <div className='flex flex-col mb-2'>
                        <span>Tags</span>

                        <Select
                            className='bg-gray-200'
                            labelId="demo-multiple-checkbox-label"
                            id="demo-multiple-checkbox"
                            multiple
                            value={selectedTags}
                            onChange={handleTagChange}
                            input={<OutlinedInput label="Tag" />}
                            renderValue={(selected) => selected.map(tagId => tags.find(tag => tag.id === tagId)?.nemonic).join(', ')}
                        >
                            {tags.map((tag) => (
                                <MenuItem key={tag.id} value={tag.id}>
                                    <Checkbox checked={selectedTags.indexOf(tag.id) > -1} />
                                    <ListItemText primary={tag.nemonic} />
                                </MenuItem>
                            ))}
                        </Select>
                    </div>

                    <div className="flex flex-col mb-2">
                        <span>Fecha de finalización</span>
                        <input type="date" className="p-2 border rounded-md bg-gray-200" {...register('dateEnd', { required: false })} />
                    </div>

                </div>

                <div className='w-full col-span-2'>
                    <div className="flex flex-col mb-2">
                        <span>Resumen</span>
                        <textarea
                            rows={2}
                            className="p-2 border rounded-md bg-gray-200"
                            {...register('shortDescription', { required: true })}
                        ></textarea>
                    </div>

                    <div className="flex flex-col mb-2">
                        <span>Descripción</span>
                        <textarea
                            rows={5}
                            className="p-2 border rounded-md bg-gray-200"
                            {...register('description', { required: true })}
                        ></textarea>
                    </div>
                </div>

                <div className='w-full col-span-2'>

                    <div className="flex flex-col mb-2">

                        <span>Fotos</span>
                        <input
                            type="file"
                            {...register('images')}
                            multiple
                            className="p-2 border rounded-md bg-gray-200"
                            accept="image/png, image/jpeg, image/avif"
                        />

                    </div>


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

                <div className='w-full flex flex-row gap-3 justify-start'>
                    <AvatarGroup total={project.developers?.length}>
                        {
                            project.developers && project.developers.slice(0, 4).map(developer => (

                                <Avatar key={developer.id} alt={developer.name + developer.surname} src={developer.avatar ?? ''}
                                    sx={{ width: 100, height: 100, fontSize: 34 }}
                                />
                            ))
                        }
                    </AvatarGroup>

                    <div className='flex flex-col mb-2'>
                        <span>Developer</span>

                        <Select
                            className='bg-gray-200'
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
                                    <Checkbox checked={selectedTags.indexOf(dev.id) > -1} />
                                    <ListItemText primary={dev.name} />
                                </MenuItem>
                            ))}
                        </Select>
                    </div>
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