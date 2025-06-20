function updateClock() {
    const now = new Date();
    const options = { timeZone: 'Asia/Bangkok' };

    const time = now.toLocaleTimeString('en-GB', {
      ...options,
      hour: '2-digit',
      minute: '2-digit',
      second: '2-digit'
    });

    const date = now.toLocaleDateString('en-GB', options);

    document.getElementById('time').textContent = time;
    document.getElementById('date').textContent = date;
  }

  setInterval(updateClock, 1000);
  updateClock();