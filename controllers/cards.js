const knex = require("../db/knex.js");

module.exports = {
  index: function(req, res) {
    if(!req.session.deck){
      req.session.deck = [];
    }
    knex('cards').then(function(results){
    res.render("index", {cardsList:results, deck:req.session.deck});
  })
  },
  create: function(req, res){
    knex("cards").insert(req.body).then(function(){
      res.redirect("/");
    })
  },
  add: function(req, res){
      knex('cards').where('id', req.params.id).then(function(result){
        req.session.deck.push(result[0]);
        res.redirect("/");
      })
  },
  remove: function(req,res) {
        let deck = req.session.deck;
          if(deck.length == 1){
          req.session.deck = [];
          res.redirect("/");
          return;
          }
        for(let i=0; i<deck.length; i++){
          if(deck[i].id == req.params.id){
          deck.splice(i,1);
          res.redirect("/");
          return;
          }
        }
        res.redirect("/")
  }
}
