import * as NATS from 'node-nats-streaming';

const stan = NATS.connect('test-cluster', 'producer', {
    url: 'nats://localhost:4222'
})

stan.on('connect', () => {
    console.log('Consumer connected to NATS');

    const sub = stan.subscribe('test-channel', stan.subscriptionOptions().setStartWithLastReceived())

    sub.on('message', (msg) => {
        let message = JSON.parse(msg.getData() as string)
        console.log('Received Data:  ', message);
    })


    sub.on('err', (err) => {
        console.log(err);

    })

})


