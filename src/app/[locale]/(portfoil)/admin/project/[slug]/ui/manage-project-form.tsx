'use client'

import ProjectImage from '@/components/projects/project-image/ProjectImage';
import { Category, Project } from '@/interfaces';
import { useRouter } from '@/navigation';
import { useForm } from 'react-hook-form';

interface Props {
    project: Partial<Project>;
    categories: Category[];
    tags: string[];
    status: string[];
}

interface FormInputs {
    title: string;
    description?: string;
    shortDescription?: string;
    dateStart: string | Date;
    dateEnd?: string | Date;
    documentation?: string;
    link: string;
    slug: string;
    Status: string;
    Category: string;
    tags: string[];
}


const ManageProjectForm = ({ project, categories, tags, status }: Props) => {

    console.log(project);

    const router = useRouter();

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
            dateStart: project.dateStart ? new Date(project.dateStart).toISOString().split('T')[0] : '',
            dateEnd: project.dateEnd ? new Date(project.dateEnd).toISOString().split('T')[0] : '',
            description: project.description ?? '',
            shortDescription: project.shortDescription ?? '',
            link: project.link ?? '',
        }
    });

    const onSubmit = async (data: FormInputs) => {
        const formData = new FormData();

        const { ...projectToSave } = data;

        // if (project.id) {
        //     formData.append('id', project.id ?? '');
        // }
        console.log(projectToSave);
    }

    return (
        <form onSubmit={handleSubmit(onSubmit)}>
            <div className='grid px-5 mb-16 grid-cols-1 sm:px-0 sm:grid-cols-3 gap-3'>

                <div className="grid px-5 mb-16 grid-cols-1 sm:px-0 sm:grid-cols-2 gap-3">

                    <div className='w-full'>

                        <div className='flex flex-col mb-2'>
                            <span>Titulo</span>
                            <input type="text" className='p-2 border rounded-md bg-gray-200' {...register('title', { required: true })} />
                        </div>

                        <div className="flex flex-col mb-2">
                            <span>Slug</span>
                            <input type="text" className="p-2 border rounded-md bg-gray-200" {...register('slug', { required: true })} />
                        </div>

                        <div className="flex flex-col mb-2">
                            <span>Link</span>
                            <input type="text" className="p-2 border rounded-md bg-gray-200" {...register('link', { required: false })} />
                        </div>

                        <div className="flex flex-col mb-2">
                            <span>Categoría</span>
                            <select className="p-2 border rounded-md bg-gray-200" {...register('Category', { required: true })}>
                                <option value="" selected>[Seleccione]</option>
                                {
                                    categories.map(category => (
                                        <option key={category.id} value={category.nemonic}>{category.nemonic}</option>
                                    ))
                                }
                            </select>

                        </div>
                    </div>

                    <div className='w-full'>

                        <div className="flex flex-col mb-2">
                            <span>Estado</span>
                            <select className="p-2 border rounded-md bg-gray-200" {...register('Status', { required: true })}>
                                <option value="" selected>[Seleccione]</option>
                                {
                                    status.map(state => (
                                        <option key={state} value={state}>{state}</option>
                                    ))
                                }
                            </select>
                        </div>

                        <div className="flex flex-col mb-2">
                            <span>Tags</span>
                            <input type="text" className="p-2 border rounded-md bg-gray-200" {...register('tags', { required: false })} />
                        </div>

                        <div className="flex flex-col mb-2">
                            <span>Fecha de inicio</span>
                            <input type="date" className="p-2 border rounded-md bg-gray-200" {...register('dateStart', { required: true })} />
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

                    <div className='w-full'>
                        <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">

                            {
                                project.images?.map(image => (

                                    <div key={image}>
                                        <ProjectImage
                                            src={image}
                                            alt={project.title ?? ''}
                                            width={300}
                                            height={150}
                                            className="rounded-t shadow-md"
                                        />
                                        <button
                                            type="button"
                                            // onClick={() => deleteProductImage(image.id, image.url)}
                                            className="bg-red-500 rounded-b-xl w-full ">
                                            Eliminar
                                        </button>
                                    </div>

                                ))
                            }

                        </div>
                    </div>
                </div>

            </div>

            <button
                className="btn-primary">
                Guardar
            </button>
        </form>
    )
}

export default ManageProjectForm