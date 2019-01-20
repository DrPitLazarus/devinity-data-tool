let state = {
    fetchTypeValue: 'recent',
    serverValue: '',
    apiDataRaw: false
};

let elFetchTypeDD = document.querySelector('#fetch-type');
let elFetchButton = document.querySelector('#fetch-btn');
let elServerDD = document.querySelector('#serverdd');
let elTable = document.querySelector('#table');
let hiddenFields = document.querySelectorAll('.-hidden-field');

function showHiddenField() {
    // hide all hidden fields
    hiddenFields.forEach(el => el.classList = "is-hidden");
    // show the field with the selected type
    hiddenFields.forEach(el => {
        if (el.dataset.value === state.fetchTypeValue) el.classList = "";
    });
}

// on fetch type drop down change
elFetchTypeDD.onchange = e => {
    // set the selected value
    state.fetchTypeValue = e.target.value;
    debug(`fetch type value = ${e.target.value}`);
    showHiddenField();
}

elServerDD.onchange = e => {
    state.serverValue = e.target.value;
    debug(`server value = ${e.target.value}`);
}

elFetchButton.onclick = () => {
    let endpoint = "/fmRoundsList";
    if (state.fetchTypeValue === 'recent') {
        endpoint += '/list'
        doFetchData(endpoint);
    }
    if (state.fetchTypeValue === 'server') {
        endpoint += '/listByServer/' + state.serverValue;
        doFetchData(endpoint);
    }
}

function doFetchData(endpoint) {
    fetch(apiUrl + endpoint)
        .then(handleFetchErrors)
        .then(r => {
            state.apiDataRaw = r
            debug(`fetch api result = `, r);
            renderTable();
        })
        .catch(err => console.error(err));
}

function renderTable() {
    let tbody = elTable.querySelector('tbody');
    let temp = "";
    state.apiDataRaw.forEach(row => {
        temp += `<tr>
        <td><a href="fmRoundsDetails#${row.id}">${convertDate(row.date)}</a></td><td>${row.server}</td>
        <td>${row.players}</td><td>${row.duration}</td><td>${row.event||""}</td></tr>`
    });
    tbody.innerHTML = temp;
}

function convertDate(date) {
    let d = new Date(date);
    return d.toLocaleString()
}