
export type THandlerPermission = {
    optionId: number;
    action: "access" | "create" | "edit" | "changeStatus",
    value: boolean
}