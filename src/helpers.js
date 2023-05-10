
function shuffle(array){

    let currentIndex = array.length;
    let temporaryValue, randomIndex;

    // While there remain elements to shuffle...
    while (0 !== currentIndex) {
        // Pick a remaining element...
        randomIndex = Math.floor(Math.random() * currentIndex);
        currentIndex -= 1;

        // And swap it with the current element.
        temporaryValue = array[ currentIndex ];
        array[ currentIndex ] = array[ randomIndex ];
        array[ randomIndex ] = temporaryValue;
    }

    return array;

};

/**
     * Emit a custom event
     * @param  {String} type   The event type
     * @param  {*}      detail Any details to pass along with the event
     */
function emit(type, detail) {

    // Create a new event
    let event = new CustomEvent(type, {
        bubbles: true,
        cancelable: true,
        detail: detail
    });

    // Dispatch the event
    return document.dispatchEvent(event);

}
export { shuffle, emit };

