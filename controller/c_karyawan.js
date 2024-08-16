const m_karyawan = require('../model/m_karyawan')
const m_departemen = require('../model/m_departemen')
const m_agama = require('../model/m_agama')

module.exports = {
    index : async function (req, res) {
        //Ambil objek query string
        let dataView = {
            karyawan: await m_karyawan.get_semuaKaryawan(),
            message: req.query.msg
        }
        res.render('karyawan/index', dataView)
    },

    detail: async function (req, res) {
        //Ambil ID yang dikirim via URL
        //idk utk contain id, diubah jadi idk biar ga bingung
        let idk = req.params.id_karyawan;
    
        //Lalu dikirim ke proses data mysql
        let dataView = {
            pegawai: await m_karyawan.get_satuKaryawan(idk)
        }
        res.render('karyawan/detail', dataView)
    },

    hapus: async function (req, res) {
        //Ambil ID yang dikirim via URL
        try {
            let idk = req.params.id_karyawan;
    
            //Proses hapus data
            let hapus = await m_karyawan.hapus_satuKaryawan(idk)
    
            //Validation of successful delete
            if (hapus.affectedRows > 0) {
                res.redirect('/karyawan')
            }
        } catch (error) {
            throw error
        }
    },
    
    tambah: async function (req, res) {
        let dataView = {
            dept: await m_departemen.get_semuaDepartemen(),
            agm: await m_agama.get_semuaAgama(),
        }
        res.render('karyawan/form-tambah', dataView)
    },

    proses_insert: async function (req, res) {
        let dataView = {
            dept: await m_departemen.get_semuaDepartemen(),
            agm: await m_agama.get_semuaAgama(),
        }
        res.render('karyawan/form-tambah', dataView)
    },

    edit: async function (req, res) {
        let idk = req.params.id_karyawan;
    
        let dataView = {
            pegawai: await m_karyawan.get_satuKaryawan(idk),
            dept: await m_departemen.get_semuaDepartemen(),
            agm: await m_agama.get_semuaAgama(),
        }
        res.render('karyawan/form-edit', dataView)
    },

    proses_update: async function (req, res) {
        let idk = req.params.id_karyawan;
    
        try {
            let update = await m_karyawan.update_karyawan(req, idk)
            if (update.affectedRows > 0) {
                res.redirect(`/karyawan?msg=berhasil edit karyawan a/n ${req.body.form_namaLengkap}`)
            }
        } catch (error) {
            throw error
        }
    },

}