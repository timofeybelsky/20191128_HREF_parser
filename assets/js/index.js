'use strict';

// <a .*?href\s*?=\s*?"(.*github\.com.*?)".*?>(.*?)<\/a\s*?>

const LINK_PATTERN = /<a .*?href\s*?=\s*?"(?<linkValue>.*?\bgithub\b.*?)".*?>(?<linkName>.*?)<\/a\s*?>/g;
const LINK_PARSER_PATTERN = new RegExp(LINK_PATTERN.source);

const textareaElem = document.querySelector("textarea[name='userHtml']");
const formElem = document.getElementsByTagName("form")[0];
const tbodyElem = document.getElementsByTagName('tbody')[0];

formElem.onsubmit = function () {

    const result = textareaElem.value.match(LINK_PATTERN);
    tbodyElem.innerHTML = "";
    result.forEach(
        link => {
            const matchResult = link.match(LINK_PARSER_PATTERN);
            if (matchResult) {
                const {groups: {linkValue, linkName}} = matchResult;
                tbodyElem.appendChild(createTableRow(linkName, linkValue));
            }

        }
    );

    return false;
};

let i = 0;

function createTableRow(linkName, linkValue) {

    const tableRowElem = document.createElement('tr');
    const tableDataNumberElem = document.createElement('td');
    const tableDataLinkNameElem = document.createElement('td');
    const tableDataLinkValueElem = document.createElement('td');



    tableDataNumberElem.innerText = ++i;
    tableDataLinkNameElem.innerText = linkName;
    tableDataLinkValueElem.innerText = linkValue;

    tableRowElem.appendChild(tableDataNumberElem);
    tableRowElem.appendChild(tableDataLinkNameElem);
    tableRowElem.appendChild(tableDataLinkValueElem);


    return tableRowElem;

}
