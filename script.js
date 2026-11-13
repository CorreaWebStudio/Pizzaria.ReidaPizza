// Menu mobile (hamburguer)
const header = document.querySelector('header');
const menuToggle = document.querySelector('.menu-toggle');
 
if (menuToggle && header) {
  menuToggle.addEventListener('click', () => {
    header.classList.toggle('nav-open');
  });
 
  // Fecha o menu ao clicar em um link
  document.querySelectorAll('.navlinks a').forEach(link => {
    link.addEventListener('click', () => header.classList.remove('nav-open'));
  });
}
 
/* =====================================================
   PEDIDO
   ===================================================== */
 
// ---- CONFIGURAÇÃO ----------------------------------
const WHATSAPP_NUMBER = '5545998377534';
 
// Se você tiver um sistema/servidor que receba pedidos, coloque aqui a URL.
// O site envia um POST com o pedido em JSON (formato descrito em buildPayload).
// Para a planilha do Google, cole aqui a URL do "app da web" (veja apps-script.gs).
// Deixe vazio ('') para enviar somente pelo WhatsApp.
const ORDER_ENDPOINT = 'https://script.google.com/macros/s/AKfycbyIrIeB5zizi_2dpm0KLcU_LwPmmKpuIA7pG6yW_GTjTdE5P0zgAXn09DZ6SU5AEQGfLw/exec';
 
// Taxa de entrega (em reais), mostrada como aviso quando o cliente escolhe "Entrega".
const DELIVERY_FEE = 10;

// Tempo estimado de entrega, mostrado junto da taxa. Mude o texto quando quiser.
const DELIVERY_TIME = '40 a 60 min';

// ---- PIX ----
// Sua chave Pix (CPF, CNPJ, e-mail, telefone no formato +5545999999999 ou chave aleatória).
// Enquanto estiver vazio, o QR Code não aparece e o cliente é avisado de que a chave vai pelo WhatsApp.
const PIX_KEY = '69754063000130';
const PIX_MERCHANT_NAME = 'Rei da Pizza';   // nome que aparece no banco (até 25 letras)
const PIX_MERCHANT_CITY = 'Medianeira';     // cidade (até 15 letras)

// Abre o WhatsApp com o pedido pronto depois de enviar?
const SEND_TO_WHATSAPP = true;
 
