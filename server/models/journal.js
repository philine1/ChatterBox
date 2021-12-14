const journalData = require("../data");
const dayjs = require("dayjs");

class journalEntry {
    constructor(entry) {
        this.id = entry.id
        this.author = entry.author
        this.comment = entry.comment
        this.emoji = entry.emoji
        this.date = entry.date
        this.message = entry.message
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
            emoji: [
                {id: 1, counter: 0}, {id: 2, counter: 0}, {id: 3, counter: 0}
            ],
            date: time
        })
        journalData.push(newEntry)
        return newEntry
    }

    // function to return an id
    static getId(id) {
        // id <= 0 ? console.log("no entries with id") : journalData[id-1]
        if(id <=0) {
            console.log("No entries with id")
        } else {
            return journalData[id-1]
        }
    }

    // function to increase emoji
    addEmoji(id, emojiId, data) {
        const emojiCount = parseInt(data.count)
        const currentEntry = journalData[id-1]
        currentEntry.emoji[emojiId-1].count = emojiCount + 1;
    }

    // function to add new comment onto entry
    addComment(id, commentData) {
        const commentEntry = commentData.message
        const currentEntry = journalData[id-1]
        const commentDate = commentData.date   
        const currentId = currentEntry.comment.length  

        currentEntry.comment.push( {
            id: currentId +1,
            author: `${commentData.author}`,
            message: commentEntry,
            emoji: [
                {id: 1, counter: 0}, {id: 2, counter: 0}, {id: 3, counter: 0}
            ],
            date: commentDate
        })
    }
}

module.exports = journalEntry;