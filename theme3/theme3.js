// SELECT COUNTRY AND NUMBER FUNCTIONALITY
function setTextBoxValue() {
    // Get the selected value from the dropdown
    var selectedValue = document.getElementById("data-countryCode").value;
    
    // Set the value of the textbox
    document.getElementById("phone").value ="+" + selectedValue;
}




function googleTranslateElementInit() {
    new google.translate.TranslateElement({ pageLanguage: 'en' }, 'google_translate_element');
}

// AJAX request to 'add_counter'
fetch('add_counter?id=329')
    .then(response => response.text())
    .then(data => {
        if (parseInt(data) > 0) {
            document.getElementById("count").textContent = data;
        }
    })
    .catch(error => console.error('Error:', error));

// Wait for DOM to load
document.addEventListener("DOMContentLoaded", function () {
    document.querySelector('.wtsp_share_btn').addEventListener('click', function () {
        const phone = document.getElementById('phone').value;

        // AJAX request to 'submit_wp'
        fetch('submit_wp', {
            method: 'POST',
            headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
            body: new URLSearchParams({ phone: phone, id: 329 })
        })
            .then(response => response.text())
            .then(result => console.log("done"))
            .catch(error => console.error('Error:', error));

        // Submit the form
        document.getElementById('wtsp_form').submit();
    });
});
