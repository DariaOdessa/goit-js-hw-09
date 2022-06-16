const refs = {
    body: document.querySelector('body'),
    startBtn: document.querySelector('button[data-start]'),
    stopBtn: document.querySelector('button[data-stop]')
}

refs.startBtn.addEventListener('click', onBtnStartClick);
refs.stopBtn.addEventListener('click', onBtnStopClick);

refs.stopBtn.setAttribute('disabled', 'disabled');

let intervalID = null;

function onBtnStartClick() {
    
    intervalID = setInterval(() => {
        const newColor = getRandomHexColor();
        refs.body.style.backgroundColor = newColor;
    }, 1000);

    refs.startBtn.setAttribute('disabled', 'disabled');
    refs.stopBtn.removeAttribute('disabled');
}

function onBtnStopClick() {
    clearInterval(intervalID);
    refs.startBtn.removeAttribute('disabled');
    refs.stopBtn.setAttribute('disabled', 'disabled');
}

function getRandomHexColor() {
  return `#${Math.floor(Math.random() * 16777215).toString(16)}`;
}