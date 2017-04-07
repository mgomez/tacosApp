document.addEventListener("deviceready", onDeviceReady, false);

function onDeviceReady() {
    var config = {
        quality: (device.platform !== 'Android') ? 10 : 50,
        destinationType: Camera.DestinationType.DATA_URL,
        targetWidth: (device.platform !== 'Android') ? 150 : 750
    };
    $("#NewImg").on("click", function() {
        getPicture({
            config: config,
            onSuccess: function(imageData) {
                $("#NewImg").attr("src", "data:image/jpeg;base64," + imageData);
            },
            onFail: function(message) {
                alert(message);
            }
        });
    });

    function getPicture(d) {
        navigator.camera.getPicture(d.onSuccess, d.onFail, d.config);
    }
}
