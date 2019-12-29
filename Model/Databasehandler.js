var databaseHandler = {
    db: null,
    createLoginDb: function () {
        this.db = window.openDatabase(
            "UserDb",
            "1.0",
            "Login Database",
            1000000);
        this.db.transaction(
            function (tx) {
                //-------------------->Uyeler Tablosu Oluşturuldu<---------------------//
                ///////////////////////////////////////////////////////////////////////
                tx.executeSql("create table if not exists UserTable (id INTEGER PRIMARY KEY, kullaniciAdi VARCHAR(128), sifre VARCHAR(15), email VARCHAR(128))",
                    [],
                    function (tx, results) { },
                    function (tx, error) {
                        console.log("Error while creating the table: " + error.message);
                    }
                );
            },
            function (error) {
                console.log("Transaction error: " + error.message);
            },
            function () {
                console.log("Create DB transaction completed successfully");
            }
        );

    },

    createHomeDb: function () {
        this.db = window.openDatabase(
            "HomepageDb",
            "1.0",
            "Homepage database",
            1000000);
        this.db.transaction(
            function (tx) {
                //-------------------->SepetList Tablosu Oluşturuldu<---------------------//
                ///////////////////////////////////////////////////////////////////////
                tx.executeSql("create table if not exists PacketTable (id INTEGER PRIMARY KEY, username VARCHAR(128), arabamarka VARCHAR(15), arabamodel VARCHAR(15), arabaucret VARCHAR(15))",
                    [],
                    function (tx, results) { },
                    function (tx, error) {
                        console.log("Error while creating the table: " + error.message);
                    }
                );
            },
            function (error) {
                console.log("Transaction error: " + error.message);
            },
            function () {
                console.log("Create DB transaction completed successfully");
            }
        );

        this.db.transaction(
            function (tx) {
                //-------------------->ArabalarList Tablosu Oluşturuldu<---------------------//
                ///////////////////////////////////////////////////////////////////////
                tx.executeSql("create table if not exists VehicleTable (id INTEGER PRIMARY KEY, ArabaMarkasi VARCHAR(128), ArabaModeli VARCHAR(512), kasa VARCHAR(15), vites VARCHAR(15), yakit VARCHAR(15), ucret VARCHAR(15), image VARCHAR(128), tarih DATETIME)",
                    [],
                    function (tx, results) { },
                    function (tx, error) {
                        console.log("Error while creating the table: " + error.message);
                    }
                );
            },
            function (error) {
                console.log("Transaction error: " + error.message);
            },
            function () {
                console.log("Create DB transaction completed successfully");
            }
        );

    }
}