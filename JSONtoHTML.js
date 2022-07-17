//generate a unique ID
function createID(key, id) {
    if (key in id) {
        id[key]++;
    }
    else {
        id[key] = 0;
    }
    return id[key];
}

//Create the element that actually contains text content
function createContentElement(curObject, key, id) {
    console.log(key);
    newElement = document.createElement("div");
    newElement.textContent = curObject[key];
    newElement.classList.add(key);
    newElement.id = key + createID(key, id);
    return newElement;
}

//recursively generates a div for each level of the object
//until a non-object member is reached
function generateHTML(parentElement, curObject, id) {

    //Get list of all the keys for the current object
    const keys = Object.keys(curObject);

    for (let i = 0; i < keys.length; i++) {
        if (curObject[keys[i]] === null || typeof curObject[keys[i]] != 'object') {
            parentElement.appendChild(createContentElement(curObject, keys[i], id));
        }
        else {
            parent = document.createElement('div');
            parent.classList.add(keys[i]);
            parentElement.appendChild(parent);
            generateHTML(parent, curObject[keys[i]], id);
        }
    }
}

//Calls the recurisve functions that creates the HTML and then adds it to the document
function addHTML() {
    //Main outer div that contains all the information
    const mainDiv = document.createElement('div');

    //Body JSON object
    const jOb = JSON.parse(document.body.textContent);

    //unique id object
    const id = {};

    generateHTML(mainDiv, jOb, id);

    document.body.append(mainDiv);

}

