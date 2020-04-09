export const listTour = () => {
    return fetch('http://localhost:8080/api/v1/tours', {
        method: 'GET'
    }).then(response => {
        return response.json();
    })
    .catch(error => console.log(error));
}