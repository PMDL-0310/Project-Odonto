const express = require('express');
const path = require('path');
const app = express();

// Configurações
const PORT = 3000;

// Middleware
app.use(express.static(path.join(__dirname, '.')));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Rota principal
app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'index.html'));
});

// Rota para receber agendamentos
app.post('/api/agendamento', (req, res) => {
    const { nome, email, telefone, servico, mensagem } = req.body;

    // Validação básica
    if (!nome || !email || !telefone || !servico) {
        return res.status(400).json({
            sucesso: false,
            mensagem: 'Por favor, preencha todos os campos obrigatórios.'
        });
    }

    // Aqui você pode adicionar lógica para salvar em banco de dados
    // ou enviar email, por exemplo
    console.log('Novo agendamento recebido:', {
        nome,
        email,
        telefone,
        servico,
        mensagem,
        data: new Date()
    });

    // Resposta de sucesso
    res.status(200).json({
        sucesso: true,
        mensagem: 'Agendamento recebido com sucesso! Entraremos em contato em breve.'
    });
});

// Rota para serviços disponíveis
app.get('/api/servicos', (req, res) => {
    const servicos = [
        { id: 'limpeza', nome: 'Limpeza Dental' },
        { id: 'clareamento', nome: 'Clareamento' },
        { id: 'canal', nome: 'Tratamento de Canal' },
        { id: 'implante', nome: 'Implante Dentário' },
        { id: 'ortodontia', nome: 'Ortodontia' },
        { id: 'estetica', nome: 'Estética Dental' }
    ];
    res.json(servicos);
});

// Rota para informações da clínica
app.get('/api/info', (req, res) => {
    const info = {
        nome: 'Hollywood Odonto',
        telefone: '(11) 3456-7890',
        whatsapp: '(11) 99876-5432',
        email: 'contato@hollywoododonto.com.br',
        endereco: 'Rua Ouro Preto, 1500 - São Paulo - SP',
        horario: {
            segsex: '8h - 18h',
            sabado: '9h - 12h'
        }
    };
    res.json(info);
});

// Tratamento de erro 404
app.use((req, res) => {
    res.status(404).json({
        erro: true,
        mensagem: 'Página não encontrada'
    });
});

// Iniciar servidor
app.listen(PORT, () => {
    console.log(`🦷 Servidor Hollywood Odonto rodando em http://localhost:${PORT}`);
    console.log('Pressione Ctrl+C para parar o servidor');
});
