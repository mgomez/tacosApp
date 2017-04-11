$(function() {
    var tacosDB = firebase.database().ref('/usuarios');

    tacosDB.on('value', function(data) {
        console.log("value", data.key, data.val());
        var usuarios = data.val();
        $.get("views/_tbTacos.html", function(template) {
            $("#rolTable-content").handlebars(template, usuarios);
        });
    });

    tacosDB.on("child_changed", function(data) {
        console.log("child_changed", data.key, data.val());
    });
});

function nuevoUsuario(userId, nombre, foto, fecha, listo) {
    //default
    var newPostKey = firebase.database().ref().child('usuarios').push().key;
    return firebase.database().ref('usuarios/' + newPostKey).set({
        "nombre": "Gerson Clemente",
        "foto": "https://lh3.googleusercontent.com/-UI8vYio8jD4/AAAAAAAAAAI/AAAAAAAAAAA/kPF4DtNg6pk/s64-c/101746310403354218665.jpg",
        "fecha": "01/04/1013",
        "listo": false
    });
}

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