// Sabores e preços por tamanho. O preço do cardápio foi usado no tamanho G.
const PIZZAS = [
  { name: 'TRADICIONAL'},
  { id: '4_queijo',      name: '4 Queijo',              desc: 'Molho, mussarela, provolone, parmesão, catupiry e orégano',                            price: { P: 50, M: 59.90, G: 75 } },
  { id: '5_queijo',      name: '5 Queijo',              desc: 'Molho, mussarela, provolone, parmesão, catupiry, cheddar e orégano',                   price: { P: 50, M: 59.90, G: 75 } },
  { id: 'alho_oleo',     name: 'Alho e Óleo',           desc: 'Molho, mussarela, alho, óleo e orégano',                                               price: { P: 50, M: 59.90, G: 75 } },
  { id: 'americana',     name: 'Americana',             desc: 'Molho, mussarela, calabresa, milho, ovo e orégano',                                    price: { P: 50, M: 59.90, G: 75 } },
  { id: 'bancon',        name: 'Bacon',                 desc: 'Molho, mussarela, bacon e orégano',                                                    price: { P: 50, M: 59.90, G: 75 } },
  { id: 'baiana',        name: 'Baiana',                desc: 'Molho, mussarela, calabresa picada, pimenta e orégano',                                price: { P: 50, M: 59.90, G: 75 } },
  { id: 'brocolis',      name: 'Brócolis',              desc: 'Molho, mussarela, brócolis, bacon, catupiry e orégano',                                price: { P: 50, M: 59.90, G: 75 } },
  { id: 'calabresa',     name: 'Calabresa',             desc: 'Molho, mussarela, calabresa e orégano',                                                price: { P: 50, M: 59.90, G: 75 } },
  { id: 'cala_cebola',   name: 'Calabresa Acebolada',   desc: 'Molho, mussarela, calabresa, cebola e orégano',                                        price: { P: 50, M: 59.90, G: 75 } },
  { id: 'cala_alho',     name: 'Calabresa C/ Alho',     desc: 'Molho, mussarela, calabresa, alho e orégano',                                          price: { P: 50, M: 59.90, G: 75 } },
  { id: 'cala_chedd',    name: 'Calabresa C/ Cheddar',  desc: 'Molho, mussarela, calabresa, cheddar, cebola e orégano',                               price: { P: 50, M: 59.90, G: 75 } },
  { id: 'carbonara',     name: 'Carbonara',             desc: 'Molho, mussarela, parmesão, bacon, tomate, azeitona, ovo e orégano',                   price: { P: 50, M: 59.90, G: 75 } },
  { id: 'catupiry',      name: 'Catupiry',              desc: 'Molho, mussarela, catupiry e orégano',                                                 price: { P: 50, M: 59.90, G: 75 } },
  { id: 'crocante',      name: 'Crocante',              desc: 'Molho, mussarela, presunto, milho, bacon, batata palha e orégano',                     price: { P: 50, M: 59.90, G: 75 } },
  { id: 'frango',        name: 'Frango',                desc: 'Molho, mussarela, frango e orégano',                                                   price: { P: 50, M: 59.90, G: 75 } },
  { id: 'frango_catu',   name: 'Frango C/ Catupiry',    desc: 'Molho, mussarela, frango, catupiry e orégano',                                         price: { P: 50, M: 59.90, G: 75 } },
  { id: 'jardineira',    name: 'Jardineira',            desc: 'Molho, mussarela, palmito, milho, ervilha, azeitona e orégano',                        price: { P: 50, M: 59.90, G: 75 } },
  { id: 'lombo',         name: 'Lombo',                 desc: 'Molho, mussarela, lombo e orégano',                                                    price: { P: 50, M: 59.90, G: 75 } },
  { id: 'marguerita',    name: 'Marguerita',            desc: 'Molho, mussarela, tomate, manjericão e orégano',                                       price: { P: 50, M: 59.90, G: 75 } },
  { id: 'milho',         name: 'Milho',                 desc: 'Molho, mussarela, milho e orégano',                                                    price: { P: 50, M: 59.90, G: 75 } },
  { id: 'milho_bacon',   name: 'Milho C/ Bacon',        desc: 'Molho, mussarela, milho, bacon, creme de leite e orégano',                             price: { P: 50, M: 59.90, G: 75 } },
  { id: 'mista',         name: 'Mista',                 desc: 'Molho, mussarela, presunto, palmito, champignon, bacon, tomate, azeitona e orégano',   price: { P: 50, M: 59.90, G: 75 } },
  { id: 'napolitana',    name: 'Napolitana',            desc: 'Molho, mussarela, parmesão, tomate e orégano',                                         price: { P: 50, M: 59.90, G: 75 } },
  { id: 'palmi_baco',    name: 'Palmito C/ Bacon',      desc: 'Molho, mussarela, palmito, bacon e orégano',                                           price: { P: 50, M: 59.90, G: 75 } },
  { id: 'portuguesa',    name: 'Portuguesa',            desc: 'Molho, mussarela, presunto, cebola, pimentão, azeitona, ovo e orégano',                price: { P: 50, M: 59.90, G: 75 } },
  { id: 'siciliana',     name: 'Siciliana',             desc: 'Molho, mussarela, bacon, parmesão, catupiry e orégano',                                price: { P: 50, M: 59.90, G: 75 } },
  { id: 'strog_frang',   name: 'Strogonoff Frango',     desc: 'Molho, mussarela, frango, batata palha e orégano',                                     price: { P: 50, M: 59.90, G: 75 } },
  { id: 'tomate_seco',   name: 'Tomate Seco',           desc: 'Molho, mussarela, tomate seco, rúcula e orégano',                                      price: { P: 50, M: 59.90, G: 75 } },
  { id: 'vegetariana',   name: 'Vegetariana',           desc: 'Molho, mussarela, palmito, azeitona, tomate, milho, cebola, pimentão e orégano',       price: { P: 50, M: 59.90, G: 75 } },
  
  { name: 'ESPECIAL'},
  { id: 'atum',          name: 'Atum',                    desc: 'Molho, mussarela, atum, cebola e orégano',                                           price: { P: 55, M: 75, G: 85 } },
  { id: 'bolo_dori',     name: 'Bolonhesa C/ Doritos',    desc: 'Molho, mussarela, cheddar, carne, creme de leite, doritos e orégano',                price: { P: 55, M: 75, G: 85 } },
  { id: 'broco_espe',    name: 'Brócolis C/ Cheddar',     desc: 'Molho, mussarela, brócolis, milho, cheddar, bacon e orégano',                        price: { P: 55, M: 75, G: 85 } },
  { id: 'frango_espe',   name: 'Frango Especial',         desc: 'Molho, mussarela, frango, palmito, ervilha, catupiry, cheddar e orégano',            price: { P: 55, M: 75, G: 85 } },
  { id: 'frango_rei',    name: 'Frango do Rei',           desc: 'Molho, mussarela, frango, creme de leite, milho e orégano',                          price: { P: 55, M: 75, G: 85 } },
  { id: 'gorgonzola',    name: 'Gorgonzola',              desc: 'Molho, mussarela, gorgonzola, catupiry e orégano',                                   price: { P: 55, M: 75, G: 85 } },
  { id: 'grego',         name: 'Grego',                   desc: 'Molho, mussarela, lombo canadense, cebola, palmito e orégano',                       price: { P: 55, M: 75, G: 85 } },
  { id: 'lombo_abaca',   name: 'Lombo C/ Abacaxi',        desc: 'Molho, mussarela, lombo, abacaxi e orégano',                                         price: { P: 55, M: 75, G: 85 } },
  { id: 'lombo_catu',    name: 'Lombo C/ Catupiry',       desc: 'Molho, mussarela, lombo, catupiry e orégano',                                        price: { P: 55, M: 75, G: 85 } },
  { id: 'lombo_champ',   name: 'Lombo C/ Champignon',     desc: 'Molho, mussarela, lombo, champignon e orégano',                                      price: { P: 55, M: 75, G: 85 } },
  { id: 'lombo_espe',    name: 'Lombo Especial',          desc: 'Molho, mussarela, lombo, azeitona, cebola, bacon e orégano',                         price: { P: 55, M: 75, G: 85 } },
  { id: 'casa',          name: 'Moda da Casa',            desc: 'Molho, mussarela, lombo, calabresa, cebola roxa, requeijão e orégano',               price: { P: 55, M: 75, G: 85 } },
  { id: 'strog_carne',   name: 'Strogonoff Carne',        desc: 'Molho, mussarela, carne, batata palha e orégano',                                    price: { P: 55, M: 75, G: 85 } },
  
  { name: 'PREMIUM'},
  { id: 'bacon_frita',   name: 'Bacon C/ Fritas',         desc: 'Molho, mussarela, bacon, fritas e orégano',                                          price: { P: 60, M: 85, G: 95 } },
  { id: 'bife_acebo',    name: 'Bife Acebolado',          desc: 'Molho, mussarela, bife, cebola e orégano',                                           price: { P: 60, M: 85, G: 95 } },
  { id: 'camarao',       name: 'Camarão',                 desc: 'Molho, mussarela, camarão e orégano',                                                price: { P: 60, M: 85, G: 95 } },
  { id: 'cama_catupi',   name: 'Camarão C/ Catupiry',     desc: 'Molho, mussarela, camarão, catupiry e orégano',                                      price: { P: 60, M: 85, G: 95 } },
  { id: 'costela',       name: 'Costela',                 desc: 'Molho, mussarela, costela e orégano',                                                price: { P: 60, M: 85, G: 95 } },
  { id: 'file_frita',    name: 'Filé C/ Fritas',          desc: 'Molho, mussarela, carne, batata frita, cebola e orégano',                            price: { P: 60, M: 85, G: 95 } },
  { id: 'italiana',      name: 'Italiana',                desc: 'Molho, mussarela, salame, palmito e orégano',                                        price: { P: 60, M: 85, G: 95 } },
  { id: 'pepperoni',     name: 'Pepperoni',               desc: 'Molho, mussarela, pepperoni, azeitona e orégano',                                    price: { P: 60, M: 85, G: 95 } },
  { id: 'picanha',       name: 'Picanha',                 desc: 'Molho, mussarela, picanha, cebola e orégano',                                        price: { P: 60, M: 85, G: 95 } },
  { id: 'majestade',     name: 'Pizza Majestade',         desc: 'Molho, mussarela, picanha, camarão, catupiry, cheddar, bacon crocante e orégano',    price: { P: 60, M: 85, G: 95 } },
  
  { name: 'DOCE'},
  { id: 'Abacaxi',       name: 'Abacaxi',                 desc: 'Mussarela, abacaxi e leite condensado',                                              price: { P: 50, M: 65, G: 75 } },
  { id: 'banana',        name: 'Banana',                  desc: 'Mussarela, banana e canela',                                                         price: { P: 50, M: 65, G: 75 } },
  { id: 'Brigadeiro',    name: 'Brigadeiro',              desc: 'Mussarela, chocolate preto e granulado',                                             price: { P: 50, M: 65, G: 75 } },
  { id: 'choco_bran',    name: 'Chocolate Branco',        desc: 'Mussarela e chocolate branco',                                                       price: { P: 50, M: 65, G: 75 } },
  { id: 'choco_preto',   name: 'Chocolate Preto',         desc: 'Mussarela e chocolate preto',                                                        price: { P: 50, M: 65, G: 75 } },
  { id: 'dois_amores',   name: 'Dois Amores',             desc: 'Mussarela, chocolate branco e chocolate preto',                                      price: { P: 50, M: 65, G: 75 } },
  { id: 'oreo',          name: 'Oreo',                    desc: 'Mussarela, biscoito e chocolate preto',                                              price: { P: 50, M: 65, G: 75 } },
  { id: 'prestigio',     name: 'Prestígio',               desc: 'Mussarela, coco e leite condensado',                                                 price: { P: 50, M: 65, G: 75 } },
  { id: 'romeu_julie',   name: 'Romeu e Julieta',         desc: 'Mussarela, goiabada e catupiry',                                                     price: { P: 50, M: 65, G: 75 } },
  { id: 'sensa_Bran',    name: 'Sensação Branco',         desc: 'Mussarela, chocolate branco, morango, confete e leite condensado',                   price: { P: 50, M: 65, G: 75 } },
  { id: 'sensa_preto',   name: 'Sensação Preto',          desc: 'Mussarela, chocolate preto, morango, confete e leite condensado',                    price: { P: 50, M: 65, G: 75 } },
];
// Tamanhos e quantos sabores cada um aceita.
// Quando a pizza tem mais de 1 sabor, o preço é o do sabor mais caro entre os escolhidos.
const SIZES = [
  { id: 'P1', size: 'P', flavors: 1, label: 'Pequena', sub: '1 sabor - 4 pedaços (25cm)' },
  { id: 'M1', size: 'M', flavors: 1, label: 'Média',   sub: '1 sabor - 8 pedaços (30cm)' },
  { id: 'M2', size: 'M', flavors: 2, label: 'Média',   sub: '2 sabores - 8 pedaços (30cm)' },
  { id: 'G1', size: 'G', flavors: 1, label: 'Grande',  sub: '1 sabor - 12 pedaços (35cm)' },
  { id: 'G2', size: 'G', flavors: 2, label: 'Grande',  sub: '2 sabores - 12 pedaços (35cm)' },
  { id: 'G3', size: 'G', flavors: 3, label: 'Grande',  sub: '3 sabores - 12 pedaços (35cm)' },
];

