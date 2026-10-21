const fs = require('fs');

async function fetchMarketData() {
    const symbols = [
        "BBCA.JK", "BMRI.JK", "BBRI.JK", "BBNI.JK", "TLKM.JK", 
        "ASII.JK", "GOTO.JK", "ADRO.JK", "ANTM.JK", "ICBP.JK", "^JKSE"
    ];

    const url = `https://query1.finance.yahoo.com/v7/finance/quote?symbols=${symbols.join(',')}`;
    
    try {
        // Header browser lengkap untuk menembus proteksi 401 Unauthorized Yahoo Finance
        const response = await fetch(url, {
            headers: {
                "User-Agent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/124.0.0.0 Safari/537.36",
                "Accept": "text/html,application/xhtml+xml,application/xml;q=0.9,image/avif,image/webp,*/*;q=0.8",
                "Accept-Language": "en-US,en;q=0.5",
                "Referer": "https://finance.yahoo.com"
            }
        });
        
        if (!response.ok) throw new Error(`HTTP error! status: ${response.status}`);
        
        const data = await response.json();
        
        const output = {
            status: "success",
            lastUpdate: new Date().toISOString(),
            quoteResponse: data.quoteResponse || { result: [] }
        };

        fs.writeFileSync('market-data.json', JSON.stringify(output, null, 2));
        console.log("Data pasar berhasil diperbarui ke market-data.json");

    } catch (err) {
        console.error("Gagal mengambil data:", err);
        process.exit(1);
    }
}

fetchMarketData();
