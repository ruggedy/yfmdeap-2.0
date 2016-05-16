$(document).ready(function() {

  var question = [
    ["Have a rich vocabulary","O", "+"],
    ["Am always prepared","C", "+"],
    ["Am the life of the party","E", "+"],
    ["Feel little concern for others","A", "-"],
    ["Get stressed out easily","N", "-"],
    ["Have difficulty understanding abstract ideas","O", "-"],
    ["Leave my belongings around","C", "-"],
    ["Don't talk a lot","E", "-"],
    ["Am interested in people","A", "+"],
    ["Am relaxed most of the time","N", "+"],
    ["Have a vivid imagination","O", "+"],
    ["Pay attention to details","C", "+"],
    ["Feel comfortable around people","E", "+"],
    ["Insult people","A", "-"],
    ["Worry about things","N", "-"],
    ["Am not interested in abstract ideas","O", "-"],
    ["Make a mess of things","C", "-"],
    ["Keep in the background","E", "-"],
    ["Sympathize with others' feelings","A", "+"],
    ["Seldom feel blue","N", "+"],
    ["Have excellent ideas","O", "+"],
    ["Get chores done right away","C", "+"],
    ["Start conversations","E", "+"],
    ["Am not interested in other people's problems","A", "-"],
    ["Am easily disturbed","N", "-"],
    ["Do not have a good imagination","O", "-"],
    ["Often forget to put things back in their proper place","C", "-"],
    ["Have little to say","E", "-"],
    ["Have a soft heart","A", "+"],
    ["Get upset easily","N", "-"],
    ["Use difficult words","O", "+"],
    ["Like order","C", "+"],
    ["Talk to a lot of different people at parties","E", "+"],
    ["Am not really interested in others","A", "-"],
    ["Change my mood a lot","N", "-"],
    ["Am quick to understand things","O", "+"],
    ["Shirk my duties","C", "-"],
    ["Don't like to draw attention to myself","E", "-"],
    ["Take time out for others","A", "+"],
    ["Have frequent mood swings","N", "-"],
    ["Am full of ideas","O", "+"],
    ["Follow a schedule","C", "+"],
    ["Don't mind being the center of attention","E", "+"],
    ["Feel others' emotions","A", "+"],
    ["Get irritated easily","N", "-"],
    ["Spend time reflecting on things","O", "+"],
    ["Am exacting in my work","C", "+"],
    ["Am quiet around strangers","E", "-"],
    ["Make people feel at ease","A", "+"],
    ["Often feel blue","N", "-"],
  ];



  var counter = 0;

  /*for (var i = 0; i < question.length; i++) {
    var id = "id: "+(i+1);
    var quest = "question: "+question[i][0];
    var group = "group: "+ question[i][1];
    var symbol = "symbol: "+ question[i][2];

    console.log(id);
    console.log(quest);
    console.log(group);
    console.log(symbol);

  }*/

  var t= $('textarea');
  var a= $('a');


  var v =t.val();
  a.hide();

  for (var i = 0; i < question.length; i++) {
    var o = {}
    var id     = (i+1),
        quest = question[i][0],
        group = question[i][1],
        symbol = question[i][2];

    o["id"] = id;
    o["question"] = quest;
    o["group"] = group;
    o["symbol"] = symbol;
    console.log(o);



    t.val(t.val() + "\n " + JSON.stringify(o) +  " \n")
  }


})