// Borda recheada: preço adicional por pizza, conforme o tamanho (P, M ou G).
const BORDER_PRICE = { P: 10, M: 10, G: 10 };
// Recheios de borda disponíveis. AJUSTE conforme o que a pizzaria oferece.
const BORDERS = [
  { id: 'mussarela', name: 'Mussarela' },
  { id: 'catupiry',  name: 'Catupiry' },
  { id: 'cheddar',   name: 'Cheddar' },
  { id: 'choco_pre', name: 'Chocolate Preto' },
  { id: 'choco_bra', name: 'Chocolate Branco' },
];

// Sabores.
const SABOR_REFRI = ['Coca-Cola', 'Coca-Cola Zero', 'Sprite'];
const SABORES_REFRI = ['Kuat Guaraná', 'Fanta Laranja', 'Fanta Uva', 'Fanta Guaraná'];
const SABORES = ['Coca-Cola', 'Coca-Cola Zero'];
const SABORES_LATA = ['Coca-Cola', 'Coca-Cola Zero', 'Fanta Laranja', 'Fanta Uva'];
const AGUA_S_N = ['Com Gás', 'Sem Gás'];
const CEVA_CONTI = ['Conti 269ml'];
const CERVEJA_LATA = ['Brahma 269ml', 'Skol 269ml', 'Amstel 350ml'];
const LONG_NECK = ['Heineken', 'Sol', 'Skol Zero Álcool'];

