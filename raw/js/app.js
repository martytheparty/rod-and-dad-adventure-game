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
var playerRef;
var playerlist = [];
var characterRefs = [];

playersRef.on('value', function(snapshot) {
  var html = '';
  playerlist = [];
  snapshot.forEach(function(childSnapshot){
    var customStyle = '';
    var player = childSnapshot.val();
    var key = childSnapshot.key;
    var playerKey = childSnapshot.key;
    html = html + player.playerName + '-' + player.p + '<br> \n';
    var characters = player.characters;
    if (characters) {
      for (var key in characters) {

          if (characters.hasOwnProperty(key)) {
            html = html + ' - '
            html = html + characters[key].name
            if (characters[key].proposedHitPoints != characters[key].hitPoints) {
              customStyle = ';background-color:#fcc';
            } else {
              customStyle = '';
            }
            html = html + ' <input id="prop'+key+'" type="text" style="width:50px'+customStyle+'" value="' + characters[key].hitPoints + '">'
            html = html + characters[key].proposedHitPoints;
            html = html + ' <button onclick="updateCharacter(\''+key+'\', \''+playerKey+'\')">Update</button> ';
            html = html + '<br>';
          }
      }


    }

    playerlist.push({key: playerKey, username:player.playerName,p:player.p});

  });
  $('#adminPlayerList').html(html);
});

$('#login-player-form').hide('');
$('#login-dungeon').hide();
$('#admin-dungeon').hide();
$('#loading').hide();
$('#loaded').show();
$('#secret').val('');
$('#create-new-player').hide();
$('#player-logged-in').hide();

function updateCharacter(key, playerKey) {
  var characterRef = firebase.database().ref('players/'+playerKey+'/characters/'+key);
  characterRef.update({hitPoints: $('#prop' + key).val()});
}

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
  var found = false;
  var username = $("#username").val();
  var p = $("#word").val();
  for(var i=0;i<playerlist.length;i++){
    if (playerlist[i].username === username && playerlist[i].p === p) {
      $('#login-player-form').hide();
      $('#player-logged-in').show();

      $('#username').val("");
      $('#word').val("");
      found = true;
      playerRef = firebase.database().ref('players/' + playerlist[i].key + '/characters');
      playerRef.on('value', function(snapshot) {
        var playerHtml = '';
        snapshot.forEach(function(childSnapshot){
          var character = childSnapshot.val();
          var key = childSnapshot.key;
          characterRefs[key] = childSnapshot.ref;
          playerHtml = playerHtml + character.name + ' ' + character.hitPoints + '/'
          playerHtml = playerHtml + '<input onkeyup="requestHpChange(\''+key+'\', this)" style="width:50px" type="text" value=' + character.proposedHitPoints + '><br>';
        });
        $("#list-characters").html(playerHtml);
      });
    }
  };

  if (!found) {
    alert(username + ' was not found');
  }

}

function requestHpChange(key, caller) {
  characterRefs[key].update({proposedHitPoints:caller.value});
}

function addCharacter() {
  var characterName = $('#character-new-name').val();
  playerRef.push({name: characterName, hitPoints: 0, proposedHitPoints: 0});
}

function showPlayerSelection() {
  $('#new-player').hide();
  $('#player-enter').hide();
  $('#enter-dungeon').hide();
  $('#login-player-form').show();

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

  $('#login-player-form').hide();
  $('#login-dungeon').hide();
  $('#admin-dungeon').hide();
  $('#loading').hide();
  $('#loaded').show();
  $('#secret').val('');
  $('#create-new-player').hide();
  $('#enter-dungeon').show();
  $('#player-enter').show();
}
