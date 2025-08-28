
export const isValidDate = async (
    date: string
): Promise<boolean> => {
    let isValidDateType = false;

    // If the input is a string, attempt to parse it into a Date object
    let parsedDate = typeof date === 'string' ? new Date(date) : date;

    // Check if it's a Date object and if its getTime() result is not NaN
    isValidDateType = 
        parsedDate instanceof Date &&
        !isNaN(parsedDate.getTime());

    return isValidDateType;
}