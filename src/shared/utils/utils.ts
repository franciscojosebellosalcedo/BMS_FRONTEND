
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