// eslint-disable-next-line @typescript-eslint/no-explicit-any
export const isNotNumberArray = (argument: any): boolean => {
    for (const val of argument) {
        if (isNaN(Number(val))) {
            return true;
        }
    }
    return false;
};