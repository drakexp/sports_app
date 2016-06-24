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


   // nba.com api call
   $("#nbasearch").on("submit",function(e){
      e.preventDefault();
      var teamID = $(this).find(':selected')[0].id;
      $.ajax({
         type: "GET",
         dataType: 'jsonp',
         crossDomain: true,   
         url: 'http://stats.nba.com/stats/commonteamroster/?',
         data: {
            teamid: teamID,
            season: '2015-16' 
         },
         success: function (result) {
            var playerName = new Array(); 
            var playerID = new Array();
            for(var i = 0; i < result.resultSets[0].rowSet.length; i++) {
               console.log(result.resultSets[0].rowSet[i][3]);
               playerName[i] = result.resultSets[0].rowSet[i][3];
               playerID[i] = result.resultSets[0].rowSet[i][12];
               var name = document.getElementById("p"+(i+1));
               name.textContent = playerName[i];
               var x = result.resultSets[0].rowSet.length-1;
               $.ajax({
                  type: "GET",
                  dataType: 'jsonp',
                  crossDomain: true,   
                  url: 'http://stats.nba.com/stats/playerprofilev2/?',
                  data: {
                     playerid: playerID[i],
                     PerMode: 'PerGame'
                  },
                  success: function (result) {
                     console.log(x);
                     var age = document.getElementById("a"+(x+1));
                     age.textContent = result.resultSets[0].rowSet[result.resultSets[0].rowSet.length-1][5];
                     console.log(result.resultSets[0].rowSet[result.resultSets[0].rowSet.length-1][5]);

                        $('#statcontainer').show();
                  }
               })
            }
         }
      });        
   }); // search


});

function addToStats() {
  var ul = document.getElementById("playlist");
  var li = document.createElement("li");
  var a = document.createElement("a");
  a.setAttribute("href", "#");
  a.setAttribute("id",playlist.plist.length);
  a.setAttribute("class", "plisttitle");
  a.textContent = playlist.plist[playlist.plist.length-1].replace(/^.*[\\\/]/, '');
  a.addEventListener("click", function(e) {  // add click listener
   var titles = document.getElementsByClassName("plisttitle");
   for(var i = 0; i < titles.length; i++) {
      document.getElementById(titles[i].id).style.color = "black";
   } // reset
   document.getElementById(this.id).style.color = "red";
   playlist.playlistSong(this.id)});
  li.appendChild(a);
  ul.appendChild(li);
}