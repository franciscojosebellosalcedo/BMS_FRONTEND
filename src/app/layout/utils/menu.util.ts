import type { TMenu } from "../types/menu.type";

export const sortMenu = (
    menu: TMenu[]
): TMenu[] => {

    return [...(menu || [])]

        .sort(
            (a, b) =>
                a.module.modulo_Indice -
                b.module.modulo_Indice
        )

        .map(module => ({

            ...module,

            submodules: [...(module.submodules || [])]

                .sort(
                    (a, b) =>
                        a.submodule.submo_Indice -
                        b.submodule.submo_Indice
                )

                .map(submodule => ({

                    ...submodule,

                    options: [...(submodule.options || [])]

                        .sort(
                            (a, b) =>
                                a.opci_Nombre.localeCompare(
                                    b.opci_Nombre
                                )
                        )
                }))
        }));
};

export const MODULES_CODES = {
    INICIO: "INICIO",
    VENTAS: "VENTAS"
}