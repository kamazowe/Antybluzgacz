$ = (selector) => document.querySelector(selector);

class TrollKiller {

    constructor(field, restrictedWords) {
        this._field = field;
        this._words = restrictedWords.split(/, */);
        this._regex = new RegExp(`(${this._words.join('|')})`, 'igm');
        this._assignEvents();
    }

    _assignEvents() {

        this._field.addEventListener('click', function (e) {
            this.classList.remove('border');
        }, false);
        this._field.addEventListener('keyup', this._filterMessage.bind(this), false);
    }

    _filterMessage(e) {
        let that = this;
        const f = this._field.value;
        const exec = this._regex.exec(f);

        if (exec !== null) {

            this._field.value = this._field.value.replace(this._regex, function (match) {
                console.log(`Wylapane slowo: ${match}`);
                return that._censorWord(match);
                // return 1;
            });

        }

    }
    _censorWord(match) {
        let cenzor = '*';
        return `${match[0]}${cenzor.repeat(match.length-2)}${match[match.length-1]}`;
        // return 1;
    }


}


////////////////////////////////////
let f1 = $(`#form1 .message`);
let w1 = 'pupa, kurcze';
let vk1 = new TrollKiller(f1, w1);

let f2 = $(`#form2 .message`);
let w2 = 'wuj, drabina';
let vk2 = new TrollKiller(f2, w2);
