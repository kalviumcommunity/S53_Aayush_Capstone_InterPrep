function formatDate() {
    const date = new Date();
    const options = { 
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
};

module.exports = formatDate;