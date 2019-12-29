var Vehicle = {
   
    AddCar: function (ArabaMarkasi, ArabaModeli, kasa, vites, yakit, ucret, image) {
        return eklePromise = new Promise(
            function (resolve, reject) {
                if (ArabaMarkasi && ArabaModeli && kasa && vites && yakit && ucret) {
                    databaseHandler.db.transaction(function (tx) {
                        tx.executeSql("INSERT INTO VehicleTable (ArabaMarkasi, ArabaModeli, kasa, vites, yakit, ucret, image, tarih) VALUES(?,?,?,?,?,?,?,?) ", [ArabaMarkasi, ArabaModeli, kasa, vites, yakit, ucret, image, new Date().getTime()], function (islem, sonuc) {
                            resolve(ArabaMarkasi + " " + ucret);
                            console.log(sonuc);
                        }, function (islem, hata) {
                            console.log("Tablo Yok")
                            console.log("Hata: ", hata);
                        });
                    });
                }
                else {
                    var reason = new Error("Eksik bilgi");
                    reject(reason); // reject
                }
            }
        );
    },

    UpdateCar: function (index, ArabaMarkasi, ArabaModeli, kasa, vites, yakit, ucret) {
        return eklePromise = new Promise(
            function (resolve, reject) {
                if (ArabaMarkasi && ArabaModeli && kasa && vites && yakit && ucret) {
                    databaseHandler.db.transaction(function (tx) {
                        tx.executeSql('UPDATE VehicleTable SET ArabaMarkasi=?, ArabaModeli=?, kasa=?, vites=?, yakit=?, ucret=?, tarih=? WHERE id=?', [ArabaMarkasi, ArabaModeli, kasa, vites, yakit, ucret, new Date().getTime(), index], function (islem, sonuc) {
                            resolve(index);
                            console.log(sonuc);
                        }, function (islem, hata) {
                            console.log("Hata: ", hata);
                        });
                    });
                }
                else {
                    var reason = new Error("Hatalı işlem");
                    reject(reason); // reject
                }
            }
        );
    },

    DeleteCar: function (index) {
        return eklePromise = new Promise(
            function (resolve, reject) {
                databaseHandler.db.transaction(function (tx) {
                    tx.executeSql('DELETE FROM VehicleTable WHERE id = ?', [index], function (islem, sonuc) {
                        resolve(index);
                        console.log(sonuc);
                    }, function (islem, hata) {
                        console.log("Hata: ", hata);
                    });
                });

            });
    },

    HireCar: function (index, username, ArabaMarkasi, ArabaModeli, ucret) {
        return kiralaPromise = new Promise(function (resolve, reject) {
            databaseHandler.db.transaction(function (tx) {
                if (index && username && ArabaMarkasi && ArabaModeli && ucret) {
                    tx.executeSql('INSERT INTO PacketTable (username, arabamarka, arabamodel, arabaucret) VALUES (?,?,?,?)', [username, ArabaMarkasi, ArabaModeli, ucret], function (islem, sonuc) {
                        resolve(username + " " + index)
                        console.log(sonuc);
                    }, function (islem, hata) {
                        console.log("Hata: ", hata);
                    });
                }
                else {
                    var reason = new Error("Hatalı işlem");
                    reject(reason); // reject
                }
            }, islemHatali, islemBasarili);
            function islemHatali(e) {
                console.log("İşlem hatası ! Kod:" + e.code + " Mesaj : " + e.message);
            }
            function islemBasarili() {
                console.log("İşlem başarılı bir şekilde gerçekleştirildi!");
            }
        });
    }


}