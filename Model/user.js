var User = {

    AddUser: function (kullaniciadi, sifre, email) {
        return eklePromise = new Promise(
            function (resolve, reject) {
                databaseHandler.db.transaction(function (tx) {
                    tx.executeSql('SELECT * FROM UserTable WHERE kullaniciAdi=?', [kullaniciadi], function (islem, sonuc) {
                        console.log(sonuc);
                        if (kullaniciadi && sifre && email && sonuc.rows.length === 0) {
                            tx.executeSql("INSERT INTO UserTable (kullaniciAdi, sifre, email) VALUES (?,?,?)", [kullaniciadi, sifre, email], function (islem, sonuc) {
                                resolve(kullaniciadi + " " + sifre + " " + email); // fulfilled
                                console.log(sonuc);
                            }, function (islem, hata) {
                                console.log("Hata: ", hata);
                            });
                        }
                        else {
                            var reason = new Error("Girmiş olduğunuz kullanıcı adı veya e-mail kullanılmakta.");
                            reject(reason); // reject
                        }
                    }, function (islem, hata) {
                        console.log("Tablo Yok")
                        console.log("Hata: ", hata);
                    });
                });
            }
        );
    },

    CheckUser: function (userName) {
        return eklePromise = new Promise(
            function (resolve, reject) {
                databaseHandler.db.transaction(function (tx) {
                    tx.executeSql('SELECT * FROM UserTable WHERE kullaniciAdi=?', [userName], function (islem, sonuc) {
                        if (sonuc.rows.length > 0) {
                            resolve(sonuc);
                        }
                        else {
                            var reason = new Error("Böyle bir kullanıcı yok.");
                            reject(reason); // reject
                        }
                    }, function (islem, hata) {
                        console.log("Tablo Yok")
                        console.log("Hata: ", hata);
                    });
                });
            }
        );
    }

}