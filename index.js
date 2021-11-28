function initMap() {
    let myLocation = [
        [{ lat: 10.253537281790836, lng: 105.97155223313051 }, "Viễn thông Vĩnh Long"],
        [{ lat: 10.034445851895764, lng: 105.78735619060566 }, "Viễn thông Cần Thơ"],
        ];
    const directionsService = new google.maps.DirectionsService();
    const directionsRenderer = new google.maps.DirectionsRenderer();

    // Khởi tạo bản đồ với các tham số cơ bản
    let map = new google.maps.Map(document.getElementById("map"), {
        center: { lat: 10.253537281790836, lng: 105.97155223313051 },
        zoom: 18,
        gestureHandling: 'greedy',
        mapTypeControl: true,
    });



    // Thêm chỉ dẫn đường đi
    directionsRenderer.setMap(map);

    // Tạo marker
    myLocation.forEach(([position, title], i) => {
        const marker = new google.maps.Marker({
            position: position,
            map: map,
            title: title,
            label: {
                text: title,
                color: '#27ae60',
                fontSize: '12px',
                fontWeight: 'bold',
                // top: '20px',
            },
            optimized: false
        });

        marker.addListener('click', function (e) {
            navigator.geolocation.getCurrentPosition(function (position) {
                let myLat = position.coords.latitude;
                let myLng = position.coords.longitude;
                console.log(e.latLng.lat(), e.latLng.lng());
                console.log(myLat, myLng);
                directionsService
                    .route({
                        origin: {
                            query: myLat + ',' + myLng
                        },
                        destination: {
                            query: e.latLng.lat() + ',' + e.latLng.lng()
                        },
                        travelMode: google.maps.TravelMode.DRIVING,
                    })
                    .then((response) => {
                        directionsRenderer.setDirections(response);
                    })
                    .catch((e) => window.alert("Directions request failed due to " + e));
            });
        });
    });

    // Tạo infoWindow thông qua sự kiện click vào marker
    // marker.addListener('click', function(e) {
    //     navigator.geolocation.getCurrentPosition(function (position) {
    //         let myLat = position.coords.latitude;
    //         let myLng = position.coords.longitude;
    //         // console.log(e.latLng.lat(), e.latLng.lng());
    //         // console.log(myLat, myLng);
    //         directionsService
    //             .route({
    //                 origin: {
    //                     query: myLat + ',' + myLng
    //                 },
    //                 destination: {
    //                     query: e.latLng.lat() + ',' + e.latLng.lng()
    //                 },
    //                 travelMode: google.maps.TravelMode.DRIVING,
    //             })
    //             .then((response) => {
    //                 directionsRenderer.setDirections(response);
    //             })
    //             .catch((e) => window.alert("Directions request failed due to " + e));
    //     });
    // });   
}


// function calculateAndDisplayRoute(directionsService, directionsRender) {
//     // Khởi tạo các tham số cơ bản
//     let waypts = [];
//     let checkboxArray = document.getElementById('waypoints');
//     let checkbox = document.getElementById('waypoints');

//     // Lấy danh sách các điểm đến
//     for (let i = 0; i < checkboxArray.length; i++) {
//         if (checkboxArray[i].checked) {
//             waypts.push({
//                 location: checkboxArray[i].value,
//                 stopover: true
//             });
//         }
//     }

//     // Khởi tạo các tham số cơ bản
//     let request = {
//         origin: document.getElementById('start').value,
//         destination: document.getElementById('end').value,
//         waypoints: waypts,
//         optimizeWaypoints: true,
//         travelMode: 'DRIVING'
//     };

//     // Thực hiện tính toán và hiển thị đường đi
//     directionsService.route(request, function (response, status) {
//         if (status === 'OK') {
//             directionsRender.setDirections(response);
//         }
//     });
// }

