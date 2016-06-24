$(document).ready(function(){
   
   $('#statcontainer').hide();

   $('#index1').hover(
      function(e) {
         $("#indexbody").addClass('nba');
      }, function(e) {
         $("#indexbody").removeClass('nba');
         $("#indexbody").addClass('original');
      }
   );

   $('#index2').hover(
      function(e) {
         $("#indexbody").addClass('nfl');
      }, function(e) {
         $("#indexbody").removeClass('nfl');
         $("#indexbody").addClass('original');
      }
   );

   $('#index3').hover(
      function(e) {
         $("#indexbody").addClass('mlb');
      }, function(e) {
         $("#indexbody").removeClass('mlb');
         $("#indexbody").addClass('original');
      }
   );   

   $('#index4').hover(
      function(e) {
         $("#indexbody").addClass('soccer');
      }, function(e) {
         $("#indexbody").removeClass('soccer');
         $("#indexbody").addClass('original');
      }
   );

   document.getElementById('nbalist').onchange = function() {
      var e = document.getElementById('nbalist');
      var team = e.options[e.selectedIndex].value;
      var teamformat = team.replace(/ /g, '');
      console.log(teamformat);
      var url = '../images/nbalogos/'+teamformat +'.jpg';
      logo.src = url;
   }  

   // nba.com api call
   $("#nbasearch").on("submit",function(e){
      e.preventDefault();
      var teamID = $(this).find(':selected')[0].id;
      var playerName = new Array(); 
      var playerID = new Array();      
      $.ajax({
         type: "GET",

         dataType: 'jsonp',  
         url: 'http://stats.nba.com/stats/commonteamroster/?',
         data: {
            teamid: teamID,
            season: '2015-16' 
         },
         success: function (r) {
            for(var i = 0; i < r.resultSets[0].rowSet.length; i++) {
               playerName[i] = r.resultSets[0].rowSet[i][3];
               playerID[i] = r.resultSets[0].rowSet[i][12];
               var name = document.getElementById("p"+(i+1));
               name.textContent = playerName[i];
            }
            statIterator(playerID);
         },
         complete:function(){
               showstats();
         }

      })

   }) // search

});

function statIterator(id) {
   for(var j = 0; j <id.length; j++) 
      addToStats(id,j)
}

function addToStats(id,j) {
   $.ajax({
      type: "GET",
      dataType: 'jsonp',
      url: 'http://stats.nba.com/stats/playerprofilev2/?',
      data: {
         playerid: id[j],
         PerMode: 'PerGame'
      },
      success: function (result) {
         var a =false;
         var age = document.getElementById("a"+(j+1));
         var mpg = document.getElementById("m"+(j+1));
         var fga = document.getElementById("fg"+(j+1));
         var fgm = document.getElementById("fgm"+(j+1));
         var fgp = document.getElementById("fgp"+(j+1));
         var reb = document.getElementById("r"+(j+1));
         var ast = document.getElementById("as"+(j+1));
         var stl = document.getElementById("st"+(j+1));
         var blk = document.getElementById("b"+(j+1));
         var tov = document.getElementById("t"+(j+1));
         var pts = document.getElementById("pt"+(j+1));
         age.textContent = result.resultSets[0].rowSet[result.resultSets[0].rowSet.length-1][5];
         mpg.textContent = result.resultSets[0].rowSet[result.resultSets[0].rowSet.length-1][8];
         fga.textContent = result.resultSets[0].rowSet[result.resultSets[0].rowSet.length-1][10];
         fgm.textContent = result.resultSets[0].rowSet[result.resultSets[0].rowSet.length-1][9]; 
         fgp.textContent = result.resultSets[0].rowSet[result.resultSets[0].rowSet.length-1][11];
         reb.textContent = result.resultSets[0].rowSet[result.resultSets[0].rowSet.length-1][20];
         ast.textContent = result.resultSets[0].rowSet[result.resultSets[0].rowSet.length-1][21];
         stl.textContent = result.resultSets[0].rowSet[result.resultSets[0].rowSet.length-1][22];
         blk.textContent = result.resultSets[0].rowSet[result.resultSets[0].rowSet.length-1][23]; 
         tov.textContent = result.resultSets[0].rowSet[result.resultSets[0].rowSet.length-1][24];
         pts.textContent = result.resultSets[0].rowSet[result.resultSets[0].rowSet.length-1][26];
      }
   })
}
function showstats() {
            $('#statcontainer').show();
}