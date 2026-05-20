const arrayToCSV = (arr: string[]) => {
    if (!arr || arr.length === 0) return null;
    return arr.join(", ")
}

const capitalizeFirstLetter = (value: string) => {
    if (!value) return "";
    return value.charAt(0).toUpperCase() + value.slice(1)?.toLowerCase();
}

const addZeroMonths = (data: any, monthKey: string, valueKey: string) => {
    const months = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];

    const result = months.map((month) => {
        const found = data.find((item: any) => item[monthKey] === month);
        // return {
        //     [monthKey]: month,
        //     [valueKey]: found ? found[valueKey] : 0
        // }
        return found ? found : { [monthKey]: month, [valueKey]: 0 }
    })

    return result;
}

const convertReasonChartData = (data: any[]) => {
    const colors = [
  '#1F77B4', // blue
  '#FF7F0E', // orange
  '#2CA02C', // green
  '#D62728', // red
  '#9467BD', // purple
  '#8C564B', // brown
  '#E377C2', // pink
  '#7F7F7F', // gray
  '#BCBD22', // olive
  '#17BECF'  // teal
];
    return data.map((item, index) => {
        return {
            name: item.reason,
            value: item.count,
            color: colors[index % colors.length]
        }
    })

}

export { arrayToCSV, capitalizeFirstLetter, addZeroMonths, convertReasonChartData }