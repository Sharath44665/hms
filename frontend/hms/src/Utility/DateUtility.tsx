const formatDate=(dateString:any) => {
    if (!dateString) return undefined;
    const months = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];

    const date = new Date(dateString)
    const day = date.getDate();
    const month = months[date.getMonth()]
    const year = date.getFullYear()

    return `${day} ${month} ${year}`
}


const formatDateWithtime = (dateString: any) => {
    if(!dateString) return undefined

    const date = new Date(dateString);

    const options : Intl.DateTimeFormatOptions = {
        weekday:"long",
        year: "numeric",
        month: "long",
        day: "numeric",
        hour: "numeric",
        minute: "numeric",
        hour12: true,
    };

    return date.toLocaleDateString("en-Us", options)

}
export {formatDate, formatDateWithtime}