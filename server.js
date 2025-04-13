const express = require('express');
const cors = require('cors');
const cheerio = require('cheerio');
const axios = require('axios');
const app = express();

// Initialize with your exact data arrays
const girlsVideos = [
"https://drive.google.com/uc?export=download&id=12PMfrf5d0ahx0e2fvfN4XB3G1hi7SusZ",
"https://drive.google.com/uc?export=download&id=12BOEV1OOgz464trZMHeoWv9YkW9L2TAj",
"https://drive.google.com/uc?export=download&id=127TkJBb_JGlQAnQZx-YUnPdrS44Zqbit",
"https://drive.google.com/uc?export=download&id=123TkMiNLbdM-slGRJH91n7644581N6iq",
"https://drive.google.com/uc?export=download&id=11yPbAh91wXOQKFlt8cgobtbhds6TVyaM",
"https://drive.google.com/uc?export=download&id=11v1OfIiPBQrcdZ7W1cbCi9c39EMcYKNa",
"https://drive.google.com/uc?export=download&id=11rRNHTGXtxaXzVBwwCskD32Plz36aURA",
"https://drive.google.com/uc?export=download&id=11j4jeDHyGYk9U9wYZwOsZ7kaqC_LaNuZ",
"https://drive.google.com/uc?export=download&id=11hHWOCEnXKt487BB3VGUyrDZUbEzFC1u",
"https://drive.google.com/uc?export=download&id=11bOEFD1tR0ghd5gtvi13tUH_Po5fP9Vd",
"https://drive.google.com/uc?export=download&id=11_QWypd1_xBAjQqhNPJVTztT8YfM0XUk",
"https://drive.google.com/uc?export=download&id=11XkBBzvie9NYLDv2in-zOkeRhD0KhPp2",
"https://drive.google.com/uc?export=download&id=11KTXSIphB5yAgTghH3A7rgYlA3Tsvj0Q",
"https://drive.google.com/uc?export=download&id=11GrORwj8XFCr3HMfz3-gDShU0Yg9VUj5",
"https://drive.google.com/uc?export=download&id=11794HSvw0YyK6ZlW2F4ZC26UMyZZYhz-",
"https://drive.google.com/uc?export=download&id=10nuCjUGGC8QNjBdp9-o0T8j4wS_5RuMe",
"https://drive.google.com/uc?export=download&id=10lkeOuBpk4skzXFSkiZgJEbzGoHh6X74",
"https://drive.google.com/uc?export=download&id=10YcDTSivgze6jKdrvIcwaT4m65GuQdJf",
"https://drive.google.com/uc?export=download&id=1D8FSQsPqAn3Q80oY5oMdn0yOwAT5oVjr",
"https://drive.google.com/uc?export=download&id=1D-LlD6vyDHosuiuqKm4tpTwMz8-peaaC",
"https://drive.google.com/uc?export=download&id=1Cyc_Qo_t-5m317wqVHF5zrhSrU5WVM9e",
"https://drive.google.com/uc?export=download&id=1Cx93Drug-dusS1fIPPtNXsmrnNC-SnLD",
"https://drive.google.com/uc?export=download&id=1CwN8Ss_95hfkrqj5vUJ2oBj66u0IwmRB",
"https://drive.google.com/uc?export=download&id=1Cw39gw1yVN4iywnC-4G00xAXBC42M_Ab",
"https://drive.google.com/uc?export=download&id=1CuMPm0ylZhjbHDITaR-NCMXhRBS2_4Bu",
"https://drive.google.com/uc?export=download&id=1CvFpG-dWCyZYI7rQXPjGLSKh3fJEN9tX",
"https://drive.google.com/uc?export=download&id=1Crv4pjlpJ49BaaxXHkXp3sPQIcyk4tK4",
"https://drive.google.com/uc?export=download&id=1CrSech99q-km4UrNhflRrq0ytszy_ztB",
"https://drive.google.com/uc?export=download&id=1CdQqUra1cvUvN4yZO0vtR5S13dPgo01P",
"https://drive.google.com/uc?export=download&id=1CVYU-TFnNDmNpy93EQVQujKzKmUyEywQ",
"https://drive.google.com/uc?export=download&id=1CTa3S4iXZ7mpxld5cGAA4O8XdZl9eyEU",
"https://drive.google.com/uc?export=download&id=1CJRt3KeFCt6wlKLz3cxXtbO4qrBleBAY",
"https://drive.google.com/uc?export=download&id=1CGqt-kHBjeWIPBoWpbgsXzqBE85qnWfB",
"https://drive.google.com/uc?export=download&id=1CDqdDkqzDLTJ1yrD_yd-1raBxHLs7xgg",
"https://drive.google.com/uc?export=download&id=1CCBaMRCfp5T4Q6PRRfUOPUgmrtMOpsv3",
"https://drive.google.com/uc?export=download&id=1C6wd2V-LYDxs-OPsY9igItetqtX2Aj2_",
"https://drive.google.com/uc?export=download&id=1C0lq8_4Mf8z_wYuJbQrmNLn_MVqQck-q",
"https://drive.google.com/uc?export=download&id=1BtS8FE1XNvZ6hoJATlVEB29XGj0-GtTu",
"https://drive.google.com/uc?export=download&id=16HuQeuPLsfMcXLITNOJSBVJewHmXk8Ru",
"https://drive.google.com/uc?export=download&id=16BJpSk2zk7Uy9DxLxbwFkEW9uDXsYzlB",
"https://drive.google.com/uc?export=download&id=17by8dS0pQY4d1tIJIsoaeAuRvATiGywY",
"https://drive.google.com/uc?export=download&id=16U0pk5Z1xSK1noxppaBSVoWABeLtu4RG",
"https://drive.google.com/uc?export=download&id=15mNY62pGLPq7W_Uly5IBi0dd9YHzWyWc",
"https://drive.google.com/uc?export=download&id=15PMxc-gznm4Ona3fZLPTs7Yj3kOfx0Wf",
"https://drive.google.com/uc?export=download&id=16I-YJcYmNOBHWath6Y86F44d7e_ofe7J",
"https://drive.google.com/uc?export=download&id=17Udy1YF9M0f6kVkTY_I2s_Lgy3iXheuj",
"https://drive.google.com/uc?export=download&id=16sM1E35-ua6qAKfSnnGlIAQQmb4bqgRD",
"https://drive.google.com/uc?export=download&id=15qhYDHsVznBZVyBniyNlECYovVnLgiBV",
"https://drive.google.com/uc?export=download&id=16Eg73csaToVbQ0lz_hDxk8L6sKjSLvgd",
"https://drive.google.com/uc?export=download&id=17zX7xULbhcYDtfjZwcSfb8esrAH8ePwY",
"https://drive.google.com/uc?export=download&id=17bx6rdpZo4SEiSeiMpI_asDXbazTBdTg",
"https://drive.google.com/uc?export=download&id=15uZpBBRBijJxYifQgsNtme13SvyiBvVj",
"https://drive.google.com/uc?export=download&id=16TeBkjBYYtT19mjBgmghIF4Ts8Rj2EaP",
"https://drive.google.com/uc?export=download&id=17mM28fnOWAybglrog-ZnAb-qLI9mqljX",
"https://drive.google.com/uc?export=download&id=16HTIuH9ReUiU6PvQ5150VjiXl5qRub_E",
"https://drive.google.com/uc?export=download&id=168IpCjTPNP97LCCJhOdf06OUTzbt1Dgn",
"https://drive.google.com/uc?export=download&id=172G7rebE1EiEbxk7WmUQTqEA-JhokpHY",
"https://drive.google.com/uc?export=download&id=17fFHNzH1pYhJGFLvpJA0K-ARht8twPFH",
"https://drive.google.com/uc?export=download&id=168KgKWLMVQRDPWtU0KKc09EFuhfXPmEg",
"https://drive.google.com/uc?export=download&id=16ogQkb5pU83btZxJuK6vEcK5Z1R8XEr3",
"https://drive.google.com/uc?export=download&id=17SQOC--BT2tYJOcLYHA6pLr9u0yRSBc5",
"https://drive.google.com/uc?export=download&id=170WOkxswt5Zi_JbUS3HL2Z9tdUco6llL",
"https://drive.google.com/uc?export=download&id=176b9bbWNc8Pk37c-gfn3RWV1V1ycXsuK",
"https://drive.google.com/uc?export=download&id=15YUyugeHbZGPOwPv_hNgbgLGyx11bMMa",
"https://drive.google.com/uc?export=download&id=16qxAxXFGXTSeI-yxroyAcK5J9C8xovbL",
"https://drive.google.com/uc?export=download&id=16_-J9PjHk5kw1Cn4QlJbCzRUM2GEF0H6",
"https://drive.google.com/uc?export=download&id=16matvWMeSMjePiue8zUtGKrjCzRLcYoO",
"https://drive.google.com/uc?export=download&id=16-9DhekS3frUC3nXL_gQ5ilP8-QdMjK7",
"https://drive.google.com/uc?export=download&id=16zI3y_YZhxkZdztOTlmmni08fFm3yY8r",
"https://drive.google.com/uc?export=download&id=17S9mhKKn4BCkc3fzeny3UFvRPrC39JRd",
"https://drive.google.com/uc?export=download&id=15DZnoyssXYUvG6VUrhOKQfkunOB3DDWZ",
"https://drive.google.com/uc?export=download&id=176e7iQND8XV_vyz7vA8dlZ3bdghVekDK",
"https://drive.google.com/uc?export=download&id=16fxEZu9t-8RuuTEB5HJtjQO_E4jfe66L",
"https://drive.google.com/uc?export=download&id=15l-YEUg-E_J9JlH73wZWN9FHeSTQwceX",
"https://drive.google.com/uc?export=download&id=17XeHrfGFeCRDNx7xFJT1NHlvtyEQmGU5",
"https://drive.google.com/uc?export=download&id=17LkXkBhUMFHOW5qFKfvXdJvNlZ24vDfz",
"https://drive.google.com/uc?export=download&id=15r55bWoRJpE7RT9rltPIT438gMIEnjB3",
"https://drive.google.com/uc?export=download&id=17r05O7YYrp213wv_X1AG3iOlWhbwpETr",
"https://drive.google.com/uc?export=download&id=1AZJ1Y7XFSzVPG7qntx3SV4i5AUw06QH6",
"https://drive.google.com/uc?export=download&id=1Ab9EOmObvaxZCuuGprctkWf523lGGq3C"
];

