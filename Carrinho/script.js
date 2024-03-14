$(document).ready(function(){
    // Recupera o carrinho do armazenamento local
    const carrinho = JSON.parse(localStorage.getItem("carrinho")) || [];

    // Elemento da lista
    const listaElement = $("#lista");

    // Elemento de total
    const totalElement = $("#total");

    function exibirCarrinho() {
        listaElement.empty();

        // Variável para acumular o preço total
        let totalPreco = 0;

        // Alteração sobre os elementos do carrinho
        $.each(carrinho, function(index, item) {
            // Cria um elemento de lista para cada item
            const listItem = $("<li>").text(
                `${item.descricao} - Preço: R$ ${item.preco.toFixed(2)}`
            );

            const removeButton = $("<button>").text("❌").css("margin-left","10px").click(function(){
               removerItemDoCarrinho(index);
            });

            listItem.append(removeButton);
            listaElement.append(listItem);
            totalPreco += item.preco;

        });

        // Exibe o preço total
        totalElement.text(`Total: R$ ${totalPreco.toFixed(2)}`);
    }

    function removerItemDoCarrinho(index){
        carrinho.splice(index, 1);
        localStorage.setItem("carrinho", JSON.stringify(carrinho));
        exibirCarrinho();
    }

    exibirCarrinho();

    function gerarDocumento(){
        const listaElement = document.getElementById("lista");
        const totalElement = document.getElementById("total");

        const listaClone = listaElement.cloneNode(true);

        $(listaClone).find("button").remove();

        const listaHtml = listaClone.innerHTML;
        const totalHtml = totalElement.innerHTML;

        const conteudoHTML = `
            <html>
                <head>
                    <meta charset="UTF-8" />
                </head>
                <body>
                    <h1>PEDIDO CONFIRMADO</h1>
                    <h3>Agradecemos sua preferência</h3>
                    <br/>
                    ${listaHtml}
                    <br/><br/>
                    ${totalHtml}
                </body>
            </html>
        `;

        const blob = new Blob([conteudoHTML], { type: "application/msword" });
        const link = document.createElement("a");

        link.href = URL.createObjectURL(blob);
        link.download = "carrinho.doc";
        link.click();
        document.getElementById("pedidos").style.display = "block";
    }
});

function successClose(){
    document.getElementById("pedidos").style.display = "none";
}
