const request = require('supertest');  //required for end point testing install supertest (npm install --save-dev supertest )
const routes = require('../controller/journal');
const server = require('../server/server')
const index = require('../server/index')  // may not need although server starting in this file rather than server


describe('API endpoint tests', () => {

    let api;
    // initialise journalEntry message 
    let testMessage = { 
    author:'Test User', 
    message:' Testing saying Hello world!'
    }

    // initialise comment message
    
    let testComment = {
        comment: [{
            author:'Test User giving comments', 
            message:'This is a comments to journal'
        }]
    }
 


    beforeAll(() => {
        // start the server NOTE maybe need index rather than server 
        api = server.listen(3000, () => {  //port 5000 or 3000
            console.log('test server running on port 3000')
        })
    })
    afterAll((done) => {
        console.log('Gracefully stopping test server');
        api.close(done);
    });

    // All GET tests 

    //testing route for GET display of all journal entries data
    it('responds to get /journal with status of 200', (done) =>{
        request(api)
            .get('/journal')
            .expect(200, done)
    });

    // testing route for GET emoji reaction for a journal entry 
    it('responds to get /journal/:id/emoji/:emojiid with status of 200', (done) =>{
        request(api)
            .get ('/journal/1/emoji/1')  //('/journal/:id/emoji/:emojiid')
            .expect(200)
            .expect({id:1, emoji[1].id:1, emoji[1].counter:60}, done) 
    });

    // testing route for GET all comments for a journal entry 
    it('responds to get /journal/:id/comments with correct comments for a journal and status of 200', (done) =>{
        request(api)
            .get ('/journal/1/comments') 
            .expect(200,done)
        // need a test to check no of rows returned 
            
    });

    // POST Tests 

    // Add a new Journal Entry Message test 
    it('responds to post /journal with status 201', (done) => {
        request(api)
            .post('/journal')
            .send(testMessage)
            .expect(201)
            // testing id: set and date: set and message added
            .expect({id:3, ...testMessage},done) //new Journal message record added
   // test for all emoji counters set to 0 
   // test nothing in comments array 

        });

      // Add a new Journal Entry comment to journal entry 1 test 
      it('responds to post /journal/id:/comment with status 201', (done) => {
        request(api)
            .post('/journal/1/comment')
            .send(testComment)
            .expect(201)
            .expect({id:3, ...testComment},done)
    });


    






    });



})
