export const getAttendingStatus = attending => {
    if (attending === false) return 'No';
    return attending ? 'Yes' : 'Pending';
};
