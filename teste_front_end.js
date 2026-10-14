const {Builder, By, Key, until} = require('selenium-webdriver');

async function iniciarTestes(){
    let driver = await new Builder().forBrowser('chrome').build();
    try {
        console.log("Iniciando testes automatizados ...");
        await driver.get('http://127.0.0.1:5500/index.html?#');
        await driver.manage().window().maximize();
        try {
            let botaoCookie = await driver.wait(until.elementLocated(By.css('.dp-bar-button, #btn-aceite-cookies')), 5000);
            await botaoCookie.click();
            console.log("--> Sucesso: Banner de cookies fechado.");
            await driver.sleep(1000);
        } catch (erro) {
            console.log("--> Aviso: O banner de coockies não apareceu.");
        }
        console.log("\\n=== Iniciando Teste 02: Menu Entre===");
        let entre = await driver.wait(until.elementLocated(By.linkText('Entre')), 5000);
        entre.click();
        await driver.sleep(2000);
        console.log("--> Sucesso: Página de Unidade acessada.");
        await driver.navigate().back();

        console.log("\n=== Iniciando Teste 03: Busca de Produtos===");
        let buscarProduto = await driver.wait(until.elementLocated(By.id('pesquisa')), 5000);
        await driver.executeScript("arguments[0].scrollIntoView(true);", buscarProduto);
        await buscarProduto.sendKeys('Controle', Key.RETURN);
        await driver.wait(until.urlContains('pesquisa'), 5000);
        console.log("--> Sucesso: Pesquisa realizada.");
        let adicionarAoCarrinho= await driver.wait(until.elementLocated(By.id('adicionarAoCarrinho')), 5000);
        await adicionarAoCarrinho.click();
        console.log(" --> Sucesso o click funcionou.")

        await driver.get('http://127.0.0.1:5500/index.html?#');
        let urlAtual = await driver.getCurrentUrl();
        if(urlAtual.includes('http://127.0.0.1:5500/index.html?#')){
            console.log("--> Atenção: Continuamos no site.");
        } else {
            console.log("--> Sucesso: Redirecionado para a Home do Game Mania.");
        }
     
    } catch (erro) {
        console.error("!!! OCORREU UM ERRO NO TESTE !!!")
        console.error("Motivo do erro: ", erro);
    } finally {
        console.log("\nTestes concoluidos. Finalizando o navegador.");
        await driver.sleep(3000);
        await driver.quit();
    }
}
iniciarTestes();