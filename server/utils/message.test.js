let expect = require('expect');

var {generateMessage , generateLocationMessage} = require('./message');

describe('Generate Message',()=>{
    it("should generate correct message object",()=>{
        let from="Anshaj"
        let text = "Random text";

        let message = generateMessage(from,text);

        expect(typeof message.createdAt).toBe('number');
        expect(message).toMatchObject({
            from,text
        })

    })
})