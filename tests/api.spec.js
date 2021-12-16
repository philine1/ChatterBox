const request = require('supertest');  //required for end point testing 
const routes = require('../server/controller/journal');
const server = require('../server/server')
// const index = require('../server/index')  // may not need although server starting in this file rather than server


// set up from freecodecamp doc for end point testing  
//---------------------------------------------------
// const app = require("../server"); // Link to your server file
// const supertest = require("supertest");
// const request = supertest(app);

// End Point Testing Set Up 
//-------------------------- 
// Note for testing need to install JEST and SUPERTEST
// npm install jest --save-dev
// npm install supertest --save-dev 
// package.json need under "scripts" add "test": "jest --silent --watchAll",  "coverage": "jest --coverage --silent",
// Important not to require index.js as this starts up server 
// Ensure local server not running as server started and stopped after each test 
// to run tests npm run test or npm test 
// to run coverage npm run coverage or npm coverage


describe('API endpoint tests', () => {

    let api;
    // initialise test journalEntry message in json format  
    let testMessage = { 
    "author":"Test User", 
    "message":"Testing saying Hello world!",
    "comment":'[]'
    };

    // initialise test comment message in json format 
    let testComment = {
        "comment":[{
            "author":"Test User giving comments", 
            "message":"This is a comments to journal entry"
        }]
    }

    // initialise test emoji 
    let testEmoji = {
        comment: [] 
    }

 
    beforeAll(() => {
        // start the server NOTE maybe need index rather than server 
        api = server.listen(3000, () => {  
            console.log('test server running on port 5000')
        })
    })
    afterAll((done) => {
        console.log('Gracefully stopping test server');
        api.close(done);
    }); 

    // GET tests 

    //testing route for GET display of all journal entries data
    it('responds to get /journal with status of 200', (done) =>{
        request(api)
            .get('/journal')
          //  .expect(journalEntries[0].id.toBe(1))
            .expect(200, done) 
    });                                                
                
    
    // Alternative test to GET all journal Entries
//     it("gets the test endpoint", async (done)                                                                                                                                                                                                     => {
//         const response = await request(api).get("/journal");
//         expect(response.status).toEqual(200);
//    //      expect(response.body.message).toBe("Testing saying Hello world!");
//         done();
//       }); 

    // testing route for GET emoji reaction for a journal entry 
    it('responds to get /journal/:id/emoji/:emojiid with status of 200', (done) =>{
        request(api)
            .get ('/journal/1/emoji/1')  //('/journal/:id/emoji/:emojiid')
            // need a test to check counter value 
         // .expect(journalEntries.emoji[1].counter.toEqual(60))  
         // .expect(journalEntries[0].id.toBe(1))
            .expect(200,done)
           //  
    });  
  
    // testing route for GET all comments for a journal entry 
    it('responds to get /journal/:id/comments with correct comments for a journal and status of 200', (done) =>{
        request(api)
            .get ('/journal/1/comments') 
            .expect(200, done)
        // need a test to check no of rows returned 
            
    });

    // POST Tests 
 
   // Add a new Journal Entry Message test 
    it('responds to post /journal with status 201 and returning correct id' , async (done) => {
         request(api) 
            .post('/journal')
         //   .send(testMessage)   // do we need to stringify ?
         //   .set('Content-Type', 'application/json') // add a header of 'Content-Type' with value 'application/json'
         // testing id: set and date: set and message added
         //   .expect({author:'Test User'}) //new Journal message record added, ...testMessage
            .expect(201) // needs to be 201  
            .expect (done)

            // test for all emoji counters set to 0 

            // test nothing in comments array 

        });

    //  PATCH tests 

    // // test for adding a new Journal Entry comment to journal entry id=1 
    // it('responds to post /journal/id:/comments with status 201', (done) => {
    //     request(api)
    //         .patch('/journal/1/comments')
    //         .send(testComment)
    //         .expect(200) //should be 201 
    //         .expect({id:2, ...testComment})
    //         .expect(done)
    // });

    // // Test for emoji count update on emoji id=1 and journal id=1

    // it('responds to post /journal/:id/emoji/:emojiid with status 201', (done) => {
    //     request(api)
    //         .patch('/journal/1/emoji/1')
    //         .send(testEmoji)
    //         .expect(200)   // should be 201
    //         .expect({id:2, ...testEmoji},done)
    // });

 
    });

