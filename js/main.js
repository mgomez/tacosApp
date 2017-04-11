var Usuarios;
$(function() {
    var tacosDB = firebase.database().ref('/usuarios');

    tacosDB.on('value', function(data) {
        var usuarios = data.val();
        $.get("views/_tbTacos.html", function(template) {
            $("#rolTable-content").handlebars(template, usuarios);
            Usuarios = usuarios;
        });
    });

    //$(document).on("click", ".avatar", function() {
    //var id = $(this).data("id");
    //var usuario = $.Enumerable.From(Usuarios).Where(function(el) {
    //return el.Value.id === id;
    //}).FirstOrDefault();
    //console.log(usuario);
    //$.get("views/Usuario.html", function(template) {
    //$("#tacoContainer").handlebars(template, usuario.Value);
    //});
    //navigator.vibrate(100);
    //});
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
    document.addEventListener("offline", onOffline, false);
    document.addEventListener("online", onOnline, false);
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

    $(document).on("click", ".avatar", function() {
        var $avatar = $(this);
        var idfb = $avatar.data("idfb");
        getPicture({
            config: config,
            onSuccess: function(imageData) {
                var img = "data:image/jpeg;base64," + imageData;
                $avatar.find(".avatar-img").attr("src", img);
                firebase.database().ref('usuarios/' + idfb).update({
                    "foto": img
                });
            },
            onFail: function(message) {
                alert("ERROR: " + message);
            }
        });
    });

    function getPicture(d) {
        navigator.camera.getPicture(d.onSuccess, d.onFail, d.config);
    }

    function onOffline() {
        $("#estatus").text("buuu!");
    }

    function onOnline() {
        $("#estatus").text("eaaaa!, arre");
    }
}
