const journalData = require("../data");
const dayjs = require("dayjs");

class journalEntry {
    constructor(entry) {
        this.id = entry.id
        this.author = entry.author
        this.comment = entry.comment
        this.emoji = entry.emoji
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
            date: time
        })
        journalData.push(newEntry)
        return newEntry
    }

    getId(id) {
        id <= 0 ? console.log("no entries with id") : journalData[id-1]
    }

    addEmoji(id, emojiId, emojiCounter) {
        const emojiCount = parseInt
    }
    addComment(id, data) {
        const commentEntry = data.comment
        const currentEntry = journalData[id-1]
        const commentDate = data.date   
        const currentId = currentEntry.comment.length  

        currentEntry.comment.push( {
            id: currentId +1,
            author: `${data.author}`,
            emoji: [
                {id: 1, counter: 0}, {id: 2, counter: 0}, {id: 3, counter: 0}
            ],
            date: commentDate
        })
    }
}

module.exports = journalEntry;