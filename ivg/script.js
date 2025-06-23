$(document).ready(function() {
    // Первая форма - обратная связь
    $('#feedbackForm').on('submit', function(e) {
        e.preventDefault();
        const form = this;
        
        if (form.checkValidity() === false) {
            e.stopPropagation();
            form.classList.add('was-validated');
            return;
        }
        
        // AJAX запрос
        $.ajax({
            url: 'http://127.0.0.1',
            method: 'POST',
            data: $(this).serialize(),
            success: function(response) {
                Swal.fire({
                    icon: 'success',
                    title: 'Успех!',
                    text: 'Ваше сообщение отправлено',
                });
                form.reset();
                form.classList.remove('was-validated');
            },
            error: function() {
                Swal.fire({
                    icon: 'error',
                    title: 'Ошибка',
                    text: 'Произошла ошибка при отправке',
                });
            }
        });
    });
    
    // Вторая форма - заказ
    $('#orderForm').on('submit', function(e) {
        e.preventDefault();
        const form = this;
        
        if (form.checkValidity() === false) {
            e.stopPropagation();
            form.classList.add('was-validated');
            return;
        }
        
        const formData = {
            name: $('#orderName').val(),
            product: $('#product').val(),
            agreement: $('#agreement').is(':checked')
        };
        
        Swal.fire({
            title: 'Данные заказа',
            html: `<p><strong>Имя:</strong> ${formData.name}</p>
                  <p><strong>Продукт:</strong> ${formData.product}</p>
                  <p><strong>Принял условия:</strong> ${formData.agreement ? 'Да' : 'Нет'}</p>`,
            icon: 'info',
            confirmButtonText: 'OK'
        });
        
        form.reset();
        form.classList.remove('was-validated');
    });
    
    // Загрузка отзывов из JSON
    $.getJSON('reviews.json', function(data) {
        const reviewsGrid = $('#reviewsGrid');
        
        data.reviews.forEach(function(review) {
            reviewsGrid.append(`
                <div class="review-card">
                    <div class="review-author">${review.name}</div>
                    <div class="review-text">${review.text}</div>
                </div>
            `);
        });
    }).fail(function() {
        $('#reviewsGrid').html('<p>Не удалось загрузить отзывы. Пожалуйста, попробуйте позже.</p>');
    });
    document.addEventListener('DOMContentLoaded', function() {
    fetch('reviews.json')
        .then(response => response.json())
        .then(data => {
            const reviewsGrid = document.getElementById('reviewsGrid');
            
            data.reviews.forEach(review => {
                const reviewCard = document.createElement('div');
                reviewCard.className = 'review-card';
                
                reviewCard.innerHTML = `
                    <div class="review-author">${review.name}</div>
                    <div class="review-text">${review.text}</div>
                `;
                
                reviewsGrid.appendChild(reviewCard);
            });
        })
        .catch(error => {
            console.error('Ошибка загрузки отзывов:', error);
            document.getElementById('reviewsGrid').innerHTML = 
                '<p>Не удалось загрузить отзывы. Пожалуйста, попробуйте позже.</p>';
        });
    });
});