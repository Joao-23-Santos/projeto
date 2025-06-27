from flask import Flask, request, jsonify, render_template
import yagmail
from flask_cors import CORS
import os

app = Flask(__name__, methods=['GET', 'POST', 'OPTIONS'],allow_headers=["*"])
CORS(app, origins='https://projeto-kxn1.onrender.com')

EMAIL = os.environ.get('EMAIL')  # Replace with your actual email
PASSWORD = os.environ.get('EMAIL_PASSWORD')  # Replace with your actual password

yag = yagmail.SMTP(EMAIL, PASSWORD)


@app.route('/send-email', methods=['POST', 'OPTIONS'])
def send_email():
    if request.method == 'OPTIONS':
        return jsonify({'message': 'CORS preflight response'}), 200
    data = request.json
    nome = data.get('nome')
    email = data.get('email')
    mensagem = data.get('mensagem')

    if not nome or not email or not mensagem:
        return jsonify({'error': 'Missing required fields'}), 400

    try:
        yag.send(to=EMAIL, subject=email, contents= nome+mensagem)
        return jsonify({'message': 'Email sent successfully!'}), 200
    except Exception as e:
        return jsonify({'error': str(e)}), 500
    
if __name__ == '__main__':
    app.run(debug=True, port=5000)