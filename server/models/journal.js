const journalData = require("../data");
const dayjs = require("dayjs");

class journalEntry {
    constructor(entry) {
        this.id = entry.id
        this.author = entry.author
        this.message = entry.message
        this.date = entry.date
    }

    static get all() {
        const journalEntries = journalData.map((entry) => new journalEntry(entry))
        return journalEntries
    }

    // Method for creating a new entry
    static createEntry(entry) {
        const time = dayjs().toString();
        const newEntry = new journalEntry({
            id: journalData.length + 1,
            ...entry,
            data: time
        })
        journalData.push(newEntry)
        return newEntry
    }
}

module.exports = journalEntry;