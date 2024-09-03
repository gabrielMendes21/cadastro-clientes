const express = require('express');
const router = express.Router();
const Cliente = require('../models/Cliente.js');

// Lidar com o envio do formulário
router.post("/cadastrar", async (req, res) => {
    try {
        const { 

         } = req.body;
    
        const newCliente = new Cliente({
            nome: "Gabriel",
            idade: 18,
            sexo: "Masculino"
        })

        await newCliente.save();

        res.json("Cadastrado");
    } catch(err) {
        console.log({
            msg: "Erro ao cadastrar cliente",
            err
        })
    }
})

// app.post("/cadastrar", async (req, res) => {
//     try {
//         const {
//             nome,
//             telefone,
//             origem,
//             data_contato,
//             observacao,
//         } = req.body;

//         const id = crypto.randomUUID();
    
//         const docRef = db.collection('agendamentos').doc(id);
    
//         await docRef.set({
//             nome,
//             telefone,
//             origem,
//             data_contato,
//             observacao,
//         });

//         res.json("Agendamento cadastrado com sucesso");
//     } catch(err) {
//         res.status(500).json({
//             msg: "Erro ao cadastrar agendamento",
//             err
//         });
//     }
// })

router.get("/clientes", async (req, res) => {
    const clientes = await Cliente.find();
    res.json(clientes);
    // const agendamentos = await db.collection('agendamentos').get();
    // const data = [];

    // agendamentos.forEach(ag => {
    //     data.push({
    //         id: ag.id,
    //         ...ag.data()
    //     })
    // })

    // res.render('consulta', {
    //     data,
    //     teste: "Gabriel Mendes"
    // });
})

router.get("/editar/:id", async (req, res) => {
    const agendamentos = await db.collection('agendamentos').get();
    let agendamento = null;

    agendamentos.forEach((ag) => {
        if (ag.id === req.params.id) {
            agendamento = {
                id: ag.id,
                ...ag.data()
            };
        }
    });

    res.render("editar", agendamento);
})

router.get("/excluir/:id", async (req, res) => {
    const response = await db.collection('agendamentos').doc(req.params.id).delete();

    res.redirect('/consulta');
})

router.post("/atualizar/:id", async (req, res) => {
    try {
        const body = req.body;
        
        const agRef = db.collection('agendamentos').doc(req.params.id);
        const response = await agRef.update({...body});

        res.json("Sucesso");
    } catch(err) {
        console.log(err)
        res.status(500).json({
            msg: "Erro ao editar agendamento",
            err
        })
    }
})

module.exports = router;
