
export type TModule = {
    modulo_Id: number;
    modulo_Indice: number;
    modulo_Nombre: string;
    modulo_Activo: boolean;
    modulo_Codigo: string;
    modulo_Creacion: Date;
    modulo_Modificacion: Date;
}

export type TSubmodule = {
    submo_Id: number;
    submo_Indice: number;
    submo_Nombre: string;
    submo_Codigo: string;
    submo_Activo: boolean;
    submo_ModuloId: number;
    submo_Creacion: Date;
    submo_Modificacion: Date;
}

export type TOption = {
    opci_Id: number;
    opci_SubmoduloId: number;
    opci_Nombre: string;
    opci_Slug: string;
    opci_Activo: boolean;
    opci_Codigo: string;
    opci_Creacion: Date;
    opci_Modificacion: Date;

}

export type TSubModuleItem = {
    submodule: TSubmodule,
    options: TOption[]
}

export type TMenu = {
    module: TModule,
    submodules: TSubModuleItem[]
}