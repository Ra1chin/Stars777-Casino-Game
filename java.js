document.addEventListener('DOMContentLoaded', function() {
    const reviewsPerPage = 3;
    const reviews = document.querySelectorAll('.review');
    const totalPages = Math.ceil(reviews.length / reviewsPerPage);
    let currentPage = 1;

    function truncateText(text, wordLimit) {
        const words = text.split(' ');
        if (words.length > wordLimit) {
            return words.slice(0, wordLimit).join(' ') + '...';
        }
        return text;
    }

    reviews.forEach(review => {
        const paragraph = review.querySelector('p');
        paragraph.textContent = truncateText(paragraph.textContent, 40);
    });

    function showPage(page) {
        reviews.forEach((review, index) => {
            review.style.display = (index >= (page - 1) * reviewsPerPage && index < page * reviewsPerPage) ? 'block' : 'none';
        });
        document.querySelector('.pagination').innerHTML = createPaginationButtons(page, totalPages);
    }

    function createPaginationButtons(currentPage, totalPages) {
        let buttons = '';
        for (let i = 1; i <= totalPages; i++) {
            buttons += `<button class="${i === currentPage ? 'disabled' : ''}" onclick="changePage(${i})">${i}</button>`;
        }
        return buttons;
    }

    window.changePage = function(page) {
        if (page >= 1 && page <= totalPages) {
            currentPage = page;
            showPage(currentPage);
        }
    }

    showPage(currentPage);
});