const boyPhotos = [
"https://i.postimg.cc/4yvhpb06/received-1000035335289031.jpg",
"https://i.postimg.cc/yYPZdjcB/received-1076227457871166.jpg",
"https://i.postimg.cc/6pF554jt/received-1096976655546360.jpg",
"https://i.postimg.cc/6pqyQXBL/received-1108081173922240.jpg",
"https://i.postimg.cc/0jvz5KNb/received-1119865316281654.jpg",
"https://i.postimg.cc/mkTrWxd9/received-1123030656212905.jpg",
"https://i.postimg.cc/sXY2LfJy/received-1153000679881446.jpg",
"https://i.postimg.cc/6qhy867z/received-1242955296818211.jpg",
"https://i.postimg.cc/BZ2DW4vj/received-1283969755983095.jpg",
"https://i.postimg.cc/yYYNfH34/received-1312212983338713.jpg",
"https://i.postimg.cc/k58MVMz8/received-1393992361976186.jpg",
"https://i.postimg.cc/qvNvTxG1/received-1785849285510599.jpg",
"https://i.postimg.cc/D05w2CDM/received-1799946257427867.jpg",
"https://i.postimg.cc/0y4rMBQg/received-1964384894082996.jpg",
"https://i.postimg.cc/wBStPG85/received-2032680760505220.jpg",
"https://i.postimg.cc/50LHMSbh/received-2050330285404640.jpg",
"https://i.postimg.cc/HL7nQ9cr/received-2533721230293696.jpg",
"https://i.postimg.cc/fbFXsbX9/received-3940621569492990.jpg",
"https://i.postimg.cc/CLY8SXZm/received-513095298559754.jpg",
"https://i.postimg.cc/PqNZ0DLH/received-599205826302160.jpg",
"https://i.postimg.cc/wT61SNPr/received-609170281483202.jpg",
"https://i.postimg.cc/02WyFB76/received-617691784002426.jpg",
"https://i.postimg.cc/ZRtRjvpV/received-621425926934975.jpg",
"https://i.postimg.cc/BZC6c66B/received-635385989061986.jpg",
"https://i.postimg.cc/y6hJQjf9/received-797407929244415.jpg",
"https://i.postimg.cc/Bnn11FBF/received-9403106483042299.jpg",
"https://i.postimg.cc/L6NJRXF8/received-946942543669754.jpg",
"https://i.postimg.cc/yNJgLz5Y/received-953833709584746.jpg",
"https://i.postimg.cc/y8p3hNLb/received-985550280059132.jpg",
"https://i.postimg.cc/5tk235Xc/received-1012712897542347.jpg",
"https://i.postimg.cc/gJCk9YyN/received-1013844850553335.jpg",
"https://i.postimg.cc/vBgHS1n4/received-589904230557414.jpg",
"https://i.postimg.cc/rpppxZFC/received-996290872406412.jpg",
"https://i.postimg.cc/Y9SL2tXP/FB-IMG-1738610205687.jpg",
"https://i.postimg.cc/cCgKYXGM/FB-IMG-1738610208103.jpg",
"https://i.postimg.cc/Y9yGhTZC/FB-IMG-1738610211217.jpg",
"https://i.postimg.cc/RCDKFnxL/FB-IMG-1738610213756.jpg",
"https://i.postimg.cc/sgFWPdXB/FB-IMG-1738610215865.jpg",
"https://i.postimg.cc/VkjCDGrK/FB-IMG-1738610217854.jpg",
"https://i.postimg.cc/0jbSn9DS/FB-IMG-1738610220358.jpg",
"https://i.postimg.cc/7LwTc3Sw/FB-IMG-1738610222536.jpg",
"https://i.postimg.cc/W48JPd7r/FB-IMG-1738610224744.jpg",
"https://i.postimg.cc/1RfvRqjy/FB-IMG-1738609069587.jpg",
"https://i.postimg.cc/1tTX9wVg/FB-IMG-1738609072962.jpg",
"https://i.postimg.cc/VkBRZBdW/FB-IMG-1738609076249.jpg",
"https://i.postimg.cc/4NcwVTGM/FB-IMG-1738609081758.jpg",
"https://i.postimg.cc/pT7Y5s6R/FB-IMG-1738609085468.jpg",
"https://i.postimg.cc/xd6PnfGk/FB-IMG-1738609089835.jpg",
"https://i.postimg.cc/sgyPWQwQ/FB-IMG-1738609093531.jpg",
"https://i.postimg.cc/RC6TxzWF/FB-IMG-1738609099897.jpg",
"https://i.postimg.cc/PfgQtFDM/FB-IMG-1738609254713.jpg",
"https://i.postimg.cc/T1DjVnzm/FB-IMG-1738609257843.jpg",
"https://i.postimg.cc/Kvtr4rrh/FB-IMG-1738609263634.jpg",
"https://i.postimg.cc/bvysLzjv/FB-IMG-1738609267656.jog",
"https://i.postimg.cc/bwHZQZWM/FB-IMG-1738609271789.jpg",
"https://i.postimg.cc/cJF6bVsB/FB-IMG-1738609618988.jpg",
"https://i.postimg.cc/5jWtzJ3b/FB-IMG-1738609622994.jpg",
"https://i.postimg.cc/VvC65vXK/FB-IMG-1738609626519.jpg",
"https://i.postimg.cc/85ssQtcQ/FB-IMG-1738609971878.jpg",
"https://i.postimg.cc/4xTP1FN3/FB-IMG-1738609975125.jpg",
"https://i.postimg.cc/wxZ01jCL/FB-IMG-1738609979383.jpg",
"https://i.postimg.cc/sX142kKT/FB-IMG-1738609982568.jpg",
"https://i.postimg.cc/g0zKCXhF/FB-IMG-1738609985991.jpg",
"https://i.postimg.cc/v8V5SLKx/FB-IMG-1738608639660.jpg",
"https://i.postimg.cc/WzgrFTZw/FB-IMG-1738608643522.jpg",
"https://i.postimg.cc/tCGF0n0S/FB-IMG-1738608647051.jpg",
"https://i.postimg.cc/QdX5CLdc/FB-IMG-1738608650477.jpg",
"https://i.postimg.cc/wT5L9xg6/FB-IMG-1738608654253.jpg",
"https://i.postimg.cc/BvbK5xD6/FB-IMG-1738608657729.jpg",
"https://i.postimg.cc/GmqDsM4V/FB-IMG-1738608661960.jpg"
];

// Memory tracking (no database needed)
const sentItems = {
  videos: [],
  photos: []
};

app.use(cors());

// root endpoint
app.get('/', (req, res) => {
  res.json({ message: 'Welcome-ShSn.s-Api' });
});

// Simplified endpoint handlers
app.get('/ShAn/girlsvideo', (req, res) => {
  const { videos } = sentItems;
  const available = girlsVideos.filter(url => !videos.includes(url));
  
  if (available.length === 0) {
    sentItems.videos = [];
    return res.json({ url: girlsVideos[0] });
  }

  const chosen = available[Math.floor(Math.random() * available.length)];
  sentItems.videos.push(chosen);
  res.json({ url: chosen });
});

app.get('/ShAn/dpboy', (req, res) => {
  const { photos } = sentItems;
  const available = boyPhotos.filter(url => !photos.includes(url));
  
  if (available.length === 0) {
    sentItems.photos = [];
    return res.json({ url: boyPhotos[0] });
  }

  const chosen = available[Math.floor(Math.random() * available.length)];
  sentItems.photos.push(chosen);
  res.json({ url: chosen });
});

// Start server
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`API running on port ${PORT}`));
