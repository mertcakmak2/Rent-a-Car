var Packet = {

    DeletePacket: function (index) {
        return eklePromise = new Promise(
            function (resolve, reject) {
                databaseHandler.db.transaction(function (tx) {
                    tx.executeSql('DELETE FROM PacketTable WHERE id = ?', [index], function (islem, sonuc) {
                        resolve(index);
                        console.log(sonuc);
                    }, function (islem, hata) {
                        console.log("Hata: ", hata);
                    });
                });

            });
    },

    PayPacket: function (username, krtno) {
        return odePromise = new Promise(function (resolve, reject) {
            if (krtno > 4) {
                databaseHandler.db.transaction(function (tx) {
                    tx.executeSql('DELETE FROM PacketTable WHERE username = ?', [username], function (islem, sonuc) {
                        resolve(username + " " + krtno)
                        console.log(sonuc);
                    }, function (islem, hata) {
                        console.log("Hata: ", hata);
                    });
                });
            }
            else {
                var reason = new Error("Lütfen Kart Numarasını Griniz.");
                reject(reason); // reject
            }
        })
    }
}