var express = require('../config/express')();
var request = require('supertest')(express);

describe('#ProdutosController',function(){

    beforeEach(function(done){
        var conn = express.infra.connectionFactory();
        conn.query("delete from produtos",function(ex,result){
            if(!ex){
                done();
            }
        });
    });

    it('#listagem json',function(done){
        request.get('/produtos')
        .set('Accept','application/json')
        .expect('Content-Type',/json/)
        .expect(200,done);
        });

    it('#cadastro de um novo produto com dados invalidos',function(done){
        request.post('/produtos')
        .send({titulo:"",descricao:"Novo livro"})
        .expect(400,done);
    });

    it('#cadastro de um novo produto com dados validos',function(done){
        request.post('/produtos')
        .send({titulo:"Titulo",descricao:"Novo livro",preco:20.50})
        .expect(302,done);
    });

});