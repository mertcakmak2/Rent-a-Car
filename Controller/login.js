$(document).ready(function(){
    databaseHandler.createLoginDb();
})

function userAdd(){
    var kullaniciAdi = $("#kayitKulAdi").val();
    var sifre = $("#kayitSifre").val();
    var email = $("#kayitMail").val();

    User.AddUser(kullaniciAdi, sifre, email).then(function (fulfilled) {
        
        console.log(fulfilled);
        alert("Üye Olundu.")
        $("#kayitKulAdi").val("");
        $("#kayitSifre").val("");
        $("#kayitMail").val("");
    })
        .catch(function (error) {
            console.log(error.message);
            alert("Girmiş olduğunuz kullanıcı adı veya e-mail kullanılmakta.")
            $("#kayitKulAdi").val("");
            $("#kayitSifre").val("");
            $("#kayitMail").val("");
        });
};

function userCheck(){
    var kullaniciAdi = $("#kullaniciAdi").val();
    var sifre = $("#kullaniciSifre").val();
    
    User.CheckUser(kullaniciAdi).then(function (fulfilled) {
        
        console.log(fulfilled.rows);
        jQuery.each(fulfilled.rows, function (index, value) {
            if (kullaniciAdi == value.kullaniciAdi && sifre == value.sifre) {
                enterCall();
                window.location.href = "homepage.html?" + value.kullaniciAdi;
                localStorage.setItem("userName", value.kullaniciAdi);
                localStorage.setItem("userPassword", value.sifre);
            }
            else {
                alert("Yanlış kullanıcı adı yada şifre");
            }
        });
    })
        .catch(function (error) {
            console.log(error.message);
            alert(error.message);
        });
};

function local_Storage() {
    if (localStorage.getItem("userName") !== null) {
        $("#kullaniciAdi").val(localStorage.getItem("userName"));
        $("#kullaniciSifre").val(localStorage.getItem("userPassword"));
        alert("Hoşgeldin " + localStorage.getItem("userName"));
    }
}

function enter() {
    return new Promise(resolve => {
        setTimeout(() => {
            resolve('Giriş yapıldı.');
            //alert("Giriş Yapıldı.")
        }, 1000);
    });
}

async function enterCall() {
    alert("Giriş Yapılıyor.")
    var result = await enter();
    console.log(result);
    
}


