function divhs() {
    return divhsPromise = new Promise(function (resolve, reject) {
        databaseHandler.db.transaction(function (tx) {
            var urlusername = window.location.search.substring(1);
            tx.executeSql('SELECT * FROM PAcketTable WHERE username=?', [urlusername], function (islem, sonuc) {
                console.log("Kayıtlar listeleniyor:")
                console.log(sonuc.rows);
                if (sonuc.rows.length > 0) {
                    resolve(urlusername + " " + sonuc.rows.length)
                }
                else {
                    var reason = new Error("Sepet Boş");
                    reject(reason); // reject
                }
            }, function (islem, hata) {
                console.log("Tabo Yok")
                console.log("Hata: ", hata);

            });
        });
    })
}

function kayitlariOku() {
    return kayitoku = new Promise(function (resolve, reject) {
        databaseHandler.db.transaction(function (tx) {
            tx.executeSql("SELECT * FROM  VehicleTable", [], function (islem, sonuc) {
                resolve(sonuc);
            }, function (islem, hata) {
                var reason = new Error(hata);
                reject(reason); // reject
            });
        });
    })
}

function sepetgoruntule() {
    return sepetgor = new Promise(function (resolve, reject) {
        databaseHandler.db.transaction(function (tx) {
            var urlusername = window.location.search.substring(1);
            tx.executeSql('SELECT * FROM PacketTable WHERE username=?', [urlusername], function (islem, sonuc) {
                resolve(sonuc);
            }, function (islem, hata) {
                var reason = new Error("eksik işlem");
                reject(reason); // reject
            });
        });
    })
}

