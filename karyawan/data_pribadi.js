let nama = "Audrey Etantyo"
let alamat = "Tangerang Selatan"

function biodata() {
    return `Biodata Karyawan:\n
    =============
    Nama: ${nama}\n
    Alamat: ${alamat}\n`
}

module.exports = {
    nama, alamat, cetakbio:biodata
}