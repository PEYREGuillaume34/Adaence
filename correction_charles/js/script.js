document.getElementById('search-button')
.addEventListener('click', (event) => {
    event.preventDefault();
    const activityValue = document.getElementById('activity-type').value;
    const locationValue = document.getElementById('location').value.toLowerCase();
    if(locationValue.length === 0) {
        document.querySelector('.error-message').style.display = 'block';
        return;
    } else {
        document.querySelector('.error-message').style.display = 'none';
    }
    const newUrl = `/pages/search.html?activity=${activityValue}&location=${locationValue}`;
    window.location.href = newUrl;
});