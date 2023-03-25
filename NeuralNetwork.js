const {Matrix} = require('./matrix');

function sigmoid(x) {
    return 1 / (1 + Math.exp(-x));
}

function dsigmoid(y) {
    return y * (1 - y);
}

class NeuralNetwork {
    constructor(input_nodes, hidden_nodes, output_nodes) {
        this.input_nodes = input_nodes;
        this.hidden_nodes = hidden_nodes;
        this.output_nodes = output_nodes;

        this.weights_ih = new Matrix(this.hidden_nodes, this.input_nodes);
        this.weights_ho = new Matrix(this.output_nodes, this.hidden_nodes);
        this.weights_ih.randomize();
        this.weights_ho.randomize();

        this.learning_speed = 0.1;
    }

    feedForward(input_arr){
        // Вычисление скрытого слоя
        let inputs = Matrix.fromArray(input_arr);                   // преобразование входных данных в матрицу
        let hidden = Matrix.multiply(this.weights_ih, inputs);        // подсчет нейрона
        hidden.map(sigmoid);          // применение к каждому элементу матрицы сигмоидальной функции

        // Вычисление выходного слоя
        let outputs = Matrix.multiply(this.weights_ho, hidden)
        outputs.map(sigmoid)

        return ({
            inputs, hidden, outputs
        })
    }

    train(inputs_array, targets_array) {
        let options = this.feedForward(inputs_array);

        let inputs = options.inputs;
        let hidden = options.hidden;
        let outputs = options.outputs;

        // Из массива в матрицу
        let targets = Matrix.fromArray(targets_array);

        // Вычисление ошибок выходного слоя (output_errors = targets - outputs)
        let output_errors = Matrix.subtract(targets, outputs);    // матрица ошибок - матрица ожидаемых ответов
        // Вычисление градиента (gradient = outputs * (1 - outputs))
        let gradients = Matrix.map(outputs, dsigmoid);
        gradients.multiply(output_errors);
        gradients.multiply(this.learning_speed);

        // Вычисление изменения весов из hidden в output
        let hidden_transpose = Matrix.transpose(hidden);
        let weights_ho_deltas = Matrix.multiply(gradients, hidden_transpose);

        // Перезаписывание весов
        this.weights_ho.add(weights_ho_deltas);



        // Вычисление ошибок скрытого слоя (hidden_errors = transpose weight matrix * output_errors)
        let weights_ho_transpose = Matrix.transpose(this.weights_ho);
        let hidden_errors = Matrix.multiply(weights_ho_transpose, output_errors);

        // Вычисление градиента скрытого слоя (gradient = outputs * (1 - outputs))
        let hidden_gradient = Matrix.map(hidden, dsigmoid)
        hidden_gradient.multiply(hidden_errors);
        hidden_gradient.multiply(this.learning_speed);

        // Вычисление изменения весов из input в hidden
        let inputs_transpose = Matrix.transpose(inputs);
        let weights_ih_deltas = Matrix.multiply(hidden_gradient, inputs_transpose);

        // Перезаписывание весов
        this.weights_ih.add(weights_ih_deltas);
    }
}

module.exports = {
    NeuralNetwork
}