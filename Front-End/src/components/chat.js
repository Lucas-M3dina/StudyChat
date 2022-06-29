var messages = [], 
  lastUserMessage = "", 
  botMessage = "", 
  botName = 'Charles',
  talking = true; 

function chatbotResponse() {
  talking = true;
  botMessage = "Não entendi"; 

  if (lastUserMessage === 'oi' || lastUserMessage =='olá') {
    const hi = ['oi','Opa!','Olá']
    botMessage = hi[Math.floor(Math.random()*(hi.length))];;
  }

  if (lastUserMessage === 'nome') {
    botMessage = 'Meu nome é ' + botName;
  }
}

function newEntry() {

  if (document.getElementById("chatbox").value != "") {

    lastUserMessage = document.getElementById("chatbox").value;

    document.getElementById("chatbox").value = "";

    messages.push(lastUserMessage);

    chatbotResponse();

    messages.push("<b>" + botName + ":</b> " + botMessage);
   
    Speech(botMessage);

    for (var i = 1; i < 8; i++) {
      if (messages[messages.length - i])
        document.getElementById("chatlog" + i).innerHTML = messages[messages.length - i];
    }
  }
}


function Speech(say) {
  if ('speechSynthesis' in window && talking) {
    var utterance = new SpeechSynthesisUtterance(say);
    //msg.voice = voices[10]; // 
    //msg.voiceURI = 'native';
    //utterance.volume = 1; // 0 to 1
    //utterance.rate = 0.1; // 0.1 to 10
    //utterance.pitch = 1; //0 to 2
    //utterance.text = 'Hello World';
    //utterance.lang = 'en-US';
    speechSynthesis.speak(utterance);
  }
}

document.onkeypress = keyPress;

function keyPress(e) {
  var x = e || window.event;
  var key = (x.keyCode || x.which);
  if (key == 13 || key == 3) {

    newEntry();
  }
  if (key == 38) {
    console.log('hi')

  }
}

function placeHolder() {
  document.getElementById("chatbox").placeholder = "";
}