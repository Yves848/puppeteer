const puppeteer = require("puppeteer");
const fs = require("fs");

async function asyncForEach(array, callback) {
    for (let index = 0; index < array.length; index++) {
        await callback(array[index], index, array);
    }
}

const tableCols = [
    "position",
    "points",
    "numero",
    "pilote",
    "pays",
    "team",
    "moto",
    "vitesse",
    "chrono"
]
    


const getMotoGP = async() => {
    console.log('getMotoGp')
    let data = await getPages();
    let results = [];
    console.log(data);
    await asyncForEach(data, async(element, index) => {
        //console.log(element.ref);
        let answer = await getResults(element.ref, index);
        results.push(answer);
    })
    console.log(results);
    

}

const getResults = async(url, index) => {
    const browser = await puppeteer.launch();
    const page = await browser.newPage();
    await page.goto(url, {
        waitUntil: "domcontentloaded"
    });
    let data = await page.evaluate((tableCols) => {
        let table = document.querySelector('div table');
        let rows = table.querySelectorAll('tr');
        let data = [];
        rows.forEach((row, irow) => {
            // for each row.....
            let cols = row.querySelectorAll('td');
            if (cols) {
                cols.forEach((col, icol) => {
                    data.push({ row: irow, col: tableCols[icol], cell: col.innerHTML });
                })
            }
        })

        return data;
    }, tableCols);
    await browser.close();
    return data;
}

const getPages = async() => {
    const browser = await puppeteer.launch();
    const page = await browser.newPage();
    page.on('console',consoleObj=> console.log(consoleObj.text()));
    await page.goto("https://www.motogp.com/fr/calendar", {
        waitUntil: "domcontentloaded"
    });
    console.log('getPages')
    let data = await page.evaluate(() => {
        let data = [];
        let elements = document.getElementsByClassName("event_buttons");
        
        for (var i = 0; i < elements.length; i++) {
            
            var element = elements[i];
            let a = element.querySelector("a");
            let classNames = element.classList;
            if (a)
                for (var i2 = 0, l = classNames.length; i2 < l; i2++) {
                    
                    if (/^ev_\d{1,2}$/.test(classNames[i2])) {
                        data.push({ class: classNames[i2], ref: a.href });
                        console.log({ class: classNames[i2], ref: a.href });
                    }
                }
        }  
        return data;
    });

    console.log('fini')

    //fs.writeFileSync('fichier3.html', data);
    await browser.close();
    return data;
};

getMotoGP();