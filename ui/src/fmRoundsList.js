/**
 * fmRoundsList.js
 * Displays a list of rounds according to the fetch type.
 * When the GO button is clicked, it executes the fetch and updates result table.
 * When a round is clicked, it is brought to fmRoundsDetails with the ID.
 */

import { apiPath } from './vars';
import { devLog } from './util';

class fmRoundsList {
    constructor() {
        this.fetchTypeOpts = ['recent', 'server', 'player'];
        this.fetchServerOpts = ['us1', 'us2', 'eu1', 'eu2', 'eu3'];
        this.fetchType = this.fetchTypeOpts[0];
        this.fetchServer = this.fetchServerOpts[0];
        this.setElementRefs();
        this.voidRegisterElementEvents();
        this.labelStatus = "Ready.";
    }

    get labelStatus() {
        return this._labelStatus;
    }
    set labelStatus(value) {
        this._labelStatus = value;
        this.elementRefs.labelStatus.textContent = "Status: " + value;
        
    }

    get tableData() {
        return this._tableData;
    }
    set tableData(value) {
        this._tableData = value;
        this.voidUpdateTableEl();
    }

    setElementRefs() {
        this.elementRefs = {
            ftypedd: document.querySelector('#fetch-type'),
            fgobtn: document.querySelector('#fetch-btn'),
            fserverdd: document.querySelector('#serverdd'),
            fplayeri: document.querySelector('#fplayeri'),
            labelStatus: document.querySelector('#label-status'),
            hiddenfields: document.querySelectorAll('.-hidden-field'),
            table: document.querySelector('#table')
        };
    }

    setResults() {
        this.labelStatus = "Getting data..."
        fetch(apiPath + this.getApiEndpoint())
            .then(r => r.json())
            .then(r => {
                if (Array.isArray(r)) {
                    this.tableData = r;
                    this.labelStatus = "Received data. Got " + r.length + " results.";
                    devLog(r);
                }
            })
            .catch(err => {
                console.error(err);
                this.labelStatus = "Failed to complete request."
            })
    }

    getApiEndpoint() {
        let endpoint = '/fmRoundsList';
        if (this.fetchType === this.fetchTypeOpts[0]) 
            return endpoint + "/list";
        if (this.fetchType === this.fetchTypeOpts[1]) 
            return endpoint + "/listByServer/" + this.fetchServer;
        if (this.fetchType === this.fetchTypeOpts[2])
            return endpoint + "/listByPlayer/" + this.elementRefs.fplayeri.value;
    }

    voidRegisterElementEvents() {
        // Fetch type dropdown onchange
        this.elementRefs.ftypedd.onchange = e => {
            this.voidShowHiddenField(e.target.value);
            if (this.fetchTypeOpts.includes(e.target.value)) 
                this.fetchType = e.target.value;
        }
        // Fetch server dropdown onchange
        this.elementRefs.fserverdd.onchange = e => {
            if (this.fetchServerOpts.includes(e.target.value))
                this.fetchServer = e.target.value;
            devLog(e.target.value);
        }
        // Fetch go button onclick
        this.elementRefs.fgobtn.onclick = () => {
            if (this.fetchType === this.fetchTypeOpts[2]
                && !/^STEAM_.:[0-1]:\d+$/.test(this.elementRefs.fplayeri.value)) 
                return this.labelStatus = "Error: Player Steam ID field invalid format."
            this.setResults();
        }
    }

    voidShowHiddenField(field) {
        this.elementRefs.hiddenfields.forEach(el => {
            if (el.dataset.value === field) el.classList = "";
            else el.classList = "is-hidden";
        });
    }

    voidUpdateTableEl() {
        let td = (val) => `<td>${val}</td>`;
        let tbody = this.elementRefs.table.querySelector('tbody');
        let tempHtml = '';
        this.tableData.forEach(row => {
            let dateTd = `<a href="/fmRoundsDetails#id=${row.id}">${new Date(row.date).toLocaleString()}</a>`
            tempHtml += '<tr>' + td(dateTd) + td(row.server) + td(row.players) 
                + td(row.duration) + td(row.event || '');
        })
        tbody.innerHTML = tempHtml;
    }
}


export default function() {
    new fmRoundsList();
}