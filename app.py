from flask import Flask, render_template, request, jsonify
import json
import re
app = Flask(__name__)

with open('scraped.json', 'r', encoding='utf-8') as f:
    scraped_data = json.load(f)

def word_overlap_score(text, query):
    text_words = set(re.findall(r'\w+', text.lower()))
    query_words = set(re.findall(r'\w+', query.lower()))
    return len(text_words.intersection(query_words))

@app.route('/')
def home():
    return render_template('index.html')

@app.route('/send_message', methods=['POST'])
def send_message():
    user_message = request.json.get('message', '').lower().strip()

    greetings = ['hello', 'hi', 'hey', 'greetings']
    if user_message in greetings:
        return jsonify({'reply': "Hello! How can I assist you today?"})

    best_match = None
    best_score = 0

   
    for page in scraped_data:
        
        for heading_list in page.get('headings', {}).values():
            for heading in heading_list:
                score = word_overlap_score(heading, user_message)
                if score > best_score:
                    best_score = score
                    best_match = heading

       
        for para in page.get('paragraphs', []):
            score = word_overlap_score(para, user_message)
            if score > best_score:
                best_score = score
                best_match = para

    if best_match and best_score > 0:
        return jsonify({'reply': best_match})
    else:
        return jsonify({'reply': "Sorry, I don't know. This info isn't in my data."})

if __name__ == '__main__':
    app.run(debug=True)
