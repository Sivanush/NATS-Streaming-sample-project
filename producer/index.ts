import * as NATS from "node-nats-streaming";

const stan = NATS.connect('test-cluster', 'producer', {
    url: 'nats://localhost:4222'
});


stan.on('connect', () => {
    console.log('Producer connected to NATS');

    let message = {
        name: 'john',
        age: 20
    }

    stan.publish('test-channel', JSON.stringify(message), (err, guid) => {
        if (err) {
            console.log(err);
        } else {
            console.log('Success:   ' + guid);

        }

        stan.close()
    })
})


stan.on('close', () => {
    console.log('Producer connection closed');

})



