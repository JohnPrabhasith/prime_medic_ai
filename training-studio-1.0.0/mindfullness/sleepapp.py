from flask import Flask, request, jsonify, render_template

app = Flask(__name__)

# Sample responses
responses = {
    "anxiety": "It sounds like you're going through a tough time. Would you like to learn more about anxiety disorders or try some coping strategies?",
    "depression": "I'm sorry you're feeling this way. Would you like to learn more about depression or try some coping strategies?",
    "bipolar": "Bipolar disorder can be challenging. Would you like to learn more about it or try some coping strategies?",
    # Add more responses here
}

@app.route('/')
def index():
    return render_template('index.html')

@app.route('/sleep_tracker')
def sleep_tracker():
    return render_template('sleep_tracker.html')

@app.route('/chat', methods=['POST'])
def chat():
    user_input = request.json.get('message')
    for key in responses:
        if key in user_input.lower():
            return jsonify({"response": responses[key]})
    return jsonify({"response": "I'm here to support you. Can you tell me more about what's on your mind?"})

if __name__ == '__main__':
    app.run(debug=True)