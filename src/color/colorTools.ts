/*
 * Universal way to get the ticket status color.
 * Attempt to have be one place to change all status colors.
 */
export function getStatusColor(status: string) {
    console.log('status', status);
    switch (status) {
        case 'High' :
            return 'negative';
        case 'Medium' :
            return 'warning';
        case 'Low' :
            return 'positive';
        default :
            // This should never happend
            return 'info';
    }
}