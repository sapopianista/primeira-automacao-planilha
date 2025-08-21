# 📑 Automação de Controle de Contratos de Experiência  

Este projeto é um **script em Google Apps Script** que automatiza o controle de contratos de experiência.  
Ele verifica uma planilha do Google Sheets com informações de funcionários e envia **notificações por e-mail** quando contratos ou prorrogações estão prestes a vencer.  

## ⚙️ Funcionalidades  

- 🔔 Envia **notificação consolidada por e-mail** com todos os contratos/prorrogações que vencem em até **7 dias**  
- ✅ Marca na planilha quando a notificação foi enviada (evitando envios repetidos)  
- 🗑️ Remove automaticamente datas de fim já vencidas  
- 📊 Funciona direto dentro do **Google Sheets** sem precisar de servidor externo  

## 📋 Estrutura da Planilha  

A aba **`Contratos`** deve conter as seguintes colunas:  

| Coluna | Descrição |
|--------|-----------|
| 1 | Empresa |
| 2 | Código do Funcionário |
| 3 | Nome do Funcionário |
| 4 | Data de Início |
| 5 | Dias até o fim da 1ª parte do contrato |
| 6 | Data do Fim da 1ª Parte do Contrato |
| 7 | Dias até o fim da prorrogação |
| 8 | Data do Fim da Prorrogação |
| 9 | Status (Renovação, Contratação, Descontinuação) |
| 10 | Notificação Enviada (Sim/Não) |
| 11 | Notificação de Fim de Contrato Enviada (Sim/Não) |
| 12 | Notificação de Fim de Prorrogação Enviada (Sim/Não) |

## 🚀 Como Usar  

1. Abra sua planilha no **Google Sheets**  
2. Vá em **Extensões > Apps Script**  
3. Cole o código do arquivo `contratos.js` no editor  
4. Ajuste o e-mail de destino no código (`var email = "seuemail@empresa.com";`)  
5. Salve o projeto  

## ⏰ Automação com Trigger  

Para rodar automaticamente todo dia:  

1. No editor do Apps Script, vá em **Acionadores (Triggers)**  
2. Crie um novo acionador para a função:  
   - Função: `enviarNotificacoesConsolidadas`  
   - Evento: **Baseado em tempo > Diário > Defina o horário**  
3. Salve e autorize o script  

Também é possivel configurar para rodar ao abrir a planilha, ou semanalmente, etc

## 📧 Exemplo de Notificação  

O e-mail enviado terá o seguinte formato:  

📌 Fim de Contrato:
Funcionário: João Silva (Código: 123) - Empresa: XPTO - Fim em: 25/08/2025

📌 Fim de Prorrogação:
Funcionário: Maria Souza (Código: 456) - Empresa: YZ Ltda - Fim em: 30/08/2025

Por favor, verifique se será necessário renovar ou encerrar cada caso.

## 🛠️ Tecnologias Utilizadas  

- **Google Sheets** (armazenamento dos dados)  
- **Google Apps Script (JavaScript)** (automação)  
- **MailApp API** (envio de e-mails)  

## 👨‍💻 Autor  

Projeto desenvolvido por **Tiago Vieira**  
📧 Contato: tiagoferreiravieira167@gmail.com 
