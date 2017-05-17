'use strict';

const collator = new Intl.Collator(['ru', 'en-GB'], {
    sensitivity: 'accent',
    ignorePunctuation: true
});

let fromEl;
let questsSet;
let allQuests;
const regExpStarted = /у (\d+)/;

function cmpAlph(quest1, quest2) {
    const nameBlock1 = quest1.getElementsByClassName('name')[0];
    const nameBlock2 = quest2.getElementsByClassName('name')[0];
    const name1 = nameBlock1.innerHTML;
    const name2 = nameBlock2.innerHTML;
    return collator.compare(name1, name2);
}

function cmpLikes(quest1, quest2) {
    const statsBlock1 = quest1.getElementsByClassName('stats')[0];
    const statsBlock2 = quest2.getElementsByClassName('stats')[0];
    const likes1 = parseInt(statsBlock1.innerHTML, 10);
    const likes2 = parseInt(statsBlock2.innerHTML, 10);
    return likes1 < likes2;
}

function cmpStarted(quest1, quest2) {
    const statsBlock1 = quest1.getElementsByClassName('stats')[0];
    const statsBlock2 = quest2.getElementsByClassName('stats')[0];
    const started1 = parseInt(statsBlock1.innerHTML.match(regExpStarted)[1], 10);
    const started2 = parseInt(statsBlock2.innerHTML.match(regExpStarted)[1], 10);
    return started1 < started2;
}

function addLikesFirst(quests) {
    let first = quests[fromEl];
    for (let i = fromEl; i < quests.length - 1; i++) {
        if (cmpLikes(first, quests[i + 1])) {
            first = quests[i + 1];
        }
    }

    questsSet.insertBefore(first, questsSet.childNodes[fromEl]);
    fromEl++;
}

function addAlphFirst(quests) {
    let first = quests[fromEl];
    for (let i = fromEl; i < quests.length - 1; i++) {
        if (cmpAlph(first, quests[i + 1]) === 1) {
            first = quests[i + 1];
        }
    }

    questsSet.insertBefore(first, questsSet.childNodes[fromEl]);
    fromEl++;
}

function addStartedFirst(quests) {
    let first = quests[fromEl];
    for (let i = fromEl; i < quests.length - 1; i++) {
        if (cmpStarted(first, quests[i + 1])) {
            first = quests[i + 1];
        }
    }

    questsSet.insertBefore(first, questsSet.childNodes[fromEl]);
    fromEl++;
}

const refresh = function () {
    fromEl = 0;
    questsSet = document.getElementsByClassName('quests-set')[0];
    allQuests = document.getElementsByClassName('quest');
};

const sortByAlph = document.getElementsByClassName('sort-by-alph')[0];
sortByAlph.addEventListener('click', () => {
    refresh();
    for (let i = 0; i < allQuests.length - 1; i++) {
        addAlphFirst(allQuests);
    }
});

const sortByLikes = document.getElementsByClassName('sort-by-likes')[0];
sortByLikes.addEventListener('click', () => {
    refresh();
    for (let i = 0; i < allQuests.length - 1; i++) {
        addLikesFirst(allQuests);
    }
});

const sortByStarted = document.getElementsByClassName('sort-by-started')[0];
sortByStarted.addEventListener('click', () => {
    refresh();
    for (let i = 0; i < allQuests.length - 1; i++) {
        addStartedFirst(allQuests);
    }
});
