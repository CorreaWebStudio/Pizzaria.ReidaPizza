const EMAIL_AVISO = 'pizzariareidapizza2026@gmail.com';

const NOME_ABA = 'Pedidos';
const CABECALHO = ['Data/Hora', 'Status', 'Cliente', 'Telefone', 'Itens', 'Total (R$)', 'Taxa de entrega (R$)', 'Recebimento', 'Endereço', 'Complemento', 'Pagamento', 'Observações'];

function doPost(e) {
  const lock = LockService.getScriptLock();
  lock.waitLock(10000); // evita que dois pedidos ao mesmo tempo se misturem
  try {
    const o = JSON.parse(e.postData.contents);

    const planilha = SpreadsheetApp.getActiveSpreadsheet();
    let aba = planilha.getSheetByName(NOME_ABA);
    if (!aba) aba = planilha.insertSheet(NOME_ABA);
    if (aba.getLastRow() === 0) {
      aba.appendRow(CABECALHO);
      aba.getRange(1, 1, 1, CABECALHO.length).setFontWeight('bold');
      aba.setFrozenRows(1);
    }

    const itens = o.items.map(i => i.qty + 'x ' + i.name + (i.size ? ' (' + i.size + ')' : '')).join(', ');
    const recebimento = o.delivery.type === 'entrega' ? 'Entrega'
                      : o.delivery.type === 'mesa'    ? 'Mesa'
                      : 'Retirada';
    aba.appendRow([
      new Date(),
      'Novo',
      o.customer.name,
      o.customer.phone,
      itens,
      o.total,
      o.delivery.fee || 0,
      recebimento,
      o.delivery.address || '',
      o.delivery.complement || '',
      o.payment,
      o.notes || ''
    ]);

    if (EMAIL_AVISO) {
      MailApp.sendEmail(
        EMAIL_AVISO,
        'Novo pedido: ' + o.customer.name + ' (R$ ' + o.total.toFixed(2) + ')',
        itens + '\n\n' +
        'Cliente: ' + o.customer.name + '\n' +
        'Telefone: ' + o.customer.phone + '\n' +
        recebimento + (o.delivery.address ? ': ' + o.delivery.address : '') + '\n' +
        (o.delivery.complement ? 'Complemento: ' + o.delivery.complement + '\n' : '') +
        (o.delivery.fee ? 'Taxa de entrega: R$ ' + o.delivery.fee.toFixed(2) + '\n' : '') +
        'Pagamento: ' + o.payment + '\n' +
        'Obs.: ' + (o.notes || '-')
      );
    }

    return ContentService.createTextOutput(JSON.stringify({ ok: true }))
      .setMimeType(ContentService.MimeType.JSON);
  } catch (err) {
    return ContentService.createTextOutput(JSON.stringify({ ok: false, erro: String(err) }))
      .setMimeType(ContentService.MimeType.JSON);
  } finally {
    lock.releaseLock();
  }
}

// Só para testar no navegador: abrir a URL deve mostrar "Funcionando".
function doGet() {
  return ContentService.createTextOutput('Funcionando');
}
