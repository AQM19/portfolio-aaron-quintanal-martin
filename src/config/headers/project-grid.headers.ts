import { GridColDef } from "@mui/x-data-grid";

export const PROJECT_GRID_HEADERS: GridColDef[] = [
    { field: 'title', headerName: 'Titulo', type: 'string', flex: 1 },
    { field: 'dateStart', headerName: 'Fecha de inicio', type: 'date', flex: 1 },
    { field: 'dateEnd', headerName: 'Fecha fin', type: 'date', flex: 1 },
    { field: 'category', headerName: 'Categoria', type: 'string', flex: 1 },
    { field: 'status', headerName: 'Estado', type: 'string', flex: 1 },
    { field: 'description', headerName: 'Descripción', type: 'string', flex: 4 },
];