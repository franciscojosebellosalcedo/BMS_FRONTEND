
export type THandlerPermission = {
    optionId: number;
    action: TActionPermission,
    value: boolean
}

export type TActionPermission = "access" | "create" | "edit" | "changeStatus"