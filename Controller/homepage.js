$(document).ready(function () {
    console.log("anasayfa ready");
    databaseHandler.createHomeDb();
    kayitview();
    sepetView();
});
var dosyaName = "";
var resimyolu = "C:\\Users\\User\\Desktop\\Rent-A-Car\\css\\img\\";

function CarAdd(){
    var ArabaMarkasi = $("#notMarka").val();
    var ArabaModeli = $("#notModel").val();
    var kasa = $("#notKasa").val();
    var vites = $("#notVites").val();
    var yakit = $("#notYakit").val();
    var ucret = $("#notUcreti").val();
    var image = resimyolu + dosyaName;

    Vehicle.AddCar(ArabaMarkasi, ArabaModeli, kasa, vites, yakit, ucret, image).then(function (fulfilled) {
        kayitview();
        console.log(fulfilled);
    })
        .catch(function (error) {
            alert("Alanları doldurunuz.")
            console.log(error.message);
        })
}

function CarUpdate(index){
    var ArabaMarkasi = $("#marka" + index).val();
    var ArabaModeli = $("#model" + index).val();
    var kasa = $("#kasa" + index).val();
    var vites = $("#vites" + index).val();
    var yakit = $("#yakit" + index).val();
    var ucret = $("#ucret" + index).val();
   
    Vehicle.UpdateCar(index, ArabaMarkasi, ArabaModeli, kasa, vites, yakit, ucret).then(function (fulfilled) {
        kayitview();
        console.log("index: " + fulfilled);
        console.log('Kayıt güncellendi.');
    })
        .catch(function (error) {
            console.log(error.message);
        })
}

function CarDelete(index){

    Vehicle.DeleteCar(index).then(function (fulfilled) {
        kayitview();
        console.log(fulfilled);
        console.log('Kayıt silindi.');
    })
}

function CarHire(index){
    var username = window.location.search.substring(1);
    var ArabaMarkasi = $("#marka" + index).val();
    var ArabaModeli = $("#model" + index).val();
    var ucret = $("#ucret" + index).val();

    Vehicle.HireCar(index, username, ArabaMarkasi, ArabaModeli, ucret).then(function (fulfilled) {
        sepetView();
        console.log(fulfilled);
        console.log('Sepete Eklendi');
    })
        .catch(function (error) {
            alert("Arac Kiralanamadı.")
            console.log(error.message);
        })
}

function DeletePacket(index){
    Packet.DeletePacket(index).then(function (fulfilled) {
        sepetView();
        console.log(fulfilled);
        console.log('Kayıt silindi.');
    })
}

function PacketPay(){
    var username = window.location.search.substring(1);
    var kartnumarasi = $("#kartno").val();
    var krtno = kartnumarasi.length;

    Packet.PayPacket(username, krtno).then(function (fulfilled) {
        sepetView();
        console.log(fulfilled);
        alert('Ödeme Yapıldı.\nKart numarası: ' + kartnumarasi);
        console.log('Kayıt silindi.');
        $("#kartno").val("");
    })
        .catch(function (error) {
            alert(error.message);
        })
}

var kayitview = function () {
    kayitlariOku().then(function (fulfilled) {
        console.log("Kayıtlar listeleniyor:")
        console.log(fulfilled.rows);
        // TABLO SIFIRLANIYOR, SIFIRLANMAZSA PEŞİNE EKLER
        $("#tablo").empty();
        jQuery.each(fulfilled.rows, function (index, value) {
            $("#tablo").append(
                "<tr>" +
                "<td>" + value.id + "</td>" +
                "<td><input type='text' id='marka" + value.id + "' value='" + value.ArabaMarkasi + "' /></td>" +
                "<td><input type='text' id='model" + value.id + "' value='" + value.ArabaModeli + "'/></td>" +
                "<td><input type='text' id='kasa" + value.id + "' value='" + value.kasa + "' /></td>" +
                "<td><input type='text' id='vites" + value.id + "' value='" + value.vites + "' /></td>" +
                "<td><input type='text' id='yakit" + value.id + "' value='" + value.yakit + "' /></td>" +
                "<td><input type='text' id='ucret" + value.id + "' value='" + value.ucret + "'/></td>" +
                "<td><img src='" + value.image + "'  height='" + "100" + "' id='image" + value.id + "'</td>" +
                "<td>" + new Date(value.tarih).toLocaleString() + "</td>" +
                "<td><button type='button' onclick='CarUpdate(" + value.id + ")' data-index='" + value.id + "' class='guncelle btn btn-light'>Güncelle</button>&nbsp&nbsp<button type='button' onclick='CarDelete(" + value.id + ")' data-index='" + value.id + "' class='sil btn btn-light' >Sil</button>&nbsp&nbsp<button type='button' onclick='CarHire(" + value.id + ")' data-index='" + value.id + "' class='kirala btn btn-light' >Kirala</button></td>" +
                "</tr>");
            $("#notMarka").val("");
            $("#notModel").val("");
            $("#notKasa").val("");
            $("#notVites").val("");
            $("#notYakit").val("");
            $("#notUcreti").val("");
        })
    })
        .catch(function (error) {
            alert(error.message);
        })
}

var sepetView = function () {
    sepetgoruntule().then(function (fulfilled) {
        console.log("Kayıtlar listeleniyor:")
        console.log(fulfilled.rows);
        console.log(fulfilled.rows.length)
        divDurum();
        $("#tablosepet").empty();
        jQuery.each(fulfilled.rows, function (index, value) {
            if (fulfilled.rows.length > 0)
                $("#tablosepet").append(
                    "<tr>" +
                    "<td><input type='text' id='usernamee" + value.id + "' value='" + value.username + "' disabled/></td>" +
                    "<td><input type='text' id='sepetmarka" + value.id + "' value='" + value.arabamarka + "' disabled/></td>" +
                    "<td><input type='text' id='sepetmodel" + value.id + "' value='" + value.arabamodel + "' disabled/></td>" +
                    "<td><input type='text' id='sepetucret" + value.id + "' value='" + value.arabaucret + "' disabled/></td>" +
                    "<td><button type='button' onclick='DeletePacket(" + value.id + ")' data-index='" + value.id + "' class='urunsil btn btn-light' >Sil</button></td>" +
                    "</tr>");
        });
    })
        .catch(function (error) {
            alert(error.message);
        })
}

var divDurum = function () {
    divhs().then(function (fulfilled) {
        $("#kartdiv").show();
        $("#sepetpop").show();
        $("#uyari").hide();
        $("#odebtn").prop('disabled', false);
        console.log(fulfilled);
    })
        .catch(function (error) {
            $("#kartdiv").hide();
            $("#sepetpop").hide();
            $("#uyari").show();
            $("#odebtn").prop('disabled', true);
            console.log(error.message);
        })
}

function dosyaOnizle() {
    var resim = document.querySelector('img');
    var dosyaSecici = document.querySelector('input[type=file]').files[0];
    var dosyaOkuyucu = new FileReader();
    this.dosyaName = dosyaSecici.name;
    dosyaOkuyucu.onloadend = function () {
        resim.src = dosyaOkuyucu.result;
    }
    if (dosyaSecici) {
        dosyaOkuyucu.readAsDataURL(dosyaSecici);
    } else {
        resim.src = "";
    }
}

function openForm() {
    document.getElementById("myForm").style.display = "block";
}
function closeForm() {
    document.getElementById("myForm").style.display = "none";
}
