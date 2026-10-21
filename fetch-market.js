const fs = require('fs');

async function fetchMarketData() {
    // Daftar simbol emiten utama Anda
    const symbols = [
        "BBCA.JK", "BMRI.JK", "BBRI.JK", "BBNI.JK", "TLKM.JK", 
        "ASII.JK", "GOTO.JK", "ADRO.JK", "ANTM.JK", "ICBP.JK", "^JKSE"
    ];

    const url = `https://query1.finance.yahoo.com/v7/finance/quote?symbols=${symbols.join(',')}`;
    
    try {
        const response = await fetch(url, {
            headers: {
                "User-Agent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/122.0.0.0 Safari/537.36"
            }
        });
        
        if (!response.ok) throw new Error(`HTTP error! status: ${response.status}`);
        
        const data = await response.json();
        
        // Bungkus hasil dengan format yang sama seperti struktur sebelumnya
        const output = {
            status: "success",
            lastUpdate: new Date().toISOString(),
            quoteResponse: data.quoteResponse || { result: [] }
        };

        // Simpan ke file JSON lokal di repo
        fs.writeFileSync('market-data.json', JSON.stringify(output, null, 2));
        console.log("Data pasar berhasil diperbarui ke market-data.json");

    } catch (err) {
        console.error("Gagal mengambil data:", err);
        process.exit(1);
    }
}

fetchMarketData();
