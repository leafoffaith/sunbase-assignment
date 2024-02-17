// formDesigner.js
// Sample JSON data
const formData = [
    { type: 'input', label: 'Name', placeholder: 'Enter your name' },
    { type: 'select', label: 'Country', options: ['USA', 'Canada', 'UK'] },
    { type: 'textarea', label: 'Comments', placeholder: 'Enter your comments' }
];

/**
 * @description main function that renders the form each time 
 * a new element is added or removed
 */
function renderForm() {
    const formContainer = document.getElementById('form-elements');
    formContainer.innerHTML = '';

    formData.forEach((element, index) => {
        // Create a wrapper div for each form element
        const formWrapper = document.createElement('div');
        formWrapper.className = 'form-wrapper form-element';
        formWrapper.setAttribute('draggable', true);

        const formElement = document.createElement(`${element.type}`);
        formElement.className = 'form-element item'; // Added 'item' class for sortable list
        formElement.setAttribute('draggable', true);

        // Set placeholder
        formElement.placeholder = element.placeholder;
        if (element.type === 'select') {
            element.options.forEach((el) => {
                let opt = document.createElement('option');
                opt.value = el;
                opt.innerHTML = el;
                formElement.appendChild(opt);
            });
        }

        formElement.addEventListener('dragstart', (e) => {
            e.dataTransfer.setData('text/plain', index);
            setTimeout(() => formElement.classList.add("dragging"), 0);
        });

        formElement.addEventListener('dragend', () => {
            formElement.classList.remove("dragging");
            renderForm(); // Update the form after reordering
        });

        // Create a delete button
        const deleteButton = document.createElement('span');
        deleteButton.className = 'delete-button';
        deleteButton.innerText = 'Delete';
        deleteButton.addEventListener('click', () => deleteElement(index));

        // Append form element and delete button to the wrapper div
        formWrapper.appendChild(formElement);
        formWrapper.appendChild(deleteButton);

        // Append the wrapper div to the form container
        formContainer.appendChild(formWrapper);
    });
}


function addElement(type) {
    formData.push({
        type,
        label: `New ${type.charAt(0).toUpperCase() + type.slice(1)}`,
        placeholder: 'Enter value',
        options: type === 'select' ? ['Option 1', 'Option 2'] : undefined
    });

    renderForm();
}

function deleteElement(index) {
    formData.splice(index, 1);
    renderForm();
}

function saveForm() {
    console.log(formData);
}

renderForm();

/**
 * @description sortable list logic
 */
const sortableList = document.querySelector(".sortable-list");

sortableList.addEventListener("dragover", (e) => e.preventDefault());
sortableList.addEventListener("dragenter", (e) => e.preventDefault());

sortableList.addEventListener("drop", (e) => {
    const draggingIndex = parseInt(e.dataTransfer.getData("text/plain"));
    const dropIndex = Array.from(sortableList.children).indexOf(e.target);

    // Move the dragged element to the new position
    formData.splice(dropIndex, 0, formData.splice(draggingIndex, 1)[0]);
    renderForm();
});
