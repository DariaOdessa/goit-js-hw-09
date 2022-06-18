import flatpickr from "flatpickr";
import "flatpickr/dist/flatpickr.min.css";
import Notiflix, { Notify } from 'notiflix';
Notiflix.Notify.init({
    position: "center-top",
    distance: '100px',
});

const refs = {
    startBtn: document.querySelector('button[data-start]'),
    datetimePicker: document.querySelector('#datetime-picker'),
    days: document.querySelector('.value[data-days]'),
    hours: document.querySelector('.value[data-hours]'),
    minutes: document.querySelector('.value[data-minutes]'),
    seconds: document.querySelector('.value[data-seconds]')  
};

refs.startBtn.setAttribute('disabled', 'disabled');

const options = {
    enableTime: true,
    time_24hr: true,
    defaultDate: new Date(),
    minuteIncrement: 1,
    onClose(selectedDates) {
        if (selectedDates[0] < new Date()) {
        Notify.failure('Please choose a date in the future');
            return;
        }
        refs.startBtn.removeAttribute('disabled');        
     }
}

const timePicker = flatpickr("#datetime-picker", options);

refs.startBtn.addEventListener('click', countDown);

let intervalID = null;

function countDown() { 
    intervalID = setInterval(() => {
    const userDate = timePicker.selectedDates[0].getTime();
    const currentDate = Date.now();
    const deltaTime = userDate - currentDate;
    const time = convertMs(deltaTime);
        updateClockface(time);  
        
        if (deltaTime < 1000) {
            clearInterval(intervalID);
            Notify.success('Your timer stopped!');
            refs.datetimePicker.removeAttribute('disabled');
    }
    }, 1000);

    refs.startBtn.setAttribute('disabled', 'disabled');
    refs.datetimePicker.setAttribute('disabled', 'disabled');
        
    }
    



   
function updateClockface({ days, hours, minutes, seconds }) {
        refs.days.textContent = `${days}`;
        refs.hours.textContent = `${hours}`;
        refs.minutes.textContent = `${minutes}`;
        refs.seconds.textContent = `${seconds}`;
}; 
    
function convertMs(time) {
    
        const second = 1000;
        const minute = second * 60;
        const hour = minute * 60;
        const day = hour * 24;

        const days = pad(Math.floor(time / day));
        const hours = pad(Math.floor((time % day) / hour));
        const minutes = pad(Math.floor(((time % day) % hour) / minute));
        const seconds = pad(Math.floor((((time % day) % hour) % minute) / second));

        return { days, hours, minutes, seconds };
    };

function pad(value) {
        return String(value).padStart(2, "0");
};

