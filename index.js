/*! gomakethings-structure-and-scale-modules2
v1.0.0
sevenSeas bundled more efficient
Copyright 2023
MIT license */


(function () {
    'use strict';

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

    }
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

    class TreasureChest {

        #bronze;
        #silver;
        #gold;
        #loot;

        /**
         * Create the constructor object
         * @param {Object} options User settings
         */
        constructor (options = {}) {

            // Merge options into defaults
            let { bronze, silver, gold, loot } = Object.assign({
                bronze: 0,
                silver: 0,
                gold: 0,
                loot: `You have {{gold}} gold, {{silver}} silver, and {{bronze}} bronze.`
            }, options);

            // Set instance properties
            this.#bronze = bronze;
            this.#silver = silver;
            this.#gold = gold;
            this.#loot = loot;

        }

       

        /**
         * Add bronze to the treasure chest
         * @param {Number} n The amount to add
         */
        addBronze(n) {
            this.#bronze += n;
            emit('treasure:bronze', this);
            return this;
        }

        /**
         * Add silver to the treasure chest
         * @param {Number} n The amount to add
         */
        addSilver(n) {
            this.#silver += n;
            emit('treasure:silver', this);
            return this;
        }

        /**
         * Add gold to the treasure chest
         * @param {Number} n The amount to add
         */
        addGold(n) {
            this.#gold += n;
            emit('treasure:gold', this);
            return this;
        }

        /**
         * Get the total amount of loot as a string
         * @return {String} The total amount of loot
         */
        getLoot() {
            return this.#loot.replace('{{gold}}', this.#gold).replace('{{silver}}', this.#silver).replace('{{bronze}}', this.#bronze);
        }

        /**
         * Get the amount of bronze
         * @return {Number} The amount
         */
        getBronze() {
            return this.#bronze;
        }

        /**
         * Get the amount of silver
         * @return {Number} The amount
         */
        getSilver() {
            return this.#silver;
        }

        /**
         * Get the amount of gold
         * @return {Number} The amount
         */
        getGold() {
            return this.#gold;
        }

        /**
         * Generate random treasure
         * @return {Object} The amount and type of loot found
         */
        static random() {

            // Amount and type
            let amount = [ 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20, 21, 22, 23, 24, 25, 26, 27, 28, 29, 30, 31, 32, 33, 34, 35, 36, 37, 38, 39, 40, 41, 42, 43, 44, 45, 46, 47, 48, 49, 50 ];
            let type = [ 'bronze', 'silver', 'gold' ];

            // Randomize the amounts
            shuffle(amount);
            shuffle(type);

            // Return the random loot
            return {
                amount: amount[ 0 ],
                type: type[ 0 ]
            };

        }

    }

    // Hold the treasure instance
    let treasure;


    function createTreasure() {

        // Get any saved loot from localStorage
        let savedLoot = JSON.parse(localStorage.getItem('ss-treasure'));

        // Create new Treasure Chest instance
        treasure = new TreasureChest(savedLoot);

    }

    /**
     * Display the amount of loot in the UI
     */
    function showLoot() {
        let loot = document.querySelector('#loot');
        if (!loot) return;
        loot.textContent = treasure.getLoot();
    }

    // To show the loot on the homepage

    createTreasure();
    showLoot();

})();
