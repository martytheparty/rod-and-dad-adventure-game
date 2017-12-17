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

playersRef.on('value', function(snapshot) {
  var html = '';
  snapshot.forEach(function(childSnapshot){
    var player = childSnapshot.val();
    html = html + player.playerName + '-' + player.p + '<br> \n';
  });
  $('#adminPlayerList').html(html);
});

$('#player-login').hide('');
$('#login-dungeon').hide();
$('#admin-dungeon').hide();
$('#loading').hide();
$('#loaded').show();
$('#secret').val('');

function enterDungeonMaster() {
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
  alert('login player');

}
function showPlayerSelection() {
  $('#player-enter').hide();
  $('#enter-dungeon').hide();
  $('#player-login').show();

}

function addPlayer() {
  var playerObject = {};
  playerObject.playerName = $("#adminPlayerEntry").val();
  playerObject.p = 'gamer';
  playersRef.push(playerObject);
  $('#adminPlayerEntry').val("");
}
