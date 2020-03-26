document.querySelector('body').addEventListener('click', clickHandler);

function clickHandler(event) {
	if (!event.target.hasAttribute('editable')) return;

	event.preventDefault();

	const { target: targetElement } = event;

	const type = targetElement.getAttribute('editable');

	const inputElement = document.createElement('input');
	inputElement.setAttribute('type', type);

	targetElement.parentNode.appendChild(inputElement);
	inputElement.value = targetElement.innerText;
	targetElement.remove();
	// targetElement.parentNode.removeChild(targetElement);

	// inputElement.focus();
	inputElement.select();

	inputElement.addEventListener('keyup', function(event) {
		switch (event.which) {
			case 13: // save
				inputElement.parentNode.appendChild(targetElement);
				// targetElement.innerText = this.value;
				targetElement.innerText = inputElement.value;
				inputElement.remove();
				break;
			case 27: // cancel
				inputElement.parentNode.appendChild(targetElement);
				inputElement.remove();
				break;
		}
	});
}

