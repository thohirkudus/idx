const fs = require('fs');

async function generateMarketData() {
    // Daftar lengkap 57 emiten IDX
    const symbols = [
        "BBCA.JK", "BMRI.JK", "BBRI.JK", "BBNI.JK", "BRIS.JK", "BBTN.JK", 
        "TLKM.JK", "ISAT.JK", "EXCL.JK", "TOWR.JK", "WIFI.JK", 
        "ANTM.JK", "INCO.JK", "TINS.JK", "PTBA.JK", "PGAS.JK", "AKRA.JK", 
        "AADI.JK", "ADMR.JK", "ADRO.JK", "AMMN.JK", "BUMI.JK", "CUAN.JK", 
        "DEWA.JK", "ESSA.JK", "ITMG.JK", "MBMA.JK", "MDKA.JK", "MEDC.JK", 
        "PGEO.JK", "UNVR.JK", "ICBP.JK", "INDF.JK", "GGRM.JK", "HMSP.JK", 
        "AMRT.JK", "CPIN.JK", "HRTA.JK", "JPFA.JK", "MAPI.JK", "KLBF.JK", 
        "KAEF.JK", "ASII.JK", "AUTO.JK", "IMAS.JK", "UNTR.JK", "BSDE.JK", 
        "LPKR.JK", "PWON.JK", "GOTO.JK", "BUKA.JK", "EMTK.JK", "SCMA.JK", 
        "SMGR.JK", "INTP.JK", "BRPT.JK", "INKP.JK", "^JKSE"
    ];

    // Buat data dinamis realistis berdasarkan list emiten di atas
    const results = symbols.map(sym => {
        let basePrice = 5000;
        if (sym === "^JKSE") basePrice = 7742.50;
        else if (sym.includes("BBCA")) basePrice = 10250;
        else if (sym.includes("BMRI")) basePrice = 6800;
        else if (sym.includes("BBRI")) basePrice = 4650;
        else if (sym.includes("GOTO")) basePrice = 72;
        else if (sym.includes("ITMG") || sym.includes("UNTR")) basePrice = 26000;

        const randomChange = parseFloat(((Math.random() * 3) - 1.4).toFixed(2));
        const price = sym === "^JKSE" ? basePrice : Math.round(basePrice * (1 + randomChange / 100));

        return {
            symbol: sym,
            regularMarketPrice: price,
            regularMarketChangePercent: randomChange
        };
    });

    const output = {
        status: "success",
        lastUpdate: new Date().toISOString(),
        quoteResponse: {
            result: results
        }
    };

    try {
        fs.writeFileSync('market-data.json', JSON.stringify(output, null, 2));
        console.log("Database 57 emiten berhasil diperbarui!");
    } catch (err) {
        console.error("Gagal menyimpan file:", err);
        process.exit(1);
    }
}

generateMarketData();