// Bebidas e preços.
const DRINKS = [
  { id: 'refri2l',   name: 'Refrigerante 2L',          price: 16, flavors: SABOR_REFRI },
  { id: 'refris2l',  name: 'Outros refrigerantes 2L',  price: 12, flavors: SABORES_REFRI },
  { id: 'refri1l',   name: 'Refrigerante 1L',          price: 10, flavors: SABORES },
  { id: 'refri600',  name: 'Refrigerante 600 ml',      price: 8,  flavors: SABORES },
  { id: 'lata',      name: 'Refrigerante lata 350 ml', price: 6,  flavors: SABORES_LATA },
  { id: 'agua',      name: 'Água',                     price: 3,  flavors: AGUA_S_N },
  { id: 'cevala',    name: 'Cerveja Lata',             price: 5,  flavors: CERVEJA_LATA },
  { id: 'conti',     name: 'Cerveja Conti',            price: 4,  flavors: CEVA_CONTI },
  { id: 'long',      name: 'Long Neck',                price: 10, flavors: LONG_NECK }
];
 
// ---- ESTADO ----------------------------------------
// Itens sem "id" em PIZZAS são títulos de categoria (TRADICIONAL, ESPECIAL...), não sabores.
// Itens com name vazio são apenas separadores antigos e são ignorados.
const isHeader = p => !p.id;
const firstFlavor = PIZZAS.find(p => !isHeader(p));
const state = { flavors: [firstFlavor.id], sizeOpt: 'G1', border: null, qty: 1, cart: [] };
 
const $ = id => document.getElementById(id);
const money = n => n.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' });
const findPizza = id => PIZZAS.find(p => p.id === id);
const findDrink = id => DRINKS.find(d => d.id === id);
 
const findSizeOpt = id => SIZES.find(o => o.id === id);

// Preço da pizza: o do sabor mais caro entre os escolhidos, no tamanho (P, M ou G)
const pizzaPrice = (ids, size) => Math.max(...ids.map(id => findPizza(id).price[size]));

// Dados de um item do carrinho (pizza ou bebida)
function itemInfo(item) {
  if (item.kind === 'drink') {
    const d = findDrink(item.id);
    return {
      name: d.name,
      flavor: item.flavor || null,
      label: item.flavor ? d.name + ' - ' + item.flavor : d.name,
      unit: d.price,
      size: null,
      sizeText: null,
    };
  }
  const opt = findSizeOpt(item.sizeOpt);
  const name = item.flavors.map(id => findPizza(id).name).join(' + ');
  const border = item.border ? BORDERS.find(b => b.id === item.border) : null;
  const borderPrice = border ? BORDER_PRICE[opt.size] : 0;
  return {
    name,
    flavor: null,
    border: border ? border.name : null,
    label: name + (border ? ' com borda ' + border.name : ''),
    unit: pizzaPrice(item.flavors, opt.size) + borderPrice,
    size: opt.size,
    sizeText: opt.label + ', ' + opt.sub + (border ? ' · Borda ' + border.name : ''),
    flavorCount: item.flavors.length,
  };
}

// ---- RENDER: tamanhos e sabores --------------------
function renderChoices() {
  const sizeList = $('sizeList');
  if (!$('flavorList') || !sizeList) return;

  sizeList.innerHTML = '';
  SIZES.forEach(o => {
    const label = document.createElement('label');
    label.className = 'size';
    label.innerHTML = '<input type="radio" name="size"><span class="size-body"><b></b><small></small></span>';
    const input = label.querySelector('input');
    input.value = o.id;
    input.checked = o.id === state.sizeOpt;
    label.querySelector('b').textContent = o.label;
    label.querySelector('small').textContent = o.sub;
    input.addEventListener('change', () => {
      state.sizeOpt = o.id;
      state.flavors = state.flavors.slice(0, o.flavors); // se passou do limite, mantém os primeiros
      renderFlavors();
    });
    sizeList.appendChild(label);
  });

  renderFlavors();
}

// Lista de sabores: 1 sabor = escolha única; 2 ou 3 sabores = marcar até o limite
function renderFlavors() {
  const list = $('flavorList');
  const opt = findSizeOpt(state.sizeOpt);
  const multi = opt.flavors > 1;

  list.innerHTML = '';
  PIZZAS.forEach(p => {
    // Título de categoria: não é um sabor, então não tem input nem preço
    if (isHeader(p)) {
      if (!p.name) return;
      const h = document.createElement('h4');
      h.className = 'flavor-category';
      h.textContent = p.name;
      list.appendChild(h);
      return;
    }
    const label = document.createElement('label');
    label.className = 'flavor';
    label.innerHTML = '<input type="' + (multi ? 'checkbox' : 'radio') + '" name="flavor"><span class="flavor-body"><div><b></b><small></small></div><span></span></span>';
    const input = label.querySelector('input');
    input.value = p.id;
    label.querySelector('b').textContent = p.name;
    label.querySelector('small').textContent = p.desc;
    input.addEventListener('change', () => {
      if (!multi) state.flavors = [p.id];
      else if (input.checked && state.flavors.length < opt.flavors) state.flavors.push(p.id);
      else if (!input.checked) state.flavors = state.flavors.filter(id => id !== p.id);
      syncFlavors();
    });
    list.appendChild(label);
  });
  syncFlavors();
}

