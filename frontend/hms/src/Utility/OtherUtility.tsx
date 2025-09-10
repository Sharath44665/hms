const arrayToCSV = (arr:string[]) => {
    if (!arr || arr.length === 0) return null;
    return arr.join(", ")
}

const capitalizeFirstLetter = (value: string) =>{
    if(!value) return "";
    return value.charAt(0).toUpperCase()+value.slice(1)?.toLowerCase();
}

export { arrayToCSV, capitalizeFirstLetter }