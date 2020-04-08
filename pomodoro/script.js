const toggle = document.querySelector('.toggle')
const audio = document.getElementById('tune')

let min = 25
let sec = 0
let method = 0

function toggleButton () {
  method = !method

  method ? startTimer() : stopTimer()
  updateButton()
}

function updateButton () {
  toggle.textContent = method ? 'Stop' : 'Start'
}

function displayTimer () {
  const change = document.getElementById('time')
  let showtime
  showtime = min < 10 ? '0' + min : min
  showtime += ':'
  showtime += sec < 10 ? '0' + sec : sec

  change.textContent = showtime
}

function startTimer () {
  interval = setInterval(() => {
    if (min === 0 && sec === 0) {
      stopTimer()
      alarm()
    } else if (sec === 0) {
      min -= 1
      sec = 59
    } else {
      sec--
    }

    displayTimer()
  }, 1000)
}

function stopTimer () {
  clearInterval(interval)
  audio.pause()
}

function resetTimer () {
  if (min !== 25 && sec !== 0) {
    min = 25
    sec = 0
    method = 0    // for stop button toggle --- case -time 23:00, clock already stopped, here reset of start/stop button not required
    updateButton()
  }
  displayTimer()
  stopTimer()
  audio.pause()
}

function alarm () {
  audio.play()
}

toggle.addEventListener('click', toggleButton)
