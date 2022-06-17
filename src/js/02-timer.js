import flatpickr from "flatpickr";
import "flatpickr/dist/flatpickr.min.css";
import Notiflix from 'notiflix';
Notiflix.Notify.init({
    position: "center-top",
    distance: '100px',
});

flatpickr("#datetime-picker", {
    enableTime: true,
    time_24hr: true,
    defaultDate: new Date(),
    minuteIncrement: 1,
    onClose(selectedDates) {
        console.log(selectedDates[0]);
    },
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

flatpickr("#datetime-picker", {
    enableTime: true,
    time_24hr: true,
    defaultDate: new Date(),
    minuteIncrement: 1,
    onClose(selectedDates) {
        console.log(selectedDates[0]);

        const userDate = selectedDates[0].getTime();
        const currentDate = Date.now();
        let intervalId = null;

        if (userDate < currentDate) {
            Notiflix.Notify.failure('Please choose a date in the future');
        } else {
            refs.startBtn.removeAttribute('disabled');

            

            refs.startBtn.addEventListener('click', onStartBtnClick);

            function onStartBtnClick() { 
                
                intervalId = setInterval(() => {
                const userDate = selectedDates[0].getTime();
                const currentDate = Date.now();
                const deltaTime = userDate - currentDate;
                    
                if(userDate - currentDate >=0){
                const time = convertMs(deltaTime);
                updateClockface(time);}

            }, 1000);
            }
           
        };
    }
});
   
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

