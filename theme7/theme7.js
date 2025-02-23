

// set Country code
const input = document.querySelector('#whatsapp-input');
const iti = window.intlTelInput(input, {
    initialCountry: 'auto',
    geoIpLookup: (success) => {
        fetch('https://ipinfo.io', {
            headers: {
                Accept: 'application/json',
                'Content-Type': 'application/json',
            },
        })
            .then((response) => response.json())
            .then((data) => {
                const countryCode = (data && data.country) ? data.country : '';
                success(countryCode);
            });
    },
});

// Get the modal
const imageModal = document.getElementById('imageModal');
const shareModal = document.getElementById('shareModal');

// When the user clicks anywhere outside of the modal, close it
window.onclick = function (event) {
    if (event.target == imageModal || event.target == shareModal) {
        imageModal.style.display = 'none';
        shareModal.style.display = 'none';
    }
};

const modalImg = document.getElementById('img01');
const captionText = document.getElementById('caption');

function openImageModal(e) {
    imageModal.style.display = 'block';
    modalImg.src = e.src;
    captionText.innerHTML = e.alt;
}

// Get the <span> element that closes the modal
const imageModalClose = document.getElementById('imageModalClose');

// When the user clicks on <span> (x), close the modal
imageModalClose.onclick = function () {
    imageModal.style.display = 'none';
};


function openShareModal(e, title) {
    if (navigator.share) {
        navigator.share({
            title,
            url: window.location.href,
        }).then(() => {
            console.log('Thanks for sharing!');
        })
            .catch(console.error);
    } else {
        shareModal.style.display = 'flex';
    }
}

// Get the <span> element that closes the modal
const shareModalClose = document.getElementById('shareModalClose');

// When the user clicks on <span> (x), close the modal
shareModalClose.onclick = function () {
    shareModal.style.display = 'none';
};


function handleWhatsappShare(e) {
    const { value } = document.getElementById('whatsapp-input');
    var msg = $("#whatsapp-msg").val();

    if (value.length < 10) {
        e.preventDefault();
        return;
    }
    
    var card = window.location.href;
    var name = '';
    var number = value;
    
    $.ajax(
    {
        url:"https://dcard.live/welcome/dcard_lead",
        data:{card:card,name:name,number:number},
        type:'POST',
        success:function()
        {
            console.log("Card Share!!")
        }
    });
                
    e.href = `https://wa.me/${iti.getNumber()}?text=`+msg;
}


