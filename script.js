document.querySelector('body').addEventListener('click',  cickHandler);
function  cickHandler(event) {
	if(!event.target.hasAttribute('editable')) return;

	event.preventDefault();

	const {target:targetElement} = event;

	const type = targetElement.getAttribute('editable');
	console.log('type', type);
	const inputElement = document.createElement('input');
	inputElement.setAttribute('type', type);

	const save = document.createElement('button');
	const saveIcon = document.createElement('span');
	save.classList.add('btn', 'btn-primary', 'btn-xs', 'btn-action');
	saveIcon.classList.add('glyphicon', 'glyphicon-ok');

	const cancel = document.createElement('button');
	const cancelIcon = document.createElement('span');
	cancel.classList.add('btn', 'btn-danger', 'btn-xs', 'btn-action');
	cancelIcon.classList.add('glyphicon', 'glyphicon-remove');

	targetElement.parentNode.appendChild(inputElement).after(cancel);
	inputElement.after(save);
	save.appendChild(saveIcon);
	cancel.appendChild(cancelIcon);
	inputElement.value = targetElement.innerText;

	targetElement.remove();
	inputElement.select();

	inputElement.addEventListener('keyup', function(event) {
		switch (event.which) {
			case 13: //save
				inputElement.parentNode.appendChild(targetElement);
				targetElement.innerText = this.value;
				inputElement.remove();
				break;
			case 27://cancel
				inputElement.parentNode.appendChild(targetElement);
				inputElement.remove();
				break;
		}
	});

	save.addEventListener('click', function() {
		inputElement.parentNode.appendChild(targetElement);
		targetElement.innerText = inputElement.value;
		inputElement.remove();
		this.remove();
		cancel.remove();
	});

	cancel.addEventListener('click', function() {
		inputElement.parentNode.appendChild(targetElement);
		inputElement.remove();
		this.remove()
		save.remove();
	});

}