const puppeteer = require('puppeteer');
async function scrapeProduct(url){
    const browser = await puppeteer.launch();
    const page = await browser.newPage();
    await page.goto(url);


    const [el] = await page.$x('/html/body/div[1]/div/div/main/div/div/div[1]/div[2]/div/div[2]/div[1]/p[1]');
    const txt = await el.getProperty('textContent');
    const totalCases = await txt.jsonValue();

    console.log(totalCases);
    
    const [el2] = await page.$x('/html/body/div[1]/div/div/main/div/div/div[1]/div[2]/div/div[2]/div[2]/p[1]');
    const txt2 = await el2.getProperty('textContent');
    const recovered = await txt2.jsonValue(); 
    
    console.log(recovered);

    const [el3] = await page.$x('/html/body/div[1]/div/div/main/div/div/div[1]/div[2]/div/div[2]/div[3]/p[1]');
    const txt3 = await el3.getProperty('textContent');
    const death = await txt3.jsonValue(); 
    
    console.log(death);


    browser.close();
    
}

scrapeProduct('https://www.coronatracker.com/country/philippines/');