import { unparse } from 'papaparse';

export const exportToCSV = (data, fileName) => {
    const csv = unparse(data);
    // console.log(csv);
    
    // Create a Blob from the csv data
    const blob = new Blob([csv], {type: 'text/csv;charset=utf-8;'});
    const url = URL.createObjectURL(blob);
    // console.log(url);

    // Create a download link 
    const link = document.createElement('a');
    link.href = url;
    link.setAttribute('download', fileName);
    
    // Simulate a click to download the file
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
};