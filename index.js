function initMap() {
    let myLocation = [
        [{ lat: 10.253537281790836, lng: 105.97155223313051 }, "Viễn thông Vĩnh Long"],
        [{ lat: 10.048996471891556, lng: 105.99959333472513}, "VNPT Tam Bình"],
        [{ lat: 10.174209998988097, lng: 106.10979071454551 }, "VNPT Mang Thít"],
        [{ lat: 10.091940005313761, lng: 106.19043187973773 }, "VNPT Vũng Liêm"],
        [{ lat: 9.965596222127122, lng: 105.92045499404664 }, "VNPT Trà Ôn"],
        [{ lat: 10.195538141677076, lng: 106.01420882438346}, "VNPT Long Hồ"],
        [{ lat: 10.069065383343391, lng: 105.82075599985794}, "VNPT Bình Minh"],
        [{ lat: 10.105273927367769, lng: 105.75388749192459}, "VNPT Bình Tân"],
        ];
    const directionsService = new google.maps.DirectionsService();
    const directionsRenderer = new google.maps.DirectionsRenderer();

    // Khởi tạo bản đồ với các tham số cơ bản
    let map = new google.maps.Map(document.getElementById("map"), {
        center: { lat: 10.253537281790836, lng: 105.97155223313051 },
        zoom: 11,
        gestureHandling: 'greedy',
        mapTypeControl: true,
    });

    // Load kml
    // let kmlLayer = new google.maps.KmlLayer('Tinh_VL.KML', {
    //     suppressInfoWindows: true,
    //     preserveViewport: false,
    //     map: map
    // });

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
}


// Language: javascript