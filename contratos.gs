function enviarNotificacoesConsolidadas() {
  // Acessando a planilha e a aba de Contratos
  var sheet = SpreadsheetApp.getActiveSpreadsheet().getSheetByName("Contratos");
  
  // Obtendo a data atual
  var dataAtual = new Date();
  
  // Número de dias antes da data de término para enviar a notificação
  var diasAntes = 7;
  
  // Listas para acumular mensagens
  var avisosContrato = [];
  var avisosProrrogacao = [];
  
  // Percorrendo todas as linhas da planilha (começando da linha 2, pois a linha 1 é o cabeçalho)
  for (var i = 2; i <= sheet.getLastRow(); i++) {
    var empresa = sheet.getRange(i, 1).getValue();
    var funcionario = sheet.getRange(i, 2).getValue();
    var nomeFuncionario = sheet.getRange(i, 3).getValue();
    var fimContr = new Date(sheet.getRange(i, 6).getValue());
    var fimProrrog = new Date(sheet.getRange(i, 8).getValue());
    var notificacaoContrEnviada = sheet.getRange(i, 11).getValue();
    var notificacaoProrrogEnviada = sheet.getRange(i, 12).getValue();
    
    // Verifica fim do contrato
    if (fimContr && (fimContr - dataAtual <= diasAntes * 24 * 60 * 60 * 1000) && notificacaoContrEnviada != "Sim") {
      avisosContrato.push(
        "Funcionário: " + nomeFuncionario +
        " (Código: " + funcionario + ") - Empresa: " + empresa +
        " - Fim do contrato em: " + fimContr.toLocaleDateString()
      );
      sheet.getRange(i, 11).setValue("Sim"); // marca como notificado
    }

    // Verifica fim da prorrogação
    if (fimProrrog && (fimProrrog - dataAtual <= diasAntes * 24 * 60 * 60 * 1000) && notificacaoProrrogEnviada != "Sim") {
      avisosProrrogacao.push(
        "Funcionário: " + nomeFuncionario +
        " (Código: " + funcionario + ") - Empresa: " + empresa +
        " - Fim da prorrogação em: " + fimProrrog.toLocaleDateString()
      );
      sheet.getRange(i, 12).setValue("Sim"); // marca como notificado
    }

    // Limpa datas vencidas
    if (fimContr && fimContr < dataAtual) {
      sheet.getRange(i, 6).setValue("");
    }
    if (fimProrrog && fimProrrog < dataAtual) {
      sheet.getRange(i, 8).setValue("");
    }
  }
  
  // Só envia e-mail se houver notificações
  if (avisosContrato.length > 0 || avisosProrrogacao.length > 0) {
    var email = "seuemail@empresa.com"; // seu e-mail
    var assunto = "Aviso Consolidado - Contratos de Experiência";
    var mensagem = "Segue o resumo dos contratos de experiência próximos do vencimento:\n\n";
    
    if (avisosContrato.length > 0) {
      mensagem += "📌 Fim de Contrato:\n" + avisosContrato.join("\n") + "\n\n";
    }
    
    if (avisosProrrogacao.length > 0) {
      mensagem += "📌 Fim de Prorrogação:\n" + avisosProrrogacao.join("\n") + "\n\n";
    }
    
    mensagem += "Por favor, verifique se será necessário renovar ou encerrar cada caso.";
    
    try {
      MailApp.sendEmail(email, assunto, mensagem);
    } catch (e) {
      Logger.log("Erro ao enviar e-mail consolidado: " + e.message);
    }
  }
}
