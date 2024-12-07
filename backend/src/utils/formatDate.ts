function formatDate(): string {
    const date = new Date();
    const options: Intl.DateTimeFormatOptions = { 
        timeZone: 'Asia/Kolkata',
        weekday: 'short', 
        year: '2-digit', 
        month: 'short', 
        day: '2-digit', 
        hour: 'numeric', 
        minute: 'numeric' 
    };
    const formattedDate = date.toLocaleString('en-IN', options);
    return formattedDate;
}

export default formatDate;