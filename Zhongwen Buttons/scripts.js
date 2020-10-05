var html = `
<div id="answerButtons" class="zh-buttons-bottom">
    <div id="tts" class="zh-buttons btn4">TTS</div>
    <div id="save_words" class="zh-buttons btn3">Save</div>
    <div id="view_words" class="zh-buttons btn2">View</div>
</div>
`

var div = document.createElement("zhongwenbuttons")
div.innerHTML = html;
document.body.appendChild(div);

document.getElementById("save_words").addEventListener("click", saveWords);

function saveWords() {
    // r
    sendKeyBoardButton("r", 82, "KeyR", 82, false);
}

document.getElementById("view_words").addEventListener("click", viewWordList);

function viewWordList() {
    // alt + w
    sendKeyBoardButton("w", 87, "KeyW", 87, true);
}


function sendKeyBoardButton(key, keyCode, code, which, alt) {
    document.dispatchEvent(
        new KeyboardEvent("keydown", {
            key: key,
            keyCode: keyCode,
            code: code,
            which: which,
            shiftKey: false,
            ctrlKey: false,
            metaKey: false,
            altKey: alt,
        })
    );
}

document.getElementById("tts").addEventListener("click", textToSpeech);

var tmp = "";
function textToSpeech() {
    var ht = document.getElementById('zhongwen-window').innerHTML;
    firstChar = ht.split("&nbsp;")[0].replace(/<\/?[^>]+(>|$)/g, "");
    // console.log(firstChar);
    if (firstChar != "") {
        tmp = firstChar;
        speak(firstChar)
    } else {
        speak(tmp)
    }
}

function speak(m) {
    var msg = new SpeechSynthesisUtterance();
    var voices = window.speechSynthesis.getVoices();
    msg.voice = voices[10];
    msg.voiceURI = "native";
    msg.volume = 1;
    msg.rate = 1;
    msg.pitch = 0.8;
    msg.text = m;
    msg.lang = 'zh-CN';
    speechSynthesis.speak(msg);
}