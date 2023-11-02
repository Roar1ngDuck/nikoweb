document.querySelectorAll('[data-page]').forEach(button => {
    button.addEventListener('click', (e) => {
        e.preventDefault();

        // Remove 'active' class from all buttons
        document.querySelectorAll('.nav-button').forEach(btn => {
            btn.classList.remove('active');
        });

        // Add 'active' class to the clicked button
        button.classList.add('active');

        const page = e.target.getAttribute('data-page');

        // Fade out current content
        const contentContainer = document.getElementById('app-content');
        contentContainer.classList.add('fade-out');

        // Fetch the new content after fade out is complete
        setTimeout(() => {
            fetch(`/${page}.html`)
                .then(response => response.text())
                .then(content => {
                    contentContainer.innerHTML = content;

                    // Fade in new content
                    contentContainer.classList.remove('fade-out');
                })
                .catch(error => console.error('Error fetching the content:', error));
        }, 200);  // The timeout should match the transition duration in the CSS
    });
});