const db = require('../config/database')

module.exports = {

    //Proses pengambilan data dari mySql
    get_semuaKaryawan: function () {
        return new Promise((resolve, reject) => {
            db.query("SELECT * FROM karyawan", function (errorSql, hasil) {
                if (errorSql) {
                    reject(errorSql)
                } else {
                    resolve(hasil)
                }
            })
        })
    },

    get_satuKaryawan: function (idk) {
        let sql =
            `SELECT
karyawan.*,
departemen.kode AS kodeDept,
departemen.nama AS namaDept,
agama.nama as namaAgama
FROM karyawan
LEFT JOIN departemen ON departemen.id = karyawan.departemen_id
LEFT JOIN agama ON agama.id = karyawan.agama_id
where karyawan.id = ?`;

        return new Promise((resolve, reject) => {
            db.query(sql, [idk], function (errorSql, hasil) {
                if (errorSql) {
                    reject(errorSql)
                } else {
                    resolve(hasil)
                }
            })
        })
    },

    //WORKS BUT NOT IDEAL
    // function insert_karyawan(body) {
    //     let sql =
    //         `INSERT INTO karyawan
    //         (nama, gender, alamat, nip)
    //         VALUES
    //         ('${body.form_namaLengkap}', '${body.form_gender}', '${body.form_alamat}', '${body.form_nip}')`

    //         return new Promise((resolve, reject) => {
    //         db.query(sql, [], function (errorSql, hasil) {
    //             if (errorSql) {
    //                 reject(errorSql)
    //             } else {
    //                 resolve(hasil)
    //             }
    //         })
    //     })
    // }

    //Safer way
    insert_karyawan: function (req) {
        let data = {
            nama: req.body.form_namaLengkap,
            gender: req.body.form_gender,
            alamat: req.body.form_alamat,
            nip: req.body.form_nip,
            departemen_id: req.body.form_departemen,
            agama_id: req.body.form_agama
        }

        let sql = `INSERT INTO karyawan SET ?`

        return new Promise((resolve, reject) => {
            db.query(sql, [data], function (errorSql, hasil) {
                if (errorSql) {
                    reject(errorSql)
                } else {
                    resolve(hasil)
                }
            })
        })
    },

    hapus_satuKaryawan: function (idk) {
        let sql =
            `DELETE FROM karyawan
where karyawan.id = ?`;

        return new Promise((resolve, reject) => {
            db.query(sql, [idk], function (errorSql, hasil) {
                if (errorSql) {
                    reject(errorSql)
                } else {
                    resolve(hasil)
                }
            })
        })
    },

    update_karyawan: function (req, idk) {
        let data = {
            nama: req.body.form_namaLengkap,
            gender: req.body.form_gender,
            alamat: req.body.form_alamat,
            nip: req.body.form_nip,
            departemen_id: req.body.form_departemen,
            agama_id: req.body.form_agama
        }
        // 'data' as the first array (according to order) is added to the first ? below. Then, 'idk'  is added to the second ?
        let sql = `UPDATE karyawan SET ? WHERE id = ?`

        return new Promise((resolve, reject) => {
            db.query(sql, [data, idk], function (errorSql, hasil) {
                if (errorSql) {
                    reject(errorSql)
                } else {
                    resolve(hasil)
                }
            })
        })
    }
}