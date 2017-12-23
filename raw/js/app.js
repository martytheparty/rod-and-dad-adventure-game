var config = {
    apiKey: "AIzaSyAUJv6HSEpIXJj1q2Ve-TJfqsoGtW2gacA",
    authDomain: "heroesandhalfwits.firebaseapp.com",
    databaseURL: "https://heroesandhalfwits.firebaseio.com",
    projectId: "heroesandhalfwits",
    storageBucket: "heroesandhalfwits.appspot.com",
    messagingSenderId: "598830130551"
  };

firebase.initializeApp(config);



var specialRef = firebase.database().ref('special');
var playersRef = firebase.database().ref('players');
var playerlist = [];

playersRef.on('value', function(snapshot) {
  var html = '';
  playerlist = [];
  snapshot.forEach(function(childSnapshot){
    var player = childSnapshot.val();
    html = html + player.playerName + '-' + player.p + '<br> \n';
    playerlist.push({username:player.playerName,p:player.p});
  });
  $('#adminPlayerList').html(html);
});

$('#player-login').hide('');
$('#login-dungeon').hide();
$('#admin-dungeon').hide();
$('#loading').hide();
$('#loaded').show();
$('#secret').val('');
$('#create-new-player').hide();

function enterDungeonMaster() {
  $('#new-player').hide();
  $('#enter-dungeon').hide();
  $('#player-enter').hide();
  $('#login-dungeon').show();
}

function adminLogin() {
  var secret = $('#secret').val();

  specialRef.once(
    'value',
    function onceHandler(snapshot) {
      var specialFromDb = snapshot.val();
      if (secret == specialFromDb) {
        $('#login-dungeon').hide();
        $('#admin-dungeon').show();
      } else {
        alert('try again');
      }

    }
  );
}
function loginPlayer() {
  var username = $("#username").val();
  var p = $("#word").val();
  for(var i=0;i<playerlist.length;i++){
    console.log(playerlist[i]);

  };
}
function showPlayerSelection() {
  $('#new-player').hide();
  $('#player-enter').hide();
  $('#enter-dungeon').hide();
  $('#player-login').show();

}

function showNewPlayer() {
  $('#new-player').hide();
  $('#player-enter').hide();
  $('#enter-dungeon').hide();
  $('#create-new-player').show();

}

function addPlayer() {
  var playerObject = {};
  playerObject.playerName = $("#adminPlayerEntry").val();
  playerObject.p = 'gamer';
  playersRef.push(playerObject);
  $('#adminPlayerEntry').val("");
}

function createNewPlayer(){
  var playerObject = {};
  playerObject.playerName = $("#playername").val();
  playerObject.p = 'gamer';
  playersRef.push(playerObject);
  $('#playername').val("");

  $('#player-login').hide('');
  $('#login-dungeon').hide();
  $('#admin-dungeon').hide();
  $('#loading').hide();
  $('#loaded').show();
  $('#secret').val('');
  $('#create-new-player').hide();
  $('#enter-dungeon').show();
  $('#player-enter').show();
}