// Atualiza marcações, bloqueios, aviso e preços sem recriar a lista
function syncFlavors() {
  const opt = findSizeOpt(state.sizeOpt);
  const multi = opt.flavors > 1;
  document.querySelectorAll('#flavorList input').forEach(input => {
    const on = state.flavors.includes(input.value);
    input.checked = on;
    input.disabled = multi && !on && state.flavors.length >= opt.flavors;
  });
  const hint = $('flavorHint');
  if (hint) {
    hint.textContent = multi
      ? 'Escolha ' + opt.flavors + ' sabores (' + state.flavors.length + ' de ' + opt.flavors + '). O preço é o do sabor mais caro.'
      : 'Escolha 1 sabor.';
  }
  renderPrices();
}

// Mostra, em cada sabor, o preço do tamanho escolhido
function renderPrices() {
  const size = findSizeOpt(state.sizeOpt).size;
  document.querySelectorAll('#flavorList .flavor').forEach(label => {
    const pizza = findPizza(label.querySelector('input').value);
    label.querySelector('.flavor-body > span').textContent = money(pizza.price[size]);
  });
  renderBorderPrices();
}

// ---- BORDA -----------------------------------------
// Opções: "Sem borda" + cada recheio. O valor extra depende do tamanho da pizza.
function renderBorders() {
  const list = $('borderList');
  if (!list) return;
  list.innerHTML = '';
  const options = [{ id: null, name: 'Sem borda' }, ...BORDERS];
  options.forEach(o => {
    const label = document.createElement('label');
    label.className = 'size';
    label.innerHTML = '<input type="radio" name="border"><span class="size-body"><b></b><small></small></span>';
    const input = label.querySelector('input');
    input.value = o.id || '';
    input.checked = (o.id || null) === state.border;
    label.querySelector('b').textContent = o.name;
    input.addEventListener('change', () => { state.border = o.id; });
    list.appendChild(label);
  });
  renderBorderPrices();
}

// Mostra, em cada recheio, o valor extra do tamanho escolhido
function renderBorderPrices() {
  const price = BORDER_PRICE[findSizeOpt(state.sizeOpt).size];
  document.querySelectorAll('#borderList .size').forEach((label, i) => {
    label.querySelector('small').textContent = i === 0 ? 'sem adicional' : '+ ' + money(price);
  });
}

// ---- QUANTIDADE ------------------------------------
function setQty(n) {
  state.qty = Math.min(20, Math.max(1, n));
  $('qtyValue').textContent = state.qty;
}
 
// ---- CARRINHO --------------------------------------
function addToCart() {
  const opt = findSizeOpt(state.sizeOpt);
  if (state.flavors.length !== opt.flavors) {
    $('addHint').textContent = 'Escolha ' + opt.flavors + (opt.flavors > 1 ? ' sabores' : ' sabor') + ' antes de adicionar.';
    return;
  }

  const key = [...state.flavors].sort().join('+');
  const existing = state.cart.find(i => i.kind === 'pizza' && i.sizeOpt === opt.id && (i.border || null) === state.border && [...i.flavors].sort().join('+') === key);
  if (existing) existing.qty += state.qty;
  else state.cart.push({ kind: 'pizza', sizeOpt: opt.id, flavors: [...state.flavors], border: state.border, qty: state.qty });

  const names = state.flavors.map(id => findPizza(id).name).join(' + ');
  const borderName = state.border ? BORDERS.find(b => b.id === state.border).name : null;
  $('addHint').textContent = state.qty + 'x ' + names + ' (' + opt.label + ', ' + opt.sub + (borderName ? ', borda ' + borderName : '') + ') adicionada ao pedido.';
  setQty(1);
  renderCart();
  setStatus('');
}

function cartTotal() {
  return state.cart.reduce((sum, i) => sum + itemInfo(i).unit * i.qty, 0);
}

// Taxa de entrega: só vale para "Entrega" e quando já há algo no pedido
function deliveryFee() {
  return $('custType').value === 'entrega' && state.cart.length > 0 ? DELIVERY_FEE : 0;
}

// Total final = itens + taxa de entrega
function orderTotal() {
  return cartTotal() + deliveryFee();
}
 
// ---- BEBIDAS ---------------------------------------
// Sabor escolhido em cada bebida (só para as que têm sabores)
state.drinkFlavor = {};
DRINKS.forEach(d => { if (d.flavors) state.drinkFlavor[d.id] = d.flavors[0]; });
 
function renderDrinks() {
  const list = $('drinkList');
  if (!list) return;
  list.innerHTML = '';
  DRINKS.forEach(d => {
    const row = document.createElement('div');
    row.className = 'drink';
    row.dataset.id = d.id;
    row.innerHTML = '<div class="drink-info"><b></b><span class="drink-price"></span><select class="drink-flavor" hidden></select><small class="drink-note" hidden></small></div><div class="qty qty-sm"><button type="button" data-act="minus">−</button><output>0</output><button type="button" data-act="plus">+</button></div>';
    row.querySelector('b').textContent = d.name;
    row.querySelector('.drink-price').textContent = money(d.price);
 
    const select = row.querySelector('select');
    if (d.flavors) {
      select.hidden = false;
      select.setAttribute('aria-label', 'Sabor de ' + d.name);
      d.flavors.forEach(f => {
        const opt = document.createElement('option');
        opt.value = f;
        opt.textContent = f;
        select.appendChild(opt);
      });
      select.addEventListener('change', () => {
        state.drinkFlavor[d.id] = select.value;
        syncDrinks();
      });
    }
 
    const minus = row.querySelector('[data-act="minus"]');
    const plus = row.querySelector('[data-act="plus"]');
    minus.setAttribute('aria-label', 'Diminuir ' + d.name);
    plus.setAttribute('aria-label', 'Aumentar ' + d.name);
    minus.addEventListener('click', () => setDrinkQty(d.id, currentFlavor(d.id), drinkQty(d.id, currentFlavor(d.id)) - 1));
    plus.addEventListener('click', () => setDrinkQty(d.id, currentFlavor(d.id), drinkQty(d.id, currentFlavor(d.id)) + 1));
    list.appendChild(row);
  });
}
 
