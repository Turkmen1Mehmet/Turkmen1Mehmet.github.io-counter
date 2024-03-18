$(document).ready(function ($) {

    // Sayfa yüklendiğinde localStorage'dan verileri yükleyin
    for (let i = 1; i <= 10; i++) {
        let storedValue = localStorage.getItem('trend' + i);
        if (storedValue) {
            $('#trend' + i).val(storedValue);
        }
    }

    // Artırma ve azaltma butonlarına tıklandığında ilgili işlevleri çağır
    $('[data-quantity="plus"]').click((event) => {
        increaseCounter(event);
    });

    $('[data-quantity="minus"]').click((event) => {
        decreaseCounter(event);
    });

    // Silme işlemi
    $('#delete_02').click(function (event) {
        event.preventDefault();
        ["#delete_00", "#delete_01", "#delete_02", "#delete_03", "#delete_04"].forEach(function (id) {
            $(id).remove();
        });
        $("#counter").addClass("centered");
    });

    // Klavye olayları
    $(document).on('keyup', (event) => {
        if (event.key === "ArrowUp" || event.key === "ArrowDown") {
            // İlgili input'a odaklanmışsa işlem yapma
            if (event.currentTarget.activeElement && $(event.currentTarget.activeElement).hasClass('input-number')) {
                return;
            }
            if (event.key === "ArrowUp") {
                increaseCounter(event);
            } else if (event.key === "ArrowDown") {
                decreaseCounter(event);
            }
        }
    });

    function increaseCounter(event) {
        handleCounterChange(event, 1);
    }

    function decreaseCounter(event) {
        handleCounterChange(event, -1);
    }

    function handleCounterChange(event, change) {
        event.preventDefault();
        let button = $(event.target).closest('.button');
        let targetInputSelector = button.data('target');
        let input = $(targetInputSelector);
        let currentValue = parseInt(input.val()) || 0;
        let newValue = currentValue + change;

        if (newValue >= 0) {
            input.val(newValue);
            localStorage.setItem(input.attr('id'), newValue.toString());
        }
    }
});

function saveValue(id) {
    let value = $('#' + id).val();
    localStorage.setItem(id, value);
}

function increasetrend(number) {
    let elementId = "trend" + number;
    let element = $('#' + elementId);
    element.val(parseInt(element.val()) + 1);
    saveValue(elementId);
}

function decreasetrend(number) {
    let elementId = "trend" + number;
    let element = $('#' + elementId);
    let currentValue = parseInt(element.val());
    if (currentValue > 0) {
        element.val(currentValue - 1);
    }
    saveValue(elementId);
}

function clearResulttrend(number) {
    let elementId = "trend" + number;
    $('#' + elementId).val('0');
    saveValue(elementId);
}
