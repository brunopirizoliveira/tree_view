document.addEventListener('DOMContentLoaded', function() {
    console.log('DOM fully loaded and parsed');
    const controls = document.querySelectorAll('.treegrid-control');
    console.log('Controls:', controls);

    controls.forEach(control => {
        control.addEventListener('click', function(event) {
            console.log('Control clicked:', this);
            event.stopPropagation(); // Evita que o clique no controle propague para a linha
            const parentRow = this.closest('tr'); // Seleciona o elemento <tr> mais próximo
            console.log('Parent row:', parentRow);
            const levelAttr = parentRow.getAttribute('data-level');
            console.log('data-level attribute:', levelAttr);
            const level = parseInt(levelAttr);
            console.log('Parsed level:', level);

            if (isNaN(level)) {
                console.error('data-level attribute is missing or invalid');
                return;
            }

            let nextRow = parentRow.nextElementSibling;

            while (nextRow && parseInt(nextRow.getAttribute('data-level')) > level) {
                if (parseInt(nextRow.getAttribute('data-level')) === level + 1) {
                    console.log('Toggling row:', nextRow);
                    nextRow.classList.toggle('treegrid-collapsed');
                }
                nextRow = nextRow.nextElementSibling;
            }

            this.textContent = this.textContent === '+' ? '-' : '+';
        });
    });
});