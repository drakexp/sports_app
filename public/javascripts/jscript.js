$(document).ready(function(){
   
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


   // // nba.com api call
   // $("#nbasearch").on("submit",function(e){
   //    e.preventDefault();
   //    var formData = {
   //       'team'              : $('input[name=selection]').val(),
   //    };

   //    $.ajax({
   //       type: "GET",
   //       crossDomain: true,  
   //       url: 'http://stats.nba.com/stats/commonteamroster/?',
   //       data: {
   //          teamid: 
   //          season: '2015-16' 
   //       },
   //       success: function (result) {
   //          console.log(result);
   //       }
   //    });
   // }); // search

   document.getElementById('nbalist').onchange = function(){
      document.getElementById('form').action += this.value;
   }
});