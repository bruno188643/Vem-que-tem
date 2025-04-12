// Vem Que Tem - Integração com Amazon, Mercado Livre e Avaliações

import React, { useState, useEffect } from "react"; import { Card, CardContent } from "@/components/ui/card"; import { Button } from "@/components/ui/button";

// Simulação Amazon async function buscarProdutosAmazon(termo) { return [ { nome: Produto Amazon: ${termo}, imagem: "/produto-amazon.jpg", categoria: "eletrônicos", lojas: [ { nome: "Amazon", preco: "R$189,99", link: "https://amzn.to/simulacao" }, ], avaliacoes: [ { usuario: "Maria", nota: 5, comentario: "Produto excelente!" }, { usuario: "Carlos", nota: 4, comentario: "Gostei, mas o frete demorou." } ] }, ]; }

// Integração real com Mercado Livre async function buscarProdutosMercadoLivre(termo) { const response = await fetch(https://api.mercadolibre.com/sites/MLB/search?q=${termo}); const data = await response.json(); return data.results.slice(0, 5).map(item => ({ nome: item.title, imagem: item.thumbnail, categoria: "eletrônicos", lojas: [ { nome: "Mercado Livre", preco: R$${item.price.toFixed(2)}, link: item.permalink } ], avaliacoes: [ { usuario: "João", nota: 5, comentario: "Chegou muito rápido!" }, ] })); }

export default function HomePage() { const [categoriaFiltro, setCategoriaFiltro] = useState("todos"); const [lojaFiltro, setLojaFiltro] = useState("todas"); const [produtosDestaque, setProdutosDestaque] = useState([]); const [comentarios, setComentarios] = useState({});

const categorias = ["todos", "moda", "eletrônicos", "beleza", "casa"]; const lojas = ["todas", "Amazon", "Shopee", "AliExpress", "Mercado Livre"];

useEffect(() => { async function carregarProdutos() { const produtosAmazon = await buscarProdutosAmazon("smartphone"); const produtosML = await buscarProdutosMercadoLivre("smartphone");

setProdutosDestaque([
    ...produtosAmazon,
    ...produtosML,
    {
      nome: "Tênis Nike Revolution",
      imagem: "/nike-shoe.jpg",
      categoria: "moda",
      destaque: true,
      maisVendido: true,
      lojas: [
        { nome: "Amazon", preco: "R$259,00", link: "#" },
        { nome: "Shopee", preco: "R$229,90", link: "#" },
        { nome: "AliExpress", preco: "R$199,00", link: "#" },
        { nome: "Mercado Livre", preco: "R$239,00", link: "#" },
      ],
      avaliacoes: [
        { usuario: "Ana", nota: 4, comentario: "Muito confortável!" },
      ]
    },
  ]);
}
carregarProdutos();

}, []);

const handleEnviarComentario = (produtoIndex, comentario, nota) => { setProdutosDestaque((prev) => { const atualizados = [...prev]; atualizados[produtoIndex].avaliacoes.push({ usuario: "Você", nota, comentario }); return atualizados; }); };

const produtosFiltrados = produtosDestaque.filter((p) => { const categoriaMatch = categoriaFiltro === "todos" || p.categoria === categoriaFiltro; const lojaMatch = lojaFiltro === "todas" || p.lojas.some((l) => l.nome === lojaFiltro); return categoriaMatch && lojaMatch; });

return ( <main className="bg-gradient-to-br from-pink-600 via-blue-600 to-purple-700 min-h-screen text-white p-4"> <h1 className="text-4xl font-bold text-center mb-6">Vem Que Tem</h1>

<div className="flex flex-wrap gap-4 justify-center mb-8">
    <select className="p-2 rounded-lg text-black" value={categoriaFiltro} onChange={(e) => setCategoriaFiltro(e.target.value)}>
      {categorias.map((cat) => <option key={cat} value={cat}>{cat.toUpperCase()}</option>)}
    </select>

    <select className="p-2 rounded-lg text-black" value={lojaFiltro} onChange={(e) => setLojaFiltro(e.target.value)}>
      {lojas.map((l) => <option key={l} value={l}>{l.toUpperCase()}</option>)}
    </select>
  </div>

  <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
    {produtosFiltrados.map((produto, index) => (
      <Card key={index} className="bg-white text-black rounded-2xl shadow-lg">
        <CardContent className="p-4">
          <img src={produto.imagem} alt={produto.nome} className="rounded-xl w-full h-48 object-cover mb-4" />
          <h2 className="text-xl font-semibold mb-2">{produto.nome}</h2>
          <div className="space-y-2 mb-4">
            {produto.lojas.map((loja, idx) => (
              <div key={idx} className="flex justify-between items-center bg-gray-100 p-2 rounded-lg">
                <span className="font-medium">{loja.nome}</span>
                <span>{loja.preco}</span>
                <Button className="bg-blue-600 text-white hover:bg-blue-700" onClick={() => window.open(loja.link, "_blank")}>Ver</Button>
              </div>
            ))}
          </div>
          <div className="mt-4">
            <h3 className="font-bold mb-2">Avaliações:</h3>
            {produto.avaliacoes.map((a, i) => (
              <div key={i} className="text-sm bg-gray-100 p-2 mb-1 rounded">
                <strong>{a.usuario}</strong>: {a.comentario} <span className="text-yellow-500">({"★".repeat(a.nota)})</span>
              </div>
            ))}
            <div className="mt-2">
              <textarea className="w-full p-2 rounded border mb-2 text-black" rows="2" placeholder="Deixe seu comentário..." onChange={(e) => comentarios[index] = e.target.value} />
              <select className="w-full p-2 mb-2 rounded text-black" onChange={(e) => comentarios[`nota_${index}`] = e.target.value}>
                <option value="5">5 estrelas</option>
                <option value="4">4 estrelas</option>
                <option value="3">3 estrelas</option>
                <option value="2">2 estrelas</option>
                <option value="1">1 estrela</option>
              </select>
              <Button className="w-full bg-green-600 hover:bg-green-700 text-white" onClick={() => handleEnviarComentario(index, comentarios[index] || "Ótimo produto!", parseInt(comentarios[`nota_${index}`] || 5))}>Enviar Avaliação</Button>
            </div>
          </div>
        </CardContent>
      </Card>
    ))}
  </div>
</main>

); }