const currentFlavor = id => state.drinkFlavor[id] || null;
 
function drinkQty(id, flavor) {
  const item = state.cart.find(i => i.kind === 'drink' && i.id === id && (i.flavor || null) === flavor);
  return item ? item.qty : 0;
}
 
function setDrinkQty(id, flavor, n) {
  n = Math.min(20, Math.max(0, n));
  const index = state.cart.findIndex(i => i.kind === 'drink' && i.id === id && (i.flavor || null) === flavor);
  if (n === 0) {
    if (index >= 0) state.cart.splice(index, 1);
  } else if (index >= 0) {
    state.cart[index].qty = n;
  } else {
    state.cart.push({ kind: 'drink', id, flavor, qty: n });
  }
  setStatus('');
  renderCart();
}
 
// Mantém contadores e avisos das bebidas iguais ao carrinho
function syncDrinks() {
  document.querySelectorAll('#drinkList .drink').forEach(row => {
    const id = row.dataset.id;
    row.querySelector('output').textContent = drinkQty(id, currentFlavor(id));
 
    // Resumo do que já está no pedido desta bebida (todos os sabores)
    const mine = state.cart.filter(i => i.kind === 'drink' && i.id === id);
    const note = row.querySelector('.drink-note');
    if (mine.length) {
      note.textContent = 'No pedido: ' + mine.map(i => i.qty + 'x ' + (i.flavor || findDrink(id).name)).join(', ');
      note.hidden = false;
    } else {
      note.hidden = true;
    }
  });
}
 
function renderCart() {
  const list = $('cartList');
  list.innerHTML = '';
  state.cart.forEach((item, index) => {
    const info = itemInfo(item);
    const li = document.createElement('li');
    li.innerHTML = '<div><span class="ci-name"></span><span class="ci-sub"></span></div><div class="ci-right"><span class="ci-price"></span><button type="button" class="ci-remove">Remover</button></div>';
    li.querySelector('.ci-name').textContent = item.qty + 'x ' + info.name;
    li.querySelector('.ci-sub').textContent = info.sizeText || (info.flavor ? 'Sabor ' + info.flavor : 'Bebida');
    li.querySelector('.ci-price').textContent = money(info.unit * item.qty);
    li.querySelector('.ci-remove').setAttribute('aria-label', 'Remover ' + info.label + ' do pedido');
    li.querySelector('.ci-remove').addEventListener('click', () => {
      state.cart.splice(index, 1);
      renderCart();
    });
    list.appendChild(li);
  });
  $('cartEmpty').hidden = state.cart.length > 0;
  const fee = deliveryFee();
  $('cartFeeRow').hidden = fee === 0;
  $('cartFee').textContent = money(fee);
  $('cartTotal').textContent = money(orderTotal());
  syncDrinks();
  updatePix();
}
 
// ---- ENVIO -----------------------------------------
function setStatus(msg, type) {
  const el = $('orderStatus');
  el.textContent = msg;
  el.className = 'order-status' + (type ? ' ' + type : '');
}
 
function validate() {
  const fields = [
    ['custName', v => v.trim().length >= 2],
    ['custPhone', v => v.replace(/\D/g, '').length >= 10],
  ];
  if ($('custType').value === 'entrega') {
    fields.push(['custAddress', v => v.trim().length >= 5]);
  }
  // Na mesa, o número da mesa (campo Observações) é obrigatório
  if ($('custType').value === 'mesa') {
    fields.push(['custNotes', v => v.trim().length >= 1]);
  }
  let firstBad = null;
  ['custName', 'custPhone', 'custAddress', 'custNotes'].forEach(id => $(id).removeAttribute('aria-invalid'));
  fields.forEach(([id, ok]) => {
    if (!ok($(id).value)) {
      $(id).setAttribute('aria-invalid', 'true');
      if (!firstBad) firstBad = $(id);
    }
  });
  return firstBad;
}
 
function buildPayload() {
  return {
    createdAt: new Date().toISOString(),
    customer: {
      name: $('custName').value.trim(),
      phone: $('custPhone').value.trim(),
    },
    delivery: {
      type: $('custType').value,
      address: $('custType').value === 'entrega' ? $('custAddress').value.trim() : null,
      complement: $('custType').value === 'entrega' ? $('custComplement').value.trim() : null,
      fee: deliveryFee(),
    },
    payment: paymentLabel(),
    pix: pixInfo(),
    notes: $('custNotes').value.trim(),
    items: state.cart.map(i => {
      const info = itemInfo(i);
      return { kind: i.kind, id: i.id || i.flavors.join('+'), sizeLabel: info.sizeText, flavorCount: info.flavorCount, name: info.label, pizzaName: info.name, border: info.border, flavor: info.flavor, size: info.size, qty: i.qty, unitPrice: info.unit, subtotal: info.unit * i.qty };
    }),
    total: orderTotal(),
  };
}
 
