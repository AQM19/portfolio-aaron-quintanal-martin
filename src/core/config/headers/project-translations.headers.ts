import { GridColDef } from "@mui/x-data-grid";

export const PROJECT_TRANSLATIONS_HEADERS: GridColDef[] = [
    { field: 'title', headerName: 'Titulo', type: 'string', flex: 1 },
    { field: 'es', headerName: 'Español', type: 'string', flex: 1 },
    { field: 'en', headerName: 'Ingles', type: 'string', flex: 1 }
];