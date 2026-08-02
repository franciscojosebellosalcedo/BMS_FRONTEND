import type { TOption } from "../../app/layout/types/menu.type";
import { store } from "../../app/store/store";
import type { TUserPermission } from "../../modules/auth/types/userPermissionType";

export const getPermission = (userPermissions: TUserPermission[], codeOption: string ) =>{

    const options: TOption[] = store.getState().layout.options;
    const optionFound = options.find((option) => option.opci_Codigo === codeOption );

    return userPermissions.find((permission) => permission.peusua_OpcionId === optionFound?.opci_Id ) ?? null;

}

export const sortByField = <T,>(array: T[], field: keyof T, order: 'asc' | 'desc' = 'asc'): T[] => {

    return [...array].sort((a, b) => {

        const fieldA = String(a[field]).toLowerCase();
        const fieldB = String(b[field]).toLowerCase();

        if (fieldA < fieldB) {
            return order === 'asc' ? -1 : 1;
        }
        if (fieldA > fieldB) {
            return order === 'asc' ? 1 : -1;
        }
        return 0;

    });
};

export const formatDate = (dateString: any) => {

    if (!dateString) return "";

    const normalized = dateString.split("T")[0];

    const [year, month, day] = normalized.split(" ")[0].split("-");

    return `${year}-${month}-${day}`;

};