function buildWhatsAppText(o) {
  const SEP = '=============';
  const lines = ['*Novo pedido - Rei da Pizza*', ''];

  const pizzas = o.items.filter(i => i.kind !== 'drink');
  const drinks = o.items.filter(i => i.kind === 'drink');

  // Pizza sem preço, sabores um embaixo do outro:
  // 1 (G)
  // com borda Chocolate Preto
  //
  // Calabresa Acebolada
  // Strogonoff Carne
  // Dois Amores
  pizzas.forEach(i => {
    lines.push(i.qty + (i.size ? ' (' + i.size + ')' : ''));
    if (i.border) lines.push('com borda ' + i.border);
    lines.push('');
    i.pizzaName.split(' + ').forEach(f => lines.push(f));
  });
  if (o.notes) lines.push('*Obs.: ' + o.notes + '*');
  lines.push('', SEP);

  // Linhas de valores, somadas com "+" (a última linha não leva "+")
  const prices = pizzas.map(i => '*Pizza:* ' + money(i.subtotal));
  if (o.delivery.fee) prices.push('*Taxa de entrega:* ' + money(o.delivery.fee));
  drinks.forEach(i =>
    prices.push(i.qty + 'x ' + i.pizzaName + (i.flavor ? ' : ' + i.flavor : '') + ' : ' + money(i.subtotal))
  );
  prices.forEach((t, idx) => lines.push(t + (idx < prices.length - 1 ? ' +' : '')));
  lines.push(SEP);

  lines.push('*Total:* ' + money(o.total));
  lines.push(SEP);

  lines.push('*Nome:* ' + o.customer.name);
  lines.push('*Telefone:* ' + o.customer.phone);
  if (o.delivery.type === 'entrega') lines.push('*Entrega:* ' + o.delivery.address);
  else if (o.delivery.type === 'mesa') lines.push('*Consumo na MESA*');
  else lines.push('*Retirada na pizzaria*');
  if (o.delivery.complement) lines.push('*Complemento:* ' + o.delivery.complement);
  lines.push('*Pagamento:* ' + o.payment);
  return lines.join('\n');
}

async function sendOrder() {
  if (!state.cart.some(i => i.kind === 'pizza')) {
    setStatus('Adicione pelo menos uma pizza ao pedido.', 'error');
    return;
  }
  const bad = validate();
  if (bad) {
    setStatus('Preencha os campos marcados em vermelho.', 'error');
    bad.focus();
    return;
  }
 
  const order = buildPayload();
  const btn = $('sendBtn');
  btn.disabled = true;
  setStatus('Enviando pedido...');
 
  // Abrir a janela do WhatsApp aqui (no clique) evita bloqueio de pop-up no celular
  const waWindow = SEND_TO_WHATSAPP ? window.open('', '_blank') : null;
 
  try {
    if (ORDER_ENDPOINT) {
      // O Google Apps Script não aceita o envio "normal" de outro site (CORS).
      // Por isso usamos no-cors + texto simples: o pedido chega normalmente,
      // só não conseguimos ler a resposta do Google.
      await fetch(ORDER_ENDPOINT, {
        method: 'POST',
        mode: 'no-cors',
        body: JSON.stringify(order),
      });
    }
 
    if (waWindow) {
      waWindow.location.href = 'https://wa.me/' + WHATSAPP_NUMBER + '?text=' + encodeURIComponent(buildWhatsAppText(order));
    }
 
    setStatus('Pedido enviado! Em instantes entraremos em contato para confirmar.', 'ok');
    state.cart = [];
    resetPix();
    renderCart();
  } catch (err) {
    if (waWindow) waWindow.close();
    setStatus('Não foi possível enviar o pedido. Tente de novo ou chame no WhatsApp.', 'error');
    console.error(err);
  } finally {
    btn.disabled = false;
  }
}
 
// =====================================================
// PIX: QR Code + código "copia e cola" + identificador
// =====================================================

// Guarda o Pix do pedido atual
const pixState = { id: null, paid: false, amount: 0, code: '' };

// Tira acentos e deixa só letras, números e espaço (o Pix exige isso)
const pixText = (txt, max) =>
  txt.normalize('NFD').replace(/[\u0300-\u036f]/g, '').replace(/[^A-Za-z0-9 ]/g, '').toUpperCase().slice(0, max);

// Cada campo do Pix é: número do campo + tamanho (2 dígitos) + valor
const pixField = (id, value) => id + String(value.length).padStart(2, '0') + value;

// Conta de verificação (CRC16) que o Pix exige no final do código
function crc16(str) {
  let crc = 0xFFFF;
  for (let i = 0; i < str.length; i++) {
    crc ^= str.charCodeAt(i) << 8;
    for (let j = 0; j < 8; j++) {
      crc = (crc & 0x8000) ? ((crc << 1) ^ 0x1021) : (crc << 1);
      crc &= 0xFFFF;
    }
  }
  return crc.toString(16).toUpperCase().padStart(4, '0');
}

// Monta o texto do Pix ("copia e cola"). O QR Code é esse mesmo texto desenhado.
function buildPixPayload(key, amount, txid) {
  const account = pixField('00', 'br.gov.bcb.pix') + pixField('01', key);
  const body =
    pixField('00', '01') +                       // versão do formato
    pixField('01', '11') +                       // QR estático
    pixField('26', account) +                    // chave Pix de quem recebe
    pixField('52', '0000') +                     // categoria
    pixField('53', '986') +                      // moeda: real
    pixField('54', amount.toFixed(2)) +          // valor do pedido
    pixField('58', 'BR') +
    pixField('59', pixText(PIX_MERCHANT_NAME, 25)) +
    pixField('60', pixText(PIX_MERCHANT_CITY, 15)) +
    pixField('62', pixField('05', txid)) +       // identificador do pedido
    '6304';
  return body + crc16(body);
}

// Identificador do pedido: letras e números (ex.: RDP1A2B3CX7Q)
function newPixId() {
  const time = Date.now().toString(36).toUpperCase().slice(-6);
  const rand = (Math.random().toString(36) + '000').slice(2, 5).toUpperCase();
  return 'RDP' + time + rand;
}

