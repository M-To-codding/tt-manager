export default function createModal(e, task, save) {
  let div = document.createElement('div'),
    description = task.description;

  if(!description) {
    description = 'Description not found';
  }

  div.classList.add('modal-window');
  div.innerHTML = `
    <div class="modal-window-content">
      <textarea id="description-area" type="text">${description}</textarea>
</div>
  `;

  document.body.appendChild(div);
  let textarea = document.getElementById('description-area');
  textarea.onchange = function (e) {
    save(e, task);
    description = e.target.value;
  };

  document.body.style.overflowY = 'hidden';

  document.body.onclick = function (e) {
    if (e.target.classList.contains('modal-window')) {

      removeModalWindow(e.target);
      document.body.onclick = undefined;
    }
  }
}

function removeModalWindow(modal) {
  modal.remove();
  document.body.style.overflowY = 'auto';
}