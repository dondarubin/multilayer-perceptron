const {NeuralNetwork} = require('./NeuralNetwork');

// inputs: [необходимость в настольной клавиатуре, мобильность, дисковод, способность к управлению без мыши, возможность звонков, наличие динамиков]
// targets: [ноутбук, компьютер, телефон, планшет]

let train_data = [
    {// комп
        inputs: [1, 0.1, 1, 0, 0, 0],
        targets: [0, 1, 0, 0]
    },
    {// комп
        inputs: [1, 0.4, 0, 0.2, 0, 0],
        targets: [0, 1, 0, 0]
    },
    {// ноутбук
        inputs: [1, 0.6, 0, 0.8, 0, 1],
        targets: [1, 0, 0, 0]
    },
    {// ноутбук
        inputs: [1, 0.8, 1, 1, 0, 0],
        targets: [1, 0, 0, 0]
    },
    {// телефон
        inputs: [0, 1, 0, 1, 1, 1],
        targets: [0, 0, 1, 0]
    },
    {// телефон
        inputs: [0, 0.9, 0, 1, 1, 0],
        targets: [0, 0, 1, 0]
    },
    {// планшет
        inputs: [0.5, 0.7, 0, 1, 0, 1],
        targets: [0, 0, 0, 1]
    },
    {// планшет
        inputs: [0, 0, 0, 1, 1, 1],
        targets: [0, 0, 0, 1]
    },
]

let nn = new NeuralNetwork(6, 6, 4);

for (let i = 0; i < 1; i++) {
    for (let data of train_data) {
        nn.train(data.inputs, data.targets)
    }
}

console.log(nn.feedForward([0.5, 0.3, 0, 0.6, 0.4, 1]).outputs.toArray());
console.log(nn.feedForward([0, 1, 0, 1, 1, 1]).outputs.toArray());
console.log(nn.feedForward([1, 0.7, 0, 0, 0, 0]).outputs.toArray());
console.log(nn.feedForward([1, 0.6, 0, 0.8, 0.2, 1]).outputs.toArray());