// Desenha o QR Code dentro da caixinha (usa a biblioteca carregada no index.html)
function renderQr(text) {
  const el = $('pixQr');
  try {
    if (typeof qrcode !== 'function') throw new Error('biblioteca do QR não carregou');
    const qr = qrcode(0, 'M');
    qr.addData(text);
    qr.make();
    const n = qr.getModuleCount();
    const quiet = 4;                    // borda branca em volta, para o celular ler
    const size = n + quiet * 2;
    let path = '';
    for (let r = 0; r < n; r++) {
      for (let c = 0; c < n; c++) {
        if (qr.isDark(r, c)) path += 'M' + (c + quiet) + ',' + (r + quiet) + 'h1v1h-1z';
      }
    }
    el.innerHTML = '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 ' + size + ' ' + size +
      '" shape-rendering="crispEdges"><rect width="' + size + '" height="' + size + '" fill="#fff"/>' +
      '<path d="' + path + '" fill="#000"/></svg>';
    el.hidden = false;
  } catch (err) {
    el.hidden = true;                   // sem QR, o botão "Copiar código Pix" continua funcionando
    console.error(err);
  }
}

// Decide o que mostrar na caixinha do Pix
function updatePix() {
  const box = $('pixBox');
  if (!box) return;
  const isPix = $('custPay').value === 'Pix';
  box.hidden = !isPix;
  if (!isPix) return;

  const show = (id, on) => { $(id).hidden = !on; };
  const total = orderTotal();

  // 1) Chave Pix ainda não configurada
  if (!PIX_KEY.trim()) {
    ['pixQr', 'pixIdRow', 'pixCopy', 'pixPaidRow'].forEach(id => show(id, false));
    $('pixMsg').textContent = 'Depois de enviar o pedido, mandamos a chave Pix pelo WhatsApp.';
    $('pixStatus').textContent = '';
    return;
  }

  // 2) Pedido ainda vazio: não há valor para cobrar
  if (state.cart.length === 0) {
    ['pixQr', 'pixIdRow', 'pixCopy', 'pixPaidRow'].forEach(id => show(id, false));
    $('pixMsg').textContent = 'Adicione itens ao pedido para gerar o QR Code.';
    $('pixStatus').textContent = '';
    return;
  }

  // 3) Tudo certo: gera o código com o valor atual do pedido
  if (!pixState.id) pixState.id = newPixId();
  if (pixState.amount !== total) {      // o valor mudou: um "já paguei" antigo não vale mais
    pixState.paid = false;
    pixState.amount = total;
  }
  pixState.code = buildPixPayload(PIX_KEY.trim(), total, pixState.id);

  renderQr(pixState.code);
  $('pixMsg').textContent = 'Valor: ' + money(total);
  $('pixId').textContent = pixState.id;
  $('pixPaid').checked = pixState.paid;
  ['pixIdRow', 'pixCopy', 'pixPaidRow'].forEach(id => show(id, true));
  $('pixStatus').textContent = pixState.paid
    ? 'Após o pagamento, envie o comprovante do pix para confirmação.'
    : 'Aguardando pagamento.';
  $('pixStatus').classList.toggle('ok', pixState.paid);
}

async function copyPix() {
  const btn = $('pixCopy');
  try {
    await navigator.clipboard.writeText(pixState.code);
    btn.textContent = 'Código copiado!';
    setTimeout(() => { btn.textContent = 'Copiar código Pix'; }, 2000);
  } catch (err) {
    window.prompt('Copie o código Pix abaixo:', pixState.code);   // plano B se o navegador bloquear
  }
}

// Texto que vai no campo "Pagamento" do pedido (WhatsApp, e-mail e planilha)
function paymentLabel() {
  const pay = $('custPay').value;
  if (pay !== 'Pix' || !pixState.id) return pay;
  return 'Pix (código ' + pixState.id + ' - ' +
    (pixState.paid ? 'cliente informou que já pagou' : 'aguardando pagamento') + ')';
}

function pixInfo() {
  if ($('custPay').value !== 'Pix' || !pixState.id) return null;
  return { id: pixState.id, informedByCustomer: pixState.paid, amount: pixState.amount };
}

// Depois de enviar o pedido, o próximo pedido ganha um identificador novo
function resetPix() {
  pixState.id = null;
  pixState.paid = false;
  pixState.amount = 0;
  pixState.code = '';
}

// ---- INICIALIZAÇÃO ---------------------------------
if ($('flavorList')) {
  renderChoices();
  renderBorders();
  renderDrinks();
  renderCart();
  $('qtyMinus').addEventListener('click', () => setQty(state.qty - 1));
  $('qtyPlus').addEventListener('click', () => setQty(state.qty + 1));
  $('addBtn').addEventListener('click', addToCart);
  $('sendBtn').addEventListener('click', sendOrder);
  $('custPay').addEventListener('change', updatePix);
  $('pixCopy').addEventListener('click', copyPix);
  $('pixPaid').addEventListener('change', () => {
    pixState.paid = $('pixPaid').checked;
    updatePix();
  });
 
  const toggleAddress = () => {
    const delivery = $('custType').value === 'entrega';
    $('addressWrap').hidden = !delivery;
    $('complementWrap').hidden = !delivery;
    $('deliveryFee').hidden = !delivery;
    $('deliveryFeeText').textContent = 'Taxa de entrega: ' + money(DELIVERY_FEE);
    $('deliveryTimeText').textContent = 'Tempo estimado: ' + DELIVERY_TIME;
    // Na mesa não existe Pix: a opção some e, se estava marcada, troca para Cartão
    const mesa = $('custType').value === 'mesa';
    Array.from($('custPay').options).forEach(o => {
      if (o.value === 'Pix') { o.hidden = mesa; o.disabled = mesa; }
    });
    if (mesa && $('custPay').value === 'Pix') $('custPay').value = 'Cartão';
    renderCart(); // atualiza a taxa, o total e o Pix
    if (!delivery) $('custAddress').removeAttribute('aria-invalid');
  };
  $('custType').addEventListener('change', toggleAddress);
  toggleAddress();
}
