export default function setTime(e) {

  let target = e.target,
    div = document.createElement('div'),
    resetBtn = '';

  let timer = new Timer(target);

  e.target.setAttribute('disabled', 'true');

  resetBtn = '<button class="reset-timer -red-bg"> Reset timer' +
    '</button>';
  div.innerHTML = resetBtn;
  e.target.parentNode.appendChild(div);

}

function Timer(e) {
  let i = 0;
  let timer = setInterval(function () {
    e.textContent = i;
    parseInt(i++);
  }, 1000);

}


