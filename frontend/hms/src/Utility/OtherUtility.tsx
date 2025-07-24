const arrayToCSV = (arr:string[]) => {
    if (!arr || arr.length === 0) return null;
    return arr.join(", ")
}

export { arrayToCSV }