//acessando site Google
describe('template spec', () => {
  it('Testes busca no Google', () => {
    cy.viewport(1440,900);
    cy.visit('https://www.google.com');

//Criando massa teste
    var busca = {
      pesquisa: 'O que é Tecnologia da informação?',
   }

//Inserindo busca na pagina de pesquisa
      cy.get('.gLFyf[name="q"]').type(busca.pesquisa).type('{enter}');
  
//Aguardando resultados aparecerem
      cy.get('#search').should('be.visible');
      cy.wait(5000); // Aguarda 5 segundos

//Clicando em um link aleatório do resultado da busca
      cy.get('div#search div.g >div > div > div > div a').then($links => {
        //Verificando se encontrou algum link
        if ($links.length > 0) {
        //Obtendo índice aleatório para clicar em um link
        const randomIndex = Math.floor(Math.random() * $links.length);
        //Selecionando um link aleatório e clicando nele
        cy.wrap($links[randomIndex]).click({ force: true});  
        } else{ 
          throw new Error('Nenhum link encontrado nos resultados da pesquisa.');

        //Clicando no primeiro link do resultado de busca
        //cy.get('#search').find('a').first().click();

        }
        
      });

      //Aguardando a página carregar após o clique
      cy.url().should('include', busca.pesquisa);

  })
})