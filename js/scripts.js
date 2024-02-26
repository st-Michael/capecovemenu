/*!
* Start Bootstrap - Business Casual v7.0.8 (https://startbootstrap.com/theme/business-casual)
* Copyright 2013-2022 Start Bootstrap
* Licensed under MIT (https://github.com/StartBootstrap/startbootstrap-business-casual/blob/master/LICENSE)
*/
// Highlights current date on contact page
window.addEventListener('DOMContentLoaded', event => {
    const listHoursArray = document.body.querySelectorAll('.list-hours li');
    listHoursArray[new Date().getDay()].classList.add(('today'));
})




const pdfUrl = 'CapeCoveMenu.pdf';
const container = document.querySelector('.pdf-container');

// Load PDF document
pdfjsLib.getDocument(pdfUrl).promise.then(pdf => {
    // Array to store all page render promises
    const pageRenderPromises = [];

    // Loop through each page
    for (let pageNum = 1; pageNum <= pdf.numPages; pageNum++) {
        // Create canvas element for each page
        const canvas = document.createElement('canvas');
        const context = canvas.getContext('2d');

        // Append canvas to container
        container.appendChild(canvas);

        // Load page and render
        const pageRenderPromise = pdf.getPage(pageNum).then(page => {
            const viewport = page.getViewport({ scale: 1.0 });
            canvas.width = 600;
            canvas.height = 650;

            // Render PDF page into canvas context
            page.render({
                canvasContext: context,
                viewport: viewport
            });
        });

        // Add page render promise to array
        pageRenderPromises.push(pageRenderPromise);
    }

    // Wait for all page render promises to resolve
    Promise.all(pageRenderPromises).then(() => {
        console.log('All pages rendered');
    });
}).catch(error => {
    console.error('Error loading PDF:', error);
});